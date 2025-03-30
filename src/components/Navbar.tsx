
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  showSidebarToggle?: boolean;
  onSidebarToggle?: () => void;
}

const Navbar = ({ showSidebarToggle = false, onSidebarToggle }: NavbarProps) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("capcipcup-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("capcipcup-user");
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const isMainPage = !location.pathname.includes("/chat");
  const showUserControls = !location.pathname.includes("/chat") || showSidebarToggle;

  return (
    <header className="border-b w-full">
      <div className="flex items-center justify-between h-16 px-4 container mx-auto">
        <div className="flex items-center gap-4">
          {showSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold animated-gradient">capcipcup.ai</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {isMainPage && (
            <div className="flex items-center gap-6 mr-4">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                Terms & Conditions
              </Link>
            </div>
          )}
          
          {showUserControls && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline-block max-w-[140px] truncate">
                      {user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
