import React from 'react';

/**
 * TestimonialCard Component
 * Reusable card for displaying client testimonials with rating, quote, author info, and stats
 * Used in: Results/Testimonials section
 */
const TestimonialCard = ({ 
  quote,
  author,
  role,
  company,
  avatar,
  rating = 5,
  stats,
  variant = 'default',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-white shadow-lg',
    glass: 'glass-card'
  };

  return (
    <div className={`${variantClasses[variant]} p-8 rounded-xl hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <i 
            key={index}
            className={`fas fa-star ${index < rating ? 'text-coral' : 'text-gray-300'}`}
          ></i>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-600 mb-6 leading-relaxed">
        "{quote}"
      </blockquote>

      {/* Stats (if provided) */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Author Info */}
      <div className="flex items-center">
        {avatar ? (
          <img 
            src={avatar} 
            alt={author}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-cta rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-lg">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <div className="font-semibold text-navy">{author}</div>
          <div className="text-sm text-gray-500">
            {role}{company && ` at ${company}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
