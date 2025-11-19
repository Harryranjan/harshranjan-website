export default function BlogCardSkeleton() {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Category Badge Skeleton */}
        <div className="mb-3">
          <div className="inline-block h-6 w-24 bg-gray-200 rounded-full animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded-full" />
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
          </div>
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
          </div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded-full" />
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded-full" />
          </div>
          <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse">
            <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded-full" />
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Author & Date */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse">
              <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse">
                <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
              </div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse">
                <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
              </div>
            </div>
          </div>

          {/* Meta Stats */}
          <div className="flex items-center gap-4">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse">
              <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
            </div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse">
              <div className="h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent shimmer rounded" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </article>
  );
}
