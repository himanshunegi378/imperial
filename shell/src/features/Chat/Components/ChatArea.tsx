import { useEffect, useRef, useState } from "react";
import type { Message } from "../types";

// A simple SVG icon for the send button.
const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true" // Decorative icon
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);


const ChatBubble = ({ sender, text }: Omit<Message, 'id'>) => {
  const isUser = sender === 'human';

  return (
    // Animate new bubbles entering the chat for a smoother feel.
    <div className={`flex animate-in fade-in slide-in-from-bottom-4 duration-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xl rounded-2xl px-4 py-2 font-sans shadow-soft-float
          ${
            isUser
              // User bubble: A gentle gradient to feel personal and active.
              ? 'bg-gradient-to-br from-pale-aqua to-muted-lavender text-dark-gray rounded-br-lg'
              // AI bubble: Clean white to appear neutral, intelligent, and part of the background.
              : 'bg-white text-dark-gray rounded-bl-lg'
          }`}
      >
        <p className="leading-snug">{text}</p>
      </div>
    </div>
  );
};


const ChatInput = ({ onSend, isDisabled }: { onSend: (message: string) => void, isDisabled: boolean }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isDisabled) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    // The form container floats above the content with a blurred, translucent background.
    <div className="p-4 bg-soft-white backdrop-blur-sm">
       <form
        onSubmit={handleSubmit}
        // The input and button are grouped in a floating, rounded container.
        className="flex items-center p-1 bg-white rounded-full shadow-soft-float"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isDisabled}
          placeholder={isDisabled ? 'Imperial Intelligence is thinking...' : 'Ask anything...'}
          // The input has no border or background itself, blending into the container.
          // Focus state is a subtle ring within the container.
          className="flex-grow w-full px-4 py-2 text-dark-gray bg-transparent placeholder:text-light-gray focus:outline-none"
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={isDisabled || !inputValue.trim()}
          aria-label="Send message"
          // Button states are handled carefully for a great user experience.
          className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-all duration-300 ease-in-out
            ${isDisabled || !inputValue.trim()
              ? 'bg-muted-lavender cursor-not-allowed' // Disabled state
              : 'bg-calming-blue hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-calming-blue/50 focus:ring-offset-2' // Active states
            }`}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};


export const ChatArea = ({ messages, onSendMessage, isSending, className }: { messages: Message[], onSendMessage: (message: string) => void, isSending: boolean, className?: string }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // Main container uses the base 'soft-white' background.
    <div className={`flex flex-col bg-soft-white font-sans h-screen ${className}`}>
      {/* Chat History */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto md:p-6">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="mt-auto">
        <ChatInput onSend={onSendMessage} isDisabled={isSending} />
      </div>
    </div>
  );
};