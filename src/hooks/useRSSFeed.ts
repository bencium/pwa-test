import { useState, useEffect, useCallback } from 'react';
import type { NewsArticle } from '../types/news';
import { RSSParser } from '../utils/rss-parser';
import { mockNewsData } from '../utils/mock-news-data';

interface UseRSSFeedState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
  isOnline: boolean;
}

export const useRSSFeed = (feedUrls?: string[]): UseRSSFeedState => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchArticles = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setError(null);

    // If offline, use cached data or fallback to mock data
    if (!isOnline) {
      const cachedData = localStorage.getItem('rss-articles');
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          setArticles(parsed);
          setLastUpdated(new Date(localStorage.getItem('rss-last-updated') || Date.now()));
        } catch {
          setArticles(mockNewsData);
        }
      } else {
        setArticles(mockNewsData);
      }
      setLoading(false);
      return;
    }

    try {
      let fetchedArticles: NewsArticle[];
      
      if (feedUrls && feedUrls.length > 0) {
        fetchedArticles = await RSSParser.fetchMultipleFeeds(feedUrls);
      } else {
        fetchedArticles = await RSSParser.fetchRSSFeed();
      }

      if (fetchedArticles.length === 0) {
        throw new Error('No articles found in RSS feed');
      }

      setArticles(fetchedArticles);
      setLastUpdated(new Date());
      
      // Cache the data
      localStorage.setItem('rss-articles', JSON.stringify(fetchedArticles));
      localStorage.setItem('rss-last-updated', new Date().toISOString());
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch RSS feed';
      setError(errorMessage);
      
      // Fallback to cached data or mock data
      const cachedData = localStorage.getItem('rss-articles');
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          setArticles(parsed);
          setLastUpdated(new Date(localStorage.getItem('rss-last-updated') || Date.now()));
        } catch {
          setArticles(mockNewsData);
        }
      } else {
        setArticles(mockNewsData);
      }
    } finally {
      setLoading(false);
    }
  }, [feedUrls, isOnline]);

  const refresh = useCallback(async () => {
    await fetchArticles(false);
  }, [fetchArticles]);

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Auto-refresh when coming back online
  useEffect(() => {
    if (isOnline && articles.length === 0) {
      fetchArticles();
    }
  }, [isOnline, articles.length, fetchArticles]);

  return {
    articles,
    loading,
    error,
    lastUpdated,
    refresh,
    isOnline
  };
};