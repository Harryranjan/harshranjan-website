/**
 * Cache Middleware
 * Implements Redis caching for API responses
 */

const { cache } = require("../config/redis");

/**
 * Cache middleware factory
 * @param {number} ttl - Time to live in seconds
 * @param {function} keyGenerator - Function to generate cache key from req
 */
const cacheMiddleware = (ttl = 3600, keyGenerator = null) => {
  return async (req, res, next) => {
    // Skip cache in development if desired
    if (process.env.SKIP_CACHE === "true") {
      return next();
    }

    try {
      // Generate cache key
      const key = keyGenerator
        ? keyGenerator(req)
        : `cache:${req.originalUrl || req.url}`;

      // Try to get cached data
      const cachedData = await cache.get(key);

      if (cachedData) {
        console.log(`Cache HIT: ${key}`);
        return res.json(cachedData);
      }

      console.log(`Cache MISS: ${key}`);

      // Store original res.json
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response
      res.json = (data) => {
        // Cache the response
        cache.set(key, data, ttl).catch((err) => {
          console.error("Failed to cache response:", err.message);
        });

        // Send response
        return originalJson(data);
      };

      next();
    } catch (err) {
      console.error("Cache middleware error:", err.message);
      next(); // Continue without cache on error
    }
  };
};

/**
 * Cache invalidation middleware
 * Clears cache based on patterns after data modification
 */
const invalidateCache = (...patterns) => {
  return async (req, res, next) => {
    // Store original send
    const originalSend = res.send.bind(res);

    // Override send to invalidate cache after successful response
    res.send = function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Invalidate cache patterns asynchronously
        Promise.all(patterns.map((pattern) => cache.delPattern(pattern))).catch(
          (err) => {
            console.error("Cache invalidation error:", err.message);
          }
        );
      }
      return originalSend(data);
    };

    next();
  };
};

/**
 * Pre-defined cache strategies for common resources
 */
const cacheStrategies = {
  // Blog posts - cache for 1 hour
  blogPost: cacheMiddleware(3600, (req) => `cache:blog:${req.params.slug}`),

  // Blog list - cache for 30 minutes
  blogList: cacheMiddleware(1800, (req) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const category = req.query.category || "all";
    return `cache:blogs:${page}:${limit}:${category}`;
  }),

  // Pages - cache for 2 hours
  page: cacheMiddleware(7200, (req) => `cache:page:${req.params.slug}`),

  // Analytics - cache for 15 minutes
  analytics: cacheMiddleware(900, (req) => `cache:analytics:${req.path}`),

  // Downloads - cache for 1 hour
  downloads: cacheMiddleware(3600, () => `cache:downloads:list`),

  // Forms - cache for 1 hour
  forms: cacheMiddleware(3600, () => `cache:forms:list`),

  // Menu - cache for 2 hours
  menu: cacheMiddleware(7200, (req) => {
    const location = req.params.location || req.query.location || "all";
    return `cache:menu:${location}`;
  }),

  // Settings - cache for 4 hours
  settings: cacheMiddleware(14400, () => `cache:settings`),
};

/**
 * Pre-defined invalidation patterns
 */
const invalidationPatterns = {
  blog: ["cache:blog:*", "cache:blogs:*"],
  page: ["cache:page:*"],
  download: ["cache:downloads:*"],
  form: ["cache:forms:*"],
  menu: ["cache:menu:*"],
  settings: ["cache:settings*"],
  analytics: ["cache:analytics:*"],
  all: ["cache:*"],
};

module.exports = {
  cacheMiddleware,
  invalidateCache,
  cacheStrategies,
  invalidationPatterns,
};
