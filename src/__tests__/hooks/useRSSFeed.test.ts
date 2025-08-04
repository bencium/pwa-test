import { renderHook, act, waitFor } from '@testing-library/react';
import { useRSSFeed } from '../../hooks/useRSSFeed';
import { RSSParser } from '../../utils/rss-parser';
import { mockNewsData } from '../../utils/mock-news-data';

// Mock dependencies
jest.mock('../../utils/rss-parser');
jest.mock('../../utils/mock-news-data');

const mockRSSParser = RSSParser as jest.Mocked<typeof RSSParser>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
});

describe('useRSSFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    (navigator as any).onLine = true;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch RSS feed on mount when online', async () => {
    const mockArticles = [
      {
        id: '1',
        title: 'Test Article',
        summary: 'Test summary',
        content: 'Test content',
        author: 'Test Author',
        publishedAt: '2024-01-15T10:30:00Z',
        category: 'Technology',
        readTime: 2
      }
    ];

    mockRSSParser.fetchRSSFeed.mockResolvedValue(mockArticles);

    const { result } = renderHook(() => useRSSFeed());

    expect(result.current.loading).toBe(true);
    expect(result.current.articles).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual(mockArticles);
    expect(result.current.error).toBeNull();
    expect(result.current.lastUpdated).toBeInstanceOf(Date);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('rss-articles', JSON.stringify(mockArticles));
  });

  it('should handle RSS fetch errors gracefully', async () => {
    mockRSSParser.fetchRSSFeed.mockRejectedValue(new Error('Network error'));
    (mockNewsData as any).mockReturnValue([
      { id: '1', title: 'Mock Article', summary: 'Mock summary' }
    ]);

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.articles).toEqual(mockNewsData);
  });

  it('should use cached data when offline', async () => {
    const cachedArticles = [
      {
        id: '1',
        title: 'Cached Article',
        summary: 'Cached summary',
        content: 'Cached content',
        author: 'Cached Author',
        publishedAt: '2024-01-14T10:30:00Z',
        category: 'Technology',
        readTime: 3
      }
    ];

    (navigator as any).onLine = false;
    localStorageMock.getItem
      .mockReturnValueOnce(JSON.stringify(cachedArticles))
      .mockReturnValueOnce('2024-01-14T10:30:00Z');

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual(cachedArticles);
    expect(result.current.isOnline).toBe(false);
    expect(mockRSSParser.fetchRSSFeed).not.toHaveBeenCalled();
  });

  it('should fall back to mock data when offline and no cache exists', async () => {
    (navigator as any).onLine = false;
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual(mockNewsData);
  });

  it('should handle multiple feed URLs', async () => {
    const feedUrls = ['https://feed1.com/rss', 'https://feed2.com/rss'];
    const mockArticles = [
      { id: '1', title: 'Feed 1 Article' },
      { id: '2', title: 'Feed 2 Article' }
    ];

    mockRSSParser.fetchMultipleFeeds.mockResolvedValue(mockArticles as any);

    renderHook(() => useRSSFeed(feedUrls));

    await waitFor(() => {
      expect(mockRSSParser.fetchMultipleFeeds).toHaveBeenCalledWith(feedUrls);
    });
  });

  it('should refresh articles when refresh is called', async () => {
    const initialArticles = [{ id: '1', title: 'Initial Article' }];
    const refreshedArticles = [{ id: '2', title: 'Refreshed Article' }];

    mockRSSParser.fetchRSSFeed
      .mockResolvedValueOnce(initialArticles as any)
      .mockResolvedValueOnce(refreshedArticles as any);

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual(initialArticles);

    await act(async () => {
      await result.current.refresh();
    });

    expect(result.current.articles).toEqual(refreshedArticles);
  });

  it('should update online status when network status changes', async () => {
    const { result } = renderHook(() => useRSSFeed());

    expect(result.current.isOnline).toBe(true);

    // Simulate going offline
    act(() => {
      (navigator as any).onLine = false;
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.isOnline).toBe(false);

    // Simulate coming back online
    act(() => {
      (navigator as any).onLine = true;
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current.isOnline).toBe(true);
  });

  it('should auto-refresh when coming back online with no articles', async () => {
    mockRSSParser.fetchRSSFeed.mockResolvedValue([]);

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Clear articles
    expect(result.current.articles).toEqual([]);

    // Mock successful fetch for when coming online
    const newArticles = [{ id: '1', title: 'New Article' }];
    mockRSSParser.fetchRSSFeed.mockResolvedValue(newArticles as any);

    // Simulate coming online
    act(() => {
      (navigator as any).onLine = true;
      window.dispatchEvent(new Event('online'));
    });

    await waitFor(() => {
      expect(mockRSSParser.fetchRSSFeed).toHaveBeenCalledTimes(2);
    });
  });

  it('should handle malformed cached data gracefully', async () => {
    localStorageMock.getItem.mockReturnValue('invalid json');

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should fall back to mock data when cached data is invalid
    expect(result.current.articles).toEqual(mockNewsData);
  });

  it('should set correct error message for different error types', async () => {
    const networkError = new Error('Failed to fetch');
    mockRSSParser.fetchRSSFeed.mockRejectedValue(networkError);

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch');
  });

  it('should handle empty RSS feed response', async () => {
    mockRSSParser.fetchRSSFeed.mockResolvedValue([]);

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('No articles found in RSS feed');
    expect(result.current.articles).toEqual(mockNewsData);
  });

  it('should not show loading state during refresh', async () => {
    const initialArticles = [{ id: '1', title: 'Initial' }];
    const refreshedArticles = [{ id: '2', title: 'Refreshed' }];

    mockRSSParser.fetchRSSFeed
      .mockResolvedValueOnce(initialArticles as any)
      .mockResolvedValueOnce(refreshedArticles as any);

    const { result } = renderHook(() => useRSSFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let loadingDuringRefresh = false;

    act(() => {
      result.current.refresh().then(() => {
        // Check if loading was true during refresh
        if (result.current.loading) {
          loadingDuringRefresh = true;
        }
      });
    });

    await waitFor(() => {
      expect(result.current.articles).toEqual(refreshedArticles);
    });

    // Refresh should not show loading state
    expect(loadingDuringRefresh).toBe(false);
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useRSSFeed());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('offline', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});