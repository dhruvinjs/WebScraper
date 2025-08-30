import { ExternalLink, Search, AlertCircle, Loader2 } from 'lucide-react';
import type{ SearchResult } from '../types';
import type{ Theme } from '../hooks/useTheme';

interface ResultsDisplayProps extends SearchResult {
  theme: Theme;
}

export function ResultsDisplay({ problems, total, loading, error, theme }:ResultsDisplayProps) {
  const isDark = theme === 'dark';

  if (loading) {
    return (
      <div className={`backdrop-blur-lg rounded-2xl shadow-xl p-8 border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900 bg-opacity-95 border-gray-700 border-opacity-50' 
          : 'bg-white bg-opacity-95 border-white border-opacity-30'
      }`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Searching for problems...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`backdrop-blur-lg rounded-2xl shadow-xl p-8 border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900 bg-opacity-95 border-gray-700 border-opacity-50' 
          : 'bg-white bg-opacity-95 border-white border-opacity-30'
      }`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (total === 0 && !loading) {
    return (
      <div className={`backdrop-blur-lg rounded-2xl shadow-xl p-8 border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900 bg-opacity-95 border-gray-700 border-opacity-50' 
          : 'bg-white bg-opacity-95 border-white border-opacity-30'
      }`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Search className={`w-8 h-8 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No problems found</p>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search criteria</p>
          </div>
        </div>
      </div>
    );
  }

  if (problems.length === 0) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LeetCode':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Codeforces':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`backdrop-blur-lg rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900 bg-opacity-95 border-gray-700 border-opacity-50' 
        : 'bg-white bg-opacity-95 border-white border-opacity-30'
    }`}>
      {/* Results Header */}
      <div className={`px-8 py-6 border-b ${
        isDark 
          ? 'border-gray-700 bg-gradient-to-r from-purple-900 to-blue-900' 
          : 'border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50'
      }`}>
        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Found {total} problem{total !== 1 ? 's' : ''}
        </h3>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`border-b ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <tr>
              <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Problem
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Platform
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Difficulty/Rating
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Topics
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDark 
              ? 'bg-gray-900 divide-gray-700' 
              : 'bg-white divide-gray-200'
          }`}>
            {problems.map((problem, index) => (
              <tr 
                key={index} 
                className={`transition-colors duration-150 ${
                  isDark
                    ? `hover:bg-gray-800 ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}`
                    : `hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`
                }`}
              >
                <td className="px-6 py-4">
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {problem.name}
                    </h4>
                    {problem.description && (
                      <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {problem.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPlatformColor(problem.platform)}`}>
                    {problem.platform}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {problem.tags?.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          isDark 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                    {problem.tags && problem.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-600">
                        +{problem.tags?.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Solve
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

