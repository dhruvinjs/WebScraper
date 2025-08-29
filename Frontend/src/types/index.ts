export interface Problem {
  id: string;
  name: string;
  platform: 'LeetCode' | 'Codeforces';
  difficulty: string;
  tags?: string[];
  url: string;
  description?: string;
}

export interface SearchFilters {
  problemName: string;
  platforms: string[];
  topics: string[];
}

export interface SearchResult {
  problems: Problem[];
  total: number;
  loading: boolean;
  error: string | null;
}