import { Request, Response, NextFunction } from 'express';
import { AppError, formatSuccess } from '../../core/utils/responseFormatter';
import { LibraryErrorDefinitions } from './library.error';
import { addLibraryComponents, getLibraryRecords, getUserGeneratedComponents } from './library.service';
import { addComponentsSchema, getRagRecordsSchema, getUserGeneratedComponentsSchema } from './library.validation';

/**
 * Get RAG records with pagination
 * @param req - Express request object
 * @param res - Express response object
 */
export const getRagRecordsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedQuery = getRagRecordsSchema.safeParse(req.query);

        if (!validatedQuery.success) {
            throw new AppError(LibraryErrorDefinitions.INVALID_PAYLOAD, {
                errors: validatedQuery.error.format()
            });
        }

        const { lastId, limit } = validatedQuery.data;
        // Convert lastId to null if it's a string
        const lastIdParam = lastId === undefined ? undefined : null;
        const records = await getLibraryRecords(lastIdParam, limit);

        res.json(formatSuccess({ records: records.data, pagination: records.pagination }));
    } catch (error) {
        next(error);
    }
};

/**
 * Add components to the vector store
 * @param req - Express request object
 * @param res - Express response object
 */
export const addComponentsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = addComponentsSchema.safeParse(req.body);

        if (!validatedBody.success) {
            throw new AppError(LibraryErrorDefinitions.INVALID_PAYLOAD, {
                errors: validatedBody.error.format()
            });
        }

        const { components } = validatedBody.data;
        const result = await addLibraryComponents(components);

        res.json(formatSuccess(result));
    } catch (error) {
        next(error);
    }
};

export const getUserGeneratedComponentsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = getUserGeneratedComponentsSchema.safeParse({userId: req.cookies['sessionId']});

        if (!validatedBody.success) {
            throw new AppError(LibraryErrorDefinitions.INVALID_PAYLOAD, {
                errors: validatedBody.error.format()
            });
        }

        const { userId } = validatedBody.data;
        const result = await getUserGeneratedComponents(userId);

        res.json(formatSuccess(result));
    } catch (error) {
        next(error);
    }
};

