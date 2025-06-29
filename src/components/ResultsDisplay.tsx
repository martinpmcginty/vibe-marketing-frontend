<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { Search, BarChart3, FileText, Target, Copy, Download } from 'lucide-react';
import { WorkflowResult } from '@/lib/api';

interface ResultsDisplayProps {
  results: WorkflowResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState('keywords');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Strategy Summary</h3>
        <p className="text-gray-700 mb-4">{results.summary}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{results.keywords.totalKeywords}</div>
            <div className="text-sm text-gray-600">Keywords Found</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-600">{results.keywords.clusters.length}</div>
            <div className="text-sm text-gray-600">Keyword Clusters</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">{results.brief.estimatedWordCount}</div>
            <div className="text-sm text-gray-600">Recommended Word Count</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'keywords', label: 'Keywords', icon: Search },
              { id: 'serp', label: 'SERP Analysis', icon: BarChart3 },
              { id: 'brief', label: 'Content Brief', icon: FileText },
              { id: 'recommendations', label: 'Recommendations', icon: Target },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Keywords Tab */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Keyword Clusters</h4>
                <div className="space-y-4">
                  {results.keywords.clusters.map((cluster, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{cluster.name}</h5>
                        <span className="text-sm text-gray-600">{cluster.totalVolume.toLocaleString()} searches</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cluster.keywords.slice(0, 4).map((keyword, kIndex) => (
                          <div key={kIndex} className="flex justify-between items-center text-sm">
                            <span>{keyword.keyword}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                keyword.competition === 'low' ? 'bg-green-100 text-green-800' :
                                keyword.competition === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {keyword.competition}
                              </span>
                              <span className="text-gray-600">{keyword.volume.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Key Insights</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {results.keywords.insights.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SERP Analysis Tab */}
          {activeTab === 'serp' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Content Depth</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-lg font-medium capitalize">{results.serpAnalysis.contentDepth}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Content Gaps</h4>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {results.serpAnalysis.contentGaps.map((gap, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span className="text-gray-700">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Recommendations</h4>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {results.serpAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Content Brief Tab */}
          {activeTab === 'brief' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Content Brief</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h5 className="text-xl font-bold mb-4">{results.brief.title}</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h6 className="font-semibold text-gray-700 mb-2">Target Audience</h6>
                      <p className="text-gray-600">{results.brief.targetAudience}</p>
                    </div>
                    <div>
                      <h6 className="font-semibold text-gray-700 mb-2">Tone</h6>
                      <p className="text-gray-600">{results.brief.tone}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h6 className="font-semibold text-gray-700 mb-2">Content Outline</h6>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                      {results.brief.outline.map((section, index) => (
                        <li key={index}>{section}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="mb-6">
                    <h6 className="font-semibold text-gray-700 mb-2">Key Takeaways</h6>
                    <ul className="space-y-2">
                      {results.brief.keyTakeaways.map((takeaway, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-gray-700">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h6 className="font-semibold text-gray-700 mb-2">Call to Action</h6>
                    <p className="text-gray-600">{results.brief.callToAction}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(results.brief, null, 2))}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy Brief</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="h-4 w-4" />
                      <span>Export PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Strategic Recommendations</h4>
                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-6">
                  <ul className="space-y-4">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
=======
'use client';

import { useState } from 'react';
import { Search, BarChart3, FileText, Target, Copy, Download } from 'lucide-react';
import { WorkflowResult } from '@/lib/api';

interface ResultsDisplayProps {
  results: WorkflowResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState('keywords');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Strategy Summary</h3>
        <p className="text-gray-700 mb-4">{results.summary}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{results.keywords.totalKeywords}</div>
            <div className="text-sm text-gray-600">Keywords Found</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-600">{results.keywords.clusters.length}</div>
            <div className="text-sm text-gray-600">Keyword Clusters</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">{results.brief.estimatedWordCount}</div>
            <div className="text-sm text-gray-600">Recommended Word Count</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'keywords', label: 'Keywords', icon: Search },
              { id: 'serp', label: 'SERP Analysis', icon: BarChart3 },
              { id: 'brief', label: 'Content Brief', icon: FileText },
              { id: 'recommendations', label: 'Recommendations', icon: Target },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Keywords Tab */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Keyword Clusters</h4>
                <div className="space-y-4">
                  {results.keywords.clusters.map((cluster, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{cluster.name}</h5>
                        <span className="text-sm text-gray-600">{cluster.totalVolume.toLocaleString()} searches</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cluster.keywords.slice(0, 4).map((keyword, kIndex) => (
                          <div key={kIndex} className="flex justify-between items-center text-sm">
                            <span>{keyword.keyword}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                keyword.competition === 'low' ? 'bg-green-100 text-green-800' :
                                keyword.competition === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {keyword.competition}
                              </span>
                              <span className="text-gray-600">{keyword.volume.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Key Insights</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {results.keywords.insights.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SERP Analysis Tab */}
          {activeTab === 'serp' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Content Depth</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-lg font-medium capitalize">{results.serpAnalysis.contentDepth}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Content Gaps</h4>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {results.serpAnalysis.contentGaps.map((gap, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span className="text-gray-700">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Recommendations</h4>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {results.serpAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Content Brief Tab */}
          {activeTab === 'brief' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Content Brief</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h5 className="text-xl font-bold mb-4">{results.brief.title}</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h6 className="font-semibold text-gray-700 mb-2">Target Audience</h6>
                      <p className="text-gray-600">{results.brief.targetAudience}</p>
                    </div>
                    <div>
                      <h6 className="font-semibold text-gray-700 mb-2">Tone</h6>
                      <p className="text-gray-600">{results.brief.tone}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h6 className="font-semibold text-gray-700 mb-2">Content Outline</h6>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                      {results.brief.outline.map((section, index) => (
                        <li key={index}>{section}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="mb-6">
                    <h6 className="font-semibold text-gray-700 mb-2">Key Takeaways</h6>
                    <ul className="space-y-2">
                      {results.brief.keyTakeaways.map((takeaway, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-gray-700">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h6 className="font-semibold text-gray-700 mb-2">Call to Action</h6>
                    <p className="text-gray-600">{results.brief.callToAction}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(results.brief, null, 2))}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy Brief</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="h-4 w-4" />
                      <span>Export PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Strategic Recommendations</h4>
                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-6">
                  <ul className="space-y-4">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
>>>>>>> a96e448 (Sync latest frontend fixes from local dev)
