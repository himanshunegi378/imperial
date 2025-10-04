import { checkpointer } from "../../config/constants";
import { createChatHistory, deleteChatHistory, doesChatHistoryExist, getAllChatIdsAssociateWithUser, saveComponent } from "./chat.repository";
import { GraphStateType } from "./chat.type";
import { ai } from "./uiGeneratorGraph"
import { SSEEmitter } from "./sse.utils";

export class ChatService {
    chat = async ({ userId, chatId, userMessage }: { userId: string, chatId?: string, userMessage: string }) => {
        if (!chatId) {
            chatId = Math.random().toString(36).substring(2, 15);
        }

        // Retrieve previous component from checkpointer to support edit mode
        let previousComponent: string | null = null;
        try {
            const checkpoint = await checkpointer.get({
                configurable: {
                    thread_id: chatId
                }
            });
            
            // Extract previous component from last state if it exists
            const channelValues = checkpoint?.channel_values as GraphStateType | undefined;
            if (channelValues?.output?.component) {
                previousComponent = channelValues.output.component;
                console.log(`--- Retrieved previous component (${previousComponent.length} chars) for edit mode ---`);
            } else {
                console.log('--- No previous component found, will default to CREATE mode ---');
            }
        } catch (error) {
            console.log('--- Error retrieving checkpoint, starting fresh ---', error);
        }

        // Invoke graph with previous component for intent detection
        const result = await ai.invoke({
            input: {
                chatId,
                userId,
                userMessage
            },
            // Inject previous component into initial state
            previousComponent: previousComponent,
        }, {
            configurable: {
                thread_id: chatId
            }
        });

        await saveComponent(userId, chatId, result.output.component, result.output.name)
        if(!await doesChatHistoryExist(chatId)) {
            await createChatHistory(userId, chatId, result.output.message)
        }

        // Return output with additional metadata about the operation mode
        return {
            ...result.output,
            intentType: result.intentType,  // 'CREATE' or 'EDIT'
            editInstructions: result.editInstructions  // Details about what was edited
        };
    }

    getChatHistory = async (chatId: string) => {
        const graphState = await checkpointer.get({
            configurable: {
                thread_id: chatId
            }
        })
        return graphState?.channel_values as GraphStateType;
    }

    getAllChatIdsAssociateWithUser = async (userId: string) => {
        const chatIdsWithName = await getAllChatIdsAssociateWithUser(userId);
        return chatIdsWithName;
    }
    
    deleteChatHistory = async (chatId: string, userId: string) => {
        return await deleteChatHistory(chatId, userId);
    }

    /**
     * Stream chat processing with real-time SSE events
     */
    chatStream = async ({ 
        userId, 
        chatId, 
        userMessage, 
        emitEvent 
    }: { 
        userId: string; 
        chatId?: string; 
        userMessage: string; 
        emitEvent: SSEEmitter;
    }) => {
        if (!chatId) {
            chatId = Math.random().toString(36).substring(2, 15);
        }

        // Emit started event
        emitEvent('started', { chatId });

        // Retrieve previous component from checkpointer to support edit mode
        let previousComponent: string | null = null;
        try {
            const checkpoint = await checkpointer.get({
                configurable: {
                    thread_id: chatId
                }
            });
            
            const channelValues = checkpoint?.channel_values as GraphStateType | undefined;
            if (channelValues?.output?.component) {
                previousComponent = channelValues.output.component;
                console.log(`--- Retrieved previous component (${previousComponent.length} chars) for edit mode ---`);
            } else {
                console.log('--- No previous component found, will default to CREATE mode ---');
            }
        } catch (error) {
            console.log('--- Error retrieving checkpoint, starting fresh ---', error);
        }

        // Stream graph execution with event callbacks
        const stream = await ai.stream({
            input: {
                chatId,
                userId,
                userMessage
            },
            previousComponent: previousComponent,
            sseEmitter: emitEvent,
        }, {
            configurable: {
                thread_id: chatId
            },
            streamMode: "values"
        });

        let finalResult: any = null;

        // Process stream events
        for await (const event of stream) {
            // Track final result
            if (event.output) {
                finalResult = event;
            }
        }

        // Save component and create chat history
        if (finalResult?.output) {
            await saveComponent(userId, chatId, finalResult.output.component, finalResult.output.name);
            
            if (!await doesChatHistoryExist(chatId)) {
                await createChatHistory(userId, chatId, finalResult.output.message);
            }

            // Emit complete event
            emitEvent('complete', {
                component: finalResult.output.component,
                name: finalResult.output.name,
                message: finalResult.output.message,
                chatId,
                intentType: finalResult.intentType,
                editInstructions: finalResult.editInstructions
            });

            return {
                ...finalResult.output,
                intentType: finalResult.intentType,
                editInstructions: finalResult.editInstructions
            };
        } else {
            throw new Error('No output generated from workflow');
        }
    }
}
