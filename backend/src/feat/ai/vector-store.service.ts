import 'dotenv/config'
import { LibSQLVectorStore } from "@langchain/community/vectorstores/libsql";
import { OpenAIEmbeddings } from "@langchain/openai";
import { env } from "../../env";
import { createClient } from "@libsql/client";
import { validateComponents } from "./validation";

const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: env.OPENAI_API_KEY
});

const libsqlClient = createClient({
    url: "file:./vectorStore3.db",
});

export const vectorStore = new LibSQLVectorStore(embeddings, {
    db: libsqlClient,
    table: "uiComponents",
    column: "embedding",
});

export const addComponentsToVectorStore = async (components: any) => {
    // Validate components
    const validation = validateComponents(components);
    
    if (!validation.success) {
        if (validation.error) {
            throw new Error(`Validation error: ${validation.error.message}`);
        }
        
        const errorMessages = validation.errors?.map(({ index, errors }) => 
            `Component at index ${index}: ${errors.map(e => e.message).join(', ')}`
        ).join('\n');
        
        throw new Error(`Validation failed for components:\n${errorMessages}`);
    }

    // Prepare documents for vector store
    const documents = validation.data?.map(component => ({
        pageContent: JSON.stringify(component, null, 2),
        metadata: {
            componentId: component.componentId,
            name: component.name,
            sourceDesignSystem: component.sourceDesignSystem,
            tags: component.tags,
            description: component.description,
            category: component.category,
            uxPattern: component.uxPattern,
            visualStyle: component.visualStyle,
            codeType: 'tailwind' in component.code ? 'tailwind' : 'html'
        }
    }));

    try {
        await vectorStore.addDocuments(documents);
        return { success: true, count: documents.length };
    } catch (error) {
        console.error('Error adding components to vector store:', error);
        throw new Error(`Failed to add components to vector store: ${error.message}`);
    }
};