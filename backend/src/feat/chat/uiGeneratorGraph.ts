import { Annotation, END, MessagesAnnotation, START, StateGraph } from '@langchain/langgraph';
import { z } from 'zod';
import { getChatHistory, getComponent, saveComponent, saveMessage } from './chat.repository';
import { ChatHistory } from './chat.type';
import { ChatOpenAI } from '@langchain/openai';
import { env } from '../../env';
import { uiVectorStore } from '../../config/constants';

const llm = new ChatOpenAI({
    apiKey: env.OPENAI_API_KEY,
    model: 'gpt-4o-mini',
    temperature: 0.5
})

const graphState = Annotation.Root({
    input: Annotation<{
        userId: string,
        chatId?: string,
        userMessage: string
    }>,
    output: Annotation<{
        name: string,
        component: string,
        message: string,
        chatId: string
    }>,
    ...MessagesAnnotation.spec
})

const uiGenerationNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    let chatHistory: ChatHistory[] = [];
    if (state.input.chatId) {
        chatHistory = await getChatHistory(state.input.chatId);
    } else {
        state.input.chatId = Math.random().toString(36).substring(2, 15);
    }
    const similaritySearchWithScoreResults =
        await uiVectorStore.similaritySearchWithScore(state.input.userMessage, 10);
    const { html: lastComponent, name: lastComponentName } = await getComponent(state.input.chatId);


    const userPrompt = `
   # INSTRUCTION
You are an expert React and Tailwind CSS developer. Your task is to to use one or multiple ui components from example and generate a UI mixing them.

# USER REQUEST
${state.input.userMessage}

# Previous Component (if it exist it means user want to modify the last component)
${lastComponent}

# EXAMPLES
Here are ${similaritySearchWithScoreResults.length} relevant UI components retrieved from our design system knowledge base.

${similaritySearchWithScoreResults.map(([doc, score], index) => `## Example ${index + 1}
${doc.pageContent}`).join('\n')}



Your work must adhere to these rules:
1.  **High-Quality Code:** Write clean, readable, and semantic HTML. Organize Tailwind CSS classes logically.
2.  **Self-Contained Output:** The generated HTML must be a single, self-contained block. DO NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags unless the request is for a full page layout.
3.  **No Explanations:** Do not add any conversational text, notes, or explanations in your output. Your response should only be the structured JSON object with the requested fields.`

    const { component, name, message } = await llm.withStructuredOutput(z.object({
        name: z.string().describe("A concise, descriptive name for the component in PascalCase or Title Case (e.g., 'PrimaryButton', 'UserProfileCard')."),
        component: z.string().describe("The complete, self-contained HTML and Tailwind CSS code for the component. Should not include explanations or markdown fences."),
        message: z.string().describe("A brief, friendly confirmation message for the user who requested the component.")
    })).invoke([
        {
            role: 'system',
            content: `
        mix and mash components from provided examples to generate the UI for user.
        
        response in json format of 
        - name: string > name of the component in PascalCase or Title Case (e.g., 'PrimaryButton', 'UserProfileCard').
        - component: string > html code with tailwind classes
        - message: string > message to user
        `,
        },
        {
            role: 'user',
            content: userPrompt
        }
    ]);
    await saveComponent(state.input.userId, state.input.chatId, component, name)
    await saveMessage(state.input.userId, state.input.chatId, message)
    return {
        output: {
            name,
            component,
            message,
            chatId: state.input.chatId
        }
    }
}


const workflow = new StateGraph(graphState)
    .addNode('generateComponent', uiGenerationNode)
    .addEdge(START, 'generateComponent')
    .addEdge('generateComponent', END)

export const ai = workflow.compile();
