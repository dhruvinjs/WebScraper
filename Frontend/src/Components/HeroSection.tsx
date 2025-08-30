
import { Moon, Sun } from 'lucide-react';
import {GeometricBackground} from './GeometricBackground';
import {SearchForm} from './SearchForm';
// import 
import type { SearchFilters, SearchResult } from '../types';
import { useTheme } from '../hooks/useTheme';
import {ResultsDisplay} from './ResultDisplay';

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void;
  searchResult: SearchResult;
}

export function HeroSection({ onSearch, searchResult }:HeroSectionProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      <GeometricBackground theme={theme} />
      
      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        {/* Theme Toggle Button */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 backdrop-blur-lg border ${
              isDark 
                ? 'bg-white bg-opacity-10 border-white border-opacity-20 text-white hover:bg-opacity-20' 
                : 'bg-black bg-opacity-10 border-black border-opacity-20 text-gray-900 hover:bg-opacity-20'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="text-center pt-20 pb-8">
          <div className="mb-8 flex justify-center animate-bounce">
            <h1 className={`text-6xl md:text-8xl font-black bg-clip-text text-transparent animate-pulse ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300'
                : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'
            }`}>
              Problem Hunter
            </h1>
          </div>
          
          <div className="mb-8">
            <p className={`text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed font-light ${
              isDark ? 'text-cyan-100' : 'text-gray-700'
            }`}>
              Discover and track programming problems across multiple platforms
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <SearchForm onSearch={onSearch} loading={searchResult.loading} theme={theme} />
        </div>
        
        {(searchResult.problems.length > 0 || searchResult.loading || searchResult.error) && (
          <div className="pb-20">
            <ResultsDisplay {...searchResult} theme={theme} />
          </div>
        )}
        
        {!searchResult.loading && !searchResult.error && searchResult.problems.length === 0 && (
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <div className={`bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold animate-pulse ${
              isDark ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800 border border-orange-300'
            }`}>
              LeetCode
            </div>
            <div className={`bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold animate-pulse delay-500 ${
              isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 border border-blue-300'
            }`}>
              Codeforces
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

