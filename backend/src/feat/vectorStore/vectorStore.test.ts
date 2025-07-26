import { VectorStore } from './vectorStore.service';
import { OpenAIEmbeddings } from '@langchain/openai';
import { z } from 'zod';
import { env } from '../../env';


const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: env.OPENAI_API_KEY
});

describe('VectorStore', () => {
    const metadataSchema = z.object({
        id: z.string(),
        type: z.enum(['test']),
    });

    let store: VectorStore<{ id: string; type: 'test' }>;
    const testStoreName = 'test-store';

    beforeEach(() => {
        store = new VectorStore({
            storeName: testStoreName + Date.now(),
            metadataSchema,
            embeddings,
        });
    });

    afterEach(async () => {
        // Clean up the test database file
        try {
            await store.deleteStore();
        } catch (error) {
            console.log('Failed to delete test store', error);
            // Ignore errors if the file doesn't exist
        }
    });

    describe('addDocuments', () => {
        it('should add documents with valid metadata', async () => {
            const documents = [
                { document: 'test document 1', metadata: { id: '1', type: 'test' as const } },
                { document: 'test document 2', metadata: { id: '2', type: 'test' as const } },
            ];

            await expect(store.addDocuments(documents)).resolves.not.toThrow();
        });

        it('should throw error with invalid metadata', async () => {
            // Use type assertion to bypass TypeScript check since we're testing invalid data
            const documents = [
                { document: 'test document', metadata: { id: '1', type: 'invalid' as any } },
            ];

            await expect(store.addDocuments(documents)).rejects.toThrow('Invalid metadata');
        });
    });

    describe('similaritySearchWithScore', () => {
        it('should return matching documents with scores', async () => {
            const documents = [
                { document: 'test document 1', metadata: { id: '1', type: 'test' as const } },
                { document: 'test document 2', metadata: { id: '2', type: 'test' as const } },
            ];

            await store.addDocuments(documents);
            const results = await store.similaritySearchWithScore('test query', 2);

            expect(results.length).toBeLessThanOrEqual(2);
            results.forEach(([doc, score]) => {
                expect(typeof doc.pageContent).toBe('string');
                expect(typeof score).toBe('number');
            });
        });
    });

    describe('deleteDocuments', () => {
        it('should delete documents by ids', async () => {
            const documents = [
                { document: 'test document 1', metadata: { id: '1', type: 'test' as const } },
                { document: 'test document 2', metadata: { id: '2', type: 'test' as const } },
            ];

            const addDocumentsResult = await store.addDocuments(documents);
            const deleteDocumentsResult = await store.deleteDocuments(addDocumentsResult);

            // After deletion, search should return empty array
            const results = await store.similaritySearchWithScore('test query', 2);
            expect(results).toHaveLength(0);
        });
    });

    describe('deleteStore', () => {
        it('should delete the store without errors', async () => {
            await expect(store.deleteStore()).resolves.not.toThrow();
        });
    });
});