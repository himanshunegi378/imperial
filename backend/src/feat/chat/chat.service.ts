import { checkpointer } from "../../config/constants";
import { createChatHistory, deleteChatHistory, doesChatHistoryExist, getAllChatIdsAssociateWithUser, saveComponent, saveMessage } from "./chat.repository";
import { GraphStateType } from "./chat.type";
import { ai } from "./uiGeneratorGraph"

export class ChatService {
    chat = async ({ userId, chatId, userMessage }: { userId: string, chatId?: string, userMessage: string }) => {
        if (!chatId) {
            chatId = Math.random().toString(36).substring(2, 15);
        }


        const { output } = await ai.invoke({
            input: {
                chatId,
                userId,
                userMessage
            },
        }, {
            configurable: {
                thread_id: chatId
            }
        })

        await saveComponent(userId, chatId, output.component, output.name)
        if(!await doesChatHistoryExist(chatId)) {
            await createChatHistory(userId, chatId, output.message)
        }

        return output;
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
}
