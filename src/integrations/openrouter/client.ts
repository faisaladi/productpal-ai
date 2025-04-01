import axios from "axios";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error("OpenRouter API key is not set");
}

const openRouterApi = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "HTTP-Referer": window.location.origin,
    "X-Title": "ProductPal AI",
    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
  },
});

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatCompletionOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  onChunk?: (chunk: ChatMessage) => void;
};

export async function createChatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
) {
  const {
    model = "openai/gpt-3.5-turbo",
    temperature = 0.7,
    maxTokens = 1000,
  } = options;

  console.log("[OpenRouter] Sending request:", {
    model,
    messages: messages.length,
    temperature,
    maxTokens,
  });

  try {
    const startTime = Date.now();
    const { stream = false, onChunk } = options;
    const controller = new AbortController();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'ProductPal AI',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        stream,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (stream) {
      console.log('[OpenRouter] Starting stream processing');
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let content = '';
      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          while (true) {
            const lineEnd = buffer.indexOf('\n');
            if (lineEnd === -1) break;

            const line = buffer.slice(0, lineEnd).trim();
            buffer = buffer.slice(lineEnd + 1);

            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                console.log('[OpenRouter] Stream completed');
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices[0].delta;
                if (delta.content) {
                  content += delta.content;
                  console.log('[OpenRouter] Received content chunk:', delta.content);
                  onChunk?.({ role: 'assistant', content: delta.content });
                }
              } catch (e) {
                console.error('[OpenRouter] Failed to parse chunk:', e, '\nRaw data:', data);
              }
            }
          }
        }
      } finally {
        reader.cancel();
      }

      console.log('[OpenRouter] Stream finished, total content length:', content.length);
      return { role: 'assistant', content };
    } else {
      const data = await response.json();
      const duration = Date.now() - startTime;
      console.log("[OpenRouter] Response received:", {
        status: response.status,
        duration: `${duration}ms`,
        model: data.model,
        messageLength: data.choices[0].message.content.length,
      });

      const message = data.choices[0].message;
      if (message && typeof message.content === 'string') {
        return {
          role: message.role,
          content: message.content.trim()
        };
      }
      throw new Error("Invalid response format from OpenRouter API");
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('[OpenRouter] Stream cancelled');
      throw error;
    }
    console.error("[OpenRouter] Error:", error);
    throw error;
  }
}