import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import "../styles/custom-scrollbar.css";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, Eye, Hash, Lock, Sparkles, Globe, AlertTriangle, CheckCircle, XCircle, Copy, Code, Tag, Users, BarChart, Clock } from "lucide-react";

interface SEOScore {
  overall: number;
  keyword: number;
  readability: number;
  engagement: number;
}

interface SEOIssue {
  type: 'error' | 'warning' | 'success';
  category: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
}

interface WebsiteSEOData {
  url: string;
  title?: string;
  metaDescription?: string;
  issues: SEOIssue[];
  score: SEOScore;
  framework?: string;
  keywords?: string[];
  isEcommerce?: boolean;
}

interface ContentAnalytics {
  estimatedReach: number;
  demographics: {
    ageGroup: string;
    percentage: number;
  }[];
  professions: {
    profession: string;
    percentage: number;
  }[];
  engagement: {
    avgClicks: number;
    avgViews: number;
    avgShares: number;
    avgComments: number;
  };
  bestTimeToPost: string;
  platform: string;
}

export default function SEOAnalyzer() {
  const [content, setContent] = useState("");
  const [scores, setScores] = useState<SEOScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteSEO, setWebsiteSEO] = useState<WebsiteSEOData | null>(null);
  const [isAnalyzingWebsite, setIsAnalyzingWebsite] = useState(false);
  const [contentUrl, setContentUrl] = useState("");
  const [contentAnalytics, setContentAnalytics] = useState<ContentAnalytics | null>(null);
  const [isAnalyzingContent, setIsAnalyzingContent] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-danger";
  };

  const getIssueIcon = (type: 'error' | 'warning' | 'success') => {
    switch (type) {
      case 'error':
        return <XCircle className="h-4 w-4 text-danger" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section id="analyzer" className="py-16">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Own Your
            <span className="bg-gradient-purple bg-clip-text text-transparent"> SEO Insights</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Instantly audit your website and content for SEO, readability, and engagement. Get actionable insights and boost your rankings.
          </p>
        </div>
        <div className="space-y-6">
          {/* Website SEO Analyzer - First section */}
          <Card className="max-w-6xl mx-auto bg-gradient-dark border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Globe className="h-5 w-5 text-primary" />
                Website SEO Analyzer
                <Badge variant="secondary" className="ml-auto">Free</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="url"
                  placeholder="Enter your website URL"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="flex-1 bg-background/50 border-border"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && websiteUrl.trim() && !isAnalyzingWebsite) {
                      setIsAnalyzingWebsite(true);
                      setTimeout(() => {
                        setIsAnalyzingWebsite(false);
                      }, 2000);
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    setIsAnalyzingWebsite(true);
                    setTimeout(() => {
                      setIsAnalyzingWebsite(false);
                    }, 2000);
                  }}
                  disabled={!websiteUrl.trim() || isAnalyzingWebsite}
                  variant="default"
                >
                  {isAnalyzingWebsite ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" />
                      Analyze Website
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content SEO Analyzer - Second section with reordered tabs */}
          <Card className="max-w-6xl mx-auto bg-gradient-dark border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Tag className="h-5 w-5 text-primary" />
                Content SEO Analyzer
                <Badge variant="secondary" className="ml-auto">Hot</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full md:w-1/2 md:m-auto lg:w-1/3 grid-cols-2 bg-secondary">
                  <TabsTrigger value="text" className="text-xs sm:text-sm">
                    <Code className="h-4 w-4 mr-2 hidden sm:block" />
                    Written Content
                  </TabsTrigger>
                  <TabsTrigger value="url" className="text-xs sm:text-sm">
                    <Globe className="h-4 w-4 mr-2 hidden sm:block" />
                    Published URL
                  </TabsTrigger>
                </TabsList>

                {/* Analyze by Script - First tab */}
                <TabsContent value="text" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[0.8rem] sm:text-sm font-medium text-foreground">
                        Content Script
                      </label>
                      <Badge variant="outline" className="text-xs">
                        {wordCount} words
                      </Badge>
                    </div>
                    <Textarea
                      placeholder="Paste your content here for SEO analysis..."
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                        setWordCount(e.target.value.split(/\s+/).filter(word => word.length > 0).length);
                      }}
                      className="min-h-[150px] bg-background/50 border-border resize-none custom-scrollbar"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {wordCount} words
                      </span>
                      <Button
                        onClick={() => {
                          setIsAnalyzing(true);
                          setTimeout(() => {
                            setIsAnalyzing(false);
                          }, 2000);
                        }}
                        disabled={!content.trim() || isAnalyzing}
                        variant="default"
                        size="sm"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <BarChart className="h-4 w-4" />
                            Analyze Script
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Analyze by URL - Second tab */}
                <TabsContent value="url" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-[0.8rem] sm:text-sm font-medium text-foreground">
                      Content URL (Blog Post, Article, Social Media Post)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="url"
                        placeholder="Enter content URL"
                        value={contentUrl}
                        onChange={(e) => setContentUrl(e.target.value)}
                        className="flex-1 bg-background/50 border-border"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && contentUrl.trim() && !isAnalyzingContent) {
                            setIsAnalyzingContent(true);
                            setTimeout(() => {
                              setIsAnalyzingContent(false);
                            }, 2000);
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          setIsAnalyzingContent(true);
                          setTimeout(() => {
                            setIsAnalyzingContent(false);
                          }, 2000);
                        }}
                        disabled={!contentUrl.trim() || isAnalyzingContent}
                        variant="default"
                      >
                        {isAnalyzingContent ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <BarChart className="h-4 w-4" />
                            Analyze Content
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Content Analytics Results Placeholder */}
          {false && ( // Disabled for now - will be populated by your API later
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary animate-glow" />
                  Content Analytics Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Content will be populated by your API */}
              </CardContent>
            </Card>
          )}

          {/* Website SEO Results Placeholder */}
          {false && ( // Disabled for now - will be populated by your API later
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary animate-glow" />
                  Website SEO Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Content will be populated by your API */}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}