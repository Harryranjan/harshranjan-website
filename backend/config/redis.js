/**
 * Redis Configuration and Connection
 * Caching layer for blog posts, pages, and analytics
 */

const redis = require("redis");

// Create Redis client
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    reconnectStrategy: () => false, // Don't retry if connection fails
  },
  password: process.env.REDIS_PASSWORD || undefined,
  database: parseInt(process.env.REDIS_DB || "0"),
});

// Error handler
redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Connection handler
redisClient.on("connect", () => {
  console.log("✓ Redis connected successfully");
});

// Connect to Redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected");
  } catch (err) {
    console.error("Redis connection failed:", err.message);
    console.log("⚠ Continuing without Redis cache");
  }
};

// Cache helper functions
const cache = {
  /**
   * Get cached data
   */
  async get(key) {
    try {
      if (!redisClient.isOpen) return null;
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Redis GET error:", err.message);
      return null;
    }
  },

  /**
   * Set cached data with optional TTL (in seconds)
   */
  async set(key, value, ttl = 3600) {
    try {
      if (!redisClient.isOpen) return false;
      const serialized = JSON.stringify(value);
      if (ttl) {
        await redisClient.setEx(key, ttl, serialized);
      } else {
        await redisClient.set(key, serialized);
      }
      return true;
    } catch (err) {
      console.error("Redis SET error:", err.message);
      return false;
    }
  },

  /**
   * Delete cached data
   */
  async del(key) {
    try {
      if (!redisClient.isOpen) return false;
      await redisClient.del(key);
      return true;
    } catch (err) {
      console.error("Redis DEL error:", err.message);
      return false;
    }
  },

  /**
   * Delete multiple keys by pattern
   */
  async delPattern(pattern) {
    try {
      if (!redisClient.isOpen) return false;
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
      return true;
    } catch (err) {
      console.error("Redis DEL pattern error:", err.message);
      return false;
    }
  },

  /**
   * Clear all cache
   */
  async clear() {
    try {
      if (!redisClient.isOpen) return false;
      await redisClient.flushDb();
      return true;
    } catch (err) {
      console.error("Redis CLEAR error:", err.message);
      return false;
    }
  },

  /**
   * Check if key exists
   */
  async exists(key) {
    try {
      if (!redisClient.isOpen) return false;
      return (await redisClient.exists(key)) === 1;
    } catch (err) {
      console.error("Redis EXISTS error:", err.message);
      return false;
    }
  },

  /**
   * Set expiration time for a key
   */
  async expire(key, seconds) {
    try {
      if (!redisClient.isOpen) return false;
      await redisClient.expire(key, seconds);
      return true;
    } catch (err) {
      console.error("Redis EXPIRE error:", err.message);
      return false;
    }
  },
};

module.exports = {
  redisClient,
  connectRedis,
  cache,
};
