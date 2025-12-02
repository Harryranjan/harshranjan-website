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
    <div className={`${variantClasses[variant]} p-8 rounded-xl shadow-lg transition-all duration-300 h-full flex flex-col ${className}`}>
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-cta rounded-lg flex items-center justify-center mb-6">
        <i className={`${icon} text-3xl text-white`}></i>
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-2xl font-bold mb-2">
        <span className="gradient-text">{title}</span>
      </h3>
      {subtitle && (
        <p className="text-gray-500 text-sm mb-4">{subtitle}</p>
      )}

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      {/* Features List */}
      {features.length > 0 && (
        <ul className="space-y-2 mb-6 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <i className="fas fa-check text-cyan mr-2 mt-1"></i>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <a 
        href={ctaLink} 
        className="inline-flex items-center text-purple hover:text-cyan transition-colors duration-300 font-semibold mt-auto"
      >
        {ctaText}
        <i className="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  );
};

export default ServiceCard;
