import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import express, { NextFunction, Request, Response } from "express";
import { env } from './env';
import { chatRoutes } from './feat/chat/chat.route';
import { libraryRoutes } from './feat/library/library.route';
import { authRoutes } from "./feat/auth/auth.route";
import { userRoutes } from "./feat/auth/user/user.route";
import { AppError } from "./core/utils/responseFormatter";
import { ErrorDefinition } from "./@types/error.types";
import z from "zod";


const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://imperial.timercards.com', 'https://www.imperial.timercards.com'],
    credentials: true
}));
app.use(express.json({
    limit: '1mb'
}));
app.use(cookieParser());

app.get('/create-session', (req, res) => {
    // get session id from cookies
    const sessionId = req.cookies['sessionId'];
    if (sessionId) {
        res.json({ sessionId });
    } else {
        // create session id for infinite session
        const sessionId = Math.random().toString(36).substring(2, 15);
        const maxAge400Days = 400 * 24 * 60 * 60 * 1000; // 400 days in milliseconds
        res.cookie('sessionId', sessionId, { maxAge: maxAge400Days });
        res.json({ sessionId });
    }
})

app.use((req, res, next) => {
    const sessionId = req.cookies['sessionId'];
    if (!sessionId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
})

// Library routes moved to library feature directory

// app.post('/chat', async (req, res) => {
//     const { message: userMessage, chatId } = req.body;
//     const sessionId = req.cookies['sessionId'];
//     const { component, name, message, chatId: _chatId } = await chat({
//         userId: sessionId,
//         chatId,
//         userMessage
//     })

//     res.json({ message, chatId: _chatId, component, name, });
// })

app.use(authRoutes)
app.use(userRoutes)
app.use(chatRoutes)
app.use(libraryRoutes)  

// RAG records route moved to library feature directory


// middleware to handle error 
app.use((err: Error | AppError<ErrorDefinition>, req: Request, res: Response) => {
    
    if(err instanceof AppError) {
        res.status(err.errorDef.httpStatus).json(err.format());
    }else{
        const error = new AppError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong!',
            httpStatus: 500,
            detailsSchema: z.object({})
        });
        res.status(error.errorDef.httpStatus).json(error.format());
    }

    
});

app.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT}`);
});
