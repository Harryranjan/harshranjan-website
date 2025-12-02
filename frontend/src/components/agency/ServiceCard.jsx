import React from 'react';

/**
 * ServiceCard Component
 * Reusable card for displaying services with icon, title, description, and CTA
 * Used in: Services section
 */
const ServiceCard = ({ 
  icon,
  title,
  subtitle,
  description,
  features = [],
  ctaText = 'Learn More',
  ctaLink = '#',
  variant = 'default',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-white hover:shadow-2xl',
    glass: 'glass-card'
  };

  return (
    <div className={`${variantClasses[variant]} p-8 rounded-2xl shadow-lg transition-all duration-300 h-full flex flex-col group ${className}`}>
      {/* Icon */}
      <div className="w-20 h-20 bg-gradient-to-br from-purple to-cyan rounded-2xl flex items-center justify-center mx-auto mb-6">
        <i className={`${icon} text-3xl text-white`}></i>
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-2xl font-bold mb-4 text-center text-navy">{title}</h3>
      {subtitle && (
        <p className="text-gray-500 text-sm mb-4 text-center">{subtitle}</p>
      )}

      {/* Description */}
      <p className="text-gray-600 text-center mb-6 leading-relaxed">{description}</p>

      {/* Features List */}
      {features.length > 0 && (
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <i className="fas fa-check text-purple mt-1"></i>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <button className="w-full py-3 rounded-full border-2 border-purple text-purple hover:bg-purple hover:text-white transition font-semibold">
        {ctaText}
      </button>
    </div>
  );
};

export default ServiceCard;
