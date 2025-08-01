import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import "../styles/custom-scrollbar.css";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Sparkles, Lock, Copy, CheckCircle } from 'lucide-react';

const AIToolsSection = () => {
  const [content, setContent] = useState('');
  const [rewrittenContent, setRewrittenContent] = useState('');
  const [tone, setTone] = useState('professional');
  const [style, setStyle] = useState('engaging');
  const [platform, setPlatform] = useState('blog');
  const [isRewriting, setIsRewriting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRewrite = async () => {
    if (!content.trim()) return;
    
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
      
      // TEMPORARY: Just clear the output area until API is connected
      setRewrittenContent('');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
            AI Content Optimizer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get SEO-optimized content tailored for your platform
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-dark border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Content Rewriter
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engaging">Engaging</SelectItem>
                      <SelectItem value="informative">Informative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Original Content</Label>
                  <Textarea
                    placeholder="Paste your content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-48"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Optimized Content</Label>
                  <div className={`min-h-48 border rounded-lg p-4 ${
                    rewrittenContent ? 'border-success/30 bg-success/5' : 'border-border'
                  }`}>
                    {rewrittenContent ? (
                      <>
                        <div className="max-h-64 overflow-auto custom-scrollbar">
                          <p className="whitespace-pre-line">{rewrittenContent}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={copyToClipboard}
                        >
                          {copied ? (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          ) : (
                            <Copy className="h-4 w-4 mr-2" />
                          )}
                          {copied ? 'Copied!' : 'Copy Content'}
                        </Button>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {isRewriting ? 'Optimizing...' : 'Optimized content will appear here'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleRewrite}
                disabled={!content.trim() || isRewriting}
                className="w-full"
                size="lg"
              >
                {isRewriting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Optimize Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;