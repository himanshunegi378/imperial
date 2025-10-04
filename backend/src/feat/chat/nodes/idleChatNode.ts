/**
 * Idle Chat Node
 * 
 * This node handles casual conversation when the user is not requesting UI generation
 * or edits. Responds naturally based on chat context without generating components.
 */

import { llmService } from './shared';
import { graphState } from '../graphState';
import { SSE_EVENTS, ModelType } from './shared/constants';

/**
 * Idle Chat Node
 * 
 * Handles casual conversation when user is not requesting UI generation or edits.
 * Responds naturally based on chat context without generating components.
 * 
 * @param state - Contains user message and chat context
 * @returns Natural response message without component generation
 */
export const idleChatNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    console.log('--- 💬 IDLECHAT MODE: Responding to casual conversation ---');
    
    const emit = state.sseEmitter;
    
    // Emit idle chat event
    if (emit) {
        emit(SSE_EVENTS.IDLECHAT, { message: state.input.userMessage });
    }

    const { content } = await llmService.invokeModel(ModelType.LLAMA_3_3_70B_VERSATILE, [
        {
            role: 'system',
            content: `You are a friendly UI component assistant. The user is having a casual conversation and NOT requesting any UI generation or modifications.

# CONTEXT
- User is chatting casually without UI requests
- Previous component may exist in chat history
- Respond naturally and helpfully
- Keep responses conversational and brief
- Acknowledge compliments positively
- Be ready to help with UI tasks when they ask

# RESPONSE GUIDELINES
- Be friendly and conversational
- Keep responses concise (1-2 sentences)
- If they compliment the UI, acknowledge it positively
- If they ask about your capabilities, briefly explain you help with UI components
- If they're just saying hello, respond warmly
- Don't generate any HTML or components in this mode

# EXAMPLES
User: "Thanks, that looks great!"
Response: "You're welcome! I'm glad you like how it turned out. Feel free to ask if you need any adjustments or want to create something new!"

User: "Hello!"
Response: "Hi there! I'm here to help you create and modify UI components. What would you like to work on today?"

User: "Nice work!"
Response: "Thank you! I'm happy to help. Is there anything else you'd like to create or modify?"

User: "How does this work?"
Response: "I can help you create and edit UI components using HTML and Tailwind CSS. Just describe what you want, and I'll generate the code for you!"
`
        },
        ...state.messages,
        {
            role: 'user',
            content: state.input.userMessage
        }
    ]);

    return {
        output: {
            name: state.output?.name || 'idle-chat',
            component: state.output?.component || '',
            message: content.toString(),
            chatId: state.input.chatId
        },
        // Keep previous component unchanged for potential future edits
        previousComponent: state.previousComponent
    };
};
