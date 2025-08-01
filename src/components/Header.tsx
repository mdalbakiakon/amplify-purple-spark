import { Zap, Crown, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-purple bg-clip-text text-transparent">
              AmplifyX
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#analyzer" className="text-foreground">
              SEO Analyzer
            </a>
            <a href="#keyword" className="text-foreground">
              Keyword Research
            </a>
            <a href="#tools" className="text-foreground">
              AI Tools
            </a>
            <a href="#pricing" className="text-foreground">
              Pricing
            </a>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-card px-3 py-2 rounded-lg border border-border">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Free Plan</span>
            <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
              1/1 boosts used
            </span>
          </div>

          <Button variant="premium" size="sm" className="hidden md:flex">
            <Crown className="h-4 w-4" />
            Upgrade to Premium
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}