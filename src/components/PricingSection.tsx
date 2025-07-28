import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star, Clock } from "lucide-react";

export default function PricingSection() {
  const features = {
    free: [
      "Unlimited SEO analysis",
      "1 SEO boost per week",
      "10 AI rewrites per month",
      "Basic analytics",
      "Community support"
    ],
    premium: [
      "Everything in Free",
      "Unlimited SEO boosts",
      "Unlimited AI rewrites", 
      "Advanced analytics & history",
      "Export as PDF/Markdown",
      "Priority support",
      "Style customization",
      "Humanize AI detection"
    ]
  };

  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="bg-gradient-purple bg-clip-text text-transparent">Power Level</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free and unlock unlimited content amplification with Premium
          </p>
        </div>

        {/* 7-Day Trial Banner */}
        <div className="bg-gradient-premium rounded-2xl p-6 mb-8 text-center border border-premium/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-premium-foreground animate-glow" />
            <Badge variant="outline" className="bg-premium-foreground/10 text-premium-foreground border-premium-foreground/20">
              Limited Time
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-premium-foreground mb-2">
            🎉 Start your 7-day Premium trial today!
          </h3>
          <p className="text-premium-foreground/80">
            Experience unlimited SEO boosts and AI rewrites - no credit card required
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-card/80 backdrop-blur border-border/50 relative">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Free Starter</CardTitle>
              <div className="text-3xl font-bold">$0</div>
              <p className="text-muted-foreground">Perfect for trying out AmplifyX</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" size="lg">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-gradient-dark backdrop-blur border-premium/30 relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-premium text-premium-foreground">
                <Crown className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-premium opacity-5 animate-pulse"></div>
            
            <CardHeader className="text-center pb-8 relative z-10">
              <div className="mx-auto w-12 h-12 bg-gradient-premium rounded-full flex items-center justify-center mb-4 animate-glow">
                <Crown className="h-6 w-6 text-premium-foreground" />
              </div>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <div className="space-y-2">
                <div className="text-3xl font-bold">$15<span className="text-lg text-muted-foreground">/month</span></div>
                <div className="text-premium">
                  or $120/year <Badge variant="outline" className="ml-1 text-xs">Save 33%</Badge>
                </div>
              </div>
              <p className="text-muted-foreground">For serious content creators</p>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <ul className="space-y-3">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-premium flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-3">
                <Button variant="premium" className="w-full" size="lg">
                  <Star className="h-4 w-4" />
                  Start 7-Day Free Trial
                </Button>
                <Button variant="premium-outline" className="w-full" size="lg">
                  Choose Yearly (33% Off)
                </Button>
              </div>

              {/* FOMO Timer */}
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium text-warning">Limited Time Offer</span>
                </div>
                <p className="text-xs text-warning/80">
                  2 months free with annual plan - Expires in 3 days!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Note */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-sm">
            Compare with: <span className="line-through">Copy.ai ($36/month)</span> • <span className="line-through">Simplified ($12/month)</span>
          </p>
          <p className="text-xs mt-1">AmplifyX offers the best value for SEO-focused content optimization</p>
        </div>
      </div>
    </section>
  );
}