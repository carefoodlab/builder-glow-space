import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Survey from "./pages/Survey";
import SurveyStep3 from "./pages/SurveyStep3";
import SurveyStep4 from "./pages/SurveyStep4";
import ThankYou from "./pages/ThankYou";
import DietResults from "./pages/DietResults";
import SurveyAdmin from "./pages/SurveyAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey-step3" element={<SurveyStep3 />} />
          <Route path="/survey-step4" element={<SurveyStep4 />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/diet-results" element={<DietResults />} />
          <Route path="/admin/surveys" element={<SurveyAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
