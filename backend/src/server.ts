import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import express from "express";
import { env } from './env';
import { chatRoutes } from './feat/chat/chat.route';
import { libraryRoutes } from './feat/library/library.route';


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

app.use(chatRoutes)
app.use(libraryRoutes)

// RAG records route moved to library feature directory

app.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT}`);
});
