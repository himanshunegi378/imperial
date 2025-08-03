import { Router } from 'express';
import { addComponentsController, deleteUserGeneratedComponentsController, getRagRecordsController, getUserGeneratedComponentsController } from './library.controller';
import { authenticateJWT } from '../auth/common/auth.middleware';

const router = Router();

// Route for getting RAG records with pagination
router.get('/library/get-html-rag-records', authenticateJWT, getRagRecordsController);

// Route for adding components to vector store
router.post('/library/add-to-html-rag', authenticateJWT, addComponentsController);

// Route for getting user generated components
router.get('/library/get-user-generated-components', authenticateJWT, getUserGeneratedComponentsController);

router.delete('/library/delete-user-generated-components', authenticateJWT, deleteUserGeneratedComponentsController)

export const libraryRoutes = router;
