import { useState, useEffect } from "react";

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headingElements = doc.querySelectorAll("h2, h3");

    const headingData = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      const text = heading.textContent;
      const level = heading.tagName.toLowerCase();
      return { id, text, level };
    });

    setHeadings(headingData);

    // Add IDs to actual DOM headings after content is rendered
    setTimeout(() => {
      const actualHeadings = document.querySelectorAll(
        ".blog-content h2, .blog-content h3"
      );
      actualHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }, 100);
  }, [content]);

  useEffect(() => {
    // Track active heading on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    const headingElements = document.querySelectorAll(
      ".blog-content h2, .blog-content h3"
    );
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  // Don't show TOC if there are less than 3 headings
  if (headings.length < 3) {
    return null;
  }

  return (
    <>
      {/* Desktop TOC - Sticky Sidebar */}
      <aside className="hidden xl:block">
        <div className="sticky top-24">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <h3 className="font-bold text-gray-900">Table of Contents</h3>
            </div>

            <nav className="space-y-1">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`block w-full text-left text-sm transition-all ${
                    heading.level === "h3" ? "pl-4" : "pl-0"
                  } ${
                    activeId === heading.id
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div
                    className="py-2 border-l-2 pl-3 transition-colors duration-200"
                    style={{
                      borderColor:
                        activeId === heading.id ? "#2563eb" : "transparent",
                    }}
                  >
                    {heading.text}
                  </div>
                </button>
              ))}
            </nav>

            {/* Progress indicator */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Reading Progress</span>
                <span>
                  {Math.round(
                    ((headings.findIndex((h) => h.id === activeId) + 1) /
                      headings.length) *
                      100
                  ) || 0}
                  %
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                  style={{
                    width: `${
                      ((headings.findIndex((h) => h.id === activeId) + 1) /
                        headings.length) *
                        100 || 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile TOC - Collapsible Button */}
      <div className="xl:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
          aria-label="Toggle table of contents"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile TOC Dropdown */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed bottom-24 right-6 bg-white rounded-xl shadow-2xl p-6 max-w-sm w-80 max-h-96 overflow-y-auto z-40 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <h3 className="font-bold text-gray-900">Contents</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="space-y-1">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left text-sm transition-all ${
                      heading.level === "h3" ? "pl-4" : "pl-0"
                    } ${
                      activeId === heading.id
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div
                      className="py-2 border-l-2 pl-3 transition-colors duration-200"
                      style={{
                        borderColor:
                          activeId === heading.id ? "#2563eb" : "transparent",
                      }}
                    >
                      {heading.text}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
