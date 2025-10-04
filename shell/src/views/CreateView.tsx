import { useEffect, useState } from 'react';
import { ChatArea } from '../features/Chat/Components/ChatArea';
import type { Message } from '../features/Chat/types';
import { useChat } from '../api-hooks/useChat';
import { useChatStream } from '../api-hooks/useChatStream';
import { PreviewArea } from '../features/Chat/Components/PreviewArea';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetChatHistory } from '../features/Chat/hooks/useGetChatHistory';
import { useQueryClient } from '@tanstack/react-query';
import { useGetChatIds } from '../features/Chat/hooks/useGetChatIds';

/**
 * View responsible for the "Create" route. It encapsulates the chat workflow
 * and the preview area that renders the generated HTML.
 */
export const CreateView = () => {
  // Chat & preview state management
  const [messages, setMessages] = useState<Message[]>([]);
  const queryClient = useQueryClient();
  const { chatId: chatIdParam } = useParams();
  const { isPending, mutateAsync: chat } = useChat();
  const { sendMessage: sendStreamMessage, state: streamState } = useChatStream();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState(
    '<h1>Welcome!</h1><p>Your generated HTML preview will appear here.</p>'
  );
  const [chatId, setChatId] = useState<string | undefined>();
  const [useSSE, setUseSSE] = useState(true); // Toggle for SSE vs regular POST

  const { data: chatHistory } = useGetChatHistory(chatIdParam)

  useEffect(()=>{
    if(!chatIdParam){
      setMessages([]);
      setHtmlContent('<h1>Welcome!</h1><p>Your generated HTML preview will appear here.</p>');
      setChatId(undefined);
    }
  },[chatIdParam])

  useEffect(()=>{
    if(chatHistory){
      const messages = chatHistory.messages.map((message)=>{
        const aiMessage: Message = {
          id: message.id,
          sender: message.sender,
          text: message.text,
        };
        return aiMessage;
      })
      setHtmlContent(chatHistory.component);
      setMessages(messages);
      setChatId(chatHistory.chatId);
    }
  }, [chatHistory])


  /**
   * Handler that fires every time the user sends a message from the ChatArea.
   */
  const handleSendMessage = async (text: string) => {
    const isProcessing = isPending || streamState.status === 'streaming' || streamState.status === 'connecting';
    if (isProcessing) return;

    // Push user message optimistically
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'human',
      text,
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      if (useSSE) {
        // Use SSE streaming (new approach)
        await sendStreamMessage(text, chatId);
      } else {
        // Fallback to regular POST
        const { component, message, chatId: newChatId } = await chat({
          message: text,
          chatId,
        });

        // Update preview and chat state
        setHtmlContent(component);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: message,
        };
        setMessages(prev => [...prev, aiMessage]);
        setChatId(newChatId);
        if(newChatId !== chatIdParam){
          navigate(`/chat/${newChatId}`);
          queryClient.invalidateQueries({
            queryKey: useGetChatIds.queryKey
          })
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // On SSE error, try fallback
      if (useSSE) {
        console.log('SSE failed, falling back to regular POST');
        setUseSSE(false);
        // Retry with regular POST
        try {
          const { component, message, chatId: newChatId } = await chat({
            message: text,
            chatId,
          });
          setHtmlContent(component);
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: message,
          };
          setMessages(prev => [...prev, aiMessage]);
          setChatId(newChatId);
          if(newChatId !== chatIdParam){
            navigate(`/chat/${newChatId}`);
            queryClient.invalidateQueries({
              queryKey: useGetChatIds.queryKey
            })
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      }
    }
  };

  // Handle SSE completion
  useEffect(() => {
    if (streamState.status === 'complete' && streamState.result) {
      const { component, message, chatId: newChatId } = streamState.result;
      
      setHtmlContent(component);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: message,
      };
      setMessages(prev => [...prev, aiMessage]);
      setChatId(newChatId);
      
      if(newChatId !== chatIdParam){
        navigate(`/chat/${newChatId}`);
        queryClient.invalidateQueries({
          queryKey: useGetChatIds.queryKey
        })
      }
    }
  }, [streamState.status, streamState.result, chatIdParam, navigate, queryClient]);

  const isProcessing = isPending || streamState.status === 'streaming' || streamState.status === 'connecting';

  return (
    <div className="col-span-2 h-full flex overflow-hidden">
      {/* Chat Area - Left Side */}
      <div className="w-1/2 border-r border-border flex flex-col">
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
          isSending={isProcessing}
          streamState={streamState}
          className="flex-1"
        />
      </div>
      
      {/* Preview Area - Right Side */}
      <div className="w-1/2">
        <PreviewArea htmlContent={htmlContent} isLoading={isProcessing} className="h-full" />
      </div>
    </div>
  );
};
