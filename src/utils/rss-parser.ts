import type { NewsArticle } from '../types/news';

// RSS Feed configuration - Healthcare focused with images
const RSS_FEEDS = {
  cnn_health: 'https://rss.cnn.com/rss/cnn_health.rss',
  fox_health: 'https://moxie.foxnews.com/google-publisher/health.xml',
  nbc_health: 'https://feeds.nbcnews.com/nbcnews/public/health',
  abc_health: 'https://abcnews.go.com/abcnews/healthheadlines',
  healthday: 'https://consumer.healthday.com/rss/health-news.rss',
  reuters_health: 'https://feeds.reuters.com/reuters/healthNews',
  default: 'https://rss.cnn.com/rss/cnn_health.rss'
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

  private static parseRSSItem(item: RSSItem, category: string = 'Health'): NewsArticle {
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
        .map(item => this.parseRSSItem(item, 'Health'))
        .filter(article => article.title && article.summary); // Filter out invalid articles
        
    } catch (error) {
      console.error('RSS fetch error:', error);
      throw new Error(`Failed to fetch RSS feed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async fetchMultipleFeeds(feedUrls: string[] = [RSS_FEEDS.default]): Promise<NewsArticle[]> {
    // Try multiple healthcare feeds with images as fallbacks
    const defaultFeeds = [
      RSS_FEEDS.cnn_health,
      RSS_FEEDS.nbc_health,
      RSS_FEEDS.reuters_health
    ];
    
    const feedsToTry = feedUrls.length > 0 ? feedUrls : defaultFeeds;
    
    const promises = feedsToTry.map(url => this.fetchRSSFeed(url).catch(error => {
      console.warn(`Failed to fetch feed ${url}:`, error);
      return [];
    }));

    const results = await Promise.all(promises);  
    const allArticles = results.flat();
    
    // If no articles found, try a simple fallback
    if (allArticles.length === 0) {
      console.log('No articles found from feeds, trying simple fallback...');
      try {
        return await this.fetchRSSFeed('https://rss.cnn.com/rss/edition.rss');
      } catch {
        return [];
      }
    }
    
    // Sort by publication date (newest first)
    return allArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
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