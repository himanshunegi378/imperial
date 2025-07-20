import { useEffect, useRef, useState } from "react";
import type { Message } from "../types";


const ChatBubble = ({ sender, text }: Omit<Message, 'id'>) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-lg max-w-xl shadow ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

const ChatInput = ({ onSend, isDisabled }: { onSend: (message: string) => void, isDisabled: boolean }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 border-t border-gray-200 bg-white">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isDisabled}
        placeholder={isDisabled ? 'AI is responding...' : 'Type your message...'}
        className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export const ChatArea = ({ messages, onSendMessage, isSending, className }: { messages: Message[], onSendMessage: (message: string) => void, isSending: boolean, className?: string }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col bg-amber-100 ${className}`}>
      {/* Chat History */}
      <div className="flex-grow p-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} sender={msg.sender} text={msg.text} />
        ))}
         <div ref={chatEndRef} />
      </div>
      {/* Message Input */}
      <ChatInput onSend={onSendMessage} isDisabled={isSending} />
    </div>
  );
};