import { useState } from "react";
import CTABanner from "../components/CTABanner";

const CTABannerDemo = () => {
  const [activeVariant, setActiveVariant] = useState("sticky-top");

  const variants = [
    {
      id: "sticky-top",
      name: "Sticky Top Banner",
      description: "Fixed at top, always visible",
      icon: "⬆️",
      pros: ["Always visible", "Professional look", "High visibility"],
      cons: ["Takes header space"],
    },
    {
      id: "floating-button",
      name: "Floating Button",
      description: "Bottom right corner, appears after scroll",
      icon: "🎯",
      pros: ["Non-intrusive", "Modern design", "Mobile friendly"],
      cons: ["Lower initial visibility"],
    },
    {
      id: "slide-bottom",
      name: "Slide-in Bottom",
      description: "Slides up from bottom after scroll",
      icon: "⬇️",
      pros: ["Good timing", "Easy to dismiss", "High conversion"],
      cons: ["Can be missed"],
    },
    {
      id: "smart-header",
      name: "Smart Header",
      description: "Full size initially, shrinks on scroll",
      icon: "🧠",
      pros: ["Adaptive design", "Best of both worlds"],
      cons: ["Complex animation"],
    },
    {
      id: "banner-strip",
      name: "Banner Strip",
      description: "Thin minimal strip at top",
      icon: "📏",
      pros: ["Minimal space", "Clean design", "Fast loading"],
      cons: ["Limited content space"],
    },
    {
      id: "corner-popup",
      name: "Corner Popup",
      description: "Pops up from bottom left corner",
      icon: "💬",
      pros: ["Chat-like feel", "Good engagement", "Non-intrusive"],
      cons: ["Can hide bottom content"],
    },
    {
      id: "full-screen-takeover",
      name: "Full Screen Takeover",
      description: "Full screen overlay (aggressive)",
      icon: "🖥️",
      pros: ["Maximum attention", "High impact", "Can't miss"],
      cons: ["Very intrusive", "Can annoy users"],
    },
    {
      id: "slide-in-left",
      name: "Slide In Left",
      description: "Slides from left side",
      icon: "◀️",
      pros: ["Unique animation", "Side placement", "Good visibility"],
      cons: ["Can block content"],
    },
    {
      id: "sticky-bottom",
      name: "Sticky Bottom",
      description: "Fixed at bottom of page",
      icon: "⬇️",
      pros: ["Always visible", "Doesn't block header", "Mobile friendly"],
      cons: ["Takes bottom space"],
    },
    {
      id: "notification-bar",
      name: "Notification Bar",
      description: "Minimal notification style at top",
      icon: "ℹ️",
      pros: ["Very minimal", "Professional", "Fast loading"],
      cons: ["Low visual impact"],
    },
  ];

  const handleCTAClick = () => {
    alert("CTA Clicked! This would open your contact form or modal.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show the selected variant */}
      <CTABanner
        variant={activeVariant}
        title="Schedule Your Free ROI Audit"
        description="Discover exactly why top brands trust us with ₹300+ Crores in ad spends"
        buttonText="Get ROI Audit"
        phoneNumber="+919176402555"
        onButtonClick={handleCTAClick}
        dismissible={true}
        showAfterScroll={100}
        storageKey={`cta-${activeVariant}-dismissed`}
      />

      {/* Demo Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              CTA Banner Variants Demo
            </h1>
            <p className="text-lg text-gray-600">
              Choose a variant below to preview different CTA banner styles
            </p>
          </div>

          {/* Variant Selector */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {variants.map((variant) => (
              <div
                key={variant.id}
                onClick={() => setActiveVariant(variant.id)}
                className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                  activeVariant === variant.id
                    ? "border-red-500 shadow-lg transform scale-105"
                    : "border-gray-200 hover:border-red-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{variant.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {variant.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {variant.description}
                    </p>

                    <div className="space-y-2">
                      <div>
                        <div className="text-xs font-semibold text-green-600 mb-1">
                          ✓ Pros:
                        </div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {variant.pros.map((pro, idx) => (
                            <li key={idx}>• {pro}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-orange-600 mb-1">
                          ⚠ Cons:
                        </div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {variant.cons.map((con, idx) => (
                            <li key={idx}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {activeVariant === variant.id && (
                      <div className="mt-4 text-sm font-semibold text-red-600">
                        ← Currently Active
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
              📝 How to Use
            </h3>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>
                <strong>1.</strong> Click on any variant card above to preview
                it
              </li>
              <li>
                <strong>2.</strong> Scroll the page to see scroll-triggered
                variants
              </li>
              <li>
                <strong>3.</strong> Try the CTA buttons and dismiss
                functionality
              </li>
              <li>
                <strong>4.</strong> Test on mobile by resizing your browser
              </li>
              <li>
                <strong>5.</strong> Choose your favorite and add it to your
                layout!
              </li>
            </ol>
          </div>

          {/* My Recommendation */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🎯 My Recommendation</h3>
            <p className="text-lg mb-6">
              Based on UX best practices and conversion optimization:
            </p>

            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="font-bold mb-2">
                  🥇 Best for Desktop: Smart Header
                </div>
                <p className="text-sm text-red-50">
                  Provides full information initially, then stays visible
                  without being intrusive
                </p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="font-bold mb-2">
                  🥇 Best for Mobile: Floating Button
                </div>
                <p className="text-sm text-red-50">
                  Clean, doesn't take up precious screen space, easy to access
                </p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="font-bold mb-2">
                  🥇 Best Overall: Sticky Top (Your Design)
                </div>
                <p className="text-sm text-red-50">
                  Maximum visibility, professional appearance, works on all
                  devices
                </p>
              </div>
            </div>
          </div>

          {/* Dummy content for scrolling */}
          <div className="mt-12 space-y-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">About ROI Audits</h2>
              <p className="text-gray-600 leading-relaxed">
                Our ROI audits help businesses optimize their advertising spend
                and maximize returns. We've worked with top brands managing over
                ₹300+ Crores in ad spends, delivering measurable results and
                actionable insights.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl mb-3">🎯</div>
                    <h3 className="font-bold mb-2">Feature {i}</h3>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Scroll down to see how the different banner variants appear...
              </p>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    Client testimonial or success story #{i}. This is
                    placeholder content to demonstrate scrolling behavior and
                    how different banner variants appear.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABannerDemo;
