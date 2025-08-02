import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Search, Hash, BarChart, Zap, Copy, Sparkles,
    Loader2, TrendingUp, TrendingDown, Minus,
    Type, Heading, ClipboardCheck, Target
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface KeywordSuggestion {
    keyword: string;
    searchVolume: number;
    rankingPotential: 'high' | 'medium' | 'low';
    competition: number;
    cpc: number;
}

interface HeadlineSuggestion {
    headline: string;
    keywordDensity: number;
    sentimentScore: number;
    length: number;
    readability: 'easy' | 'moderate' | 'difficult';
}

export default function KeywordResearch() {
    const { toast } = useToast();
    const [topic, setTopic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [keywordSuggestions, setKeywordSuggestions] = useState<KeywordSuggestion[]>([]);
    const [headlineSuggestions, setHeadlineSuggestions] = useState<HeadlineSuggestion[]>([]);
    const [activeTab, setActiveTab] = useState("keywords");

    const handleFindKeywords = async () => {
        if (!topic.trim()) {
            toast({
                title: "Error",
                description: "Please enter a topic to research keywords",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setKeywordSuggestions([]);
        setHeadlineSuggestions([]);

        try {
            /* 
            API INTEGRATION POINT - KEYWORD FINDER
            Replace with your actual API call:
      
            const response = await fetch('/api/keyword-finder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                topic,
                numKeywords: 10, // Request 10 keywords
                numHeadlines: 5   // Request 5 headlines
              })
            });
      
            const data = await response.json();
            setKeywordSuggestions(data.keywords || []);
            setHeadlineSuggestions(data.headlines || []);
            */

        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to analyze topic",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: `"${text}" copied to clipboard`,
        });
    };

    const getRankingBadge = (potential: string) => {
        switch (potential) {
            case 'high': return <Badge className="bg-green-500 hover:bg-green-600">High Potential</Badge>;
            case 'medium': return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium Potential</Badge>;
            default: return <Badge className="bg-red-500 hover:bg-red-600">Low Potential</Badge>;
        }
    };

    const getReadabilityBadge = (level: string) => {
        switch (level) {
            case 'easy': return <Badge className="bg-green-500 hover:bg-green-600">Easy</Badge>;
            case 'moderate': return <Badge className="bg-yellow-500 hover:bg-yellow-600">Moderate</Badge>;
            default: return <Badge className="bg-red-500 hover:bg-red-600">Difficult</Badge>;
        }
    };

    return (
        <section id="keyword" className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Trend with
                    <span className="bg-gradient-purple bg-clip-text text-transparent"> Keyword Research</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Generate high-ranking keyword-rich headlines and discover optimal keywords for your content
                </p>
            </div>


            <Card className="max-w-6xl mx-auto bg-gradient-dark border-border/50 mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Find Trending Keywords
                        <Badge variant="secondary" className="ml-auto">Premium</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[0.8rem] sm:text-sm font-medium text-foreground">
                                Enter Your Content Topic
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    placeholder="e.g. 'sustainable gardening tips', 'AI in digital marketing'"
                                    value={topic}
                                    className="flex-1 bg-background/50 border-border"
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleFindKeywords()}
                                />
                                <Button
                                    onClick={handleFindKeywords}
                                    disabled={!topic.trim() || isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-4 w-4" />
                                            Generate Suggestions
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            </div>
                        ) : (
                            (keywordSuggestions.length > 0 || headlineSuggestions.length > 0) && (
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="Headlines">
                                            <Type className="h-4 w-4" />
                                            Top 5 Headlines for Your Content
                                        </TabsTrigger>
                                        <TabsTrigger value="keywords">
                                            <Hash className="h-4 w-4" />
                                            Trending Keywords for Your Content
                                        </TabsTrigger>
                                    </TabsList>

                                                                        {/* Headline Suggestions Tab */}
                                    <TabsContent value="headlines" className="mt-6">
                                        <div className="space-y-4">
                                            {headlineSuggestions.map((headline, index) => (
                                                <Card key={index} className="hover:bg-secondary/50 transition-colors">
                                                    <CardContent className="p-6">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-lg font-medium mb-2">{headline.headline}</h3>
                                                                <div className="flex flex-wrap gap-3 text-sm">
                                                                    <div className="flex items-center gap-1">
                                                                        <Hash className="h-4 w-4 text-primary" />
                                                                        <span>Density: {headline.keywordDensity.toFixed(1)}%</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <TrendingUp className="h-4 w-4 text-primary" />
                                                                        <span>Sentiment: {headline.sentimentScore}/10</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Type className="h-4 w-4 text-primary" />
                                                                        <span>{headline.length} chars</span>
                                                                    </div>
                                                                    <div>
                                                                        {getReadabilityBadge(headline.readability)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="default"
                                                                size="sm"
                                                                onClick={() => copyToClipboard(headline.headline)}
                                                            >
                                                                <Copy className="h-4 w-4 mr-2" />
                                                                Use This
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    {/* Keyword Suggestions Tab */}
                                    <TabsContent value="keywords" className="mt-6">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Keyword</TableHead>
                                                    <TableHead>Volume</TableHead>
                                                    <TableHead>Ranking Potential</TableHead>
                                                    <TableHead>Competition</TableHead>
                                                    <TableHead>CPC</TableHead>
                                                    <TableHead>Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {keywordSuggestions.map((keyword, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">{keyword.keyword}</TableCell>
                                                        <TableCell>{keyword.searchVolume.toLocaleString()}</TableCell>
                                                        <TableCell>
                                                            {getRankingBadge(keyword.rankingPotential)}
                                                        </TableCell>
                                                        <TableCell>{keyword.competition}/100</TableCell>
                                                        <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => copyToClipboard(keyword.keyword)}
                                                            >
                                                                <ClipboardCheck className="h-4 w-4" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TabsContent>
                                </Tabs>
                            )
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* API Integration Documentation */}
            <div className="hidden">
                {/*
        API INTEGRATION GUIDE - KEYWORD FINDER
        
        Expected API Response Structure:
        {
          headlines: [
            {
              headline: string,
              keywordDensity: number,
              sentimentScore: number (1-10),
              length: number,
              readability: 'easy'|'moderate'|'difficult'
            },
            ... (5 items)
                      keywords: [
            {
              keyword: string,
              searchVolume: number,
              rankingPotential: 'high'|'medium'|'low',
              competition: number (0-100),
              cpc: number
            },
            ... (10 items)
          ],
          ]
        }

        The API should:
        1. Analyze the topic for semantically related keywords
        2. Select keywords with high ranking potential
        3. Generate headlines that:
           - Naturally incorporate multiple keywords
           - Have optimal length (50-60 chars)
           - Positive sentiment
           - Good readability
        */}
            </div>
        </section>
    );
}