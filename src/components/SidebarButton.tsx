import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface SidebarButtonProps {
  onClick: () => void;
}

const SidebarButton = ({ onClick }: SidebarButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="h-8 w-8"
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
};

export default SidebarButton;