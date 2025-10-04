/**
 * Server-Sent Events Utilities
 * 
 * Helper functions for formatting and sending SSE events from Express endpoints.
 * Follows the SSE specification: event name + data in JSON format.
 */

import { Response } from 'express';

/**
 * SSE Event Types for Chat Workflow
 */
export type SSEEventType = 
  | 'started'
  | 'generating'
  | 'idlechat'
  | 'complete'
  | 'error'
  | 'heartbeat';

/**
 * SSE Event Data Payloads
 */
export interface SSEEventData {
  started: { chatId: string };
  generating: { mode: 'CREATE' | 'EDIT' };
  idlechat: { message: string };
  complete: { component: string; name: string; message: string; chatId: string; intentType?: string; editInstructions?: any };
  error: { message: string; step: string; details?: any };
  heartbeat: { timestamp: number };
}

/**
 * Initialize SSE response with appropriate headers
 */
export function initSSE(res: Response): void {
  console.log('🔧 Initializing SSE connection...');
  
  // Prevent response from timing out
  res.socket?.setTimeout(0);
  console.log('✓ Socket timeout disabled');
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  console.log('✓ Headers set');
  
  // Ensure response stays open
  res.status(200);
  console.log('✓ Status 200 set');
  
  // Check if response is writable before writing
  if (!res.writable) {
    console.error('❌ Response is not writable!');
    return;
  }
  console.log('✓ Response is writable');
  
  // Send initial comment to establish connection
  // const writeSuccess = res.write(': SSE connection established\n\n');
  // console.log('✓ Initial write result:', writeSuccess);
  
  // Force flush (critical!)
  if ('flush' in res && typeof res.flush === 'function') {
    (res as any).flush();
    console.log('✓ Response flushed');
  }
  
  console.log('✅ SSE initialization complete');
}

/**
 * Send an SSE event to the client
 */
export function sendSSEEvent<T extends SSEEventType>(
  res: Response,
  eventType: T,
  data: SSEEventData[T]
): boolean {
  try {
    if (!res.writable) {
      console.error(`❌ Cannot send ${eventType}: Response not writable`);
      return false;
    }
    
    const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
    console.log(`📤 Sending SSE event: ${eventType}`, data);
    
    const writeSuccess = res.write(payload);
    console.log(`${writeSuccess ? '✅' : '⚠️'} Write result for ${eventType}:`, writeSuccess);
    
    return writeSuccess;
  } catch (error) {
    console.error(`Failed to send SSE event: ${eventType}`, error);
    return false;
  }
}

/**
 * Send a heartbeat to keep the connection alive
 */
export function sendHeartbeat(res: Response): boolean {
  return sendSSEEvent(res, 'heartbeat', { timestamp: Date.now() });
}

/**
 * Close SSE connection gracefully
 */
export function closeSSE(res: Response): void {
  try {
    res.end();
  } catch (error) {
    console.error('Error closing SSE connection:', error);
  }
}

/**
 * Create a heartbeat interval that sends periodic heartbeats
 * Returns cleanup function to clear the interval
 */
export function createHeartbeatInterval(
  res: Response,
  intervalMs: number = 20000
): () => void {
  const intervalId = setInterval(() => {
    const sent = sendHeartbeat(res);
    if (!sent) {
      clearInterval(intervalId);
    }
  }, intervalMs);

  return () => clearInterval(intervalId);
}

/**
 * Event emitter callback type for LangGraph nodes
 */
export type SSEEmitter = <T extends SSEEventType>(
  eventType: T,
  data: SSEEventData[T]
) => void;

/**
 * Create an SSE emitter function bound to a specific response
 */
export function createSSEEmitter(res: Response): SSEEmitter {
  return <T extends SSEEventType>(eventType: T, data: SSEEventData[T]) => {-
    // Log SSE event emission for debugging and traceability
    console.log(`[SSE] Emitting event: ${eventType}`, data);
    sendSSEEvent(res, eventType, data);
  };
}

/**
 * Wrap async operation with error handling and SSE error emission
 */
export async function withSSEErrorHandling<T>(
  res: Response,
  step: string,
  operation: () => Promise<T>
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    sendSSEEvent(res, 'error', {
      message: errorMessage,
      step,
      details: error
    });
    closeSSE(res);
    return null;
  }
}


