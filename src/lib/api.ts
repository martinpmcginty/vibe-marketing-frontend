// API module for frontend - updated for Vercel deployment
import axios from 'axios';

export const __ensureModule = true;

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  keywords: '/keywords',
  serpAnalysis: '/analyze',
  workflow: '/workflow',
  health: '/health',
};

// API types for the workflow
export interface Keyword {
  keyword: string;
  volume: number;
  competition: 'low' | 'medium' | 'high';
  intent: 'informational' | 'commercial' | 'transactional';
}

export interface KeywordCluster {
  name: string;
  totalVolume: number;
  keywords: Keyword[];
}

export interface KeywordAnalysis {
  keywords: Keyword[];
  clusters: KeywordCluster[];
  insights: string[];
  topOpportunities: Keyword[];
  totalKeywords: number;
}

export interface SERPAnalysis {
  contentDepth: 'shallow' | 'moderate' | 'deep';
  contentGaps: string[];
  competitors: string[];
  recommendations: string[];
}

export interface ContentBrief {
  title: string;
  targetAudience: string;
  estimatedWordCount: number;
  tone: string;
  outline: string[];
  pointOfView: string;
  imagePrompt: string;
  keyTakeaways: string[];
  callToAction: string;
}

export interface WorkflowResult {
  seedPhrase: string;
  keywords: KeywordAnalysis;
  serpAnalysis: SERPAnalysis;
  brief: ContentBrief;
  summary: string;
  recommendations: string[];
}

// API functions
export const apiService = {
  // Get keywords for a seed phrase
  async getKeywords(seedPhrase: string): Promise<KeywordAnalysis> {
    const response = await api.get(endpoints.keywords, {
      params: { seed: seedPhrase }
    });
    return response.data;
  },

  // Analyze SERP for a keyword
  async analyzeSERP(keyword: string): Promise<SERPAnalysis> {
    const response = await api.post(endpoints.serpAnalysis, { keyword });
    return response.data;
  },

  // Run complete workflow
  async runWorkflow(seedPhrase: string): Promise<WorkflowResult> {
    const response = await api.post(endpoints.workflow, { seedPhrase });
    return response.data;
  },

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    const response = await api.get(endpoints.health);
    return response.data;
  },
}; 