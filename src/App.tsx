import React, { useState } from 'react';
import { Code2, Loader2, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { analyzeComplexity } from './lib/gemini';
import { ComplexityChart } from './components/ComplexityChart';
import { CodeAnalysis, CodeSnippet, commonSnippets } from './lib/types';

function App() {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSnippets, setShowSnippets] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const result = await analyzeComplexity(code);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSnippetSelect = (snippet: CodeSnippet) => {
    setCode(snippet.code);
    setShowSnippets(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-indigo-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Code2 className="h-8 w-8 text-indigo-400" />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-white tracking-tight">
            Code Complexity Analyzer
          </h1>
          <p className="mt-3 text-lg text-gray-400">
            Visualize and understand the complexity of your algorithms
          </p>
        </div>

        <div className="bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-300"
              >
                Your Code
              </label>
              <button
                onClick={() => setShowSnippets(!showSnippets)}
                className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Example Snippets
                {showSnippets ? (
                  <ChevronUp className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </button>
            </div>

            {showSnippets && (
              <div className="mb-4 grid grid-cols-1 gap-2 bg-gray-900 p-4 rounded-lg">
                {commonSnippets.map((snippet) => (
                  <button
                    key={snippet.name}
                    onClick={() => handleSnippetSelect(snippet)}
                    className="text-left p-3 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-white">{snippet.name}</h3>
                        <p className="text-xs text-gray-400">{snippet.description}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="mr-2">Time: {snippet.complexity.time}</span>
                        <span>Space: {snippet.complexity.space}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              <textarea
                id="code"
                rows={8}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-500 font-mono text-sm"
                placeholder="Paste your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Analyzing...
                </>
              ) : (
                'Analyze Complexity'
              )}
            </button>
          </div>

          {analysis && (
            <div className="border-t border-gray-700 bg-gray-800/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                  Analysis Results
                </h2>

                <div className="space-y-6">
                  <div>
                    <ComplexityChart 
                      complexity={analysis.timeComplexity} 
                      type="time" 
                    />
                    <p className="mt-2 text-gray-300">{analysis.timeExplanation}</p>
                  </div>

                  <div>
                    <ComplexityChart 
                      complexity={analysis.spaceComplexity} 
                      type="space" 
                    />
                    <p className="mt-2 text-gray-300">{analysis.spaceExplanation}</p>
                  </div>

                  {analysis.optimizations.length > 0 && (
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-white mb-3">
                        Optimization Suggestions
                      </h3>
                      <ul className="space-y-2">
                        {analysis.optimizations.map((opt, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start">
                            <span className="text-indigo-400 mr-2">•</span>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;