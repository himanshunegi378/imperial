import { useEffect, useState } from 'react';
import { ChatArea } from '../features/Chat/Components/ChatArea';
import type { Message } from '../features/Chat/types';
import { useChat } from '../api-hooks/useChat';
import { PreviewArea } from '../features/Chat/Components/PreviewArea';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetChatHistory } from '../features/Chat/hooks/useGetChatHistory';

/**
 * View responsible for the "Create" route. It encapsulates the chat workflow
 * and the preview area that renders the generated HTML.
 */
export const CreateView = () => {
  // Chat & preview state management
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatId: chatIdParam } = useParams();
  const { isPending, mutateAsync: chat } = useChat();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState(
    '<h1>Welcome!</h1><p>Your generated HTML preview will appear here.</p>'
  );
  const [chatId, setChatId] = useState<string | undefined>();

  const { data: chatHistory } = useGetChatHistory(chatIdParam)

  useEffect(()=>{
    if(!chatIdParam){
      setMessages([]);
      setHtmlContent('<h1>Welcome!</h1><p>Your generated HTML preview will appear here.</p>');
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
    if (isPending) return;

    // Push user message optimistically
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'human',
      text,
    };
    setMessages(prev => [...prev, userMessage]);

    // Ask backend to generate component
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
    }
  };

  return (
    <>
      <ChatArea
        messages={messages}
        onSendMessage={handleSendMessage}
        isSending={isPending}
      />
      <PreviewArea htmlContent={htmlContent} isLoading={isPending} />
    </>
  );
};
