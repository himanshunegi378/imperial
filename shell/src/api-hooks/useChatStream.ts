import { useState, useCallback, useRef } from 'react';
import { EventSource } from 'eventsource';
import axiosInstance from '../axiosInstance';
import { getToken } from '../features/auth/utils/tokenStorage';

export interface SSEEventData {
  started: { chatId: string };
  generating: { mode: 'CREATE' | 'EDIT' };
  complete: { 
    component: string; 
    name: string; 
    message: string; 
    chatId: string; 
    intentType?: string; 
    editInstructions?: any 
  };
  error: { message: string; step: string; details?: any };
  heartbeat: { timestamp: number };
}

export type ChatStreamStatus = 'idle' | 'connecting' | 'streaming' | 'complete' | 'error';

export interface ChatStreamState {
  status: ChatStreamStatus;
  currentStep: string;
  progress: number;
  result: SSEEventData['complete'] | null;
  error: string | null;
}

export interface UseChatStreamReturn {
  sendMessage: (message: string, chatId?: string) => Promise<void>;
  state: ChatStreamState;
  cancel: () => void;
}

const STEP_MESSAGES: Record<string, string> = {
  started: '🚀 Starting chat processing...',
  generating: '🎨 Creating your component...',
  complete: '✨ Complete!',
  error: '❌ Error occurred'
};

/**
 * React hook for managing SSE-based chat streaming
 * Provides real-time progress updates during chat message processing
 */
export const useChatStream = (): UseChatStreamReturn => {
  const [state, setState] = useState<ChatStreamState>({
    status: 'idle',
    currentStep: '',
    progress: 0,
    result: null,
    error: null
  });

  const eventSourceRef = useRef<EventSource | null>(null);

  /**
   * Cancel ongoing request
   */
  const cancel = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setState(prev => ({
      ...prev,
      status: 'idle',
      currentStep: '',
      progress: 0
    }));
  }, []);

  /**
   * Send a message and stream the response
   */
  const sendMessage = useCallback(async (message: string, chatId?: string) => {
    // Cancel any ongoing request
    cancel();

    setState({
      status: 'connecting',
      currentStep: 'Connecting...',
      progress: 0,
      result: null,
      error: null
    });

    try {
      // Get auth token from localStorage
      const token = getToken();
      
      if (!token) {
        throw new Error('Authentication token not found. Please login first.');
      }

      // Create URL with token as query parameter since EventSource doesn't support custom headers
      const baseUrl = axiosInstance.defaults.baseURL;
      const params = new URLSearchParams({
        userMessage: message,
        ...(chatId && { chatId }),
        token: token
      });
      
      const eventSourceUrl = `${baseUrl}/chat/stream?${params.toString()}`;
      
      console.log('📡 Connecting to EventSource:', eventSourceUrl);

      // Create EventSource instance (authentication handled via query parameter)
      const eventSource = new EventSource(eventSourceUrl);

      // Store reference for cleanup
      eventSourceRef.current = eventSource;

      // Set up event listeners
      eventSource.onopen = () => {
        console.log('✅ EventSource connection opened');
        setState(prev => ({ ...prev, status: 'streaming' }));
      };

      eventSource.onerror = (error: any) => {
        console.error('❌ EventSource error:', error);
        setState(prev => ({
          ...prev,
          status: 'error',
          currentStep: STEP_MESSAGES.error,
          error: 'Connection failed or lost'
        }));
        
        // Clean up
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      };

      // Set up specific event listeners for each SSE event type
      Object.keys(STEP_MESSAGES).forEach(eventType => {
        eventSource.addEventListener(eventType, (event: any) => {
          try {
            const data = JSON.parse(event.data);
            console.log(`SSE Event: ${eventType}`, data);
            handleSSEEvent(eventType, data);
          } catch (e) {
            console.error(`Failed to parse SSE data for ${eventType}:`, e);
          }
        });
      });

      // Handle heartbeat events
      eventSource.addEventListener('heartbeat', (event: any) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Heartbeat received:', data);
        } catch (e) {
          console.error('Failed to parse heartbeat data:', e);
        }
      });

    } catch (error: any) {
      console.error('EventSource Error:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        currentStep: STEP_MESSAGES.error,
        error: error.message || 'Failed to connect to server'
      }));
    }
  }, []);

  /**
   * Handle individual SSE events
   */
  const handleSSEEvent = useCallback((eventType: string, data: any) => {
    console.log(`SSE Event: ${eventType}`, data);

    switch (eventType) {
      case 'started':
        setState(prev => ({
          ...prev,
          currentStep: STEP_MESSAGES.started,
          progress: 25
        }));
        break;

      case 'generating':
        setState(prev => ({
          ...prev,
          currentStep: STEP_MESSAGES.generating,
          progress: 75
        }));
        break;

      case 'complete':
        setState(prev => ({
          ...prev,
          status: 'complete',
          currentStep: STEP_MESSAGES.complete,
          progress: 100,
          result: data
        }));
        
        // Clean up EventSource connection
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
        break;

      case 'error':
        setState(prev => ({
          ...prev,
          status: 'error',
          currentStep: `${STEP_MESSAGES.error} at ${data.step}`,
          error: data.message
        }));
        
        // Clean up EventSource connection
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
        break;

      case 'heartbeat':
        // Just log heartbeats, don't update UI
        console.log('Heartbeat received');
        break;

      default:
        console.warn(`Unknown SSE event type: ${eventType}`);
    }
  }, []);

  return {
    sendMessage,
    state,
    cancel
  };
};

