
import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  MessageSquare, 
  Search, 
  LogOut,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

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

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNewChat = () => {
    navigate("/chat");
  };

  const handleLogout = () => {
    localStorage.removeItem("capcipcup-user");
    window.location.href = "/";
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const filteredChats = searchQuery 
    ? sampleChatHistory.filter(chat => 
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleChatHistory;

  const groupedChats = filteredChats.reduce((groups, chat) => {
    const category = chat.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(chat);
    return groups;
  }, {} as Record<string, typeof sampleChatHistory>);

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar>
        <SidebarHeader className="p-3">
          <div className="flex justify-start">
            <h1 className="text-lg animated-gradient font-bold">capcipcup.ai</h1>
          </div>
          <div className="mt-4">
            <Button onClick={handleNewChat} className="w-full justify-start gap-2">
              <Plus className="h-4 w-4" /> New comparison
            </Button>
          </div>
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search comparisons..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          {Object.entries(groupedChats).length > 0 ? (
            <>
              {Object.entries(groupedChats).map(([category, chats]) => (
                <SidebarGroup key={category}>
                  <SidebarGroupLabel className="px-2 uppercase text-xs font-semibold text-muted-foreground">
                    {category}
                  </SidebarGroupLabel>
                  <SidebarMenu>
                    {chats.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton 
                          onClick={() => navigate(`/chat?id=${chat.id}`)}
                          className="w-full justify-start"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          <span className="truncate">{chat.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
              No chats found
            </div>
          )}
        </SidebarContent>
        
        <SidebarFooter className="p-3">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarFooter>
        
        <SidebarRail />
      </Sidebar>
      
      <div className="flex-1 flex flex-col w-full">
        <Navbar showSidebarToggle={true} />
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
