import {GoogleGenAI} from '@google/genai';

// Check if we're in a browser environment
const GOOGLE_AI_API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY

if (!GOOGLE_AI_API_KEY) {
  console.error("Missing Google AI API key in environment variables");
  throw new Error("Google AI API key is not set. Please check your .env file and ensure VITE_GOOGLE_AI_API_KEY is properly configured.");
}

const genAI = new GoogleGenAI({ apiKey: GOOGLE_AI_API_KEY });

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatCompletionOptions = {
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  stream?: boolean;
  onChunk?: (chunk: ChatMessage) => void;
};

export async function createChatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
) {
  const {
    model = "gemini-2.0-flash",
    temperature = 0.7,
    maxOutputTokens = 8192,
    stream = false,
    onChunk
  } = options;

  try {
    const startTime = Date.now();
    console.log("[Google AI] Request:", { model, messages, options });

    const chat = genAI.chats.create({
      model,
      config: {
        temperature,
        maxOutputTokens,
      }
    });

    // Process system message first if exists
    const systemMessage = messages.find(msg => msg.role === "system");
    if (systemMessage) {
      await chat.sendMessage({
        message: systemMessage.content
      });
    }

    // Add remaining messages to chat history
    for (const msg of messages) {
      if (msg.role !== "system") {
        if (stream && onChunk) {
          const response = await chat.sendMessageStream({
            message: msg.content
          });

          let fullContent = "";
          try {
            for await (const chunk of response) {
              if (chunk && chunk.text) {
                const chunkText = chunk.text.trim();
                if (chunkText) {
                  fullContent += chunkText;
                  onChunk({ role: 'assistant', content: chunkText });
                  console.log("[Google AI] Chunk received:", { chunkText });
                }
              }
            }
          } catch (streamError) {
            console.error("[Google AI] Stream error:", streamError);
            throw streamError;
          }

          const duration = Date.now() - startTime;
          const result = {
            role: "assistant",
            content: fullContent.trim()
          };
          console.log("[Google AI] Stream completed:", {
            duration: `${duration}ms`,
            model,
            messageLength: fullContent.length,
            response: result
          });

          return result;
        } else {
          const response = await chat.sendMessage({
            message: msg.content
          });

          const content = response.text;
          const duration = Date.now() - startTime;
          const result = {
            role: "assistant",
            content: content.trim()
          };
          console.log("[Google AI] Response received:", {
            duration: `${duration}ms`,
            model,
            messageLength: content.length,
            response: result
          });

          return result;
        }
      }
    }

    throw new Error("No valid messages found in chat history");
  } catch (error) {
    console.error("[Google AI] Error:", error);
    throw error;
  }
}