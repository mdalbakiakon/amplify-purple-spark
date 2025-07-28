import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, BarChart3, Crown, Star, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-premium/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-premium/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge className="bg-premium/20 text-premium border-premium/30 px-4 py-2 text-sm animate-pulse-purple">
              <Star className="h-3 w-3 mr-2" />
              🔥 #1 SEO Content Amplifier - 7-Day Free Trial
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Amplify Your Content with
              <br />
              <span className="bg-gradient-purple bg-clip-text text-transparent animate-glow">
                AI-Powered SEO
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform ordinary posts into <strong className="text-primary">viral content</strong> with 
              real-time SEO analysis, unlimited AI rewrites, and premium optimization tools.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">SEO Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">3x</div>
              <div className="text-sm text-muted-foreground">Engagement Boost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Content Creators</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="premium" 
              size="xl" 
              className="group w-full sm:w-auto"
            >
              <Crown className="h-5 w-5 mr-2" />
              Start 7-Day Free Trial
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="w-full sm:w-auto hover:border-primary hover:text-primary"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Analyze Content Free
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-8 opacity-60">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              No Credit Card Required
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Cancel Anytime
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Instant Access
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:shadow-purple transition-all duration-300">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-Time SEO Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Instant scoring for keywords, readability, and engagement potential
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:shadow-purple transition-all duration-300">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-primary animate-glow" />
              </div>
              <h3 className="font-semibold mb-2">AI Content Boost</h3>
              <p className="text-sm text-muted-foreground">
                One-click optimization with advanced AI rewriting and enhancement
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:shadow-purple transition-all duration-300">
              <div className="w-12 h-12 bg-premium/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Crown className="h-6 w-6 text-premium animate-glow" />
              </div>
              <h3 className="font-semibold mb-2">Premium Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Export reports, track history, and unlock advanced insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}