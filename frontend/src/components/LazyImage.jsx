import React, { useState, useEffect, useRef } from "react";

/**
 * LazyImage Component
 * Implements lazy loading with Intersection Observer
 * Supports WebP with fallback, srcset for responsive images, and blur-up effect
 */
const LazyImage = ({
  src,
  webpSrc = null,
  alt = "",
  className = "",
  thumbnailSrc = null,
  srcSet = null,
  sizes = "100vw",
  onLoad = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <div
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      {...props}
    >
      {/* Show thumbnail while loading (blur-up effect) */}
      {thumbnailSrc && !isLoaded && (
        <img
          src={thumbnailSrc}
          alt={alt}
          className="lazy-image-thumbnail"
          style={{
            filter: "blur(10px)",
            transition: "filter 0.3s ease",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Main image with WebP support */}
      {isInView && (
        <picture>
          {/* WebP version for modern browsers */}
          {webpSrc && (
            <source type="image/webp" srcSet={webpSrc} sizes={sizes} />
          )}

          {/* Fallback to JPEG/PNG with srcset for responsive images */}
          <img
            src={src}
            srcSet={srcSet || undefined}
            sizes={sizes}
            alt={alt}
            onLoad={handleLoad}
            loading="lazy"
            decoding="async"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </picture>
      )}

      {/* Loading placeholder */}
      {!isInView && !thumbnailSrc && (
        <div
          className="lazy-image-placeholder"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
