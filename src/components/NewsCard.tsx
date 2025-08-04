import { motion } from 'framer-motion';
import type { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
  isFavorite: boolean;
  onClick: () => void;
  onToggleFavorite: () => void;
}

const NewsCard = ({ article, isFavorite, onClick, onToggleFavorite }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      onClick={onClick}
    >
      {article.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
            {article.category}
          </span>
          
          <motion.button
            onClick={handleFavoriteClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <motion.svg 
              animate={isFavorite ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </motion.svg>
          </motion.button>
        </div>
        
        <h3 className="font-bold text-black text-lg line-clamp-2 mb-3 leading-tight">
          {article.title}
        </h3>
        
        <p className="text-gray-800 text-base line-clamp-3 mb-4 leading-relaxed">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;