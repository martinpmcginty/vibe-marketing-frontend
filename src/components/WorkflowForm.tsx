'use client';

import { useState } from 'react';
import { Search, Zap } from 'lucide-react';

interface WorkflowFormProps {
  onSubmit: (seedPhrase: string) => void;
  isLoading: boolean;
}

export default function WorkflowForm({ onSubmit, isLoading }: WorkflowFormProps) {
  const [seedPhrase, setSeedPhrase] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (seedPhrase.trim()) {
      onSubmit(seedPhrase.trim());
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Start Your Content Strategy
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="seedPhrase" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your seed phrase or topic
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="seedPhrase"
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              placeholder="e.g., investor relations AI, digital marketing automation, B2B SaaS growth"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Enter any topic, keyword, or phrase you want to create content about
          </p>
        </div>

        <button
          type="submit"
          disabled={!seedPhrase.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating Strategy...</span>
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              <span>Generate Content Strategy</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">What you get:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• AI-generated keyword research with intent classification</li>
          <li>• SERP analysis with content gap identification</li>
          <li>• Comprehensive content brief with outline</li>
          <li>• Strategic recommendations and insights</li>
        </ul>
      </div>
    </div>
  );
}
