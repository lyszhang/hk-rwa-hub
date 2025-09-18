import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import News from "./pages/News";
import Stablecoins from "./pages/tokenization/Stablecoins";
import Stocks from "./pages/tokenization/Stocks";
import StockDetail from "./pages/tokenization/StockDetail";
import Securitization from "./pages/hk/Securitization";
import ProductDetail from "./pages/hk/ProductDetail";
import HKStablecoins from "./pages/hk/Stablecoins";
import DATs from "./pages/securitization/DATs";
import CompanyAnalysis from "./pages/securitization/CompanyAnalysis";
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
          <Route path="/news" element={<News />} />
          <Route path="/tokenization/stablecoins" element={<Stablecoins />} />
          <Route path="/tokenization/stocks" element={<Stocks />} />
          <Route path="/tokenization/stocks/:stockId" element={<StockDetail />} />
          <Route path="/hk/securitization" element={<Securitization />} />
          <Route path="/hk/securitization/product/:productId" element={<ProductDetail />} />
          <Route path="/hk/stablecoins" element={<HKStablecoins />} />
          <Route path="/securitization/dats" element={<DATs />} />
          <Route path="/securitization/analysis/:companyId" element={<CompanyAnalysis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
