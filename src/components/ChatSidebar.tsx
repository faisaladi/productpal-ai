
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, MessageSquare } from "lucide-react";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample chat history data
const sampleChatHistory = [
  {
    id: "1",
    title: "iPhone 16 Pro Max vs Samsung S25 Ultra",
    timestamp: new Date(2023, 6, 15),
    category: "today"
  },
  {
    id: "2",
    title: "Best lightweight laptops for students",
    timestamp: new Date(2023, 6, 15),
    category: "today"
  },
  {
    id: "3",
    title: "Nike Air Jordan vs Adidas Yeezy",
    timestamp: new Date(2023, 6, 14),
    category: "yesterday"
  },
  {
    id: "4",
    title: "Best streaming service comparison",
    timestamp: new Date(2023, 6, 10),
    category: "previous"
  },
  {
    id: "5",
    title: "Gaming consoles: PS5 vs Xbox Series X",
    timestamp: new Date(2023, 6, 8),
    category: "previous"
  }
];

const ChatSidebar = ({ isOpen, onClose }: ChatSidebarProps) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [filteredChats, setFilteredChats] = useState(sampleChatHistory);
  
  useEffect(() => {
    if (searchValue) {
      setFilteredChats(
        sampleChatHistory.filter(chat => 
          chat.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredChats(sampleChatHistory);
    }
  }, [searchValue]);
  
  const handleNewChat = () => {
    navigate("/chat");
    onClose();
  };
  
  const groupedChats = filteredChats.reduce((groups, chat) => {
    const category = chat.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(chat);
    return groups;
  }, {} as Record<string, typeof sampleChatHistory>);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="left" 
        className="w-80 p-0 max-w-full border-r"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4">
            <SheetTitle className="text-left gradient-text">capcipcup.ai</SheetTitle>
          </SheetHeader>
          
          <div className="p-4 space-y-4">
            <Button onClick={handleNewChat} className="w-full justify-start gap-2">
              <Plus className="h-4 w-4" /> New comparison
            </Button>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search comparisons..."
                className="pl-9"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex-1 overflow-auto">
            {Object.entries(groupedChats).length > 0 ? (
              <div className="space-y-6 p-4">
                {Object.entries(groupedChats).map(([category, chats]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {category}
                    </h3>
                    
                    <div className="space-y-1">
                      {chats.map((chat) => (
                        <Button
                          key={chat.id}
                          variant="ghost"
                          className="w-full justify-start h-auto py-2 px-3 text-left"
                          onClick={() => {
                            navigate(`/chat?id=${chat.id}`);
                            onClose();
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-2 shrink-0" />
                          <span className="truncate">{chat.title}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                No chats found
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebar;
