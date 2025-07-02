
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RestaurantProvider } from "@/contexts/RestaurantContext";
import CollaborationsPage from "./pages/CollaborationsPage";
import CreateCollaborationPageV2 from "./pages/CreateCollaborationPageV2";
import FoodieSelectionPage from "./pages/FoodieSelectionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RestaurantProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/collaborations" replace />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            <Route path="/collaborations/create" element={<CreateCollaborationPageV2 />} />
            <Route path="/foodies/select" element={<FoodieSelectionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RestaurantProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
