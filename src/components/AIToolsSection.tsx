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
  const [platform, setPlatform] = useState("blog");
  const [humanize, setHumanize] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const FREE_WORD_LIMIT = 2500;
  const [rewrittenContent, setRewrittenContent] = useState("");
  const [rewrites, setRewrites] = useState(8); // Mock: 8/10 used
  const [keywordAnalytics, setKeywordAnalytics] = useState<any[]>([]);

  const handleRewrite = async () => {
    if (!content.trim() || rewrites <= 0) return;
    
    setIsRewriting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Enhanced AI rewriting based on style and platform
    const styleModifiers = {
      professional: "Transform your content with executive-level clarity and industry authority: ",
      conversational: "Reimagine your message with authentic, engaging dialogue that connects: ",
      creative: "Infuse your content with imaginative storytelling and compelling narratives: ",
      academic: "Elevate your writing with scholarly precision and analytical depth: ",
      casual: "Simplify your message with approachable, everyday language that resonates: ",
      persuasive: "Craft compelling arguments that influence and inspire action: ",
      technical: "Present complex information with clarity and technical accuracy: ",
      storytelling: "Weave your message into captivating stories that engage and inspire: "
    };

    const platformModifiers = {
      blog: "Optimized for blog readability with engaging headlines and SEO structure: ",
      facebook: "Crafted for Facebook engagement with compelling hooks and shareable content: ",
      instagram: "Designed for Instagram with visual appeal and hashtag optimization: ",
      twitter: "Tailored for Twitter with concise, impactful messaging and trending topics: ",
      linkedin: "Professional LinkedIn content that builds authority and drives engagement: ",
      youtube: "YouTube description optimized for discovery and viewer retention: ",
      email: "Email marketing copy that drives opens, clicks, and conversions: ",
      website: "Website copy that converts visitors into customers: "
    };
    
    let rewritten = platformModifiers[platform as keyof typeof platformModifiers] + 
                   styleModifiers[style as keyof typeof styleModifiers] + content;
    
    // Add humanization if enabled (premium feature simulation)
    if (humanize) {
      rewritten = rewritten.replace(/\b(utilize|implement|facilitate)\b/gi, (match) => {
        const replacements = { utilize: 'use', implement: 'put in place', facilitate: 'help' };
        return replacements[match.toLowerCase() as keyof typeof replacements] || match;
      });
    }

    // Generate keyword analytics (simulated)
    const mockKeywords = [
      { keyword: "SEO optimization", performance: "high", searchVolume: "8,100", competition: "medium", difficulty: 45 },
      { keyword: "content marketing", performance: "high", searchVolume: "6,800", competition: "high", difficulty: 62 },
      { keyword: "digital strategy", performance: "medium", searchVolume: "4,200", competition: "low", difficulty: 28 },
      { keyword: "audience engagement", performance: "medium", searchVolume: "3,900", competition: "medium", difficulty: 38 },
      { keyword: "brand awareness", performance: "medium", searchVolume: "2,700", competition: "low", difficulty: 22 }
    ];
    
    setKeywordAnalytics(mockKeywords);
    setRewrittenContent(rewritten);
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
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Style Selection */}
                <div className="space-y-3">
                  <Label>Writing Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">💼 Professional</SelectItem>
                      <SelectItem value="conversational">💬 Conversational</SelectItem>
                      <SelectItem value="creative">🎨 Creative</SelectItem>
                      <SelectItem value="academic">🎓 Academic</SelectItem>
                      <SelectItem value="casual">😊 Casual</SelectItem>
                      <SelectItem value="persuasive">🎯 Persuasive</SelectItem>
                      <SelectItem value="technical">⚙️ Technical</SelectItem>
                      <SelectItem value="storytelling">📚 Storytelling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Platform Selection */}
                <div className="space-y-3">
                  <Label>Content Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">📝 Blog Post</SelectItem>
                      <SelectItem value="facebook">📘 Facebook Post</SelectItem>
                      <SelectItem value="instagram">📸 Instagram Post</SelectItem>
                      <SelectItem value="twitter">🐦 X (Twitter) Post</SelectItem>
                      <SelectItem value="linkedin">💼 LinkedIn Post</SelectItem>
                      <SelectItem value="youtube">🎥 YouTube Description</SelectItem>
                      <SelectItem value="email">📧 Email Marketing</SelectItem>
                      <SelectItem value="website">🌐 Website Copy</SelectItem>
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

              {/* Side by Side Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Content */}
                <div className="space-y-3">
                  <Label htmlFor="content">Original Content</Label>
                  <div className="space-y-2">
                    <Textarea
                      id="content"
                      placeholder="Paste your content here to rewrite with AI..."
                      value={content}
                      onChange={(e) => {
                        const newContent = e.target.value;
                        const words = newContent.trim().split(/\s+/).filter(word => word.length > 0);
                        const currentWordCount = words.length;
                        
                        if (currentWordCount <= FREE_WORD_LIMIT) {
                          setContent(newContent);
                          setWordCount(currentWordCount);
                        } else {
                          // Truncate to word limit
                          const truncated = words.slice(0, FREE_WORD_LIMIT).join(' ');
                          setContent(truncated);
                          setWordCount(FREE_WORD_LIMIT);
                        }
                      }}
                      className="min-h-48 bg-background/50 border-border resize-none"
                    />
                    <div className="flex justify-between items-center text-xs">
                      <span className={`${wordCount > FREE_WORD_LIMIT * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
                        {wordCount} / {FREE_WORD_LIMIT.toLocaleString()} words
                      </span>
                      {wordCount >= FREE_WORD_LIMIT && (
                        <span className="text-primary font-medium">
                          Upgrade to Premium for unlimited words
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI-Optimized Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>SEO-Boosted Content</Label>
                    {rewrittenContent && (
                      <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Optimized
                      </Badge>
                    )}
                  </div>
                  <div className={`min-h-48 bg-background/50 border ${rewrittenContent ? 'border-success/30' : 'border-border'} rounded-lg p-4`}>
                    {rewrittenContent ? (
                      <p className="text-sm whitespace-pre-line">{rewrittenContent}</p>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Your AI-optimized content will appear here after rewriting...
                      </p>
                    )}
                  </div>
                  
                  {rewrittenContent && (
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        Copy to Clipboard
                      </Button>
                      <Button variant="default" size="sm" className="flex-1">
                        Analyze New Content
                      </Button>
                    </div>
                  )}
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

              {/* Keyword Analytics */}
              {keywordAnalytics.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">SEO Keywords Added</Label>
                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                      Free: 2 High + 3 Medium
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {keywordAnalytics.map((keyword, index) => (
                      <div key={index} className="bg-background/30 border border-border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{keyword.keyword}</span>
                          <Badge 
                            variant={keyword.performance === 'high' ? 'default' : 'secondary'}
                            className={keyword.performance === 'high' 
                              ? 'bg-success/20 text-success border-success/30' 
                              : 'bg-warning/20 text-warning border-warning/30'
                            }
                          >
                            {keyword.performance}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>Search Volume:</span>
                            <span className="font-medium">{keyword.searchVolume}/mo</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Competition:</span>
                            <span className="font-medium">{keyword.competition}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <span className="font-medium">{keyword.difficulty}/100</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-premium/10 border border-premium/20 rounded-lg p-4">
                    <p className="text-sm text-premium">
                      🚀 <strong>Upgrade to Premium</strong> for 10 keywords with 5+ high-performance keywords and advanced SEO analytics!
                    </p>
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