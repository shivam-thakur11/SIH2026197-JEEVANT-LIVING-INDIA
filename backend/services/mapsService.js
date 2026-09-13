/**
 * Maps Service
 * =====================================================
 * Interface for location-related features:
 *   - Geocoding artisan locations (address → lat/lng)
 *   - Displaying artisan clusters on a map
 *   - Finding workshops near a user
 *
 * TODO: Integrate Google Maps API
 *   - Requires: GOOGLE_MAPS_API_KEY in .env
 *   - npm install @googlemaps/google-maps-services-js
 * =====================================================
 */

/**
 * Converts a text address to coordinates.
 *
 * @param {string} address - e.g. "Madhubani, Bihar, India"
 * @returns {Promise<{lat: number, lng: number, isDemoMode: boolean}>}
 */
const geocodeAddress = async (address) => {
  // TODO: Replace with Google Maps Geocoding API
  // const { Client } = require('@googlemaps/google-maps-services-js');
  // const client = new Client();
  // const response = await client.geocode({
  //   params: { address, key: process.env.GOOGLE_MAPS_API_KEY },
  // });
  // const { lat, lng } = response.data.results[0].geometry.location;
  // return { lat, lng, isDemoMode: false };

  // Demo: returns approximate coordinates for common Indian cultural hubs
  const demoCoordinates = {
    bihar: { lat: 26.1542, lng: 85.3096 },
    rajasthan: { lat: 26.9124, lng: 75.7873 },
    odisha: { lat: 20.9517, lng: 85.0985 },
    maharashtra: { lat: 20.5937, lng: 78.9629 },
    'andhra pradesh': { lat: 15.9129, lng: 79.74 },
    kashmir: { lat: 34.0837, lng: 74.7973 },
  };

  const addressLower = address.toLowerCase();
  let coords = { lat: 20.5937, lng: 78.9629 }; // Default: center of India

  for (const [key, value] of Object.entries(demoCoordinates)) {
    if (addressLower.includes(key)) {
      coords = value;
      break;
    }
  }

  console.log('[MAPS SERVICE] geocodeAddress: Running in DEMO MODE');
  return {
    ...coords,
    address,
    isDemoMode: true,
    note: 'Configure GOOGLE_MAPS_API_KEY in .env for real geocoding.',
  };
};

/**
 * Returns a static map image URL for display.
 *
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} zoom - Zoom level (1-20)
 * @returns {string} Map image URL
 */
const getStaticMapUrl = (lat, lng, zoom = 12) => {
  // TODO: Replace with Google Static Maps API
  // return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  // Demo: returns an OpenStreetMap tile URL (free, no key required)
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=600x300`;
};

module.exports = { geocodeAddress, getStaticMapUrl };
