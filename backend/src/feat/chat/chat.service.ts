import { ai } from "./uiGeneratorGraph"

export class ChatService {
    chat = async ({ userId, chatId, userMessage }: { userId: string, chatId?: string, userMessage: string }) => {
        const { output } = await ai.invoke({
            input: {
                chatId,
                userId,
                userMessage
            }
        })

        return output;
    }
}
