import { Annotation, MessagesAnnotation } from "@langchain/langgraph"

/**
 * Simplified Graph State Schema
 * 
 * Cleaned up after removing deconstruction and validation nodes.
 * Now only contains essential fields for intent detection, generation, and edit mode.
 */
export const graphState = Annotation.Root({
    // Input from user
    input: Annotation<{
        userId: string,
        chatId: string,
        userMessage: string
    }>,
    
    // Generated output
    output: Annotation<{
        name: string,
        component: string,
        message: string,
        chatId: string
    }>,
    
    // Edit mode support fields
    previousComponent: Annotation<string | null>({
        reducer: (prev, next) => next ?? prev,
        default: () => null
    }),
    
    intentType: Annotation<'CREATE' | 'EDIT'>({
        reducer: (prev, next) => next ?? prev,
        default: () => 'CREATE'
    }),
    
    editInstructions: Annotation<{
        targetElements: string[];
        reasoning: string;
    } | null>({
        reducer: (prev, next) => next ?? prev,
        default: () => null
    }),
    
    // Message history
    ...MessagesAnnotation.spec
})