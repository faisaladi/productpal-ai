
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  
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
    <Sheet open={isOpen && !isCollapsed} onOpenChange={onClose}>
      <SheetContent 
        side="left" 
        className="p-0 border-r transition-all duration-300 z-50 w-[280px]"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <SheetTitle className={`text-left gradient-text transition-opacity duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>capcipcup.ai</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 ml-auto"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="p-4 space-y-4">
            <Button onClick={handleNewChat} className={`w-full justify-center ${isCollapsed ? 'px-0' : 'justify-start gap-2'}`}>
              <Plus className="h-4 w-4" />
              <span className={`transition-all duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>
                New comparison
              </span>
            </Button>
            
            <div className={`relative transition-opacity duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
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
                    <h3 className={`text-xs font-medium text-muted-foreground uppercase tracking-wider transition-opacity duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
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
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <span className={`truncate ml-2 transition-all duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>{chat.title}</span>
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
