import { chatHistory, Components } from "../../schema";
import { eq } from "drizzle-orm";
import {db} from '../../db'

export const getChatHistory = async (chatId:string) => {
    const chatHistoryFromDB = (await db.select().from(chatHistory).where(eq(chatHistory.chatId, chatId)));
    return chatHistoryFromDB;
}


export const getComponent = async (chatId:string) => {
    const component = await db.select().from(Components).where(eq(Components.chatId, chatId));

    if (component.length > 0) {
        return component[0];
    }
    return { html: '', name: '' }
}

export const saveMessage = async (userId:string, chatId:string, message:string) => {
    await db.insert(chatHistory).values({
        userId,
        chatId,
        message
    })
}

export const saveComponent = async (userId:string, chatId:string, component:string, name:string) => {
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