import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Search,
    Hash,
    BarChart,
    Zap,
    Copy,
    Filter,
    Sparkles,
    Globe,
    List,
    Loader2,
    ChevronUp,
    ChevronDown,
    TrendingUp,
    TrendingDown,
    Minus
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface KeywordResult {
    keyword: string;
    volume: number;
    difficulty: number;
    cpc: number;
    trend: 'up' | 'down' | 'stable';
    serpFeatures: string[];
}

export function KeywordResearchTool() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [activeTab, setActiveTab] = useState("single");
    const [bulkKeywords, setBulkKeywords] = useState("");
    const [keywordResults, setKeywordResults] = useState<KeywordResult[]>([]);
    const [relatedKeywords, setRelatedKeywords] = useState<{ term: string, volume: number }[]>([]);
    const [questions, setQuestions] = useState<{ question: string, volume: number, difficulty: number }[]>([]);
    const [filters, setFilters] = useState({
        minVolume: 100,
        maxDifficulty: 80,
        minCPC: 0.5,
        includeQuestions: true,
        includeLongTail: true,
    });

    const handleSearch = async () => {
        if ((activeTab === 'single' && !searchQuery.trim()) ||
            (activeTab === 'bulk' && !bulkKeywords.trim())) {
            toast({
                title: "Error",
                description: "Please enter a keyword or keywords to analyze",
                variant: "destructive",
            });
            return;
        }

        setIsSearching(true);
        setKeywordResults([]);
        setRelatedKeywords([]);
        setQuestions([]);

        try {
            /* 
            API INTEGRATION POINT - KEYWORD SEARCH
            Replace this section with your actual API call
      
            Example implementation:
            const response = await fetch('/api/keyword-research', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: activeTab === 'single' ? searchQuery : undefined,
                bulkKeywords: activeTab === 'bulk' ? bulkKeywords : undefined,
                filters
              })
            });
      
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            setKeywordResults(data.keywordData || []);
            setRelatedKeywords(data.relatedKeywords || []);
            setQuestions(data.questions || []);
            */

        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to analyze keywords",
                variant: "destructive",
            });
        } finally {
            setIsSearching(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: `"${text}" copied to clipboard`,
        });
    };

    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
            case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
            default: return <Minus className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <section id="keyword" className="py-16 container mx-auto px-4">
            <div className="container text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Trend with <span className="bg-gradient-purple bg-clip-text text-transparent">Keyword Research</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Discover high-value keywords, analyze competition, and find content opportunities.
                </p>
            </div>

            <div className="space-y-6">

                {/* Main Search Card */}
                <Card className="max-w-6xl mx-auto bg-gradient-dark border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Hash className="h-5 w-5 text-primary" />
                            Keyword Research
                            <Badge variant="secondary" className="ml-auto ">Premium</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full md:w-1/2 md:m-auto lg:w-1/3 grid-cols-2 bg-secondary">
                                <TabsTrigger value="single">
                                    <Search className="h-4 w-4 mr-2" />
                                    Single Keyword
                                </TabsTrigger>
                                <TabsTrigger value="bulk">
                                    <List className="h-4 w-4 mr-2" />
                                    Bulk Analysis
                                </TabsTrigger>
                            </TabsList>

                            {/* Single Keyword Search */}
                            <TabsContent value="single" className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-[0.8rem] sm:text-sm font-medium text-foreground">
                                        Single keyword
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Input
                                            placeholder="Enter a keyword or phrase..."
                                            className="flex-1 bg-background/50 border-border"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        />
                                        <Button
                                            onClick={handleSearch}
                                            disabled={!searchQuery.trim() || isSearching}
                                        >
                                            {isSearching ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <BarChart className="h-4 w-4" />
                                                    Analyze Keyword
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Bulk Keyword Analysis */}
                            <TabsContent value="bulk" className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-[0.8rem] sm:text-sm font-medium text-foreground">
                                        Multiple keyword
                                    </label>
                                    <Textarea
                                        placeholder="Enter multiple keywords (one per line or comma separated)..."
                                        value={bulkKeywords}
                                        onChange={(e) => setBulkKeywords(e.target.value)}
                                        className="min-h-[150px] bg-background/50 border-border resize-none custom-scrollbar"
                                    />
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={handleSearch}
                                            disabled={!bulkKeywords.trim() || isSearching}
                                        >
                                            {isSearching ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="h-4 w-4 mr-2" />
                                                    Analyze Keywords
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Filters Card */}
                <Card className="max-w-6xl mx-auto bg-gradient-dark border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-primary" />
                            Search Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Min. Monthly Volume</label>
                            <Input
                                type="number"
                                className="flex-1 bg-background/50 border-border"
                                value={filters.minVolume}
                                onChange={(e) => setFilters({ ...filters, minVolume: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Max. Difficulty</label>
                            <Input
                                type="number"
                                className="flex-1 bg-background/50 border-border"
                                value={filters.maxDifficulty}
                                onChange={(e) => setFilters({ ...filters, maxDifficulty: parseInt(e.target.value) || 100 })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Min. CPC ($)</label>
                            <Input
                                type="number"
                                className="flex-1 bg-background/50 border-border"
                                step="0.1"
                                value={filters.minCPC}
                                onChange={(e) => setFilters({ ...filters, minCPC: parseFloat(e.target.value) || 0 })}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="includeQuestions"
                                checked={filters.includeQuestions}
                                onChange={(e) => setFilters({ ...filters, includeQuestions: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="includeQuestions" className="text-sm">Include Questions</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="includeLongTail"
                                checked={filters.includeLongTail}
                                onChange={(e) => setFilters({ ...filters, includeLongTail: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="includeLongTail" className="text-sm">Include Long-Tail</label>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Results Section */}
            {isSearching ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    {/* Main Keyword Results */}
                    {keywordResults.length > 0 && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Hash className="h-5 w-5 text-primary" />
                                    Keyword Analysis Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Keyword</TableHead>
                                            <TableHead>Volume</TableHead>
                                            <TableHead>Difficulty</TableHead>
                                            <TableHead>CPC</TableHead>
                                            <TableHead>Trend</TableHead>
                                            <TableHead>SERP Features</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {keywordResults.map((result, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{result.keyword}</TableCell>
                                                <TableCell>{result.volume.toLocaleString()}</TableCell>
                                                <TableCell>{result.difficulty}</TableCell>
                                                <TableCell>${result.cpc.toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        {getTrendIcon(result.trend)}
                                                        <span className="ml-2 capitalize">{result.trend}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {result.serpFeatures.map((feature, i) => (
                                                            <Badge key={i} variant="outline">{feature}</Badge>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(result.keyword)}
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    {/* Related Keywords */}
                    {relatedKeywords.length > 0 && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-primary" />
                                    Related Keywords
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {relatedKeywords.map((keyword, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="cursor-pointer hover:bg-secondary"
                                            onClick={() => {
                                                setSearchQuery(keyword.term);
                                                setActiveTab('single');
                                                /* 
                                                API INTEGRATION POINT - RELATED KEYWORD CLICK
                                                You might want to trigger a new search when clicking a related keyword
                                                handleSearch();
                                                */
                                            }}
                                        >
                                            {keyword.term}
                                            <span className="ml-2 text-muted-foreground">{keyword.volume.toLocaleString()}</span>
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Questions */}
                    {questions.length > 0 && filters.includeQuestions && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-primary" />
                                    People Also Ask
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {questions.map((question, index) => (
                                        <div key={index} className="p-4 border rounded-lg bg-secondary/50">
                                            <h3 className="font-medium">{question.question}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Volume: {question.volume.toLocaleString()} | Difficulty: {question.difficulty}
                                            </p>
                                            <div className="mt-2 flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(question.question)}
                                                >
                                                    <Copy className="h-4 w-4 mr-2" />
                                                    Copy Question
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}

            {/* API Integration Documentation */}
            <div className="hidden">
                {/*
        API INTEGRATION GUIDE
        
        Required endpoints:
        1. POST /api/keyword-research
          - Accepts:
            {
              query?: string,              // For single keyword search
              bulkKeywords?: string,        // For bulk analysis (comma or newline separated)
              filters: {
                minVolume: number,
                maxDifficulty: number,
                minCPC: number,
                includeQuestions: boolean,
                includeLongTail: boolean
              }
            }
          
          - Returns:
            {
              keywordData: Array<{
                keyword: string,
                volume: number,
                difficulty: number,
                cpc: number,
                trend: 'up'|'down'|'stable',
                serpFeatures: string[]
              }>,
              relatedKeywords: Array<{
                term: string,
                volume: number
              }>,
              questions: Array<{
                question: string,
                volume: number,
                difficulty: number
              }>
            }
        */}
            </div>
        </section>
    );
}