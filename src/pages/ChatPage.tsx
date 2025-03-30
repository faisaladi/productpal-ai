import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Menu, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";
import ComparisonTable from "@/components/ComparisonTable";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Sample comparison data for demonstration
const sampleComparisonData = {
  products: ["iPhone 16 Pro Max", "Samsung S25 Ultra"],
  specs: [
    { name: "Display", values: ["6.9\" Super Retina XDR", "6.8\" Dynamic AMOLED 2X"] },
    { name: "Processor", values: ["A18 Pro", "Snapdragon 8 Gen 3"] },
    { name: "RAM", values: ["8GB", "12GB"] },
    { name: "Storage", values: ["256GB, 512GB, 1TB", "256GB, 512GB, 1TB"] },
    { name: "Main Camera", values: ["48MP, f/1.8", "200MP, f/1.7"] },
    { name: "Battery", values: ["4550mAh", "5000mAh"] }
  ]
};

// Initial conversation when there's a search query
const createInitialConversation = (query: string): Message[] => [
  {
    id: "1",
    role: "user",
    content: query,
    timestamp: new Date(),
  },
  {
    id: "2",
    role: "assistant",
    content: `I'll help you with that comparison! Let me analyze the specifications and provide a detailed breakdown.

## ${query}

Here's a comparison table of the main specifications:`,
    timestamp: new Date(),
  },
];

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    initialQuery ? createInitialConversation(initialQuery) : []
  );
  const [inputValue, setInputValue] = useState("");
  const [showComparisonTable, setShowComparisonTable] = useState(!!initialQuery);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputValue,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newUserMessage]);
      setInputValue("");
      
      // Simulate AI response (in a real app, this would be an API call)
      setTimeout(() => {
        const newAiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I'll analyze your question about "${inputValue}" and provide a detailed comparison.

Based on my research, here are the key points to consider:`,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, newAiMessage]);
        setShowComparisonTable(true);
      }, 1000);
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
                  onClick={() => setInputValue("Compare iPhone 16 Pro Max vs Samsung S25 Ultra")}
                >
                  <span className="text-lg font-medium">Product Comparison</span>
                  <span className="text-sm text-muted-foreground">Compare features, specs, and prices</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 p-4"
                  onClick={() => setInputValue("What's the best laptop for video editing?")}
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
              
              {showComparisonTable && (
                <div className="my-4 animate-fade-in">
                  <ComparisonTable data={sampleComparisonData} />
                  
                  <div className="mt-8 p-4 bg-secondary rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Verdict</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-primary">iPhone 16 Pro Max</h4>
                        <p className="mt-2 text-sm">
                          <span className="font-semibold">Pros:</span> Superior software optimization, better long-term support, excellent camera system for most users, strong ecosystem integration.
                        </p>
                        <p className="mt-2 text-sm">
                          <span className="font-semibold">Choose when:</span> You're already in the Apple ecosystem, prioritize ease of use, or need reliable performance for years.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">Samsung S25 Ultra</h4>
                        <p className="mt-2 text-sm">
                          <span className="font-semibold">Pros:</span> Higher specifications, more versatile camera system, larger battery, S-Pen functionality, more customization options.
                        </p>
                        <p className="mt-2 text-sm">
                          <span className="font-semibold">Choose when:</span> You want cutting-edge hardware specs, need the versatility of Android, or use the S-Pen for productivity.
                        </p>
                      </div>
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
                <Button type="button" size="icon" variant="ghost">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon">
                  <Send className="h-5 w-5" />
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
