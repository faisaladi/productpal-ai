
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainLayout from "./layouts/MainLayout";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("capcipcup-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // If user is logged in and not on login page or privacy/terms pages, show the layout with sidebar
  const shouldUseLayout = user && 
    location.pathname !== "/login" && 
    location.pathname !== "/privacy" && 
    location.pathname !== "/terms";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider defaultOpen={true}>
          {shouldUseLayout ? (
            <MainLayout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
