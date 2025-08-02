import { Zap, Crown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="bg-card/50 backdrop-blur-lg sticky top-0 z-50 border-b">
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
            <a href="#analyzer" className="text-foreground hover:text-primary transition-colors">
              SEO Analyzer
            </a>
            <a href="#keyword" className="text-foreground hover:text-primary transition-colors">
              Keyword Research
            </a>
            <a href="#tools" className="text-foreground hover:text-primary transition-colors">
              AI Tools
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="premium" size="sm" className="hidden md:flex gap-1">
            <Crown className="h-4 w-4" />
            Upgrade to Premium
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer focus:bg-accent">
                <User className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-accent">
                <Zap className="mr-2 h-4 w-4" />
                <span>Create Account</span>
              </DropdownMenuItem>
              <div className="border-t my-1"></div>
              <DropdownMenuItem className="cursor-pointer text-muted-foreground focus:bg-accent">
                <span>Help Center</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}