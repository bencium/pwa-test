const LoadingGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-video w-full bg-gray-200"></div>
            
            <div className="p-4">
              {/* Category and favorite button */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              </div>
              
              {/* Title */}
              <div className="space-y-2 mb-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              
              {/* Summary */}
              <div className="space-y-2 mb-3">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
              
              {/* Meta info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading message */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2 text-gray-500">
          <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-sm">Loading latest news...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingGrid;