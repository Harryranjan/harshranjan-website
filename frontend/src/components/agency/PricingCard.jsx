import React from "react";

/**
 * PricingCard Component
 * Reusable card for displaying pricing tiers
 * Used in: Pricing section
 */
const PricingCard = ({
  name,
  price,
  priceUnit = "month",
  description,
  features = [],
  isPopular = false,
  ctaText = "Get Started",
  ctaVariant = "outline",
  ctaLink = "#",
  className = "",
}) => {
  return (
    <div
      className={`pricing-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
        isPopular
          ? "relative border-2 border-purple"
          : "border-2 border-gray-200"
      } ${className}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-cta px-6 py-2 rounded-full text-sm font-bold text-white">
          MOST POPULAR
        </div>
      )}

      <div className={`${isPopular ? "mt-4" : ""} mb-6`}>
        <h3 className="text-2xl font-bold mb-2 text-navy">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <div
          className={`text-5xl font-black mb-2 ${
            isPopular ? "gradient-text" : "text-navy"
          }`}
        >
          {price}
        </div>
        {priceUnit && <div className="text-gray-500">/{priceUnit}</div>}
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <i
              className={`fas fa-check ${
                isPopular ? "text-purple" : "text-cyan"
              } mt-1`}
            ></i>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-full font-semibold transition-all ${
          ctaVariant === "coral"
            ? "bg-coral hover:bg-orange-600 text-white shadow-lg"
            : "border-2 border-purple text-purple hover:bg-purple hover:text-white"
        }`}
      >
        {ctaText}
      </button>
    </div>
  );
};

export default PricingCard;
