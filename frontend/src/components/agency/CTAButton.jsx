import React from 'react';

/**
 * CTAButton Component
 * Reusable CTA button with multiple variants
 * Variants: primary (gradient), coral (solid), outline
 */
const CTAButton = ({ 
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'right',
  href,
  onClick,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg';
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'gradient-button hover:opacity-90 text-white shadow-lg hover:shadow-xl',
    coral: 'bg-coral hover:bg-opacity-90 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-cyan text-cyan hover:bg-cyan hover:text-navy'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <i className={`${icon} mr-2`}></i>}
      {children}
      {icon && iconPosition === 'right' && <i className={`${icon} ml-2`}></i>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

export default CTAButton;
