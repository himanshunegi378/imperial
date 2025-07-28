import { ChatGroq } from '@langchain/groq';
import { Annotation, END, MessagesAnnotation, START, StateGraph } from '@langchain/langgraph';
import { SqliteSaver } from "@langchain/langgraph-checkpoint-sqlite";
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { uiVectorStore } from '../../config/constants';
import { env } from '../../env';

const checkpointer = SqliteSaver.fromConnString("langraph-checkpoint.db");


const llm = new ChatOpenAI({
    apiKey: env.OPENAI_API_KEY,
    model: 'gpt-4o-mini',
    temperature: 0
})

const kim2Llm = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: 'moonshotai/kimi-k2-instruct',
    temperature: 0.5
})

const deepseekLlm = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: 'deepseek-r1-distill-llama-70b',
    temperature: 0.1
})

// Define a schema for our new plan object
const PlanSchema = z.object({
    features: z.array(z.string()).describe("A list of key functional elements or components required."),
    designNotes: z.array(z.string()).describe("A list of stylistic instructions, animations, or design language interpretations (e.g., what '3D' means)."),
    enhancedPrompt: z.string().describe("A rewritten, detailed prompt for the UI generation model, incorporating the identified features and design notes.")
});

const graphState = Annotation.Root({
    input: Annotation<{
        userId: string,
        chatId: string,
        userMessage: string
    }>,
    output: Annotation<{
        name: string,
        component: string,
        message: string,
        chatId: string
    }>,
    plan: Annotation<z.infer<typeof PlanSchema>>(),

    validation: Annotation<{
        isValid: boolean,
        feedback: string,
        score: number,
    }>(),
    ...MessagesAnnotation.spec
})

const requirementDeconstructionNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    console.log("--- 📝 DECONSTRUCTING USER REQUIREMENT ---");
    const { userMessage } = state.input;

    const planningPrompt = `

# PREVIOUS COMPONENT
${state.output?.component}

# USER REQUEST
"${userMessage}"

# INSTRUCTIONS
1.  **Identify Features:** List the essential HTML elements and functional parts needed. For example, a "property card" needs an image, price, address, bed/bath info, etc.
2.  **Interpret Design:** Analyze stylistic terms. For example, "3D card" implies using CSS transforms, perspective, and shadows on hover to create a sense of depth.
3.  **Create Enhanced Prompt:** Combine your analysis into a new, detailed prompt that a developer-focused AI can use to generate the precise HTML and Tailwind CSS code.
`;

    const plan = await deepseekLlm.withStructuredOutput(PlanSchema).invoke([
        {
            role: 'system',
            content: `
            # CONTEXT
You are a senior UX designer and front-end architect. Your goal is to deconstruct a user's request for a UI component into a detailed technical plan.
`
        },
        {
            role: 'user',
            content: planningPrompt
        }
    ]);

    console.log("--- ✨ PLAN CREATED ---");
    console.log(`Enhanced Prompt: ${plan.enhancedPrompt}`);

    return {
        plan: plan
    };
}

const uiGenerationNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {


    let revisionInstruction = '';
    if (state.validation && !state.validation.isValid) {
        console.log('--- 🔄 REVISING COMPONENT BASED ON FEEDBACK ---');
        revisionInstruction = `
# REVISION FEEDBACK
The previous attempt was not successful.You MUST regenerate the component to fix the issues.Pay close attention to the following feedback:
        ${state.validation.feedback}
            `;
    }
    const similaritySearchWithScoreResults =
        await uiVectorStore.similaritySearchWithScore(state.input.userMessage, 10);


    const userPrompt = `
   # INSTRUCTION
You are an expert React and Tailwind CSS developer.Your task is to to use one or multiple ui components from example and generate a UI mixing them.

            ${revisionInstruction}

# DETAILED PLAN
${state.plan.enhancedPrompt}

# ORIGINAL USER REQUEST
${state.input.userMessage}

# PREVIOUS COMPONENT(If this exists, the user wants to modify it based on the new plan)
${state.output?.component}

# EXAMPLES
Here are ${similaritySearchWithScoreResults.length} relevant UI components retrieved from our design system knowledge base.

            ${similaritySearchWithScoreResults.map(([doc, score], index) => `## Example ${index + 1}
${doc.pageContent}`).join('\n')
        }



# RULES
1. ** High - Quality Code:** Write clean, readable, and semantic HTML.
2. ** Self - Contained Output:** The generated HTML must be a single, self - contained block.No html, head, body tags.only html code with tailwind classes
`
    const componentSchema = z.object({
        name: z.string().describe("A concise, descriptive name for the component in PascalCase or Title Case (e.g., 'PrimaryButton', 'UserProfileCard')."),
        component: z.string().describe("The complete, self-contained HTML and Tailwind CSS code for the component. Should not include explanations or markdown fences."),
        message: z.string().describe("A brief, friendly confirmation message for the user who requested the component.")
    })

    const systemPrompt = `
    mix and mash components from provided examples to generate the UI for user. 
    
    ## JSON Structure to return
    - name: A concise, descriptive name for the component in PascalCase or Title Case (e.g., 'PrimaryButton', 'UserProfileCard').
    - component: The complete, self-contained HTML and Tailwind CSS code for the component. Should not include explanations or markdown fences.
    - message: A brief, friendly confirmation message for the user who requested the component.
    `
    const result = await kim2Llm.invoke([
        {
            role: 'system',
            content: systemPrompt,
        },
        {
            role: 'user',
            content: userPrompt
        }
    ]);

    const { name, component, message } = await llm.withStructuredOutput(componentSchema).invoke([

        {
            role: 'user',
            content: `
            Convert to JSON

            ${result.content}
            `
        }
    ]);
    return {
        output: {
            name,
            component,
            message,
            chatId: state.input.chatId
        }
    }
}

const validationNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    const { userMessage } = state.input;
    const { component } = state.output;

    // Define the structured output for our validator
    const ValidationSchema = z.object({
        isValid: z.boolean().describe("True if the code meets all criteria, False otherwise."),
        feedback: z.string().describe("Detailed, actionable feedback for the developer to improve the code. Explain *why* it failed. If it's valid, provide a brief confirmation."),
        score: z.number().min(1).max(10).describe("A quality score from 1 (poor) to 10 (excellent).")
    });

    const validationLlm = deepseekLlm

    const validationPrompt = `
# CONTEXT
You are an expert senior front - end developer tasked with performing a rigorous code review on an AI - generated UI component.

# ORIGINAL USER REQUEST
\`\`\`
${userMessage}
\`\`\`

# GENERATED HTML COMPONENT
\`\`\`html
${component}
\`\`\`

# VALIDATION CRITERIA
Please evaluate the component based on the following criteria:
1.  **Requirement Fulfillment:** Does the generated code accurately and completely implement the user's request?
2.  **Code Quality:** Is the HTML semantic and well-structured? Are Tailwind CSS classes used effectively and without redundancy?
3.  **Accessibility (A11y):** Does the component include basic accessibility features, such as 'alt' attributes for images?
4.  **Correctness:** Is the HTML syntax valid and self-contained (no <html> or <body> tags)?

# TASK
The feedback must be clear and provide actionable suggestions if the code is invalid. A score below 8 means the component is not valid.
`;

    const rawResult = await validationLlm.invoke([
        {
            role: 'system',
            content: `
            # CONTEXT
You are an expert senior front-end developer tasked with performing a rigorous code review on an AI-generated UI component.

           
           ## JSON Structure to return
           {
            isValid: boolean,
            feedback: string,
            score: number,
           }
           `

        },
        {
            role: 'user',
            content: validationPrompt
        }
    ]);

    const result = await llm.withStructuredOutput(ValidationSchema).invoke(`
        convert to json
        ${rawResult.content}
        `)


    console.log(`--- VALIDATION SCORE: ${result.score}/10 ---`);
    if (!result.isValid) {
        console.log(`--- FEEDBACK: ${result.feedback} ---`);
    }

    console.log(JSON.stringify(result, null, 2));

    // Return the validation result to be merged into the state
    return {
        validation: result
    };
}


// This function decides whether to end the graph or loop back for revisions
const shouldContinue = (state: typeof graphState.State) => {
    if (state.validation?.isValid) {
        return '__end__';
    }
    return 'generateComponent';
};

const workflow = new StateGraph(graphState)
    .addNode('requirementDeconstructionNode', requirementDeconstructionNode) // Add the new planning node
    .addNode('generateComponent', uiGenerationNode)
    .addNode('validationNode', validationNode)

    // Define the new workflow sequence
    .addEdge(START, 'requirementDeconstructionNode') // Start with deconstruction
    .addEdge('requirementDeconstructionNode', 'generateComponent') // Then generate
    .addEdge('generateComponent', 'validationNode') // Then validate

    .addConditionalEdges('validationNode', shouldContinue, {
        __end__: END,
        generateComponent: 'generateComponent',
    });

export const ai = workflow.compile({ checkpointer });
