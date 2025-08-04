import { RSSParser } from '../../utils/rss-parser';

// Mock fetch for testing
global.fetch = jest.fn();

describe('RSSParser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchRSSFeed', () => {
    it('should successfully parse a valid RSS feed', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: 'Test Article 1',
            description: 'This is a test article description',
            link: 'https://example.com/article1',
            pubDate: '2024-01-15T10:30:00Z',
            author: 'Test Author',
            category: 'Technology'
          },
          {
            title: 'Test Article 2',
            description: 'This is another test article description',
            link: 'https://example.com/article2',
            pubDate: '2024-01-14T15:45:00Z',
            author: 'Another Author',
            category: 'Science'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed('https://example.com/rss');

      expect(articles).toHaveLength(2);
      expect(articles[0]).toMatchObject({
        title: 'Test Article 1',
        summary: 'This is a test article description',
        author: 'Test Author',
        category: 'Technology'
      });
      expect(articles[0].id).toBeDefined();
      expect(articles[0].readTime).toBeGreaterThan(0);
    });

    it('should handle network errors gracefully', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(RSSParser.fetchRSSFeed('https://invalid-url.com/rss'))
        .rejects.toThrow('Failed to fetch RSS feed');
    });

    it('should handle HTTP errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(RSSParser.fetchRSSFeed('https://example.com/404'))
        .rejects.toThrow('Failed to fetch RSS feed');
    });

    it('should handle invalid RSS response format', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'response' })
      });

      await expect(RSSParser.fetchRSSFeed('https://example.com/invalid'))
        .rejects.toThrow('Invalid RSS response format');
    });

    it('should filter out articles without title or summary', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: 'Valid Article',
            description: 'Valid description',
            link: 'https://example.com/valid',
            pubDate: '2024-01-15T10:30:00Z'
          },
          {
            title: '', // Invalid - empty title
            description: 'Description without title',
            link: 'https://example.com/no-title',
            pubDate: '2024-01-15T10:30:00Z'
          },
          {
            title: 'Title without description',
            description: '', // Invalid - empty description
            link: 'https://example.com/no-desc',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed();
      expect(articles).toHaveLength(1);
      expect(articles[0].title).toBe('Valid Article');
    });

    it('should extract images from content', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: 'Article with Image',
            description: 'Article description <img src="https://example.com/image.jpg" alt="test"> more text',
            content: 'Full content with <img src="https://example.com/content-image.png" alt="content"> image',
            link: 'https://example.com/article',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed();
      expect(articles[0].imageUrl).toBe('https://example.com/content-image.png');
    });

    it('should strip HTML from content', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: '<b>Bold Title</b>',
            description: '<p>Description with <strong>HTML</strong> tags</p>',
            content: '<div><h1>Header</h1><p>Paragraph text</p></div>',
            link: 'https://example.com/article',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed();
      expect(articles[0].title).toBe('Bold Title');
      expect(articles[0].summary).toBe('Description with HTML tags');
      expect(articles[0].content).toBe('HeaderParagraph text');
    });

    it('should calculate read time correctly', async () => {
      const longContent = 'word '.repeat(1000); // 1000 words
      const mockRSSResponse = {
        items: [
          {
            title: 'Long Article',
            description: 'Short description',
            content: longContent,
            link: 'https://example.com/long',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed();
      expect(articles[0].readTime).toBe(5); // 1000 words / 200 words per minute = 5 minutes
    });

    it('should limit results to 20 articles', async () => {
      const items = Array.from({ length: 30 }, (_, i) => ({
        title: `Article ${i + 1}`,
        description: `Description ${i + 1}`,
        link: `https://example.com/article${i + 1}`,
        pubDate: '2024-01-15T10:30:00Z'
      }));

      const mockRSSResponse = { items };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed();
      expect(articles).toHaveLength(20);
    });
  });

  describe('fetchMultipleFeeds', () => {
    it('should fetch from multiple feeds and combine results', async () => {
      const feed1Response = {
        items: [
          {
            title: 'Feed 1 Article',
            description: 'Article from feed 1',
            link: 'https://feed1.com/article',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      const feed2Response = {
        items: [
          {
            title: 'Feed 2 Article',
            description: 'Article from feed 2',
            link: 'https://feed2.com/article',
            pubDate: '2024-01-14T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => feed1Response
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => feed2Response
        });

      const articles = await RSSParser.fetchMultipleFeeds([
        'https://feed1.com/rss',
        'https://feed2.com/rss'
      ]);

      expect(articles).toHaveLength(2);
      // Should be sorted by date (newest first)
      expect(articles[0].title).toBe('Feed 1 Article');
      expect(articles[1].title).toBe('Feed 2 Article');
    });

    it('should handle partial failures when fetching multiple feeds', async () => {
      const feed1Response = {
        items: [
          {
            title: 'Working Feed Article',
            description: 'Article from working feed',
            link: 'https://working.com/article',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => feed1Response
        })
        .mockRejectedValueOnce(new Error('Network error'));

      const articles = await RSSParser.fetchMultipleFeeds([
        'https://working.com/rss',
        'https://broken.com/rss'
      ]);

      expect(articles).toHaveLength(1);
      expect(articles[0].title).toBe('Working Feed Article');
    });
  });

  describe('testRSSConnection', () => {
    it('should return true for successful connection', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: 'Test Article',
            description: 'Test description',
            link: 'https://example.com/test',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const result = await RSSParser.testRSSConnection();
      expect(result).toBe(true);
    });

    it('should return false for failed connection', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await RSSParser.testRSSConnection();
      expect(result).toBe(false);
    });

    it('should return false for empty feed', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] })
      });

      const result = await RSSParser.testRSSConnection();
      expect(result).toBe(false);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle missing pubDate gracefully', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: 'Article without date',
            description: 'Description',
            link: 'https://example.com/no-date'
            // Missing pubDate
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed();
      expect(articles).toHaveLength(1);
      expect(articles[0].publishedAt).toBeDefined();
      expect(new Date(articles[0].publishedAt)).toBeInstanceOf(Date);
    });

    it('should handle missing author gracefully', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: 'Article without author',
            description: 'Description',
            link: 'https://example.com/no-author',
            pubDate: '2024-01-15T10:30:00Z'
            // Missing author
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed();
      expect(articles[0].author).toBe('News Staff');
    });

    it('should generate consistent IDs for the same article', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: 'Consistent Article',
            description: 'Same description',
            link: 'https://example.com/consistent',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockRSSResponse
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockRSSResponse
        });

      const articles1 = await RSSParser.fetchRSSFeed();
      const articles2 = await RSSParser.fetchRSSFeed();

      expect(articles1[0].id).toBe(articles2[0].id);
      expect(articles1[0].id).toMatch(/^[a-z0-9]{8,16}$/); // Should be alphanumeric string
    });

    it('should handle Unicode characters in title and link for ID generation', async () => {
      const mockRSSResponse = {
        items: [
          {
            title: 'Article with Unicode: 你好世界 🌍',
            description: 'Unicode description with émojis 🚀',
            link: 'https://example.com/unicode/你好',
            pubDate: '2024-01-15T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRSSResponse
      });

      const articles = await RSSParser.fetchRSSFeed();
      expect(articles).toHaveLength(1);
      expect(articles[0].id).toBeDefined();
      expect(articles[0].id).toMatch(/^[a-z0-9]{8,16}$/);
      expect(articles[0].title).toBe('Article with Unicode: 你好世界 🌍');
    });
  });
});