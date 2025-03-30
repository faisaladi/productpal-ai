
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import TemplateCard from "@/components/TemplateCard";

const prompts = [
  "Help me compare iPhone 16 Pro Max vs Samsung S25 Ultra...",
  "Help me find a school for my kids...",
  "Help me find a perfect gift for my friend...",
  "Compare Nike Air Max vs Adidas Ultraboost...",
  "What laptop should I buy for video editing..."
];

const LandingPage = () => {
  const [promptIndex, setPromptIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Encode the input value and add it as a query parameter
      const encodedQuery = encodeURIComponent(inputValue);
      window.location.href = `/chat?q=${encodedQuery}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 animated-gradient leading-relaxed py-2">
            Take decision faster
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-muted-foreground leading-relaxed">
            Capcipcup is a decision making platform. Write down your problem.
          </p>
          
          <form onSubmit={handleSubmit} className="mb-16">
            <div className="relative w-full max-w-2xl mx-auto">
              <Input
                placeholder={prompts[promptIndex]}
                className="h-14 pl-4 pr-14 text-lg rounded-full bg-background border-2 focus-visible:ring-primary"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-2 h-10 w-10 rounded-full"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>
          
          <div className="text-left px-4 sm:px-0">
            <h2 className="text-lg font-medium mb-6">Example questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TemplateCard 
                title="Product Comparison" 
                text="iPhone 16 Pro Max vs Samsung S25 Ultra" 
              />
              <TemplateCard 
                title="Find Recommendations" 
                text="Help me to find a school for my kids" 
              />
              <TemplateCard 
                title="Gift Ideas" 
                text="Help me to find a perfect gift for my friend" 
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t w-full">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 Capcipcup.ai. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
