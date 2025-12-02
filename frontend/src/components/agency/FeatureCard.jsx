import React from 'react';

/**
 * FeatureCard Component
 * Reusable card for displaying features, problems, or benefits
 * Used in: Problems section, Features, Benefits
 */
const FeatureCard = ({ 
  icon,
  iconColor = 'gradient',
  title,
  description,
  size = 'medium',
  variant = 'default',
  className = ''
}) => {
  const iconSizes = {
    small: 'w-10 h-10 text-xl',
    medium: 'w-12 h-12 text-2xl',
    large: 'w-16 h-16 text-3xl'
  };

  const iconBgClass = iconColor === 'gradient' 
    ? 'bg-gradient-cta' 
    : iconColor === 'purple' 
    ? 'bg-purple' 
    : iconColor === 'cyan' 
    ? 'bg-cyan'
    : iconColor === 'coral'
    ? 'bg-coral'
    : 'bg-gradient-cta';

  const variantClasses = {
    default: 'bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
    glass: 'glass-card p-6 hover:shadow-xl transition-all duration-300',
    minimal: 'p-6'
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {icon && (
        <div className={`${iconSizes[size]} ${iconBgClass} rounded-lg flex items-center justify-center mb-4`}>
          <i className={`${icon} text-white`}></i>
        </div>
      )}
      <h3 className="text-xl font-bold mb-3 text-navy">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
