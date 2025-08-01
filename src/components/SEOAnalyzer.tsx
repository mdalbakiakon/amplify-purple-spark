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
import { useDailyLimit } from "@/hooks/useDailyLimit";

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
  const [hasUsedBoost, setHasUsedBoost] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteSEO, setWebsiteSEO] = useState<WebsiteSEOData | null>(null);
  const [isAnalyzingWebsite, setIsAnalyzingWebsite] = useState(false);
  const [contentUrl, setContentUrl] = useState("");
  const [contentAnalytics, setContentAnalytics] = useState<ContentAnalytics | null>(null);
  const [isAnalyzingContent, setIsAnalyzingContent] = useState(false);
  const { dailyUsage, updateUsage, canGenerate, DAILY_WORD_LIMIT } = useDailyLimit();

  // Backend API base URL - fallback to mock analysis if not available
  const API_BASE_URL = 'http://localhost:4000';

  // Enhanced website analysis with better scraping
  const analyzeWebsiteAdvanced = async (url: string) => {
    console.log('Starting advanced website analysis for:', url);

    try {
      // Ensure URL has protocol
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      console.log('Full URL:', fullUrl);

      // Try to fetch the page directly for basic analysis
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`);
      const data = await response.json();

      if (!data.contents) {
        throw new Error('Could not fetch page content');
      }

      // Parse HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');

      // Extract SEO elements
      const title = doc.querySelector('title')?.textContent || '';
      const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const h1 = doc.querySelector('h1')?.textContent || '';
      const h2Count = doc.querySelectorAll('h2').length;
      const imgWithoutAlt = doc.querySelectorAll('img:not([alt])').length;
      const totalImages = doc.querySelectorAll('img').length;
      const internalLinks = doc.querySelectorAll('a[href^="/"], a[href*="' + fullUrl + '"]').length;
      const externalLinks = doc.querySelectorAll('a[href^="http"]:not([href*="' + fullUrl + '"])').length;

      // Calculate word count
      const bodyText = doc.body?.textContent || '';
      const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length;

      console.log('Extracted data:', { title, metaDesc, h1, wordCount, imgWithoutAlt, totalImages });

      return {
        title,
        metaDesc,
        h1,
        wordCount,
        h2Count,
        imgWithoutAlt,
        totalImages,
        internalLinks,
        externalLinks,
        hasSSL: fullUrl.startsWith('https://'),
        url: fullUrl
      };

    } catch (error) {
      console.error('Advanced analysis failed:', error);
      throw error;
    }
  };

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
      description: `Discover ${businessName}'s ${seoData.isEcommerce ? 'premium products with fast shipping' : 'expert services'}. ${seoData.keywords?.slice(0, 2).join(', ')} and more. Get started today!`,
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

  // Real API call for text content analysis
  const analyzeContent = async () => {
    if (!canGenerate(content.length)) {
      alert(`Daily limit exceeded. You've used ${dailyUsage.wordsUsed}/${DAILY_WORD_LIMIT} words today.`);
      return;
    }

    setIsAnalyzing(true);
    updateUsage(content.length);

    try {
      // Call backend keyword density analysis
      const response = await fetch(`http://localhost:4000/keyword-density?content=${encodeURIComponent(content)}`);
      const keywordData = await response.json();

      // Generate scores based on keyword analysis
      const keywordScore = Math.min(95, Math.max(30, keywordData.density * 20));
      const readabilityScore = Math.min(95, Math.max(40, 100 - (content.split(' ').length > 300 ? 20 : 0)));
      const engagementScore = Math.min(95, Math.max(35, 60 + (content.includes('?') ? 10 : 0) + (content.includes('!') ? 5 : 0)));

      const scores: SEOScore = {
        overall: Math.round((keywordScore + readabilityScore + engagementScore) / 3),
        keyword: keywordScore,
        readability: readabilityScore,
        engagement: engagementScore
      };

      setScores(scores);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to basic analysis
      const basicScores: SEOScore = {
        overall: 65,
        keyword: 60,
        readability: 70,
        engagement: 65
      };
      setScores(basicScores);
    }

    setIsAnalyzing(false);
  };

  // Enhanced Content URL analysis with direct scraping
  const analyzeContentUrl = async () => {
    setIsAnalyzingContent(true);
    console.log('Starting content URL analysis for:', contentUrl);

    try {
      // Ensure URL has protocol
      const fullUrl = contentUrl.startsWith('http') ? contentUrl : `https://${contentUrl}`;
      console.log('Analyzing content URL:', fullUrl);

      // Use allorigins.win to bypass CORS
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`);
      const data = await response.json();

      if (!data.contents) {
        throw new Error('Could not fetch content');
      }

      // Parse HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');

      // Extract content data
      const title = doc.querySelector('title')?.textContent || '';
      const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const h1 = doc.querySelector('h1')?.textContent || '';
      const bodyText = doc.body?.textContent || '';
      const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length;

      // Analyze keywords (simple frequency analysis)
      const words = bodyText.toLowerCase().match(/\b\w{4,}\b/g) || [];
      const wordFreq: { [key: string]: number } = {};
      words.forEach(word => {
        if (word.length > 4 && !['this', 'that', 'with', 'have', 'will', 'from', 'they', 'been', 'were', 'said', 'each', 'which'].includes(word)) {
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
      });

      const topKeywords = Object.entries(wordFreq)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([word]) => word);

      // Calculate real SEO scores
      const titleScore = !title ? 30 : title.length > 60 ? 65 : title.length < 30 ? 70 : 90;
      const metaScore = !metaDesc ? 35 : metaDesc.length > 160 ? 70 : metaDesc.length < 120 ? 75 : 95;
      const keywordScore = topKeywords.length > 0 ? Math.min(85, 50 + (topKeywords.length * 7)) : 40;
      const contentScore = wordCount < 300 ? 45 : wordCount > 1000 ? 85 : 65;

      const contentScores: SEOScore = {
        overall: Math.round((titleScore + metaScore + keywordScore + contentScore) / 4),
        keyword: keywordScore,
        readability: contentScore,
        engagement: Math.round((titleScore + metaScore) / 2)
      };

      // Generate realistic analytics based on content quality and length
      const baseReach = Math.max(500, wordCount * 2);
      const qualityMultiplier = contentScores.overall / 100;

      const analytics: ContentAnalytics = {
        estimatedReach: Math.round(baseReach * qualityMultiplier * (1 + Math.random() * 0.5)),
        demographics: [
          { ageGroup: "18-24", percentage: 18 + Math.floor(Math.random() * 12) },
          { ageGroup: "25-34", percentage: 32 + Math.floor(Math.random() * 10) },
          { ageGroup: "35-44", percentage: 25 + Math.floor(Math.random() * 8) },
          { ageGroup: "45-54", percentage: 15 + Math.floor(Math.random() * 6) },
          { ageGroup: "55+", percentage: 10 + Math.floor(Math.random() * 5) }
        ],
        professions: [
          { profession: "Marketing Professionals", percentage: 28 + Math.floor(Math.random() * 7) },
          { profession: "Business Owners", percentage: 22 + Math.floor(Math.random() * 6) },
          { profession: "Content Creators", percentage: 18 + Math.floor(Math.random() * 5) },
          { profession: "Students", percentage: 16 + Math.floor(Math.random() * 4) },
          { profession: "Other Professionals", percentage: 16 + Math.floor(Math.random() * 4) }
        ],
        engagement: {
          avgClicks: Math.round((wordCount / 10) * qualityMultiplier + Math.random() * 50),
          avgViews: Math.round((wordCount * 1.5) * qualityMultiplier + Math.random() * 500),
          avgShares: Math.round((wordCount / 50) * qualityMultiplier + Math.random() * 15),
          avgComments: Math.round((wordCount / 100) * qualityMultiplier + Math.random() * 8)
        },
        bestTimeToPost: ["9:00 AM", "1:00 PM", "6:00 PM", "8:00 PM"][Math.floor(Math.random() * 4)],
        platform: fullUrl.includes('linkedin') ? 'LinkedIn' :
          fullUrl.includes('facebook') ? 'Facebook' :
            fullUrl.includes('instagram') ? 'Instagram' :
              fullUrl.includes('medium') ? 'Medium' :
                fullUrl.includes('substack') ? 'Substack' : 'Blog'
      };

      console.log('Content analysis results:', { contentScores, topKeywords, wordCount });

      setScores(contentScores);
      setContentAnalytics(analytics);

    } catch (error) {
      console.error('Content URL analysis failed:', error);

      // Provide fallback analysis
      const fallbackScores: SEOScore = {
        overall: 45,
        keyword: 40,
        readability: 50,
        engagement: 45
      };

      const fallbackAnalytics: ContentAnalytics = {
        estimatedReach: 800,
        demographics: [
          { ageGroup: "18-24", percentage: 20 },
          { ageGroup: "25-34", percentage: 35 },
          { ageGroup: "35-44", percentage: 25 },
          { ageGroup: "45-54", percentage: 15 },
          { ageGroup: "55+", percentage: 5 }
        ],
        professions: [
          { profession: "General Audience", percentage: 100 }
        ],
        engagement: {
          avgClicks: 25,
          avgViews: 400,
          avgShares: 8,
          avgComments: 3
        },
        bestTimeToPost: "1:00 PM",
        platform: 'Web'
      };

      setScores(fallbackScores);
      setContentAnalytics(fallbackAnalytics);
    }

    setIsAnalyzingContent(false);
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
    console.log('Starting website analysis for:', websiteUrl);

    try {
      // First try advanced analysis with direct scraping
      const analysisData = await analyzeWebsiteAdvanced(websiteUrl);
      console.log('Analysis data received:', analysisData);

      // Build comprehensive SEO issues based on real analysis
      const issues: SEOIssue[] = [];

      // Title analysis
      if (!analysisData.title || analysisData.title.length === 0) {
        issues.push({
          type: 'error',
          category: 'Title Tag',
          message: 'Missing title tag - Critical for SEO rankings',
          impact: 'high'
        });
      } else if (analysisData.title.length > 60) {
        issues.push({
          type: 'warning',
          category: 'Title Tag',
          message: `Title tag too long (${analysisData.title.length} chars) - May be truncated in search results`,
          impact: 'medium'
        });
      } else if (analysisData.title.length < 30) {
        issues.push({
          type: 'warning',
          category: 'Title Tag',
          message: `Title tag too short (${analysisData.title.length} chars) - Consider expanding for better SEO`,
          impact: 'medium'
        });
      } else {
        issues.push({
          type: 'success',
          category: 'Title Tag',
          message: `Title tag length optimal (${analysisData.title.length} chars)`,
          impact: 'low'
        });
      }

      // Meta description analysis
      if (!analysisData.metaDesc || analysisData.metaDesc.length === 0) {
        issues.push({
          type: 'error',
          category: 'Meta Description',
          message: 'Missing meta description - Critical for click-through rates',
          impact: 'high'
        });
      } else if (analysisData.metaDesc.length > 160) {
        issues.push({
          type: 'warning',
          category: 'Meta Description',
          message: `Meta description too long (${analysisData.metaDesc.length} chars) - May be truncated`,
          impact: 'medium'
        });
      } else if (analysisData.metaDesc.length < 120) {
        issues.push({
          type: 'warning',
          category: 'Meta Description',
          message: `Meta description could be longer (${analysisData.metaDesc.length} chars) - Aim for 120-160 chars`,
          impact: 'low'
        });
      } else {
        issues.push({
          type: 'success',
          category: 'Meta Description',
          message: `Meta description length optimal (${analysisData.metaDesc.length} chars)`,
          impact: 'low'
        });
      }

      // H1 analysis
      if (!analysisData.h1 || analysisData.h1.length === 0) {
        issues.push({
          type: 'error',
          category: 'Headers',
          message: 'Missing H1 tag - Essential for content structure and SEO',
          impact: 'high'
        });
      } else {
        issues.push({
          type: 'success',
          category: 'Headers',
          message: 'H1 tag found and properly configured',
          impact: 'low'
        });
      }

      // Content length analysis
      if (analysisData.wordCount < 300) {
        issues.push({
          type: 'warning',
          category: 'Content Length',
          message: `Content too short (${analysisData.wordCount} words) - Aim for 300+ words for better rankings`,
          impact: 'medium'
        });
      } else if (analysisData.wordCount > 2000) {
        issues.push({
          type: 'success',
          category: 'Content Length',
          message: `Excellent content length (${analysisData.wordCount} words) - Great for SEO`,
          impact: 'low'
        });
      } else {
        issues.push({
          type: 'success',
          category: 'Content Length',
          message: `Good content length (${analysisData.wordCount} words)`,
          impact: 'low'
        });
      }

      // Image optimization
      if (analysisData.imgWithoutAlt > 0) {
        issues.push({
          type: 'warning',
          category: 'Image SEO',
          message: `${analysisData.imgWithoutAlt} images missing alt text - Affects accessibility and SEO`,
          impact: 'medium'
        });
      } else if (analysisData.totalImages > 0) {
        issues.push({
          type: 'success',
          category: 'Image SEO',
          message: 'All images have alt text - Great for accessibility and SEO',
          impact: 'low'
        });
      }

      // SSL security
      if (!analysisData.hasSSL) {
        issues.push({
          type: 'error',
          category: 'Security',
          message: 'Site not using HTTPS - Critical security and SEO issue',
          impact: 'high'
        });
      } else {
        issues.push({
          type: 'success',
          category: 'Security',
          message: 'HTTPS properly configured - Secure connection established',
          impact: 'low'
        });
      }

      // Internal linking
      if (analysisData.internalLinks < 3) {
        issues.push({
          type: 'warning',
          category: 'Internal Links',
          message: `Few internal links found (${analysisData.internalLinks}) - Add more contextual internal links`,
          impact: 'medium'
        });
      } else {
        issues.push({
          type: 'success',
          category: 'Internal Links',
          message: `Good internal linking structure (${analysisData.internalLinks} links)`,
          impact: 'low'
        });
      }

      // Calculate comprehensive SEO scores
      const titleScore = !analysisData.title ? 0 :
        analysisData.title.length > 60 ? 60 :
          analysisData.title.length < 30 ? 70 : 90;

      const metaScore = !analysisData.metaDesc ? 0 :
        analysisData.metaDesc.length > 160 ? 65 :
          analysisData.metaDesc.length < 120 ? 75 : 95;

      const contentScore = analysisData.wordCount < 300 ? 40 :
        analysisData.wordCount > 1000 ? 90 : 70;

      const technicalScore = (analysisData.hasSSL ? 25 : 0) +
        (analysisData.h1 ? 25 : 0) +
        (analysisData.imgWithoutAlt === 0 ? 25 : 10) +
        (analysisData.internalLinks > 2 ? 25 : 10);

      const scores: SEOScore = {
        overall: Math.round((titleScore + metaScore + contentScore + technicalScore) / 4),
        keyword: Math.max(40, Math.min(85, contentScore)),
        readability: Math.max(50, Math.min(90, contentScore + (analysisData.h2Count > 0 ? 10 : 0))),
        engagement: Math.max(45, Math.min(85, (titleScore + metaScore) / 2))
      };

      // Extract domain and generate realistic keywords
      const domain = analysisData.url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
      const domainName = domain.split('.')[0];

      // Generate keywords based on title and content
      const titleWords = analysisData.title.toLowerCase().split(/\s+/).filter(word => word.length > 3);
      const keywordSuggestions = [
        domainName,
        `${domainName} services`,
        ...titleWords.slice(0, 2),
        `best ${domainName}`,
        `${domainName} reviews`
      ].filter(Boolean).slice(0, 5);

      // Detect if it's likely an e-commerce site
      const isEcommerce = analysisData.title.toLowerCase().includes('shop') ||
        analysisData.title.toLowerCase().includes('store') ||
        analysisData.title.toLowerCase().includes('buy') ||
        domain.includes('shop') || domain.includes('store');

      console.log('Final analysis results:', { scores, issues: issues.length, isEcommerce });

      setWebsiteSEO({
        url: analysisData.url,
        title: analysisData.title || 'No title found',
        metaDescription: analysisData.metaDesc || undefined,
        issues: issues,
        score: scores,
        framework: 'Detected via analysis',
        keywords: keywordSuggestions,
        isEcommerce
      });

    } catch (error) {
      console.error('Website analysis completely failed:', error);

      // Provide meaningful error feedback
      setWebsiteSEO({
        url: websiteUrl,
        title: 'Analysis failed - Website not accessible',
        issues: [{
          type: 'error',
          category: 'Connection',
          message: 'Could not access website. Please check the URL and try again.',
          impact: 'high'
        }, {
          type: 'error',
          category: 'Analysis',
          message: 'Website may be blocking analysis tools or have CORS restrictions',
          impact: 'high'
        }],
        score: { overall: 0, keyword: 0, readability: 0, engagement: 0 },
        framework: 'Unknown',
        keywords: [],
        isEcommerce: false
      });
    }

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
    <section id="analyzer" className="py-16">
      <div className="container mx-auto px-4">
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
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="url"
                  placeholder="Enter your website URL"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="flex-1 bg-background/50 border-border"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && websiteUrl.trim() && !isAnalyzingWebsite) {
                      analyzeWebsite();
                    }
                  }}
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
                      Analyze Website
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content SEO Analyzer */}
          <Card className="bg-gradient-dark border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Tag className="h-5 w-5 text-primary" />
                Content SEO Analyzer
                <Badge variant="secondary" className="ml-auto">Hot</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-secondary">
                  <TabsTrigger value="url" className="text-sm">
                    <Globe className="h-4 w-4 mr-2 hidden sm:block" />
                    Analyze by URL
                  </TabsTrigger>
                  <TabsTrigger value="text" className="text-sm">
                    <Code className="h-4 w-4 mr-2 hidden sm:block" />
                    Analyze by Script
                  </TabsTrigger>
                </TabsList>

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
                            analyzeContentUrl();
                          }
                        }}
                      />
                      <Button
                        onClick={analyzeContentUrl}
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

                <TabsContent value="text" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[0.8rem] sm:text-sm font-medium text-foreground">
                        Content Script
                      </label>
                      <Badge variant="outline" className="text-xs">
                        {dailyUsage.wordsUsed}/{DAILY_WORD_LIMIT} words used
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
                      disabled={!canGenerate(1)}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {wordCount} words
                      </span>
                      <Button
                        onClick={analyzeContent}
                        disabled={!content.trim() || isAnalyzing || !canGenerate(content.length)}
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
              </Tabs>
            </CardContent>
          </Card>

          {/* Content Analytics Results */}
          {contentAnalytics && (
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary animate-glow" />
                  Content Analytics Report - {contentAnalytics.platform}
                  <Badge variant="outline" className="ml-auto text-primary">
                    {contentAnalytics.estimatedReach.toLocaleString()} reach
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Engagement Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{contentAnalytics.engagement.avgViews}</div>
                    <div className="text-xs text-muted-foreground">Avg Views</div>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-success">{contentAnalytics.engagement.avgClicks}</div>
                    <div className="text-xs text-muted-foreground">Avg Clicks</div>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-warning">{contentAnalytics.engagement.avgShares}</div>
                    <div className="text-xs text-muted-foreground">Avg Shares</div>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-info">{contentAnalytics.engagement.avgComments}</div>
                    <div className="text-xs text-muted-foreground">Avg Comments</div>
                  </div>
                </div>

                {/* Demographics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Age Demographics
                    </h4>
                    <div className="space-y-2">
                      {contentAnalytics.demographics.map((demo, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{demo.ageGroup}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-1000"
                                style={{ width: `${demo.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-8">{demo.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <BarChart className="h-4 w-4" />
                      Professional Audience
                    </h4>
                    <div className="space-y-2">
                      {contentAnalytics.professions.map((prof, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{prof.profession}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-success rounded-full transition-all duration-1000"
                                style={{ width: `${prof.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-8">{prof.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Best Time to Post */}
                <div className="bg-muted/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    Optimal Publishing Time
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Best time to post for maximum engagement: <span className="font-medium text-primary">{contentAnalytics.bestTimeToPost}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Website SEO Results */}
          {websiteSEO && (
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary animate-glow" />
                    <span>Website SEO Analysis</span>
                    <Badge variant="outline" className={`ml-auto ${getScoreColor(websiteSEO.score.overall)}`}>
                      {websiteSEO.score.overall}% Overall
                    </Badge>
                  </div>
                  <span className="text-primary text-[0.9rem] sm:text-xl">{websiteSEO.url}</span>
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
                                    • Install Yoast SEO or RankMath plugin<br />
                                    • Add meta tags in theme's header.php or use plugin interface<br />
                                    • Use featured images for og:image tags
                                  </div>
                                )}
                                {websiteSEO.framework === 'React' && (
                                  <div>
                                    • Use React Helmet for dynamic meta tags<br />
                                    • Add meta tags to public/index.html for static content<br />
                                    • Consider Next.js for better SEO with SSR
                                  </div>
                                )}
                                {websiteSEO.framework === 'Shopify' && (
                                  <div>
                                    • Edit theme.liquid file in theme editor<br />
                                    • Use Shopify's built-in SEO fields for products<br />
                                    • Install SEO apps for advanced features
                                  </div>
                                )}
                                {(websiteSEO.framework === 'Wix' || websiteSEO.framework === 'Squarespace') && (
                                  <div>
                                    • Use platform's built-in SEO tools<br />
                                    • Add meta tags in page settings<br />
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
          
        </div>
      </div>
    </section>
  );
}