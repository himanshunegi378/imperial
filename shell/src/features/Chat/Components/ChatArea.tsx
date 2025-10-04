import { useEffect, useRef, useState, useCallback } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "../types";
import { ProgressIndicator } from "./ProgressIndicator";
import type { ChatStreamState } from "@/api-hooks/useChatStream";

// Chat bubble component using shadcn/ui Card
const ChatBubble = ({ sender, text }: Omit<Message, 'id'>) => {
  const isUser = sender === 'human';

  return (
    <div className={`flex animate-in fade-in slide-in-from-bottom-4 duration-300 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <Card 
        className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] chat-bubble ${
          isUser 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'bg-muted border-muted-foreground/20'
        }`}
      >
        <CardContent className="p-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {text}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Chat input component with improved UX
const ChatInput = ({ 
  onSend, 
  isDisabled 
}: { 
  onSend: (message: string) => void; 
  isDisabled: boolean;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isDisabled) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 chat-input-container">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            placeholder={isDisabled ? 'Imperial Intelligence is thinking...' : 'Ask anything...'}
            className="flex-1 min-h-[44px] text-base"
            aria-label="Chat message input"
            autoComplete="off"
            autoFocus
          />
          <Button
            type="submit"
            disabled={isDisabled || !inputValue.trim()}
            size="icon"
            className="h-[44px] w-[44px] shrink-0"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

// Main ChatArea component with proper scrolling
export const ChatArea = ({ 
  messages, 
  onSendMessage, 
  isSending, 
  streamState,
  className 
}: { 
  messages: Message[]; 
  onSendMessage: (message: string) => void; 
  isSending: boolean;
  streamState?: ChatStreamState;
  className?: string;
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // Check if user is at the bottom of the chat
  const isAtBottom = useCallback(() => {
    if (!viewportRef.current) return true;
    
    const { scrollTop, scrollHeight, clientHeight } = viewportRef.current;
    const threshold = 50; // 50px threshold for "at bottom"
    return scrollHeight - scrollTop - clientHeight < threshold;
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (shouldAutoScroll && !isUserScrolling) {
      const timeoutId = setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
      }, 100); // Small delay to ensure DOM is updated
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages, shouldAutoScroll, isUserScrolling]);

  // Handle scroll events to detect user scrolling
  const handleScroll = useCallback(() => {
    if (!isUserScrolling) {
      setIsUserScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Reset user scrolling flag after a delay
      const timeoutId = setTimeout(() => {
        setIsUserScrolling(false);
      }, 150);
      
      setScrollTimeout(timeoutId);
    }
  }, [isUserScrolling, scrollTimeout]);

  // Update auto-scroll behavior based on scroll position
  useEffect(() => {
    if (viewportRef.current) {
      const isBottom = isAtBottom();
      setShouldAutoScroll(isBottom);
    }
  }, [isAtBottom]);

  // Scroll to bottom function (can be called externally)
  const scrollToBottom = useCallback(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
      setShouldAutoScroll(true);
      setIsUserScrolling(false);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <div className={`chat-layout chat-container ${className}`}>
      {/* Chat Messages Area with proper scrolling */}
      <div className="chat-messages relative">
        <ScrollArea 
          ref={scrollAreaRef}
          className="h-full w-full chat-scrollbar"
          onScroll={handleScroll}
        >
          <div 
            ref={viewportRef}
            className="p-4 space-y-4 min-h-full chat-scroll-area"
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center space-y-2">
                  <div className="text-2xl">💬</div>
                  <p className="text-sm">Start a conversation with Imperial Intelligence</p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <ChatBubble 
                    key={msg.id} 
                    sender={msg.sender} 
                    text={msg.text} 
                  />
                ))}
                
                {/* Show progress indicator when streaming */}
                {streamState && streamState.status !== 'idle' && streamState.status !== 'complete' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <ProgressIndicator state={streamState} />
                  </div>
                )}
              </>
            )}
            
            {/* Invisible element at bottom for proper scrolling */}
            <div className="h-4" />
          </div>
        </ScrollArea>
        
        {/* Scroll to bottom button when not at bottom */}
        {!shouldAutoScroll && messages.length > 0 && (
          <Button
            onClick={scrollToBottom}
            size="sm"
            className="absolute bottom-4 right-4 h-8 w-8 rounded-full shadow-lg z-10 hover:scale-105 transition-transform"
            aria-label="Scroll to bottom"
          >
            <Send className="h-3 w-3 rotate-180" />
          </Button>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput onSend={onSendMessage} isDisabled={isSending} />
    </div>
  );
};