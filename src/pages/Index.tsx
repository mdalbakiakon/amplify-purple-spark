import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SEOAnalyzer from "@/components/SEOAnalyzer";
import AIToolsSection from "@/components/AIToolsSection";
import PricingSection from "@/components/PricingSection";
import KeywordResearch from "@/components/KeywordResearch";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
      return () => {
        document.documentElement.style.scrollBehavior = "auto";
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Content Sections */}
        <section 
          id="analyzer" 
          className="snap-start min-h-[calc(100vh-4rem)] md:min-h-screen w-full flex items-center justify-center py-12 md:py-0 scroll-mt-16"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SEOAnalyzer />
          </div>
        </section>

        <section 
          id="keyword" 
          className="snap-start min-h-[calc(100vh-4rem)] md:min-h-screen w-full flex items-center justify-center py-12 md:py-0 scroll-mt-16"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <KeywordResearch />
          </div>
        </section>

        <section 
          id="tools" 
          className="snap-start min-h-[calc(100vh-4rem)] md:min-h-screen w-full flex items-center justify-center py-12 md:py-0 scroll-mt-16"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <AIToolsSection />
          </div>
        </section>

        <section 
          id="pricing" 
          className="snap-start min-h-[calc(100vh-4rem)] md:min-h-screen w-full flex items-center justify-center py-12 md:py-0 scroll-mt-16"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <PricingSection />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card/30 border-t border-border py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-purple bg-clip-text text-transparent">
              AmplifyX
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mb-4">
            The ultimate content amplifier for creators and businesses
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
          </div>
          <p className="text-xs text-muted-foreground mt-4 sm:mt-6">
            © 2025 AmplifyX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;