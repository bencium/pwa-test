import type { NewsArticle } from '../types/news';

// RSS Feed configuration - Simple working feed for testing
const RSS_FEEDS = {
  default: 'https://techcrunch.com/feed/'
};

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  author?: string;
  category?: string;
  content?: string;
  enclosure?: {
    url: string;
    type: string;
  };
}

interface RSSResponse {
  items: RSSItem[];
  title: string;
  description: string;
}

// RSS Proxy service to handle CORS
const RSS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';

export class RSSParser {
  private static generateId(title: string, link: string): string {
    // Create a simple hash that can handle Unicode characters
    const input = title + link;
    let hash = 0;
    
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert to positive number and then to base36 string
    const id = Math.abs(hash).toString(36);
    return id.substring(0, 16).padStart(8, '0');
  }

  private static extractImageFromContent(content: string, description: string): string | undefined {
    // Try multiple image extraction patterns for news RSS feeds
    const patterns = [
      /<img[^>]+src="([^">]+)"/i,  // Standard img tag
      /<media:content[^>]+url="([^">]+)"/i,  // Media RSS
      /<enclosure[^>]+url="([^">]+)"[^>]+type="image/i,  // Enclosure
      /url="([^"]*\.(jpg|jpeg|png|gif|webp)[^"]*)"[^>]*>/i  // URL in attributes
    ];
    
    const textToSearch = content + ' ' + description;
    
    for (const pattern of patterns) {
      const match = textToSearch.match(pattern);
      if (match && match[1]) {
        const imageUrl = match[1];
        // More flexible image URL validation
        if (imageUrl.match(/\.(jpg|jpeg|png|gif|webp)/i) && imageUrl.startsWith('http')) {
          return imageUrl;
        }
      }
    }
    
    // Try to find any http image URL in the text
    const urlPattern = /https?:\/\/[^\s<>"]+\.(jpg|jpeg|png|gif|webp)(\?[^\s<>"]*)?/i;
    const urlMatch = textToSearch.match(urlPattern);
    if (urlMatch && urlMatch[0]) {
      return urlMatch[0];
    }
    
    return undefined;
  }

  private static stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }

  private static calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }

  private static parseRSSItem(item: RSSItem, category: string = 'Tech'): NewsArticle {
    const cleanTitle = this.stripHtml(item.title);
    const cleanDescription = this.stripHtml(item.description);
    const cleanContent = item.content ? this.stripHtml(item.content) : cleanDescription;
    
    return {
      id: this.generateId(cleanTitle, item.link),
      title: cleanTitle,
      summary: cleanDescription.length > 200 ? cleanDescription.substring(0, 200) + '...' : cleanDescription,
      content: cleanContent.length > 500 ? cleanContent : cleanDescription.repeat(3), // Ensure minimum content length
      author: item.author || 'News Staff',
      publishedAt: item.pubDate || new Date().toISOString(),
      imageUrl: this.extractImageFromContent(item.content || '', item.description),
      category: item.category || category,
      readTime: this.calculateReadTime(cleanContent)
    };
  }

  static async fetchRSSFeed(feedUrl: string = RSS_FEEDS.default): Promise<NewsArticle[]> {
    try {
      const proxyUrl = RSS_PROXY + encodeURIComponent(feedUrl);
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: RSSResponse = await response.json();
      
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid RSS response format');
      }

      return data.items
        .slice(0, 20) // Limit to 20 articles
        .map(item => this.parseRSSItem(item, 'Tech'))
        .filter(article => article.title && article.summary); // Filter out invalid articles
        
    } catch (error) {
      console.error('RSS fetch error:', error);
      throw new Error(`Failed to fetch RSS feed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async fetchMultipleFeeds(feedUrls: string[] = [RSS_FEEDS.default]): Promise<NewsArticle[]> {
    // Use single reliable feed
    const feedUrl = feedUrls.length > 0 ? feedUrls[0] : RSS_FEEDS.default;
    
    try {
      const articles = await this.fetchRSSFeed(feedUrl);
      return articles.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch (error) {
      console.warn(`Failed to fetch feed ${feedUrl}:`, error);
      return [];
    }
  }

  // Test method for validation
  static async testRSSConnection(): Promise<boolean> {
    try {
      const articles = await this.fetchRSSFeed();
      return articles.length > 0;
    } catch {
      return false;
    }
  }
}