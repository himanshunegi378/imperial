import { LibSQLVectorStore } from "@langchain/community/vectorstores/libsql"
import { OpenAIEmbeddings } from "@langchain/openai"
import { Client, createClient } from "@libsql/client"
import z from "zod"
import fs from "fs/promises"
const createVectorStore = ({ client, embeddings }: { storeName: string, client: Client, embeddings: OpenAIEmbeddings }) => {
    // create a vector store
    client.execute(`CREATE TABLE IF NOT EXISTS vectors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        metadata TEXT,
        embedding F32_BLOB(1536) -- 1536-dimensional f32 vector for OpenAI
    );`)

    client.execute(`CREATE INDEX IF NOT EXISTS idx_vectors_embedding ON vectors(libsql_vector_idx(embedding));
    `)

    const vectorStore = new LibSQLVectorStore(embeddings, {
        db: client,
        table: "vectors",
        column: "embedding",
    })

    return vectorStore;
}


const PATH = "./vectorStores"
export class VectorStore<T extends Record<string, unknown>> {
    storeName: string;
    metadataSchema: z.ZodType<T>;
    store: LibSQLVectorStore;
    client: Client;
    constructor({ storeName, metadataSchema, embeddings }: { storeName: string, metadataSchema: z.ZodType<T>, embeddings: OpenAIEmbeddings }) {
        this.storeName = storeName;
        this.metadataSchema = metadataSchema;
        this.client = this.createClient(storeName)
        this.store = createVectorStore({ storeName, client: this.client, embeddings })
    }

    private createClient = (storeName: string) => {
        return createClient({
            url: `file:${PATH}/${storeName}.db`,
        },)
    }

    addDocuments = async (documents: Array<{ document: string, metadata: T }>) => {
        const parsedDocuments = documents.map(({ document, metadata }) => {
            const parsedMetadata = this.metadataSchema.safeParse(metadata);
            if (!parsedMetadata.success) {
                throw new Error('Invalid metadata');
            }
            return {
                pageContent: document,
                metadata: parsedMetadata.data,
            }
        })
        return this.store.addDocuments(parsedDocuments);
    }

    deleteDocuments = async (documentIds: string[]) => {
        await this.store.delete({ ids: documentIds });
    }

    similaritySearchWithScore = async (query: string, k: number) => {
        return this.store.similaritySearchWithScore(query, k);
    }

    deleteStore = async () => {
        // delete store needs to be fixed its not working properly
        return true;
        await this.store.delete({
            deleteAll: true
        })
        await this.client.close();
        await new Promise(resolve => setImmediate(resolve));

        if (this.client.closed) {
            await fs.unlink(`${PATH}/${this.storeName}.db`);
        } else {
            throw new Error('Client is not closed');
        }
    }

    getRecords = async (lastId: string | null, limit: number) => {
        // Fetch one more record than the limit to check for the existence of a next page
        const fetchLimit = limit + 1;
        let query;
        let params: Array<string | number> = [fetchLimit];

        if (lastId) {
            // If a cursor (lastId) is provided, fetch records with IDs greater than the cursor
            query = `
            SELECT id, content, metadata
            FROM vectors
            WHERE id > ?
            ORDER BY id ASC
            LIMIT ?;
        `;
            params.unshift(lastId); // Add lastId to the beginning of the params array
        } else {
            // For the first page, just fetch the first 'fetchLimit' records
            query = `
            SELECT id, content, metadata
            FROM vectors
            ORDER BY id ASC
            LIMIT ?;
        `;
        }

        try {
            const result = await this.client.execute({
                sql: query,
                args: params,
            });

            // Slice the results to return only the requested 'limit' number of records
            const records = result.rows.slice(0, limit);

            // If the number of rows returned by the query is equal to fetchLimit,
            // it means there's at least one more record beyond the requested 'limit',
            // indicating a next page.
            const hasNextPage = result.rows.length === fetchLimit;

            // The new cursor is the ID of the last record in the *actual* `records` array (after slicing)
            // If there are no records, the newCursor should be null.
            const newCursor = records.length > 0 ? records[records.length - 1].id : null;

            return {
                data: records,
                pagination: {
                    currentCursor: lastId, // The cursor used for this request
                    nextCursor: newCursor, // The cursor for the next page
                    hasNextPage: hasNextPage,
                    itemsPerPage: limit, // The actual limit requested by the user
                },
            };

        } catch (error) {
            console.error("Error fetching records with cursor pagination:", error);
            throw error; // Re-throw the error for the caller to handle
        }
    }
}