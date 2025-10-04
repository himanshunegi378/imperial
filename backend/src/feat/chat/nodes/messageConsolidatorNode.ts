/**
 * Message Consolidator Node
 * 
 * This node finalizes conversation history by creating LangChain message objects.
 * This prepares the interaction for storage and display in the chat interface.
 */

import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { graphState } from '../graphState';

/**
 * Message Consolidator Node
 * 
 * Finalizes conversation history by creating LangChain message objects.
 * This prepares the interaction for storage and display in the chat interface.
 * 
 * @param state - Contains user message and AI response
 * @returns Array of HumanMessage and AIMessage objects
 */
export const messageConsolidatorNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    console.log('--- 📝 CONSOLIDATING MESSAGES ---');

    // Validate that output exists and has a message
    if (!state.output || !state.output.message) {
        throw new Error('Output message is missing from state');
    }

    return {
        messages: [
            new HumanMessage(state.input.userMessage),
            new AIMessage(state.output.message),
        ]
    };
}
