import { useState } from 'react';
import { ChatArea } from '../features/Chat/Components/ChatArea';
import type { Message } from '../features/Chat/types';
import { useChat } from '../api-hooks/useChat';
import { PreviewArea } from '../features/Chat/Components/PreviewArea';

/**
 * View responsible for the "Create" route. It encapsulates the chat workflow
 * and the preview area that renders the generated HTML.
 */
export const CreateView = () => {
  // Chat & preview state management
  const [messages, setMessages] = useState<Message[]>([]);
  const { isPending, mutateAsync: chat } = useChat();
  const [htmlContent, setHtmlContent] = useState(
    '<h1>Welcome!</h1><p>Your generated HTML preview will appear here.</p>'
  );
  const [chatId, setChatId] = useState<string | undefined>();

  /**
   * Handler that fires every time the user sends a message from the ChatArea.
   */
  const handleSendMessage = async (text: string) => {
    if (isPending) return;

    // Push user message optimistically
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
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
