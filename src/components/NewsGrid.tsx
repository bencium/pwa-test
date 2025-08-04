import type { NewsArticle } from '../types/news';
import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
  favorites: string[];
  onToggleFavorite: (articleId: string) => void;
}

const NewsGrid = ({ articles, onArticleClick, favorites, onToggleFavorite }: NewsGridProps) => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            isFavorite={favorites.includes(article.id)}
            onClick={() => onArticleClick(article)}
            onToggleFavorite={() => onToggleFavorite(article.id)}
          />
        ))}
      </div>
      
      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No articles available</p>
        </div>
      )}
    </main>
  );
};

export default NewsGrid;