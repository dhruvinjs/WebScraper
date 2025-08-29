import { useState, useCallback } from 'react';
import axios from 'axios';
import type { Problem, SearchFilters, SearchResult } from '../types';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const useSearch = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    problems: [],
    total: 0,
    loading: false,
    error: null
  });

  const search = useCallback(async (filters: SearchFilters) => {
    setSearchResult(prev => ({ ...prev, loading: true, error: null }));

    try {
      let allProblems: Problem[] = [];

      // Search by problem name if provided
      if (filters.problemName.trim()) {
        try {
          const response = await axios.get(`${API_BASE_URL}/problems`, {
            params: { problemName: filters.problemName.trim() }
          });
          if (response.data.success) {
            allProblems = response.data.problems;
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            allProblems = [];
          } else {
            throw error;
          }
        }
      } else {
        // If no problem name, search by platforms
        const platformPromises = filters.platforms.map(async (platform) => {
          try {
            const response = await axios.get(`${API_BASE_URL}/problem/${platform}`);
            return response.data.success ? response.data.problems : [];
          } catch (error) {
            console.error(`Error fetching ${platform} problems:`, error);
            return [];
          }
        });

        const platformResults = await Promise.all(platformPromises);
        allProblems = platformResults.flat();
      }

      // Filter by platforms if specified
      if (filters.platforms.length > 0 && allProblems.length > 0) {
        allProblems = allProblems.filter(problem =>
          filters.platforms.includes(problem.platform)
        );
      }

      if (filters.topics.length > 0) {
        const topicPromises = filters.topics.flatMap(topic =>
          filters.platforms.length > 0 
            ? filters.platforms.map(platform => 
                axios.get(`${API_BASE_URL}/topic/${platform}`, { params: { topic } })
                  .then(response => response.data.success ? response.data.problems : [])
                  .catch(() => [])
              )
            : ['LeetCode', 'Codeforces'].map(platform =>
                axios.get(`${API_BASE_URL}/topic/${platform}`, { params: { topic } })
                  .then(response => response.data.success ? response.data.problems : [])
                  .catch(() => [])
              )
        );

        const topicResults = await Promise.all(topicPromises);
        const topicProblems = topicResults.flat();
        
        if (allProblems.length > 0) {
          allProblems = allProblems.filter(problem =>
            topicProblems.some(topicProblem => topicProblem.id === problem.id)
          );
        } else {
          allProblems = topicProblems;
        }
      }

      setSearchResult({
        problems: allProblems,
        total: allProblems.length,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Search error:', error);
      let errorMessage = 'An error occurred while searching. Please try again.';
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          errorMessage = 'Unable to connect to the server. Please make sure the backend is running.';
        } else if (error.response?.data?.error) {
          errorMessage = Array.isArray(error.response.data.error) 
            ? error.response.data.error.join(', ')
            : error.response.data.error;
        }
      }
      
      setSearchResult(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  }, []);

  const clearResults = useCallback(() => {
    setSearchResult({
      problems: [],
      total: 0,
      loading: false,
      error: null
    });
  }, []);

  return {
    searchResult,
    search,
    clearResults
  };
};