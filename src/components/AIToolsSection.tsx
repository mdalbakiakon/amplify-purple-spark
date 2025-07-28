import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Wand2, RefreshCw, Lock, Sparkles, User, Briefcase } from "lucide-react";

export default function AIToolsSection() {
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("professional");
  const [humanize, setHumanize] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenContent, setRewrittenContent] = useState("");
  const [rewrites, setRewrites] = useState(8); // Mock: 8/10 used

  const handleRewrite = async () => {
    if (rewrites <= 0 || !content.trim()) return;

    setIsRewriting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock rewritten content based on style
    const mockRewrites = {
      professional: `Transform your business approach with strategic insights that drive measurable results. Our proven methodology delivers exceptional ROI through data-driven solutions tailored to your unique challenges.

Key benefits:
✅ Increased efficiency by 40%
✅ Reduced operational costs
✅ Enhanced customer satisfaction

Ready to elevate your business? Let's connect and discuss your growth strategy.`,
      conversational: `Hey there! 👋 Want to know the secret to growing your business faster?

I've been helping companies just like yours achieve incredible results, and I'm excited to share what's working right now.

Here's what my clients are saying:
💫 "Best investment we've made this year!"
💫 "Results exceeded our expectations"
💫 "Finally, a solution that actually works"

Drop me a message if you want to chat about how this could work for you! 🚀`
    };

    setRewrittenContent(mockRewrites[style as keyof typeof mockRewrites]);
    setRewrites(prev => prev - 1);
    setIsRewriting(false);
  };

  return (
    <section id="tools" className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="bg-gradient-purple bg-clip-text text-transparent">Content Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Rewrite and optimize your content with advanced AI algorithms
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-dark border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary animate-glow" />
                AI Content Rewriter
                <div className="ml-auto flex items-center gap-2">
                  <Badge variant={rewrites > 5 ? "secondary" : "outline"} 
                         className={rewrites <= 2 ? "bg-warning/20 text-warning" : ""}>
                    {rewrites}/10 rewrites left
                  </Badge>
                  {rewrites <= 2 && (
                    <Badge variant="outline" className="bg-premium/20 text-premium border-premium/30">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium: Unlimited
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Content Input */}
              <div className="space-y-3">
                <Label htmlFor="content">Original Content</Label>
                <Textarea
                  id="content"
                  placeholder="Paste your content here to rewrite and optimize..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-32 bg-background/50 border-border resize-none"
                />
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Style Selection */}
                <div className="space-y-3">
                  <Label>Writing Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Professional
                        </div>
                      </SelectItem>
                      <SelectItem value="conversational">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Conversational
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Humanize Toggle */}
                <div className="space-y-3">
                  <Label>AI Detection</Label>
                  <div className="flex items-center space-x-2 bg-background/50 p-3 rounded-lg border border-border">
                    <Switch
                      id="humanize"
                      checked={humanize}
                      onCheckedChange={setHumanize}
                    />
                    <Label htmlFor="humanize" className="text-sm">
                      Humanize content
                    </Label>
                    <Badge variant="outline" className="ml-auto bg-premium/20 text-premium border-premium/30">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={handleRewrite}
                disabled={!content.trim() || isRewriting || rewrites <= 0}
                className="w-full"
                variant={rewrites > 0 ? "boost" : "outline"}
                size="lg"
              >
                {isRewriting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Rewriting with AI...
                  </>
                ) : rewrites <= 0 ? (
                  <>
                    <Lock className="h-4 w-4" />
                    Monthly limit reached
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Rewrite Content
                  </>
                )}
              </Button>

              {/* Usage Warning */}
              {rewrites <= 2 && rewrites > 0 && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <p className="text-sm text-warning">
                    ⚠️ Only {rewrites} rewrites remaining this month. 
                    <Button variant="link" className="p-0 ml-1 text-premium h-auto">
                      Upgrade to Premium
                    </Button> for unlimited access.
                  </p>
                </div>
              )}

              {/* Rewritten Content */}
              {rewrittenContent && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>AI-Optimized Content</Label>
                    <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Optimized
                    </Badge>
                  </div>
                  <div className="bg-background/50 border border-success/30 rounded-lg p-4">
                    <p className="text-sm whitespace-pre-line">{rewrittenContent}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      Copy to Clipboard
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      Analyze New Content
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}