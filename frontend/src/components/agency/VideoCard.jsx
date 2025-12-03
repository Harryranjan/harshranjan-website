import React, { useState } from "react";

/**
 * VideoCard Component
 * Reusable card for displaying video portfolio items with thumbnail and overlay
 * Used in: Work/Portfolio section
 */
const VideoCard = ({
  videoUrl,
  thumbnailUrl,
  title,
  description,
  category,
  stats,
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Video/Thumbnail Container - 16:9 aspect ratio */}
      <div className="aspect-video bg-navy/20 relative">
        {videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
          />
        ) : thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy to-purple">
            <i className="fas fa-play text-6xl text-white opacity-50"></i>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          >
            <i className="fas fa-play text-purple text-xl ml-1"></i>
          </div>
        </div>
      </div>

      {/* Info Overlay - Always visible, enhanced on hover */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/95 to-transparent p-6 transition-all duration-300 ${
          isHovered ? "translate-y-0" : "translate-y-0"
        }`}
      >
        {category && (
          <span className="inline-block px-3 py-1 bg-cyan/20 text-cyan text-xs rounded-full mb-2">
            {category}
          </span>
        )}
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-gray-300 text-sm mb-3">{description}</p>

        {/* Stats */}
        {stats && (
          <div className="flex items-center space-x-4 text-sm">
            {stats.views && (
              <span className="text-gray-400">
                <i className="fas fa-eye mr-1"></i>
                {stats.views}
              </span>
            )}
            {stats.engagement && (
              <span className="text-gray-400">
                <i className="fas fa-heart mr-1"></i>
                {stats.engagement}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
