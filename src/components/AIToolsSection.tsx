import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import "../styles/custom-scrollbar.css";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Sparkles, Lock, Copy, CheckCircle, Briefcase, MessageCircle, Palette, GraduationCap, Smile, Target, BookOpen, Info, Book, Cog, Star, PenLine, Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, AlertCircle } from 'lucide-react';

const AIToolsSection = () => {
  const [content, setContent] = useState('');
  const [rewrittenContent, setRewrittenContent] = useState('');
  const [tone, setTone] = useState('professional');
  const [style, setStyle] = useState('engaging');
  const [platform, setPlatform] = useState('blog');
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrites, setRewrites] = useState(5);
  const [copied, setCopied] = useState(false);

  const handleRewrite = async () => {
    if (!content.trim() || rewrites <= 0) return;
    
    setIsRewriting(true);
    
    try {
      /* 
      REAL API INTEGRATION POINT:
      const response = await fetch('/api/rewrite-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, tone, style, platform })
      });
      const data = await response.json();
      setRewrittenContent(data.optimizedContent);
      */
      
      // Temporary simulation - will be replaced with real API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRewrittenContent("Your optimized content will appear here when the API is connected");
      
      setRewrites(prev => prev - 1);
    } catch (error) {
      console.error("Content rewriting failed:", error);
    } finally {
      setIsRewriting(false);
    }
  };

  const copyToClipboard = async () => {
    if (!rewrittenContent) return;
    try {
      await navigator.clipboard.writeText(rewrittenContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
                      <SelectItem value="academic"><GraduationCap className="inline w-4 h-4 mr-2 align-text-bottom" />Academic</SelectItem>
                      <SelectItem value="casual"><Smile className="inline w-4 h-4 mr-2 align-text-bottom" />Casual</SelectItem>
                      <SelectItem value="persuasive"><Target className="inline w-4 h-4 mr-2 align-text-bottom" />Persuasive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Writing Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engaging"><Star className="inline w-4 h-4 mr-2 align-text-bottom" />Engaging</SelectItem>
                      <SelectItem value="informative"><Info className="inline w-4 h-4 mr-2 align-text-bottom" />Informative</SelectItem>
                      <SelectItem value="storytelling"><BookOpen className="inline w-4 h-4 mr-2 align-text-bottom" />Storytelling</SelectItem>
                      <SelectItem value="technical"><Cog className="inline w-4 h-4 mr-2 align-text-bottom" />Technical</SelectItem>
                      <SelectItem value="inspirational"><PenLine className="inline w-4 h-4 mr-2 align-text-bottom" />Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Content Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog"><Book className="inline w-4 h-4 mr-2 align-text-bottom" />Blog Post</SelectItem>
                      <SelectItem value="facebook"><Facebook className="inline w-4 h-4 mr-2 align-text-bottom" />Facebook Post</SelectItem>
                      <SelectItem value="instagram"><Instagram className="inline w-4 h-4 mr-2 align-text-bottom" />Instagram Post</SelectItem>
                      <SelectItem value="twitter"><Twitter className="inline w-4 h-4 mr-2 align-text-bottom" />X (Twitter) Post</SelectItem>
                      <SelectItem value="linkedin"><Linkedin className="inline w-4 h-4 mr-2 align-text-bottom" />LinkedIn Post</SelectItem>
                      <SelectItem value="youtube"><Youtube className="inline w-4 h-4 mr-2 align-text-bottom" />YouTube Description</SelectItem>
                      <SelectItem value="email"><Mail className="inline w-4 h-4 mr-2 align-text-bottom" />Email Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Original Content */}
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Original Content</Label>
                    <span className="text-xs text-muted-foreground">
                      {content.split(/\s+/).filter(word => word.length > 0).length} words
                    </span>
                  </div>
                  <Textarea
                    placeholder="Paste your content here to optimize with AI..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 min-h-[200px] bg-background/50 border-border resize-none custom-scrollbar"
                  />
                </div>

                {/* Optimized Content */}
                <div className="flex flex-col h-full relative">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Optimized Content</Label>
                    <div className="flex gap-2">
                      {rewrittenContent && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={copyToClipboard}
                          >
                            {copied ? (
                              <CheckCircle className="h-3.5 w-3.5" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            className="h-8"
                          >
                            Analyze
                          </Button>
                        </>
                      )}
                      {rewrittenContent && (
                        <Badge variant="outline" className="bg-success/20 text-success border-success/30 h-8">
                          <Sparkles className="h-3.5 w-3.5 mr-1" />
                          Optimized
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className={`flex-1 min-h-[200px] bg-background/50 border ${
                    rewrittenContent ? 'border-success/30' : 'border-border'
                  } rounded-lg p-4 flex relative`}>
                    {rewrites <= 0 && rewrittenContent && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg flex flex-col items-center justify-center gap-2">
                        <Lock className="h-8 w-8 text-warning" />
                        <p className="text-center font-medium">Limit Reached</p>
                        <p className="text-sm text-center text-muted-foreground max-w-xs">
                          Upgrade to Premium to access the boosted content
                        </p>
                        <Button variant="premium" size="sm" className="mt-2">
                          Upgrade Now
                        </Button>
                      </div>
                    )}
                    {rewrittenContent ? (
                      <div className="w-full max-h-[calc(200px-2rem)] overflow-auto custom-scrollbar">
                        <p className="whitespace-pre-line text-sm">{rewrittenContent}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm m-auto">
                        {isRewriting ? 'Optimizing your content...' : 'Your optimized content will appear here'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleRewrite}
                disabled={!content.trim() || isRewriting || rewrites <= 0}
                className="w-full hover:bg-primary hover:text-primary-foreground"
                variant={rewrites > 0 ? "default" : "outline"}
                size="lg"
              >
                {isRewriting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Optimizing...
                  </>
                ) : rewrites <= 0 ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Rewrite limit reached
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Optimize Content with AI
                  </>
                )}
              </Button>

              {rewrites <= 2 && rewrites > 0 && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-warning" />
                    <p className="text-sm text-warning">
                      Only {rewrites} rewrites remaining this month. Upgrade to Premium for unlimited access.
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