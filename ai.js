import { ChatOpenAI } from '@langchain/openai';
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { z } from "zod";
import { chatHistory, Components } from "./schema.js";
import { env } from './env.js';

const db = drizzle('./imperial.db');

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
    let chatHistory = [];
    if (chatId) {
        chatHistory = await getChatHistory(chatId);
    } else {
        chatId = Math.random().toString(36).substring(2, 15);
    }
    const { html: lastComponent, name: lastComponentName } = await getComponent(chatId);

    const { planStep } = await llm.withStructuredOutput(z.object({
        planStep: z.array(z.string().describe("A single, actionable step for the junior designer.")).describe("The detailed, step-by-step plan for creating the UI component.")
    })).invoke([
        {
            role: 'system',
            content: `You are a Senior UI/UX Designer. Your primary role is to mentor a Junior UI Designer by providing clear, actionable plans.
    
    You will be given a description of a UI component to be built using HTML and Tailwind CSS. Your task is to generate a step-by-step plan for the junior designer to follow. You MUST NOT write the HTML code yourself. Your entire output is the plan.
    
    Adhere strictly to the following Core Design Directives when creating the plan:
    
    ## Core Design Directives
    
    ### 1. Accessibility (A11y) First
    - **Contrast:** Ensure all steps mention checking for sufficient color contrast between text and backgrounds (WCAG AA minimum).
    - **Semantics:** Plan for the use of proper semantic HTML tags (<nav>, <button>, <main>, etc.).
    - **Keyboard Navigation:** The plan must include steps for ensuring all interactive elements are reachable and usable via keyboard.
    - **ARIA Roles:** For complex components, include steps to add appropriate ARIA attributes.
    
    ### 2. Component States
    A complete plan must account for all potential user interaction states. The plan should include distinct steps for designing:
    - **Default State:** The component's appearance with no interaction.
    - **Hover State:** How the component responds when a mouse pointer is over it.
    - **Focus State:** A clear visual indicator when the component is selected via keyboard (tabbing). This is crucial and must be distinct from hover.
    - **Active/Pressed State:** The appearance of the component at the moment it is clicked or activated.
    - **Disabled State:** How the component looks when it is not interactive.
    
    ### 3. Responsiveness
    The plan must include steps to ensure the component is fully responsive and looks great on all screen sizes, from mobile to desktop. Mention using Tailwind's responsive prefixes (sm:, md:, lg:).
    
    ### 4. Interactivity & User Feedback
    - Plan for subtle, meaningful animations and transitions (e.g., using 'transition', 'duration', 'ease-in-out') to provide feedback on user actions.
    - The user should always understand the result of their interaction.
    
    ### 5. Code Quality
    - The plan should encourage creating clean, reusable components.
    - Advise on organizing Tailwind classes logically.`
        },
        {
            role: 'user',
            content: `Here is the next task. If it's a modification request, use the context from the last component. Otherwise, treat it as a new component.
    
    ## Task Description
    ${userMessage}
    
    ## Last Component Context (if applicable)
    - **Component Name:** ${lastComponentName || 'N/A'}
    - **Component Code:**
    \`\`\`html
    ${lastComponent || 'No previous component provided.'}
    \`\`\`
    
    Based on the Core Design Directives, generate the detailed \`planStep\` array for the Junior UI Designer.`
        }
    ]);

    // This assumes 'planStep' is the array of strings generated by the first LLM
    const { component, name, message } = await llm.withStructuredOutput(z.object({
        name: z.string().describe("A concise, descriptive name for the component in PascalCase or Title Case (e.g., 'PrimaryButton', 'UserProfileCard')."),
        component: z.string().describe("The complete, self-contained HTML and Tailwind CSS code for the component. Should not include explanations or markdown fences."),
        message: z.string().describe("A brief, friendly confirmation message for the user who requested the component.")
    })).invoke([
        {
            role: 'system',
            content: `You are a skilled UI Developer specializing in HTML and Tailwind CSS. Your job is to take a detailed plan from a Senior Designer and write the corresponding code.

Your work must adhere to these rules:
1.  **Follow the Plan Strictly:** Your primary directive is to implement every step of the provided plan exactly as described. The plan is your source of truth.
2.  **High-Quality Code:** Write clean, readable, and semantic HTML. Organize Tailwind CSS classes logically.
3.  **Self-Contained Output:** The generated HTML must be a single, self-contained block. DO NOT include \`<html>\`, \`<head>\`, or \`<body>\` tags unless the request is for a full page layout.
4.  **No Explanations:** Do not add any conversational text, notes, or explanations in your output. Your response should only be the structured JSON object with the requested fields.`
        },
        {
            role: 'user',
            content: `Your task is to build or modify a UI component. Follow the provided plan meticulously and use the context if available.

## Step-by-Step Execution Plan
${planStep.map((step, index) => `${index + 1}. ${step}`).join('\n')}

## Original User Request
"${userMessage}"

## Context from Previous Version (if applicable)
- **Component Name:** ${lastComponentName || 'N/A'}
- **Component Code:**
\`\`\`html
${lastComponent || 'No previous component provided.'}
\`\`\`

## Required Output Format
Now, generate the final component based on the plan. Provide your response as a JSON object with the following keys:
- "name": A concise, descriptive name for the component.
- "component": The raw HTML string with Tailwind classes.
- "message": A brief, friendly message confirming completion. In case modification list down the modification too (e.g., "Here is your new Login Form component!").`
        }
    ]);
    await saveComponent(userId, chatId, component, name)
    await saveMessage(userId, chatId, message)
    return { component, name, message, chatId }
}

