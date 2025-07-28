import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Zap, TrendingUp, Eye, Hash, Lock, Sparkles } from "lucide-react";

interface SEOScore {
  overall: number;
  keyword: number;
  readability: number;
  engagement: number;
}

export default function SEOAnalyzer() {
  const [content, setContent] = useState("");
  const [scores, setScores] = useState<SEOScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasUsedBoost, setHasUsedBoost] = useState(false);

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

  return (
    <div className="space-y-6">
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
          <Textarea
            placeholder="Paste your LinkedIn post, Instagram caption, or any content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-32 bg-background/50 border-border resize-none"
          />
          
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