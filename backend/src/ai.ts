import { ChatOpenAI } from '@langchain/openai';
import { eq } from "drizzle-orm";
import { z } from "zod";
import { chatHistory, Components } from "./schema";
import { env } from './env';
import { db } from './db';
import { vectorStore } from './feat/ai/vector-store.service';
import { ai } from './feat/ai/ui-creator-graph';


const llm = new ChatOpenAI({
    apiKey: env.OPENAI_API_KEY,
    model: 'gpt-4o-mini',
    temperature: 0.5
})

const uiLlm = llm.withStructuredOutput(z.object({
    component: z.string().describe('html code with tailwind classes'),
    name: z.string().describe('maximum two word name of the component. If it is a request regarding modifying the last component then use last component name. Name should be like Accordion, Card, Button etc..'),
    message: z.string().describe('message to user. like a receptionist informing the user about there request on what they did')
}))




const getChatHistory = async (chatId) => {
    const chatHistoryFromDB = (await db.select().from(chatHistory).where(eq(chatHistory.chatId, chatId)));
    return chatHistoryFromDB;
}

const saveMessage = async (userId, chatId, message) => {
    await db.insert(chatHistory).values({
        userId,
        chatId,
        message
    })
}

const saveComponent = async (userId, chatId, component, name) => {
    // Each chat can only work on one component
    const existingComponent = await db.select().from(Components).where(eq(Components.chatId, chatId));
    if (existingComponent.length > 0) {
        await db.update(Components).set({
            html: component,
            name
        }).where(eq(Components.chatId, chatId))
    } else {
        await db.insert(Components).values({
            userId,
            chatId,
            html: component,
            name
        })
    }
}

const getComponent = async (chatId) => {
    const component = await db.select().from(Components).where(eq(Components.chatId, chatId));

    if (component.length > 0) {
        return component[0];
    }
    return { html: '', name: '' }
}

export const chat = async ({
    userId,
    chatId,// can be null if it is a new chat
    userMessage,
}) => {
    const {output} = await ai.invoke({
        input: {
            userId,
            chatId,
            userMessage
        }
    })

    return output;

    let chatHistory = [];
    if (chatId) {
        chatHistory = await getChatHistory(chatId);
    } else {
        chatId = Math.random().toString(36).substring(2, 15);
    }


    const similaritySearchWithScoreResults =
        await vectorStore.similaritySearchWithScore(userMessage, 10);

    const { html: lastComponent, name: lastComponentName } = await getComponent(chatId);

    const userPrompt = `
            # INSTRUCTION
You are an expert React and Tailwind CSS developer. Your task is to to use one or multiple ui components from example and generate a UI mixing them.

# USER REQUEST
${userMessage}

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

    console.log(userPrompt)
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
    await saveComponent(userId, chatId, component, name)
    await saveMessage(userId, chatId, message)
    return { component, name, message, chatId }
}

