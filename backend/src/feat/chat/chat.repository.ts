import { chatHistory, chatHistory, Components } from "../../schema";
import { eq, inArray, desc, and } from "drizzle-orm";
import { db } from '../../db'
import { checkpointer } from "../../config/constants";

export const getChatHistory = async (chatId: string) => {
    const chatHistoryFromDB = (await db.select().from(chatHistory).where(eq(chatHistory.chatId, chatId)));
    return chatHistoryFromDB;
}

export const getAllChatIdsAssociateWithUser = async (userId: string) => {
    const chatIds = await db.select({
        id: chatHistory.id,
        chatId: chatHistory.chatId
    }).from(chatHistory)
      .where(eq(chatHistory.userId, userId))
      .orderBy(desc(chatHistory.id)); // Sort by newest first

    const chatIdsWithName = await Promise.all(chatIds.map(async (chatId) => {
        const component = await getComponent(chatId.chatId);
        return {
            chatId: chatId.chatId,
            name: component.name
        }
    }))
    return chatIdsWithName;
}


export const getComponent = async (chatId: string) => {
    const component = await db.select().from(Components).where(eq(Components.chatId, chatId));

    if (component.length > 0) {
        return component[0];
    }
    return { html: '', name: '' }
}

export const createChatHistory = async (userId: string, chatId: string, message: string) => {
    await db.insert(chatHistory).values({
        userId,
        chatId,
        message
    })
}

export const doesChatHistoryExist = async (chatId: string) => {
    const chatHistoryFromDB = await db.select().from(chatHistory).where(eq(chatHistory.chatId, chatId));
    return chatHistoryFromDB.length > 0;
}

export const saveComponent = async (userId: string, chatId: string, component: string, name: string) => {
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

export const deleteChatHistory = async (chatId: string, userId: string) => {
    // Delete from Components table
    await db.delete(Components).where(and(
        eq(Components.chatId, chatId),
        eq(Components.userId, userId)
    ));
        
    // Delete from chatHistory table
    await db.delete(chatHistory).where(and(
        eq(chatHistory.chatId, chatId),
        eq(chatHistory.userId, userId)
    ));

    checkpointer.db.exec(`DELETE FROM checkpoints WHERE thread_id = '${chatId}'`)
    checkpointer.db.exec(`DELETE FROM writes WHERE thread_id = '${chatId}'`)
        
    return { success: true };
}