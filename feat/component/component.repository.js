import { db } from "../../db.js";
import { Components } from "../../schema.js";
import { eq } from "drizzle-orm";

export const getAllComponents = async (sessionId) => {
    const components = await db.select().from(Components).where(eq(Components.userId, sessionId));
    return components;
}