import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SEOAnalyzer from "@/components/SEOAnalyzer";
import AIToolsSection from "@/components/AIToolsSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-16">
          <SEOAnalyzer />
        </div>
        <AIToolsSection />
        <PricingSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-card/30 border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xl font-bold bg-gradient-purple bg-clip-text text-transparent">
              AmplifyX
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            The ultimate content amplifier for creators and businesses
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            © 2025 AmplifyX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
