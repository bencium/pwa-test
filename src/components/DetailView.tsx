import type { NewsArticle } from '../types/news';

interface DetailViewProps {
  article: NewsArticle;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
}

const DetailView = ({ article, isFavorite, onBack, onToggleFavorite }: DetailViewProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <div className="h-full bg-white">
      {/* Hero Image */}
      {article.imageUrl && (
        <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          
          {/* Back Button Overlay */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors duration-200"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Favorite Button Overlay */}
          <button
            onClick={onToggleFavorite}
            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors duration-200"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg 
              className={`w-6 h-6 ${isFavorite ? 'fill-current text-red-400' : ''}`}
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
            </svg>
          </button>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Category and Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
            {article.category}
          </span>
          <span className="text-sm text-gray-500">{article.readTime} min read</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight mb-6">
          {article.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-300">
          <div className="flex-1">
            <p className="text-black font-bold text-lg">{article.author}</p>
            <p className="text-base text-gray-700 font-medium">{formatDate(article.publishedAt)}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <p className="text-xl text-black leading-relaxed font-semibold">
            {article.summary}
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-xl max-w-none">
          <div className="text-black text-lg leading-relaxed whitespace-pre-line font-medium">
            {article.content}
          </div>
        </div>

        {/* Bottom spacing for navigation */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default DetailView;