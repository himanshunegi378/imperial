import { Annotation, MessagesAnnotation } from "@langchain/langgraph"
import z from "zod"

// Define a schema for our new plan object
export const PlanSchema = z.object({
    features: z.array(z.string()).describe("A list of key functional elements or components required."),
    designNotes: z.array(z.string()).describe("A list of stylistic instructions, animations, or design language interpretations (e.g., what '3D' means)."),
    enhancedPrompt: z.string().describe("A rewritten, detailed prompt for the UI generation model, incorporating the identified features and design notes.")
});


export const graphState = Annotation.Root({
    input: Annotation<{
        userId: string,
        chatId: string,
        userMessage: string
    }>,
    output: Annotation<{
        name: string,
        component: string,
        message: string,
        chatId: string
    }>,
    plan: Annotation<z.infer<typeof PlanSchema>>(),

    validation: Annotation<{
        isValid: boolean,
        feedback: string,
        score: number,
    }>(),
    ...MessagesAnnotation.spec
})