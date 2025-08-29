import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { SearchFilters } from '../types';
import { topics, platforms } from '../data/mockData';
import type { Theme } from '../hooks/useTheme';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
  theme: Theme;
}

export function SearchForm({ onSearch, loading, theme }: SearchFormProps) {
  const isDark = theme === 'dark';
  const [filters, setFilters] = useState<SearchFilters>({
    problemName: '',
    platforms: [],
    topics: []
  });

  const [showTopicDropdown, setShowTopicDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handlePlatformToggle = (platform: string) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleTopicToggle = (topic: string) => {
    setFilters(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const clearFilters = () => {
    setFilters({
      problemName: '',
      platforms: [],
      topics: []
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`backdrop-blur-lg rounded-3xl shadow-2xl p-8 border max-w-6xl mx-auto transition-all duration-300 ${
        isDark
          ? 'bg-gray-900 bg-opacity-95 border-gray-700 border-opacity-50'
          : 'bg-white bg-opacity-95 border-white border-opacity-30'
      }`}
    >
      {/* Problem Name */}
      <div className="mb-8">
        <label htmlFor="problemName" className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Problem Name
        </label>
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            id="problemName"
            value={filters.problemName}
            onChange={(e) => setFilters(prev => ({ ...prev, problemName: e.target.value }))}
            placeholder="Search for problems by name..."
            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors text-lg ${
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-purple-500'
            }`}
          />
        </div>
      </div>

      {/* Platform Filter */}
      <div className="mb-8">
        <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Platforms</label>
        <div className="flex flex-wrap gap-3">
          {platforms.map(platform => (
            <button
              key={platform}
              type="button"
              onClick={() => handlePlatformToggle(platform)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                filters.platforms.includes(platform)
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Filter */}
      <div className="mb-8 relative">
        <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Topics</label>
        <button
          type="button"
          onClick={() => setShowTopicDropdown(!showTopicDropdown)}
          className={`w-full flex items-center justify-between px-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
            isDark
              ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-400'
              : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
          }`}
        >
          <span className={isDark ? 'text-white' : 'text-gray-800'}>
            {filters.topics.length === 0
              ? 'Select topics...'
              : `${filters.topics.length} topic${filters.topics.length > 1 ? 's' : ''} selected`}
          </span>
          <Filter className={`w-5 h-5 transition-transform ${showTopicDropdown ? 'rotate-180' : ''} ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
        </button>

        {showTopicDropdown && (
          <div className={`absolute top-full left-0 right-0 mt-2 border-2 rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto transition-all duration-200 ${
            isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
          }`}>
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2 auto-rows-min">
              {topics.map(topic => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleTopicToggle(topic)}
                  className={`px-3 py-2 text-sm rounded-lg font-medium text-left transition-all duration-200 ${
                    filters.topics.includes(topic)
                      ? isDark
                        ? 'bg-purple-900 text-purple-200 border border-purple-700'
                        : 'bg-purple-100 text-purple-800 border border-purple-300'
                      : isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {filters.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.topics.map(topic => (
              <span
                key={topic}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                }`}
              >
                {topic}
                <button
                  type="button"
                  onClick={() => handleTopicToggle(topic)}
                  className={`rounded-full p-0.5 transition-colors ${isDark ? 'hover:bg-purple-800' : 'hover:bg-purple-200'}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Searching...' : 'Search Problems'}
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className={`px-6 py-4 border-2 rounded-xl font-semibold transition-all duration-200 ${
            isDark
              ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
              : 'border-gray-400 text-gray-800 hover:bg-gray-100 hover:border-gray-500'
          }`}
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
}
