import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Menu, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";
import ComparisonTable from "@/components/ComparisonTable";
import { useChat } from "@/hooks/use-chat";
import { useToast } from "@/hooks/use-toast";
import { parseComparisonData } from "@/utils/parseComparisonData";

// Types
interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ComparisonData {
  products: string[];
  specs: {
    name: string;
    values: string[];
  }[];
}

// Empty comparison data structure
const emptyComparisonData = {
  products: [],
  specs: []
};

// Initial conversation when there's a search query
const createInitialConversation = (query: string): Message[] => [
  {
    id: "1",
    role: "user",
    content: query,
    timestamp: new Date(),
  }
];

// Function to extract comparison data from initial messages
const extractInitialComparisonData = (messages: Message[]): ComparisonData | null => {
  const assistantMessages = messages.filter(msg => msg.role === "assistant");
  if (assistantMessages.length > 0) {
    const latestAssistantMessage = assistantMessages[assistantMessages.length - 1];
    return parseComparisonData(latestAssistantMessage.content) || null;
  }
  return null;
};

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialMessages = initialQuery ? createInitialConversation(initialQuery) : [];
  const initialComparisonData = initialQuery ? extractInitialComparisonData(initialMessages) : null;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [showComparisonTable, setShowComparisonTable] = useState(!!initialQuery);
  const [streamingMessage, setStreamingMessage] = useState<Message | null>(null);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(initialComparisonData);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("capcipcup-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Auto-open sidebar for logged-in users
      setSidebarOpen(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { toast } = useToast();
  const { sendMessage, isLoading, error } = useChat({
    initialMessages: messages,
    model: "openai/gpt-4o-2024-11-20",
    temperature: 0.7,
    maxTokens: 2000,
    stream: true,
    onChunk: (chunk) => {
      setStreamingMessage((prev) => ({
        id: 'streaming',
        role: chunk.role,
        content: prev ? prev.content + chunk.content : chunk.content,
        timestamp: new Date(),
      }));
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setInputValue("");
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessage(inputValue);
      
      // Update messages with AI response
      const assistantMessage = {
        id: Math.random().toString(),
        role: response.role,
        content: response.content,
        timestamp: new Date(),
      };

      setStreamingMessage(null);
      const updatedMessages = [...messages, userMessage, assistantMessage];

      // Check for comparison data in the latest assistant message
      if (assistantMessage.role === "assistant") {
        const parsedData = parseComparisonData(assistantMessage.content);
        if (parsedData) {
          setComparisonData(parsedData);
          setShowComparisonTable(true);
        }
      }

      setMessages(updatedMessages);
    } catch (err) {
      console.error("Failed to send message:", err);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Always rendered but visible based on sidebarOpen state */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar
          showSidebarToggle
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="flex-1 overflow-auto px-4 pb-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <h1 className="text-4xl font-bold gradient-text mb-6">
                What can I help with?
              </h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                Ask me to compare products, find recommendations, or help you make a decision.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 p-4"
                  onClick={async () => {
                    const message = "Compare iPhone 16 Pro Max vs Samsung S25 Ultra";
                    setInputValue("");
                    const userMessage: Message = {
                      id: Math.random().toString(),
                      role: "user",
                      content: message,
                      timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, userMessage]);
                    const response = await sendMessage(message);
                    if (response) {
                      const assistantMessage = {
                        id: Math.random().toString(),
                        role: response.role,
                        content: response.content,
                        timestamp: new Date(),
                      };
                      setStreamingMessage(null);
                      setMessages(prev => [...prev, userMessage, assistantMessage]);
                      if (assistantMessage.role === "assistant") {
                        const parsedData = parseComparisonData(assistantMessage.content);
                        if (parsedData) {
                          setComparisonData(parsedData);
                          setShowComparisonTable(true);
                        }
                      }
                    }
                  }}

                >
                  <span className="text-lg font-medium">Product Comparison</span>
                  <span className="text-sm text-muted-foreground">Compare features, specs, and prices</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 p-4"
                  onClick={async () => {
                    const message = "What's the best laptop for video editing?";
                    setInputValue("");
                    const userMessage: Message = {
                      id: Math.random().toString(),
                      role: "user",
                      content: message,
                      timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, userMessage]);
                    const response = await sendMessage(message);
                    if (response) {
                      const assistantMessage = {
                        id: Math.random().toString(),
                        role: response.role,
                        content: response.content,
                        timestamp: new Date(),
                      };
                      setStreamingMessage(null);
                      setMessages(prev => [...prev, userMessage, assistantMessage]);
                      if (assistantMessage.role === "assistant") {
                        const parsedData = parseComparisonData(assistantMessage.content);
                        if (parsedData) {
                          setComparisonData(parsedData);
                          setShowComparisonTable(true);
                        }
                      }
                    }
                  }}

                >
                  <span className="text-lg font-medium">Find Recommendations</span>
                  <span className="text-sm text-muted-foreground">Get personalized suggestions</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-6 space-y-8">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              {streamingMessage && (
                <ChatMessage
                  key="streaming"
                  message={streamingMessage}
                />
              )}
              
              {showComparisonTable && comparisonData && (
                <div className="my-4 animate-fade-in">
                  <ComparisonTable data={comparisonData} />
                  
                  {/* Verdict section will be generated from AI responses */}
                  <div className="mt-8 p-4 bg-secondary rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Verdict</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {comparisonData.products.map((product, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-primary">{product}</h4>
                          <div className="mt-2 space-y-2 text-sm">
                            {/* The verdict content will come from AI responses */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <Input
                placeholder="Ask for product comparisons or recommendations..."
                className="pr-24 py-6 pl-4 rounded-xl"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <Button type="button" size="icon" variant="ghost" disabled={isLoading}>
                  <Mic className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon" disabled={isLoading}>
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
