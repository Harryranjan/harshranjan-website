import React from 'react';

/**
 * ProcessStep Component
 * Reusable component for displaying process/workflow steps
 * Used in: Process section, How it Works
 */
const ProcessStep = ({ 
  number,
  title,
  description,
  icon,
  isLast = false,
  variant = 'default',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-white shadow-lg',
    glass: 'glass-card',
    minimal: 'bg-transparent'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Connector Line (except for last item) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-purple to-cyan transform -translate-y-1/2 z-0"></div>
      )}

      {/* Step Card */}
      <div className={`${variantClasses[variant]} p-6 rounded-xl hover:shadow-xl transition-all duration-300 relative z-10`}>
        {/* Step Number */}
        <div className="w-12 h-12 bg-gradient-cta rounded-full flex items-center justify-center mb-4">
          <span className="text-white font-bold text-xl">{number}</span>
        </div>

        {/* Icon (optional) */}
        {icon && (
          <div className="w-16 h-16 bg-purple/10 rounded-lg flex items-center justify-center mb-4">
            <i className={`${icon} text-2xl text-purple`}></i>
          </div>
        )}

        {/* Title */}
        <h4 className="text-xl font-bold mb-3 text-navy">{title}</h4>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
