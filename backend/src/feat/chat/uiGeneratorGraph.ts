import { ChatGroq } from '@langchain/groq';
import { END, START, StateGraph } from '@langchain/langgraph';
import { z } from 'zod';
import { checkpointer, uiVectorStore } from '../../config/constants';
import { env } from '../../env';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { graphState, PlanSchema } from './graphState';
import { parseXmlTagFormat } from './utils/parseDynamicKeyValueFormat';




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
        plan: plan,

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

# DETAILED PLAN
${state.plan.enhancedPrompt}

# ORIGINAL USER REQUEST
${state.input.userMessage}

${revisionInstruction || ''}

# PREVIOUS COMPONENT (If available)
${state.output?.component || 'N/A'}

# EXAMPLES
Here are ${similaritySearchWithScoreResults.length} relevant UI components for inspiration:
${similaritySearchWithScoreResults.map(([doc, score], index) => `## Example ${index + 1}\n${doc.pageContent}`).join('\n')}
`;

    const componentSchema = z.object({
        name: z.string().describe("A concise, descriptive name for the component in PascalCase or Title Case (e.g., 'PrimaryButton', 'UserProfileCard')."),
        html: z.string().describe("A string containing the complete, self-contained HTML and Tailwind CSS code for the UI component. The code should be ready to be rendered directly in a browser."),
        message: z.string().describe("A brief, friendly confirmation message for the user who requested the component.")
    })

    const {content} = await kim2Llm.invoke([
        {
            role: 'system',
            content: `
# ROLE
You are an expert React and Tailwind CSS developer.You are a joyful and friendly developer. Your task is to analyze the user's request and the provided examples to generate a new UI component.

# INSTRUCTION
1. Analyze the user's request and the provided examples to generate a new UI component.
2. The component should be a self-contained HTML and Tailwind CSS code.
3. The component should be ready to be rendered directly in a browser.
4. The component should be responsive and mobile-friendly.


# Rule
1. Your response MUST follow xml tag format with <key>value</key>.
2. Do not include any additional text, explanations, or markdown code fences like \`\`\`.

<name>
A concise, descriptive name for the component in PascalCase (e.g., 'PrimaryButton').
</name>

<component>
The complete, self-contained HTML and Tailwind CSS code for the UI component. do not include full html boilerplate.
</component>

<response>
A brief, friendly confirmation message for the user who requested the component.
</response>
           
           # Example
           <name>
           PrimaryButton
           </name>
           <component>
           <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Click me</button>
           </component>
           <response>
           Here is the component you requested.
           </response>
           `
        },
        {
            role: 'user',
            content: userPrompt
        }
    ]);

    const { name, component, response } = parseXmlTagFormat(content.toString(), ['name', 'component', 'response']);

    return {
        output: {
            name,
            component,
            message:response,
            chatId: state.input.chatId
        },
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
    You are an expert senior front-end developer tasked with performing a rigorous code review on an AI-generated UI component.
    
    # ORIGINAL USER REQUEST
    ${userMessage}
    
    # GENERATED HTML COMPONENT
    ${component}
    
    # Evaluation Criteria
    1.  **Requirement Fulfillment:** Does the code accurately implement the user's request?
    2.  **Code Quality:** Is the HTML semantic? Are Tailwind CSS classes used effectively?
    3.  **Accessibility (A11y):** Does it include basic accessibility features?
    4.  **Correctness:** Is the HTML syntax valid and self-contained?

    # TASK
    Evaluate the component
    `;


    const {content} = await validationLlm.invoke([
        {
            role: 'system',
            content: `
            # CONTEXT
You are an expert senior front-end developer tasked with performing a rigorous code review on an AI-generated UI component.

           
           # INSTRUCTION
           1. Evaluate the component
           2. Provide a detailed, actionable feedback for the developer to improve the code.
           3. Explain *why* it failed. If it's valid, provide a brief confirmation.
           4. Provide a quality score from 1 (poor) to 10 (excellent).

           # Rule
           1. Your response MUST follow this exact format. Each key must be on its own line.
           2. The value for each key starts on the line immediately following the key.
           3. Do not include any additional text, explanations, or markdown code fences like \`\`\`.

           <isValid>
           A boolean (true or false) indicating whether the component is valid.
           </isValid>
           <feedback>
           A detailed, actionable feedback for the developer to improve the code.
           </feedback>
           <score>
           A quality score from 1 (poor) to 10 (excellent).
           </score>




           
           `

        },
        {
            role: 'user',
            content: validationPrompt
        }
    ]);

    let { isValid, feedback, score } = parseXmlTagFormat(content.toString(), ['isValid', 'feedback', 'score']);

    console.log(`--- VALIDATION SCORE: ${score}/10 ---`);
    if (isValid === 'false') {
        console.log(`--- FEEDBACK: ${feedback} ---`);
    }

    console.log(JSON.stringify({isValid, feedback, score}, null, 2));

    // Return the validation result to be merged into the state
    return {
        validation: { isValid: isValid === 'true', feedback: (state.validation?.feedback || '').concat('\n', feedback), score: Number(score) }
    };
}


// This function decides whether to end the graph or loop back for revisions
const shouldContinue = (state: typeof graphState.State) => {
    if (state.validation?.isValid) {
        return 'consolidateAiMessages';
    }
    return 'generateComponent';
};

const aiMessageConsolidatorNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {

    return {
        messages: [
            new HumanMessage(state.input.userMessage),
            new AIMessage(state.output.message),
        ]
    };
}

const workflow = new StateGraph(graphState)
    .addNode('requirementDeconstructionNode', requirementDeconstructionNode) // Add the new planning node
    .addNode('generateComponent', uiGenerationNode)
    .addNode('validationNode', validationNode)
    .addNode('consolidateAiMessages', aiMessageConsolidatorNode)

    // Define the new workflow sequence
    .addEdge(START, 'requirementDeconstructionNode') // Start with deconstruction
    .addEdge('requirementDeconstructionNode', 'generateComponent') // Then generate
    .addEdge('generateComponent', 'validationNode') // Then validate
    .addConditionalEdges('validationNode', shouldContinue, {
        consolidateAiMessages: 'consolidateAiMessages',
        generateComponent: 'generateComponent',
    })
    .addEdge('consolidateAiMessages', END)

export const ai = workflow.compile({ checkpointer });
