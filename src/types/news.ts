export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
  readTime: number;
}

export interface UserPreferences {
  favorites: string[];
  readArticles: string[];
  theme: 'light' | 'dark';
}