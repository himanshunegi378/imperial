import { NextFunction, Request, Response } from "express";
import { chatValidation } from "./chat.validation";
import { AppError, formatSuccess } from "../../core/utils/responseFormatter";
import { ChatErrorDefinitions } from "./chat.error";
import z from "zod";
import { ChatService } from "./chat.service";
import { initSSE, createSSEEmitter, closeSSE, createHeartbeatInterval, sendSSEEvent } from "./sse.utils";

export class ChatController {
    chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
    }


    processMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody = chatValidation.safeParse(req.body);
            if (!validatedBody.success) {
                throw new AppError(ChatErrorDefinitions.INVALID_PAYLOAD, {});
            }
            const { userMessage, chatId } = validatedBody.data;
            const { component, name, message, chatId: _chatId, intentType, editInstructions } = await this.chatService.chat({
                userId: req.user?.userId.toString() || '',  // Using empty string as fallback for type safety
                chatId,
                userMessage
            })
            res.json(formatSuccess({
                chatId: _chatId,
                component,
                name,
                message,
                intentType,           // Include edit mode metadata
                editInstructions      // Include edit instructions
            }));
        } catch (error) {
            next(error);
        }
    }

    getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chatId = req.query.chatId as string;
            if (!chatId) {
                throw new AppError(ChatErrorDefinitions.CHAT_ID_REQUIRED, {});
            }
            const chatHistory = await this.chatService.getChatHistory(chatId);
            
            res.json(formatSuccess({
                chatId,
                component: chatHistory?.output.component,
                name: chatHistory?.output.name,
                messages: chatHistory?.messages.map((message) => ({
                    sender: message.getType(),
                    text: message.content
                })) ?? []
            }));
        } catch (error) {
            next(error);
        }
    }

    getAllChatIdsAssociateWithUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId.toString() || '';  // Using empty string as fallback for type safety
            const chatIdList = await this.chatService.getAllChatIdsAssociateWithUser(userId);
            res.json(formatSuccess(chatIdList));
        } catch (error) {
            next(error);
        }
    }

    deleteChatHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chatId = req.params.chatId;
            const userId = req.user?.userId.toString() || '';  // Using empty string as fallback for type safety
            
            if (!chatId) {
                throw new AppError(ChatErrorDefinitions.CHAT_ID_REQUIRED, {});
            }
            
            const result = await this.chatService.deleteChatHistory(chatId, userId);
            if(result.success) {
                res.json(formatSuccess(result));
            } else {
                throw new AppError(ChatErrorDefinitions.CHAT_HISTORY_DELETE_FAILED, {});
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * SSE endpoint for streaming chat responses
     */
    processMessageStream = async (req: Request, res: Response, next: NextFunction) => {
        console.log('SSE Endpoint called');

        // Initialize SSE connection
        initSSE(res);
        
        // IMPORTANT: Check if connection is still open
        if (req.destroyed || res.writableEnded) {
            console.log('Connection already closed, aborting');
            return;
        }
        
        // Set up heartbeat interval
        const stopHeartbeat = createHeartbeatInterval(res, 20000);
        
        // Set up cleanup on client disconnect
        req.on('close', () => {
            console.log('--- Client disconnected from SSE ---');
            stopHeartbeat();
            closeSSE(res);
        });

        try {
            // Handle both POST (body) and GET (query) requests
            let userMessage: string;
            let chatId: string | undefined;

            if (req.method === 'GET') {
                // For EventSource GET requests, get data from query parameters
                userMessage = req.query.userMessage as string;
                chatId = req.query.chatId as string;
                
                if (!userMessage) {
                    sendSSEEvent(res, 'error', {
                        message: 'userMessage query parameter is required',
                        step: 'validation'
                    });
                    stopHeartbeat();
                    closeSSE(res);
                    return;
                }
            } else {
                // For POST requests, validate body
                const validatedBody = chatValidation.safeParse(req.body);
                if (!validatedBody.success) {
                    sendSSEEvent(res, 'error', {
                        message: 'Invalid request payload',
                        step: 'validation',
                        details: validatedBody.error
                    });
                    stopHeartbeat();
                    closeSSE(res);
                    return;
                }
                ({ userMessage, chatId } = validatedBody.data);
            }
            const userId = req.user?.userId.toString() || '';

            if (!userId) {
                sendSSEEvent(res, 'error', {
                    message: 'User authentication required',
                    step: 'authentication'
                });
                stopHeartbeat();
                closeSSE(res);
                return;
            }

            // Create SSE emitter
            const emitEvent = createSSEEmitter(res);

            // Process chat with streaming
            await this.chatService.chatStream({
                userId,
                chatId,
                userMessage,
                emitEvent
            });

            // Clean up and close connection
            stopHeartbeat();
            closeSSE(res);

        } catch (error) {
            console.error('--- Error in SSE chat stream ---', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            
            sendSSEEvent(res, 'error', {
                message: errorMessage,
                step: 'processing',
                details: error
            });
            
            stopHeartbeat();
            closeSSE(res);
        }
    }
}
