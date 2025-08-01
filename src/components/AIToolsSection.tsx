import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import "../styles/custom-scrollbar.css";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Sparkles, Lock, Copy, CheckCircle, Briefcase, MessageCircle, Palette, GraduationCap, Smile, Target, BookOpen, Info, Cog, Star, PenLine, Facebook, Instagram, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

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

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

  const handleRewrite = async () => {
    if (!content.trim() || rewrites <= 0) return;
    
    setIsRewriting(true);
    
    try {
      // This is where you'll call your actual API
      // const response = await fetch('/api/rewrite-content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content, tone, style, platform })
      // });
      // const data = await response.json();
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just return the original content
      // Replace this with actual API response when ready:
      // setRewrittenContent(data.optimizedContent);
      // setKeywordAnalytics(data.keywords);
      setRewrittenContent(content);
      
      // Mock keywords - remove when using real API
      setKeywordAnalytics([
        { keyword: "example-keyword", performance: "high", volume: "10K", difficulty: "medium", cpc: "$3.50" },
        { keyword: "sample-term", performance: "medium", volume: "5K", difficulty: "low", cpc: "$2.20" }
      ]);
      
      setRewrites(prev => prev - 1);
    } catch (error) {
      console.error("Content rewriting failed:", error);
    } finally {
      setIsRewriting(false);
    }
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
                    Rewrites left: {rewrites}/5
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tone Selector */}
                <div className="space-y-3">
                  <Label>Writing Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional"><Briefcase className="inline w-4 h-4 mr-2 align-text-bottom" />Professional</SelectItem>
                      <SelectItem value="conversational"><MessageCircle className="inline w-4 h-4 mr-2 align-text-bottom" />Conversational</SelectItem>
                      <SelectItem value="creative"><Palette className="inline w-4 h-4 mr-2 align-text-bottom" />Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Style Selector */}
                <div className="space-y-3">
                  <Label>Writing Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engaging"><Star className="inline w-4 h-4 mr-2 align-text-bottom" />Engaging</SelectItem>
                      <SelectItem value="informative"><Info className="inline w-4 h-4 mr-2 align-text-bottom" />Informative</SelectItem>
                      <SelectItem value="technical"><Cog className="inline w-4 h-4 mr-2 align-text-bottom" />Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Platform Selector */}
                <div className="space-y-3">
                  <Label>Content Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog"><BookOpen className="inline w-4 h-4 mr-2 align-text-bottom" />Blog</SelectItem>
                      <SelectItem value="social"><Facebook className="inline w-4 h-4 mr-2 align-text-bottom" />Social Media</SelectItem>
                      <SelectItem value="email"><Mail className="inline w-4 h-4 mr-2 align-text-bottom" />Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Content */}
                <div className="space-y-3">
                  <Label>Original Content</Label>
                  <Textarea
                    placeholder="Paste your content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-48 bg-background/50 border-border"
                  />
                  <div className="text-xs text-muted-foreground">
                    {wordCount} words
                  </div>
                </div>

                {/* Optimized Content - Now clean without placeholders */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Optimized Content</Label>
                    {rewrittenContent && (
                      <Badge variant="outline" className="bg-success/20 text-success">
                        Optimized
                      </Badge>
                    )}
                  </div>
                  <div className={`min-h-48 bg-background/50 border rounded-lg p-4 ${rewrittenContent ? 'border-success/30' : 'border-border'}`}>
                    {rewrittenContent ? (
                      <>
                        <div className="max-h-64 overflow-auto custom-scrollbar">
                          <p className="text-sm whitespace-pre-line">{rewrittenContent}</p>
                        </div>
                        <div className="flex gap-3 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(rewrittenContent, 'content')}
                          >
                            {copiedKeywords.includes('content') ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Copy className="h-3 w-3 mr-1" />
                            )}
                            {copiedKeywords.includes('content') ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Your optimized content will appear here...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleRewrite}
                disabled={!content.trim() || isRewriting || rewrites <= 0}
                className="w-full"
                size="lg"
              >
                {isRewriting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Optimize Content
                  </>
                )}
              </Button>

              {keywordAnalytics.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Suggested Keywords</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {keywordAnalytics.map((keyword, index) => (
                      <div key={index} className="bg-background/30 border rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{keyword.keyword}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(keyword.keyword, keyword.keyword)}
                          >
                            {copiedKeywords.includes(keyword.keyword) ? (
                              <CheckCircle className="h-3 w-3 text-success" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <div>Volume: {keyword.volume}/mo</div>
                          <div>Difficulty: {keyword.difficulty}</div>
                        </div>
                      </div>
                    ))}
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