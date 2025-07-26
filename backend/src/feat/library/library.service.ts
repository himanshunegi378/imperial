import { getRecords } from '../rag/rag.repository';
import { addComponentsToVectorStore } from '../ai/vector-store.service';
import { AppError } from '../../core/utils/responseFormatter';
import { LibraryErrorDefinitions } from './library.error';
import { uiVectorStore } from '../../config/constants';
import { validateComponents } from './library.validation';
import { db } from '../../db';
import { Components } from '../../schema';
import { eq } from 'drizzle-orm';

/**
 * Get RAG records with pagination
 * @param lastId - Last ID for pagination
 * @param limit - Number of records to return
 * @returns Array of RAG records
 */
export const getLibraryRecords = async (lastId: null | undefined = null, limit: number = 10) => {
    return uiVectorStore.getRecords(lastId, limit)
};

/**
 * Add components to the vector store
 * @param components - Array of components to add
 * @returns Result of adding components
 */
export const addLibraryComponents = async (components: any[]) => {
    if (!Array.isArray(components) || components.length === 0) {
        throw new AppError(LibraryErrorDefinitions.COMPONENTS_REQUIRED, {});
    }

    const validation = validateComponents(components);

    if (!validation.success) {
        const errorMessages = validation.errors?.map(({ index, error }) =>
            `Component at index ${index}: ${error}`
        ).join('\n');

        throw new AppError(LibraryErrorDefinitions.INVALID_COMPONENTS, { errorMessages });
    }

    // Prepare documents for vector store
    const documents = validation.data?.map(component => ({
        document: JSON.stringify(component, null, 2),
        metadata: {
            componentId: component.componentId,
            name: component.name,
            sourceDesignSystem: component.sourceDesignSystem,
            tags: component.tags,
            description: component.description,
            category: component.category,
            uxPattern: component.uxPattern,
            visualStyle: component.visualStyle,
            code: component.code
        }
    }));

    try {
        await uiVectorStore.addDocuments(documents);
        return { success: true, count: documents.length };
    } catch (error) {
        console.error('Error adding components to vector store:', error);
        throw new AppError(LibraryErrorDefinitions.FAILED_TO_ADD_COMPONENTS, {});
    }
}

export const getUserGeneratedComponents = async (userId: string) => {
    const components = await db.select().from(Components).where(eq(Components.userId, userId));
    return components;
}
