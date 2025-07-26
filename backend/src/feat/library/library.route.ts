import { Router } from 'express';
import { addComponentsController, getRagRecordsController, getUserGeneratedComponentsController } from './library.controller';

const router = Router();

// Route for getting RAG records with pagination
router.get('/library/get-html-rag-records', getRagRecordsController);

// Route for adding components to vector store
router.post('/library/add-to-html-rag', addComponentsController);

// Route for getting user generated components
router.get('/library/get-user-generated-components', getUserGeneratedComponentsController);

export const libraryRoutes = router;
