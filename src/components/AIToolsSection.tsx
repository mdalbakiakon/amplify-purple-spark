import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import "../styles/custom-scrollbar.css";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Sparkles, Lock, TrendingUp, BarChart3, Copy, CheckCircle } from 'lucide-react';
import { useDailyLimit } from '@/hooks/useDailyLimit';

interface KeywordAnalytic {
  keyword: string;
  performance: 'high' | 'medium';
  volume: string;
  difficulty: string;
  cpc: string;
}

const AIToolsSection = () => {
  const [content, setContent] = useState('');
  const [rewrittenContent, setRewrittenContent] = useState('');
  const [tone, setTone] = useState('professional');
  const [style, setStyle] = useState('engaging');
  const [platform, setPlatform] = useState('blog');
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrites, setRewrites] = useState(5);
  const [keywordAnalytics, setKeywordAnalytics] = useState<KeywordAnalytic[]>([]);
  const [copiedKeywords, setCopiedKeywords] = useState<string[]>([]);

  const { dailyUsage, updateUsage, canGenerate, DAILY_WORD_LIMIT } = useDailyLimit();
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

  const handleRewrite = async () => {
    if (!content.trim() || rewrites <= 0) return;
    
    const estimatedWords = Math.ceil(content.split(/\s+/).length * 1.2); // Estimate 20% expansion
    
    if (!canGenerate(estimatedWords)) {
      alert(`Daily limit reached! You have ${dailyUsage.remainingWords} words remaining today.`);
      return;
    }
    
    setIsRewriting(true);
    
    // Simulate AI rewriting with platform-specific optimization
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Advanced platform-specific content generation
    const platformOptimizations = {
      blog: {
        prefix: "## ",
        structure: "comprehensive analysis with headers, bullet points, and actionable insights",
        cta: "Read more insights on our blog and subscribe for weekly updates.",
        hashtags: ""
      },
      facebook: {
        prefix: "🌟 ",
        structure: "engaging story format with emojis and social proof",
        cta: "Like and share if this resonates with you! 💙",
        hashtags: "#SocialMedia #Growth #Marketing"
      },
      instagram: {
        prefix: "✨ ",
        structure: "visual storytelling with line breaks and emojis",
        cta: "Double-tap if you agree! Save this post for later 📱",
        hashtags: "#Instagram #ContentCreator #Digital #Growth #Inspiration"
      },
      twitter: {
        prefix: "🔥 ",
        structure: "concise thread-worthy content with key takeaways",
        cta: "Retweet to share this insight with your network!",
        hashtags: "#TwitterTips #Marketing #Growth"
      },
      linkedin: {
        prefix: "🎯 ",
        structure: "professional insights with industry statistics and thought leadership",
        cta: "What's your experience with this? Share your thoughts in the comments.",
        hashtags: "#LinkedIn #Professional #Business #Strategy"
      },
      youtube: {
        prefix: "🎬 ",
        structure: "engaging script format with hooks, timestamps, and viewer engagement",
        cta: "Don't forget to like, subscribe, and hit the notification bell! 🔔",
        hashtags: "#YouTube #ContentCreator #Tutorial"
      },
      email: {
        prefix: "📧 ",
        structure: "personalized email format with clear subject line and actionable content",
        cta: "Reply to this email with your thoughts - I read every response!",
        hashtags: ""
      }
    };
    
    const platformConfig = platformOptimizations[platform as keyof typeof platformOptimizations];
    const optimizedContent = `${platformConfig.prefix}${content}
    
📈 SEO-Optimized for ${platform.charAt(0).toUpperCase() + platform.slice(1)}
✅ ${tone.charAt(0).toUpperCase() + tone.slice(1)} tone applied
🎯 ${style.charAt(0).toUpperCase() + style.slice(1)} writing style
📊 ${platformConfig.structure}

${platformConfig.cta}

${platformConfig.hashtags}`;
    
    setRewrittenContent(optimizedContent);
    setRewrites(prev => prev - 1);
    
    // Update daily usage
    const actualWords = optimizedContent.split(/\s+/).length;
    updateUsage(actualWords);
    
    // Generate consistent keyword analytics based on content
    const contentHash = content.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const allKeywords = [
      { keyword: "digital marketing", performance: "high", volume: "12.5K", difficulty: "medium", cpc: "$3.40" },
      { keyword: "content strategy", performance: "high", volume: "8.2K", difficulty: "low", cpc: "$2.80" },
      { keyword: "social media", performance: "medium", volume: "45.1K", difficulty: "high", cpc: "$4.20" },
      { keyword: "brand awareness", performance: "medium", volume: "6.7K", difficulty: "medium", cpc: "$3.10" },
      { keyword: "engagement rate", performance: "medium", volume: "3.4K", difficulty: "low", cpc: "$2.60" },
      { keyword: "SEO optimization", performance: "high", volume: "18.3K", difficulty: "medium", cpc: "$4.80" },
      { keyword: "content marketing", performance: "high", volume: "22.1K", difficulty: "medium", cpc: "$3.90" },
      { keyword: "online presence", performance: "medium", volume: "7.8K", difficulty: "low", cpc: "$2.40" },
      { keyword: "target audience", performance: "medium", volume: "9.2K", difficulty: "medium", cpc: "$3.20" },
      { keyword: "conversion rate", performance: "medium", volume: "15.6K", difficulty: "high", cpc: "$5.20" }
    ];
    
    // Select 5 keywords consistently based on content hash
    const selectedKeywords = allKeywords
      .filter((_, index) => (Math.abs(contentHash + index) % 2) === 0)
      .slice(0, 5)
      .map((keyword, index) => ({
        ...keyword,
        performance: index < 2 ? "high" : "medium" // First 2 are high performance
      }));
    
    setKeywordAnalytics(selectedKeywords as KeywordAnalytic[]);
    setIsRewriting(false);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKeywords(prev => [...prev, type]);
      setTimeout(() => {
        setCopiedKeywords(prev => prev.filter(item => item !== type));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
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

        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-dark border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary animate-glow" />AI Content Rewriter
                <div className="ml-auto flex items-center gap-2">
                  <Badge variant={rewrites > 2 ? "secondary" : "outline"} 
                         className={(rewrites <= 2 ? "bg-warning/20 text-warning " : "") + "text-center w-full"}>
                    Weekly: {rewrites}/10 rewrites
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tone Selection */}
                <div className="space-y-3">
                  <Label>Writing Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
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
                    </SelectContent>
                  </Select>
                </div>

                {/* Style Selection */}
                <div className="space-y-3">
                  <Label>Writing Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engaging">✨ Engaging</SelectItem>
                      <SelectItem value="informative">📚 Informative</SelectItem>
                      <SelectItem value="storytelling">📖 Storytelling</SelectItem>
                      <SelectItem value="technical">⚙️ Technical</SelectItem>
                      <SelectItem value="inspirational">🌟 Inspirational</SelectItem>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Side by Side Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Content */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content">Original Content</Label>
                    </div>
                    <Textarea
                      id="content"
                      placeholder="Paste your content here to rewrite with AI..."
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      className="min-h-48 bg-background/50 border-border resize-none custom-scrollbar"
                    />
                    <div className="flex justify-between items-center text-xs">
                      <span className={`${wordCount > DAILY_WORD_LIMIT * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
                        Input: {wordCount} words
                      </span>
                      <span className={`${dailyUsage.wordsUsed > DAILY_WORD_LIMIT * 0.8 ? 'text-warning' : 'text-muted-foreground'}`}>
                        Daily: {dailyUsage.wordsUsed} / {DAILY_WORD_LIMIT.toLocaleString()} words
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI-Optimized Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>SEO-Boosted Content</Label>
                    {rewrittenContent && (
                      <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Optimized
                      </Badge>
                    )}
                  </div>
                  <div className={`min-h-48 bg-background/50 border ${rewrittenContent ? 'border-success/30' : 'border-border'} rounded-lg p-4 flex flex-col justify-between`}>
                    <div className="max-h-64 overflow-auto custom-scrollbar flex-1">
                      {rewrittenContent ? (
                        <p className="text-sm whitespace-pre-line">{rewrittenContent}</p>
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          Your AI-optimized content will appear here after rewriting...
                        </p>
                      )}
                    </div>
                    {rewrittenContent && (
                      <div className="flex gap-3 mt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => copyToClipboard(rewrittenContent, 'content')}
                        >
                          {copiedKeywords.includes('content') ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy Content
                            </>
                          )}
                        </Button>
                        <Button variant="default" size="sm" className="flex-1">
                          Analyze New Content
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={handleRewrite}
                disabled={!content.trim() || isRewriting || rewrites <= 0 || dailyUsage.isLimitReached}
                className="w-full"
                variant={rewrites > 0 && !dailyUsage.isLimitReached ? "boost" : "outline"}
                size="lg"
              >
                {isRewriting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span className="sm:inline hidden">Rewriting with AI...</span>
                    <span className="inline sm:hidden">Rewriting...</span>
                  </>
                ) : dailyUsage.isLimitReached ? (
                  <>
                    <Lock className="h-4 w-4" />
                    <span className="sm:inline hidden">Daily limit reached</span>
                    <span className="inline sm:hidden">Limit reached</span>
                  </>
                ) : rewrites <= 0 ? (
                  <>
                    <Lock className="h-4 w-4" />
                    <span className="sm:inline hidden">Monthly limit reached</span>
                    <span className="inline sm:hidden">Limit reached</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span className="sm:inline hidden">Rewrite Content with SEO Optimization</span>
                    <span className="inline sm:hidden">Rewrite Content</span>
                  </>
                )}
              </Button>

              {/* Usage Warning */}
              {dailyUsage.remainingWords <= 500 && dailyUsage.remainingWords > 0 && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <p className="text-sm text-warning">
                    ⚠️ Only {dailyUsage.remainingWords} words remaining today. 
                    <Button variant="link" className="p-0 ml-1 text-premium h-auto">
                      Upgrade to Premium
                    </Button> for unlimited daily access.
                  </p>
                </div>
              )}
              
              {rewrites <= 2 && rewrites > 0 && !dailyUsage.isLimitReached && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <p className="text-sm text-warning">
                    ⚠️ Only {rewrites} rewrites remaining this month. 
                    <Button variant="link" className="p-0 ml-1 text-premium h-auto">
                      Upgrade to Premium
                    </Button> for unlimited monthly access.
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
                      <div key={index} className="bg-background/30 border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{keyword.keyword}</span>
                          <div className="flex gap-2">
                            <Badge variant={keyword.performance === 'high' ? 'default' : 'secondary'} className="text-xs">
                              {keyword.performance === 'high' ? 'High SEO' : 'Medium SEO'}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(keyword.keyword, keyword.keyword)}
                            >
                              {copiedKeywords.includes(keyword.keyword) ? (
                                <CheckCircle className="h-3 w-3 text-success" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>Volume:</span>
                            <span className="font-medium">{keyword.volume}/mo</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <span className="font-medium">{keyword.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CPC:</span>
                            <span className="font-medium">{keyword.cpc}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-premium/10 border border-premium/20 rounded-lg p-4">
                    <p className="text-sm text-premium">
                      🚀 <strong>Upgrade to Premium</strong> for 10 keywords with 5+ high-performance keywords and real-time analytics!
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
};

export default AIToolsSection;