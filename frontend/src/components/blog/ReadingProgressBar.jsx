import { useState, useEffect } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Get the total scrollable height
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      // Get current scroll position
      const scrolled = window.scrollY;

      // Calculate progress percentage
      const progressPercentage = (scrolled / scrollHeight) * 100;

      setProgress(progressPercentage);
    };

    // Add scroll event listener
    window.addEventListener("scroll", updateProgress);

    // Initial calculation
    updateProgress();

    // Cleanup
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      >
        {/* Glow effect at the end */}
        <div className="absolute right-0 top-0 h-full w-4 bg-white/30 blur-sm" />
      </div>
    </div>
  );
}
