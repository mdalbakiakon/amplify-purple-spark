import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star, Clock, Trophy } from "lucide-react";

export default function PricingSection() {
  const features = {
    free: [
      "Unlimited basic SEO analysis",
      "1,500 words/day",
      "3 keyword searches/day",
      "1 SEO Boost/week",
      "5 AI rewrites/week",
      "Custom style & tone",
      "SEO & readability scorecard",
      "Community support",
      "No credit card needed"
    ],

    premium: [
      "Everything in Free",
      "25,000 words/day",
      "Advanced SEO with competitor insights",
      "500 keyword searches/month",
      "10 SEO Boosts/week",
      "100 AI rewrites/week",
      "Export: PDF, DOCX, Markdown",
      "Content history",
      "Email support (24–48h)"
    ],

    pro: [
      "Everything in Premium",
      "Unlimited AI rewrites",
      "Unlimited keyword research",
      "Unlimited SEO Boosts",
      "Humanize AI content",
      "1-click content briefs",
      "Team access (up to 3 users)",
      "Advanced analytics",
      "Priority support (<12h)"
    ]

  };

  return (
    <section id="pricing" className="py-16">
      <div className="container px-0">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-card/80 backdrop-blur border-border/50 relative flex flex-col h-full">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Free Starter</CardTitle>
              <div className="text-3xl font-bold">$0</div>
              <p className="text-muted-foreground">Perfect for trying out AmplifyX</p>
            </CardHeader>
            <CardContent className="space-y-6 flex flex-col flex-1">
              <ul className="space-y-3 flex-1">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Button variant="outline" className="w-full" size="lg">
                  Current Plan
                </Button>
              </div>
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
                <div className="text-premium font-bold">
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
          
          {/* Pro Plan */}
          <Card className="bg-card/80 backdrop-blur border-border/50 relative flex flex-col h-full overflow-visible">
            {/* Pro Card Pulse Border Animation */}
            <span className="pointer-events-none absolute -inset-1 rounded-2xl border-2 border-primary opacity-75 animate-pulse z-0"></span>
            {/* Pro Badge (like Premium) */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground flex items-center"><Trophy className="h-3 w-3 mr-1 text-primary-foreground" />Pro</Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="text-3xl font-bold">$39<span className="text-lg text-muted-foreground">/month</span></div>
              <div className="text-pro text-primary font-bold">
                or $390/year <Badge variant="outline" className="ml-1 text-xs">Save 16%</Badge>
              </div>
              <p className="text-muted-foreground">For agencies & power users</p>
            </CardHeader>
            <CardContent className="space-y-6 flex flex-col flex-1">
              <ul className="space-y-3 flex-1">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-purple text-white hover:shadow-glow-purple hover:scale-105 transition-all duration-300 animate-glow border-0"
                  size="lg"
                >
                  <Star className="h-4 w-4" />
                  Start Pro Now
                </Button>
                <Button
                  variant="premium-outline"
                  className="w-full"
                  size="lg"
                >
                  Choose Yearly (16% Off)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Note */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-xs mt-1">AmplifyX offers the best value for SEO-focused content optimization</p>
        </div>
      </div>
    </section>
  );
}