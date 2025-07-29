import { VectorStore } from '../feat/vectorStore/vectorStore.service';
import { z } from 'zod';
import { OpenAIEmbeddings } from '@langchain/openai';
import { env } from '../env';
import { SqliteSaver } from '@langchain/langgraph-checkpoint-sqlite';

const codeSchema = z.union([
    z.object({
        tailwind: z.string().min(1, 'Tailwind code is required')
    }),
    z.object({
        html: z.string().min(1, 'HTML code is required')
    })
]);
export const componentSchema = z.object({
    componentId: z.string().min(1, 'Component ID is required'),
    name: z.string().min(1, 'Name is required'),
    sourceDesignSystem: z.string().min(1, 'Source design system is required'),
    tags: z.array(z.string()).min(1, 'At least one tag is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    uxPattern: z.string().min(1, 'UX pattern is required'),
    visualStyle: z.array(z.string()).min(1, 'At least one visual style is required'),
    code: codeSchema
});

export const uiVectorStore = new VectorStore({
    storeName: 'html-code',
    metadataSchema: componentSchema,
    embeddings: new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: env.OPENAI_API_KEY
    }),
})


export const checkpointer = SqliteSaver.fromConnString("langraph-checkpoint.db");