import { db } from "../../db";
import { Components } from "../../schema";
import { and, eq, inArray } from "drizzle-orm";


export const deleteComponents = async (userId: string, componentIds: number[]) => {
    return db.delete(Components).where(and(eq(Components.userId, userId), inArray(Components.id, componentIds)));
}

export const hideComponentsForUser = async (userId: string, componentIds: number[]) => {
    return db.update(Components).set({ hideFromLibrary: true }).where(and(eq(Components.userId, userId), inArray(Components.id, componentIds)));
}