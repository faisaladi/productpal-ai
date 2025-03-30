
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface TemplateCardProps {
  title: string;
  text: string;
}

const TemplateCard = ({ title, text }: TemplateCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    const encodedQuery = encodeURIComponent(text);
    navigate(`/chat?q=${encodedQuery}`);
  };

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 ${
        isHovered ? "shadow-md border-primary/50" : ""
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
