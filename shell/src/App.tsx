import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import type { Message } from './features/Chat/types';
import { ChatArea } from './features/Chat/Components/ChatArea';
import { SideBar } from './features/Sidebar/Component/Sidebar';
import type { NavItem } from './features/Sidebar/types/NavItem';
import useSessionId from './api-hooks/useSessionId';
import { useChat } from './api-hooks/useChat';





// ## 3. Preview Area Component
// =================================================

const PreviewArea = ({ htmlContent, isLoading, className }: { htmlContent: string, isLoading: boolean, className?: string }) => {
  // Injects Tailwind CSS and a basic template into the iframe for proper styling
  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style> body { font-family: sans-serif; } </style>
      </head>
      <body class="p-4 bg-white text-gray-900">
        ${htmlContent}
      </body>
    </html>
  `;

  return (
    <div className={`relative bg-gray-50 ${className} ${isLoading ? 'opacity-50' : ''}`}>
      <iframe
        srcDoc={iframeContent}
        title="AI Generated Preview"
        className="w-full h-full border-none"
        sandbox="allow-scripts" // Be cautious with sandbox attributes based on security needs
      />
    </div>
  );
};

// ## 4. Main App Component with State Management
// =================================================

function App() {
  useSessionId();
  // State Management
  const [messages, setMessages] = useState<Message[]>([
  ]);
  const { isPending, mutateAsync: chat } = useChat()
  const [htmlContent, setHtmlContent] = useState('<h1>Welcome!</h1><p>Your generated HTML preview will appear here.</p>');
  const [activeNavId, setActiveNavId] = useState('create');
  const [chatId, setChatId] = useState();

  // Data Flow and Handlers
  const handleNavClick = (id: string) => {
    setActiveNavId(id);
    // Add logic here for routing or view changes
    console.log(`Navigating to: ${id}`);
  };

  const handleSendMessage =async (text: string) => {
    if (isPending) return;
    // 1. Add user message to state & set loading
    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    const { component, name, message, chatId:newChatId } = await chat({
      message: text,
      chatId
    })
    setHtmlContent(component)
    const aiMessage: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: message };
    setMessages(prev => [...prev, aiMessage]);
    setChatId(newChatId)

  };

  // Sidebar navigation items configuration
  const navItems: NavItem[] = [
    { id: 'create', label: 'Create', icon: '📝', onClick: handleNavClick, isActive: activeNavId === 'create' },
    { id: 'library', label: 'Library', icon: '🖼️', onClick: handleNavClick, isActive: activeNavId === 'library' },
  ];

  return (
    <>
      {/* Use the flexible grid layout from the technical design */}
      <div className='grid grid-cols-[256px_1fr_1.5fr] h-screen w-screen overflow-hidden'>
        <SideBar navItems={navItems} />
        <ChatArea messages={messages} onSendMessage={handleSendMessage} isSending={isPending} />
        <PreviewArea htmlContent={htmlContent} isLoading={isPending} />
      </div>
    </>
  );
}

export default App;