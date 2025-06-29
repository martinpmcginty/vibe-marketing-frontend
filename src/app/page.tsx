'use client';

import { useState } from 'react';
import { Search, Zap, Target, BarChart3, FileText, Sparkles } from 'lucide-react';
import WorkflowForm from '@/components/WorkflowForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { WorkflowResult } from '@/lib/api';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<WorkflowResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleWorkflowSubmit = async (seedPhrase: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // For now, we'll use a mock response until backend is deployed
      // const response = await apiService.runWorkflow(seedPhrase);

      // Mock response for development
      const mockResponse: WorkflowResult = {
        seedPhrase,
        keywords: {
          keywords: [
            { keyword: `${seedPhrase} tools`, volume: 5400, competition: 'medium', intent: 'informational' },
            { keyword: `${seedPhrase} software`, volume: 3200, competition: 'low', intent: 'commercial' },
            { keyword: `${seedPhrase} guide`, volume: 2100, competition: 'high', intent: 'informational' },
          ],
          clusters: [
            { name: `${seedPhrase} Solutions`, totalVolume: 10700, keywords: [] },
            { name: `${seedPhrase} Resources`, totalVolume: 2100, keywords: [] },
          ],
          insights: [
            `${seedPhrase} shows strong commercial intent`,
            'Low competition keywords offer significant opportunity',
            'Informational content is in high demand',
          ],
          topOpportunities: [],
          totalKeywords: 3,
        },
        serpAnalysis: {
          contentDepth: 'moderate',
          contentGaps: [
            'Practical implementation guides',
            'ROI case studies',
            'Integration tutorials',
          ],
          competitors: [],
          recommendations: [
            'Focus on practical, actionable content',
            'Include case studies and examples',
            'Create comprehensive guides',
          ],
        },
        brief: {
          title: `The Complete Guide to ${seedPhrase}: What You Need to Know`,
          targetAudience: 'Professionals and decision-makers',
          estimatedWordCount: 2500,
          tone: 'Professional, informative, and authoritative',
          outline: [
            'Introduction',
            `What is ${seedPhrase}?`,
            'Key Benefits and Advantages',
            'Implementation Best Practices',
            'Case Studies and Examples',
            'Future Trends',
            'Conclusion',
          ],
          pointOfView: `${seedPhrase} represents a significant opportunity for businesses looking to modernize their approach.`,
          imagePrompt: `Professional business illustration showing ${seedPhrase} concept, modern office setting, clean design`,
          keyTakeaways: [
            `${seedPhrase} offers measurable business benefits`,
            'Implementation requires strategic planning',
            'Early adopters gain competitive advantages',
          ],
          callToAction: `Ready to transform your business with ${seedPhrase}? Start your journey today.`,
        },
        summary: `Generated comprehensive strategy for "${seedPhrase}" with 3 keywords, SERP analysis, and content brief.`,
        recommendations: [
          'Focus on practical implementation content',
          'Target low-competition commercial keywords',
          'Create comprehensive, actionable guides',
        ],
      };

      setResults(mockResponse);
    } catch (err) {
      setError('Failed to run workflow. Please try again.');
      console.error('Workflow error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Vibe Marketing</h1>
            </div>
            <div className="text-sm text-gray-500">
              AI-Powered Content Strategy
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Seed Phrase Into a
            <span className="text-blue-600"> Complete Content Strategy</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From keyword research to content briefs, our AI-powered workflow creates comprehensive 
            marketing strategies in minutes, not hours.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <Search className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Keyword Research</h3>
            <p className="text-gray-600">Intelligent keyword generation with intent classification and clustering.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <BarChart3 className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">SERP Analysis</h3>
            <p className="text-gray-600">Deep analysis of search results with content gap identification.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <FileText className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Content Briefs</h3>
            <p className="text-gray-600">Automated creation of comprehensive content briefs and outlines.</p>
          </div>
        </div>

        {/* Workflow Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <WorkflowForm onSubmit={handleWorkflowSubmit} isLoading={isLoading} />
        </div>

        {/* Results */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {results && (
          <ResultsDisplay results={results} />
        )}

        {/* How It Works */}
        <div className="bg-gray-50 rounded-xl p-8 mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Enter Seed Phrase</h4>
              <p className="text-sm text-gray-600">Start with any topic or keyword</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">AI Analysis</h4>
              <p className="text-sm text-gray-600">Our AI researches and analyzes</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Generate Strategy</h4>
              <p className="text-sm text-gray-600">Get keywords, insights, and briefs</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Create Content</h4>
              <p className="text-sm text-gray-600">Start writing with confidence</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
