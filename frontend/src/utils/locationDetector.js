/**
 * Location Detection Service
 * Detects if user is from Vadodara, Gujarat using multiple methods
 */

const VADODARA_COORDS = {
  lat: 22.3072,
  lng: 73.1812,
  radius: 50, // km radius
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Detect location using browser's Geolocation API
 */
export async function detectLocationByGPS() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ isVadodara: false, method: "geolocation-not-supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = calculateDistance(
          latitude,
          longitude,
          VADODARA_COORDS.lat,
          VADODARA_COORDS.lng
        );

        const isVadodara = distance <= VADODARA_COORDS.radius;
        resolve({
          isVadodara,
          distance: Math.round(distance),
          coords: { lat: latitude, lng: longitude },
          method: "gps",
        });
      },
      (error) => {
        console.log("Geolocation error:", error.message);
        resolve({
          isVadodara: false,
          method: "geolocation-denied",
          error: error.message,
        });
      },
      {
        timeout: 10000,
        maximumAge: 600000, // 10 minutes cache
      }
    );
  });
}

/**
 * Detect location using IP-based geolocation API (fallback)
 */
export async function detectLocationByIP() {
  try {
    // Using ipapi.co - free tier allows 1000 requests/day
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    if (data.city && data.region) {
      const isVadodara =
        data.city.toLowerCase().includes("vadodara") ||
        data.city.toLowerCase().includes("baroda") ||
        (data.latitude &&
          data.longitude &&
          calculateDistance(
            data.latitude,
            data.longitude,
            VADODARA_COORDS.lat,
            VADODARA_COORDS.lng
          ) <= VADODARA_COORDS.radius);

      return {
        isVadodara,
        city: data.city,
        region: data.region,
        country: data.country_name,
        coords: data.latitude
          ? { lat: data.latitude, lng: data.longitude }
          : null,
        method: "ip-geolocation",
      };
    }
  } catch (error) {
    console.log("IP geolocation error:", error.message);
  }

  return { isVadodara: false, method: "ip-geolocation-failed" };
}

/**
 * Detect if user is from Vadodara using available methods
 * Tries GPS first, then falls back to IP-based detection
 */
export async function isUserFromVadodara() {
  // Check if we already detected and saved in session
  const cached = sessionStorage.getItem("locationDetected");
  if (cached) {
    try {
      const data = JSON.parse(cached);
      // Cache for 1 hour
      if (Date.now() - data.timestamp < 3600000) {
        return data;
      }
    } catch (e) {
      // Invalid cache, continue with detection
    }
  }

  // Try GPS first
  let result = await detectLocationByGPS();

  // If GPS failed or not available, try IP-based detection
  if (
    !result.isVadodara &&
    (result.method === "geolocation-denied" ||
      result.method === "geolocation-not-supported")
  ) {
    const ipResult = await detectLocationByIP();
    result = { ...result, ...ipResult };
  }

  // Cache the result
  const dataToCache = {
    ...result,
    timestamp: Date.now(),
  };
  sessionStorage.setItem("locationDetected", JSON.stringify(dataToCache));

  return result;
}

/**
 * Get user's preferred language based on location and browser settings
 */
export async function getPreferredLanguage() {
  // Check if user has already set a preference
  const savedLanguage = localStorage.getItem("userLanguage");
  if (savedLanguage) {
    return savedLanguage;
  }

  // Detect location
  const locationData = await isUserFromVadodara();

  // If from Vadodara, suggest Gujarati
  if (locationData.isVadodara) {
    return "suggest-gu";
  }

  // Check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith("gu")) {
    return "gu";
  }

  return "en";
}
