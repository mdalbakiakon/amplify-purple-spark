import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Zap, TrendingUp, Eye, Hash, Lock, Sparkles, Globe, AlertTriangle, CheckCircle, XCircle, Copy, Code, Tag } from "lucide-react";

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

  const generateKeywords = (domain: string, isEcommerce: boolean): string[] => {
    const baseKeywords = domain.split('.')[0].split('-').join(' ');
    const industryKeywords = isEcommerce 
      ? ['online store', 'buy online', 'best price', 'shop now', 'free shipping']
      : ['services', 'professional', 'expert', 'solutions', 'consulting'];
    
    return [
      baseKeywords,
      `${baseKeywords} services`,
      `best ${baseKeywords}`,
      `${baseKeywords} near me`,
      industryKeywords[Math.floor(Math.random() * industryKeywords.length)]
    ].slice(0, 5);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateMetaTags = (seoData: WebsiteSEOData) => {
    const domain = seoData.url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    const businessName = domain.charAt(0).toUpperCase() + domain.slice(1).replace(/\.(com|org|net|io)/, '');
    
    return {
      title: `${businessName} - ${seoData.isEcommerce ? 'Best Products Online' : 'Professional Services'} | ${seoData.keywords?.[0] || 'Top Quality'}`,
      description: `Discover ${businessName}'s ${seoData.isEcommerce ? 'premium products with fast shipping' : 'expert services'}. ${seoData.keywords?.slice(0,2).join(', ')} and more. Get started today!`,
      openGraph: `<meta property="og:title" content="${businessName} - Professional ${seoData.isEcommerce ? 'Store' : 'Services'}" />
<meta property="og:description" content="Experience quality ${seoData.keywords?.[0]} services. Trusted by thousands of customers." />
<meta property="og:image" content="${seoData.url}/og-image.jpg" />
<meta property="og:url" content="${seoData.url}" />`,
      schema: seoData.isEcommerce ? `{
  "@context": "https://schema.org/",
  "@type": "Store",
  "name": "${businessName}",
  "image": "${seoData.url}/logo.jpg",
  "description": "Premium ${seoData.keywords?.[0]} products online"
}` : `{
  "@context": "https://schema.org/",
  "@type": "ProfessionalService",
  "name": "${businessName}",
  "description": "Expert ${seoData.keywords?.[0]} services"
}`
    };
  };

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
    
    // Extract domain for consistent analysis
    const domain = websiteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    
    // Generate consistent analysis based on URL hash
    const urlHash = domain.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Determine framework and type consistently
    const frameworks = ['WordPress', 'React', 'Shopify', 'Wix', 'Squarespace'];
    const framework = frameworks[Math.abs(urlHash) % frameworks.length];
    const isEcommerce = Math.abs(urlHash) % 3 === 0;
    
    // Generate consistent SEO issues based on domain
    const allPossibleIssues: SEOIssue[] = [
      {
        type: 'error',
        category: 'Meta Tags',
        message: 'Missing meta description - Critical for search rankings',
        impact: 'high'
      },
      {
        type: 'warning',
        category: 'Title Tag',
        message: 'Title tag exceeds 60 characters - May be truncated in search results',
        impact: 'medium'
      },
      {
        type: 'error',
        category: 'Headers',
        message: 'Multiple H1 tags found - Should have only one H1 per page',
        impact: 'high'
      },
      {
        type: 'warning',
        category: 'Images',
        message: '5 images missing alt attributes - Affects accessibility and SEO',
        impact: 'medium'
      },
      {
        type: 'error',
        category: 'Performance',
        message: 'Page load speed is slow (4.2s) - Recommended under 3s',
        impact: 'high'
      },
      {
        type: 'warning',
        category: 'Keywords',
        message: 'Low keyword density (0.8%) - Recommended 1-3%',
        impact: 'medium'
      },
      {
        type: 'error',
        category: 'Internal Links',
        message: 'Insufficient internal linking - Add more contextual links',
        impact: 'medium'
      },
      {
        type: 'warning',
        category: 'Mobile',
        message: 'Mobile viewport not optimized - May affect mobile rankings',
        impact: 'high'
      },
      {
        type: 'error',
        category: 'Schema',
        message: 'Missing structured data markup - Add Schema.org markup',
        impact: 'medium'
      },
      {
        type: 'success',
        category: 'SSL',
        message: 'HTTPS properly configured',
        impact: 'low'
      }
    ];
    
    // Select consistent issues based on URL hash
    const mockIssues: SEOIssue[] = allPossibleIssues.filter((_, index) => 
      (Math.abs(urlHash + index) % 3) !== 0
    ).slice(0, 6);
    
    // Generate consistent scores based on URL hash
    const baseScore = 35 + (Math.abs(urlHash) % 40);
    const mockScores = {
      overall: Math.max(35, Math.min(85, baseScore + (urlHash % 10))),
      keyword: Math.max(40, Math.min(80, baseScore + ((urlHash * 2) % 15))),
      readability: Math.max(45, Math.min(90, baseScore + ((urlHash * 3) % 20))),
      engagement: Math.max(40, Math.min(85, baseScore + ((urlHash * 4) % 12))),
    };
    
    // Generate consistent keyword suggestions based on domain
    const domainName = domain.split('.')[0];
    const keywordSuggestions = [
      { 
        keyword: `${domainName} services`, 
        difficulty: 'medium', 
        volume: `${2 + (Math.abs(urlHash) % 5)}.${(Math.abs(urlHash * 2) % 9) + 1}K`, 
        cpc: `$${(2 + (Math.abs(urlHash) % 3)).toFixed(2)}0` 
      },
      { 
        keyword: `best ${domainName}`, 
        difficulty: 'high', 
        volume: `${8 + (Math.abs(urlHash * 3) % 10)}.${(Math.abs(urlHash * 4) % 9) + 1}K`, 
        cpc: `$${(3 + (Math.abs(urlHash * 2) % 3)).toFixed(2)}0` 
      },
      { 
        keyword: `${domainName} reviews`, 
        difficulty: 'low', 
        volume: `${1 + (Math.abs(urlHash * 5) % 4)}.${(Math.abs(urlHash * 6) % 9) + 1}K`, 
        cpc: `$${(1 + (Math.abs(urlHash * 3) % 2)).toFixed(2)}0` 
      },
      { 
        keyword: `top ${domainName} company`, 
        difficulty: 'medium', 
        volume: `${3 + (Math.abs(urlHash * 7) % 6)}.${(Math.abs(urlHash * 8) % 9) + 1}K`, 
        cpc: `$${(2 + (Math.abs(urlHash * 4) % 2)).toFixed(2)}0` 
      },
      { 
        keyword: `${domainName} near me`, 
        difficulty: 'low', 
        volume: `${5 + (Math.abs(urlHash * 9) % 8)}.${(Math.abs(urlHash * 10) % 9) + 1}K`, 
        cpc: `$${(2 + (Math.abs(urlHash * 5) % 3)).toFixed(2)}0` 
      },
    ];
    
    setWebsiteSEO({
      url: websiteUrl,
      title: `Home - ${domain.charAt(0).toUpperCase() + domain.slice(1)}`,
      metaDescription: Math.abs(urlHash) % 2 === 0 ? 'Basic meta description found - needs optimization' : undefined,
      issues: mockIssues,
      score: mockScores,
      framework,
      keywords: keywordSuggestions.map(k => k.keyword),
      isEcommerce
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

            {/* Copyable Meta Tags & Solutions */}
            {websiteSEO && (
              <>
                {/* Suggested Keywords */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    🎯 Suggested Keywords (Free Plan - 5 keywords):
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {websiteSEO.keywords?.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => copyToClipboard(keyword)}>
                        {keyword}
                        <Copy className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Copyable Meta Tags */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    📋 Copy & Paste These Meta Tags:
                  </h4>
                  
                  {(() => {
                    const metaTags = generateMetaTags(websiteSEO);
                    return (
                      <div className="space-y-4">
                        {/* Title Tag */}
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-muted-foreground">OPTIMIZED TITLE TAG</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => copyToClipboard(`<title>${metaTags.title}</title>`)}
                              className="h-6 text-xs"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <code className="text-xs text-foreground break-all">
                            &lt;title&gt;{metaTags.title}&lt;/title&gt;
                          </code>
                        </div>

                        {/* Meta Description */}
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-muted-foreground">OPTIMIZED META DESCRIPTION</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => copyToClipboard(`<meta name="description" content="${metaTags.description}" />`)}
                              className="h-6 text-xs"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <code className="text-xs text-foreground break-all">
                            &lt;meta name="description" content="{metaTags.description}" /&gt;
                          </code>
                        </div>

                        {/* Open Graph Tags */}
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-muted-foreground">SOCIAL MEDIA (OPEN GRAPH) TAGS</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => copyToClipboard(metaTags.openGraph)}
                              className="h-6 text-xs"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <code className="text-xs text-foreground whitespace-pre-wrap break-all">
                            {metaTags.openGraph}
                          </code>
                        </div>

                        {/* Schema Markup */}
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-muted-foreground">SCHEMA MARKUP (JSON-LD)</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => copyToClipboard(`<script type="application/ld+json">${metaTags.schema}</script>`)}
                              className="h-6 text-xs"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <code className="text-xs text-foreground whitespace-pre-wrap break-all">
                            &lt;script type="application/ld+json"&gt;{metaTags.schema}&lt;/script&gt;
                          </code>
                        </div>

                        {/* Framework-specific Instructions */}
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-muted-foreground">
                              📝 IMPLEMENTATION GUIDE FOR {websiteSEO.framework?.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            {websiteSEO.framework === 'WordPress' && (
                              <div>
                                • Install Yoast SEO or RankMath plugin<br/>
                                • Add meta tags in theme's header.php or use plugin interface<br/>
                                • Use featured images for og:image tags
                              </div>
                            )}
                            {websiteSEO.framework === 'React' && (
                              <div>
                                • Use React Helmet for dynamic meta tags<br/>
                                • Add meta tags to public/index.html for static content<br/>
                                • Consider Next.js for better SEO with SSR
                              </div>
                            )}
                            {websiteSEO.framework === 'Shopify' && (
                              <div>
                                • Edit theme.liquid file in theme editor<br/>
                                • Use Shopify's built-in SEO fields for products<br/>
                                • Install SEO apps for advanced features
                              </div>
                            )}
                            {(websiteSEO.framework === 'Wix' || websiteSEO.framework === 'Squarespace') && (
                              <div>
                                • Use platform's built-in SEO tools<br/>
                                • Add meta tags in page settings<br/>
                                • Upload custom og:image in social media settings
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </>
            )}

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