import { useState } from "react";
import { ChatMessage, createChatCompletion } from "@/integrations/openrouter/client";

export type UseChatOptions = {
  initialMessages?: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  onChunk?: (chunk: ChatMessage) => void;
};

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(options.initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Add user message to chat
      const userMessage: ChatMessage = { role: "user", content };
      setMessages((prev) => [...prev, userMessage]);

      // Get AI response
      const response = await createChatCompletion([...messages, userMessage], {
        model: options.model,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
        stream: options.stream,
        onChunk: options.onChunk,
      });

      // Add AI response to chat
      if (response) {
        setMessages((prev) => [...prev, response as ChatMessage]);
      }
      
      // Return the response so it can be used by the caller
      return response;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}