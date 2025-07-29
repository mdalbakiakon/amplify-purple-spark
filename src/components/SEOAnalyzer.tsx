import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Zap, TrendingUp, Eye, Hash, Lock, Sparkles, Globe, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

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
}

export default function SEOAnalyzer() {
  const [content, setContent] = useState("");
  const [scores, setScores] = useState<SEOScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasUsedBoost, setHasUsedBoost] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteSEO, setWebsiteSEO] = useState<WebsiteSEOData | null>(null);
  const [isAnalyzingWebsite, setIsAnalyzingWebsite] = useState(false);
  const FREE_WORD_LIMIT = 2500;

  // Mock SEO analysis function
  const analyzeContent = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockScores: SEOScore = {
      overall: Math.floor(Math.random() * 40) + 60, // 60-100
      keyword: Math.floor(Math.random() * 30) + 50,  // 50-80
      readability: Math.floor(Math.random() * 25) + 70, // 70-95
      engagement: Math.floor(Math.random() * 35) + 45   // 45-80
    };
    
    setScores(mockScores);
    setIsAnalyzing(false);
  };

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

  const handleBoost = async () => {
    if (hasUsedBoost) return;
    
    setIsAnalyzing(true);
    
    // Simulate SEO optimization process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate SEO-optimized content with better keywords
    const optimizedContent = generateSEOContent(content);
    setContent(optimizedContent);
    
    // Update scores to reflect optimization
    if (scores) {
      setScores({
        overall: Math.min(95, scores.overall + 15),
        keyword: Math.min(95, scores.keyword + 20),
        readability: Math.min(95, scores.readability + 10),
        engagement: Math.min(95, scores.engagement + 18)
      });
      setHasUsedBoost(true);
    }
    
    setIsAnalyzing(false);
  };

  const analyzeWebsite = async () => {
    setIsAnalyzingWebsite(true);
    
    // Simulate website crawling and analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock SEO issues and suggestions
    const mockIssues: SEOIssue[] = [
      {
        type: 'error',
        category: 'Meta Tags',
        message: 'Missing meta description - crucial for search rankings',
        impact: 'high'
      },
      {
        type: 'warning',
        category: 'Title Tag',
        message: 'Title tag is too long (65+ characters)',
        impact: 'medium'
      },
      {
        type: 'error',
        category: 'Headers',
        message: 'Missing H1 tag - important for content structure',
        impact: 'high'
      },
      {
        type: 'warning',
        category: 'Images',
        message: '3 images missing alt tags',
        impact: 'medium'
      },
      {
        type: 'success',
        category: 'Performance',
        message: 'Page load speed is good',
        impact: 'low'
      },
      {
        type: 'error',
        category: 'Content',
        message: 'Low keyword density - add more relevant keywords',
        impact: 'high'
      },
      {
        type: 'warning',
        category: 'Schema',
        message: 'Missing structured data markup',
        impact: 'medium'
      }
    ];
    
    const mockScores: SEOScore = {
      overall: Math.floor(Math.random() * 30) + 45, // 45-75 (websites usually score lower)
      keyword: Math.floor(Math.random() * 25) + 40,  // 40-65
      readability: Math.floor(Math.random() * 30) + 60, // 60-90
      engagement: Math.floor(Math.random() * 25) + 50   // 50-75
    };
    
    setWebsiteSEO({
      url: websiteUrl,
      title: `Mock Title for ${websiteUrl}`,
      metaDescription: Math.random() > 0.5 ? 'Mock meta description found' : undefined,
      issues: mockIssues,
      score: mockScores
    });
    
    setIsAnalyzingWebsite(false);
  };

  const generateSEOContent = (originalContent: string): string => {
    // Enhanced SEO optimization logic
    let optimizedContent = originalContent;
    
    // Add power words for better engagement
    const powerWords = ['ultimate', 'proven', 'essential', 'game-changing', 'breakthrough', 'exclusive'];
    const randomPowerWord = powerWords[Math.floor(Math.random() * powerWords.length)];
    
    // Enhance with SEO keywords based on content type
    if (originalContent.toLowerCase().includes('linkedin') || originalContent.toLowerCase().includes('professional')) {
      optimizedContent = optimizedContent.replace(/\b(tips|advice|strategy)\b/gi, (match) => 
        `${randomPowerWord} ${match.toLowerCase()}`);
      optimizedContent += '\n\n#ProfessionalGrowth #CareerTips #LinkedInStrategy #BusinessSuccess';
    } else if (originalContent.toLowerCase().includes('instagram') || originalContent.toLowerCase().includes('social')) {
      optimizedContent += '\n\n#Trending #ViralContent #SocialMediaGrowth #ContentCreator #EngagementBoost';
    } else {
      // General content optimization
      optimizedContent = optimizedContent.replace(/\b(important|good|great)\b/gi, (match) => 
        `${randomPowerWord}`);
      optimizedContent += '\n\n#ContentMarketing #SEOOptimized #DigitalMarketing #OnlinePresence';
    }
    
    // Add compelling call-to-action if missing
    if (!optimizedContent.includes('?') && !optimizedContent.includes('comment') && !optimizedContent.includes('share')) {
      optimizedContent += '\n\n💬 What are your thoughts? Share your experience in the comments below!';
    }
    
    // Optimize for readability - break long sentences
    optimizedContent = optimizedContent.replace(/([.!?])\s*([A-Z])/g, '$1\n\n$2');
    
    return optimizedContent;
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

  return (
    <div className="space-y-6">
      {/* Website SEO Analyzer */}
      <Card className="bg-gradient-dark border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="h-5 w-5 text-primary" />
            Website SEO Analyzer
            <Badge variant="secondary" className="ml-auto">Free</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              type="url"
              placeholder="Enter your website URL (e.g., https://example.com)"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="flex-1 bg-background/50 border-border"
            />
            <Button 
              onClick={analyzeWebsite}
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
                  Analyze SEO of your site or blog or post
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Website SEO Results */}
      {websiteSEO && (
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-glow" />
              Website SEO Analysis - {websiteSEO.url}
              <Badge variant="outline" className={`ml-auto ${getScoreColor(websiteSEO.score.overall)}`}>
                {websiteSEO.score.overall}% Overall
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Website Meta Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Page Title:</span>
                <p className="text-sm mt-1">{websiteSEO.title}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Meta Description:</span>
                <p className="text-sm mt-1">{websiteSEO.metaDescription || 'Not found'}</p>
              </div>
            </div>

            {/* SEO Issues */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">🔍 SEO Issues & Suggestions:</h4>
              <div className="space-y-2">
                {websiteSEO.issues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/10 rounded-lg">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{issue.category}</span>
                        <Badge variant="outline" className="text-xs">
                          {issue.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{issue.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Website Scores */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall</span>
                  <span className={`text-sm font-bold ${getScoreColor(websiteSEO.score.overall)}`}>
                    {websiteSEO.score.overall}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={websiteSEO.score.overall} className="h-2" />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor(websiteSEO.score.overall)}`}
                    style={{ width: `${websiteSEO.score.overall}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Keywords</span>
                  <span className={`text-sm font-bold ${getScoreColor(websiteSEO.score.keyword)}`}>
                    {websiteSEO.score.keyword}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={websiteSEO.score.keyword} className="h-2" />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor(websiteSEO.score.keyword)}`}
                    style={{ width: `${websiteSEO.score.keyword}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Readability</span>
                  <span className={`text-sm font-bold ${getScoreColor(websiteSEO.score.readability)}`}>
                    {websiteSEO.score.readability}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={websiteSEO.score.readability} className="h-2" />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor(websiteSEO.score.readability)}`}
                    style={{ width: `${websiteSEO.score.readability}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Engagement</span>
                  <span className={`text-sm font-bold ${getScoreColor(websiteSEO.score.engagement)}`}>
                    {websiteSEO.score.engagement}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={websiteSEO.score.engagement} className="h-2" />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor(websiteSEO.score.engagement)}`}
                    style={{ width: `${websiteSEO.score.engagement}%` }}
                  />
                </div>
              </div>
            </div>

            {/* AI Rewriter Suggestion */}
            <div className="bg-premium/10 border border-premium/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-premium mt-0.5" />
                <div>
                  <h4 className="font-medium text-premium-foreground mb-2">🚀 Want to improve your content ranking?</h4>
                  <p className="text-sm text-premium-foreground/80 mb-3">
                    Our AI Content Rewriter can create SEO-optimized content based on your website analysis. 
                    Get content that's perfectly tailored to rank #1 in search results!
                  </p>
                  <div className="text-xs text-premium-foreground/60">
                    ✨ Copy your existing content below and use our AI Content Rewriter for instant SEO optimization
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Input */}
      <Card className="bg-gradient-dark border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            SEO Content Analyzer
            <Badge variant="secondary" className="ml-auto">Free</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Paste your LinkedIn post, Instagram caption, or any content here..."
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
              className="min-h-32 bg-background/50 border-border resize-none"
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
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={analyzeContent}
              disabled={!content.trim() || isAnalyzing}
              className="flex-1"
              variant="default"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Analyze SEO
                </>
              )}
            </Button>
            
            {scores && (
              <Button 
                onClick={handleBoost}
                disabled={hasUsedBoost}
                variant={hasUsedBoost ? "outline" : "boost"}
                className="flex-1 sm:flex-none"
              >
                {hasUsedBoost ? (
                  <>
                    <Lock className="h-4 w-4" />
                    Boost Used (1/1)
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Boost SEO
                  </>
                )}
              </Button>
            )}
          </div>
          
          {hasUsedBoost && (
            <div className="bg-premium/10 border border-premium/20 rounded-lg p-3">
              <p className="text-sm text-premium-foreground">
                💡 <strong>Weekly limit reached!</strong> Upgrade to Premium for unlimited SEO boosts.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO Scores */}
      {scores && (
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-glow" />
              SEO Analysis Results
              <Badge variant="outline" className={`ml-auto ${getScoreColor(scores.overall)}`}>
                {scores.overall}% Overall
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Overall SEO Score</span>
                <span className={`font-bold ${getScoreColor(scores.overall)}`}>
                  {scores.overall}%
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={scores.overall} 
                  className="h-3 bg-muted/30"
                />
                <div 
                  className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ${getProgressColor(scores.overall)}`}
                  style={{ width: `${scores.overall}%` }}
                />
              </div>
            </div>

            {/* Individual Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Keywords</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Optimization</span>
                    <span className={`text-xs font-medium ${getScoreColor(scores.keyword)}`}>
                      {scores.keyword}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={scores.keyword} className="h-2" />
                    <div 
                      className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor(scores.keyword)}`}
                      style={{ width: `${scores.keyword}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Readability</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className={`text-xs font-medium ${getScoreColor(scores.readability)}`}>
                      {scores.readability}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={scores.readability} className="h-2" />
                    <div 
                      className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor(scores.readability)}`}
                      style={{ width: `${scores.readability}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Engagement</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Potential</span>
                    <span className={`text-xs font-medium ${getScoreColor(scores.engagement)}`}>
                      {scores.engagement}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={scores.engagement} className="h-2" />
                    <div 
                      className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor(scores.engagement)}`}
                      style={{ width: `${scores.engagement}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">💡 Quick Improvements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {scores.keyword < 70 && <li>• Add more relevant keywords naturally</li>}
                {scores.readability < 80 && <li>• Break up long sentences for better readability</li>}
                {scores.engagement < 70 && <li>• Include a clear call-to-action</li>}
                <li>• Use the "Boost SEO" feature for instant optimization</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}