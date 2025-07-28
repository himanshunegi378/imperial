import { createClient } from "@libsql/client";

const libsqlClient = createClient({
    url: "file:./vectorStore3.db",
});

/**
 * Get records with cursor based pagination
 * @param {number | null} lastId - The ID of the last record from the previous page. Use null for the first page.
 * @param {number} limit - The number of records to return per page.
 */
export const getRecords = async (lastId = null, limit = 10) => {
    // Fetch one more record than the limit to check for the existence of a next page
    const fetchLimit = limit + 1;
    let query;
    let params = [fetchLimit];

    if (lastId) {
        // If a cursor (lastId) is provided, fetch records with IDs greater than the cursor
        query = `
            SELECT id, content, metadata
            FROM uiComponents
            WHERE id > ?
            ORDER BY id ASC
            LIMIT ?;
        `;
        params.unshift(lastId); // Add lastId to the beginning of the params array
    } else {
        // For the first page, just fetch the first 'fetchLimit' records
        query = `
            SELECT id, content, metadata
            FROM uiComponents
            ORDER BY id ASC
            LIMIT ?;
        `;
    }

    try {
        const result = await libsqlClient.execute({
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
};