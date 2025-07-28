import { getComponent, saveComponent, saveMessage } from "./chat.repository";
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
        await saveMessage(userId, chatId, output.message)

        return output;
    }
}
