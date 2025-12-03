import React from "react";

/**
 * CaseStudyCard Component
 * Reusable card for displaying case studies with results and metrics
 * Used in: Automation case study, Campaign case study sections
 */
const CaseStudyCard = ({
  icon,
  title,
  subtitle,
  description,
  results = [],
  tags = [],
  ctaText = "View Case Study",
  ctaLink = "#",
  variant = "default",
  className = "",
}) => {
  const variantClasses = {
    default: "bg-white shadow-lg",
    glass: "glass-card",
    gradient: "bg-gradient-to-br from-navy to-purple text-white",
  };

  const isGradientVariant = variant === "gradient";

  return (
    <div
      className={`${variantClasses[variant]} p-8 rounded-xl hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Icon */}
      {icon && (
        <div
          className={`w-16 h-16 ${
            isGradientVariant ? "bg-white/10" : "bg-gradient-cta"
          } rounded-lg flex items-center justify-center mb-6`}
        >
          <i
            className={`${icon} text-3xl ${
              isGradientVariant ? "text-cyan" : "text-white"
            }`}
          ></i>
        </div>
      )}

      {/* Title & Subtitle */}
      <h3
        className={`text-2xl font-bold mb-2 ${
          isGradientVariant ? "text-white" : ""
        }`}
      >
        {isGradientVariant ? (
          title
        ) : (
          <span className="gradient-text">{title}</span>
        )}
      </h3>
      {subtitle && (
        <p
          className={`text-sm mb-4 ${
            isGradientVariant ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Description */}
      <p
        className={`mb-6 leading-relaxed ${
          isGradientVariant ? "text-gray-200" : "text-gray-600"
        }`}
      >
        {description}
      </p>

      {/* Results/Metrics */}
      {results.length > 0 && (
        <div
          className={`grid ${
            results.length === 2 ? "grid-cols-2" : "grid-cols-3"
          } gap-4 mb-6 pb-6 ${
            isGradientVariant ? "border-white/20" : "border-gray-200"
          } border-b`}
        >
          {results.map((result, index) => (
            <div key={index}>
              <div
                className={`text-2xl font-bold mb-1 ${
                  isGradientVariant ? "text-cyan" : "gradient-text"
                }`}
              >
                {result.value}
              </div>
              <div
                className={`text-sm ${
                  isGradientVariant ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {result.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 text-xs rounded-full ${
                isGradientVariant
                  ? "bg-white/10 text-cyan"
                  : "bg-purple/10 text-purple"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <a
        href={ctaLink}
        className={`inline-flex items-center font-semibold transition-colors duration-300 ${
          isGradientVariant
            ? "text-cyan hover:text-white"
            : "text-purple hover:text-cyan"
        }`}
      >
        {ctaText}
        <i className="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  );
};

export default CaseStudyCard;
