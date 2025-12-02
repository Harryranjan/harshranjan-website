import React from 'react';

/**
 * PricingCard Component
 * Reusable card for displaying pricing tiers
 * Used in: Pricing section
 */
const PricingCard = ({ 
  name,
  price,
  priceUnit = 'project',
  description,
  features = [],
  isPopular = false,
  ctaText = 'Get Started',
  ctaVariant = 'outline',
  ctaLink = '#',
  className = ''
}) => {
  return (
    <div className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${isPopular ? 'ring-2 ring-purple' : ''} ${className}`}>
      {isPopular && (
        <div className="bg-gradient-cta text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
          Most Popular
        </div>
      )}

      <h3 className="text-2xl font-bold mb-2">
        <span className="gradient-text">{name}</span>
      </h3>

      <div className="mb-6">
        <span className="text-4xl font-bold text-navy">{price}</span>
        {priceUnit && <span className="text-gray-500 ml-2">/ {priceUnit}</span>}
      </div>

      <p className="text-gray-600 mb-6">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <i className="fas fa-check text-cyan mr-3 mt-1"></i>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <a 
        href={ctaLink}
        className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
          ctaVariant === 'gradient' 
            ? 'gradient-button text-white shadow-lg hover:shadow-xl' 
            : ctaVariant === 'coral'
            ? 'bg-coral text-white shadow-lg hover:shadow-xl hover:bg-opacity-90'
            : 'border-2 border-cyan text-cyan hover:bg-cyan hover:text-navy'
        }`}
      >
        {ctaText}
        <i className="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  );
};

export default PricingCard;
