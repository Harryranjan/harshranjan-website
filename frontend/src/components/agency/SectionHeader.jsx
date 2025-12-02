import React from 'react';

/**
 * SectionHeader Component
 * Reusable section header with badge, heading, and description
 * Used across multiple sections: Problem, Services, Work, Process, Pricing, Results
 */
const SectionHeader = ({ 
  badge, 
  badgeIcon,
  badgeColor = 'purple',
  heading, 
  headingGradientText,
  description,
  descriptionBelow,
  align = 'center',
  className = '',
  maxWidth = '3xl'
}) => {
  const alignmentClass = align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right';
  const badgeColorClasses = {
    purple: 'bg-purple/10 text-purple',
    cyan: 'bg-cyan/10 text-cyan',
    coral: 'bg-coral/10 text-coral',
    navy: 'bg-navy/10 text-navy'
  };

  return (
    <div className={`${alignmentClass} mb-16 scroll-reveal ${className}`}>
      {/* Optional Badge */}
      {badge && (
        <div className={`inline-flex items-center space-x-2 ${badgeColorClasses[badgeColor] || badgeColorClasses.purple} px-4 py-2 rounded-full mb-6`}>
          {badgeIcon && <i className={`${badgeIcon} text-${badgeColor}`}></i>}
          <span className="text-sm font-semibold">{badge}</span>
        </div>
      )}

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
        {heading}
        {headingGradientText && (
          <> <span className="gradient-text">{headingGradientText}</span></>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p className={`text-xl text-gray-600 max-w-${maxWidth} ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}

      {/* Optional Description Below */}
      {descriptionBelow && (
        <p className={`text-lg font-semibold ${badgeColor === 'cyan' ? 'text-cyan' : badgeColor === 'coral' ? 'text-coral' : badgeColor === 'purple' ? 'text-purple' : 'text-navy'} mt-4`}>
          {descriptionBelow}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
