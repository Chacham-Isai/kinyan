/**
 * Shabbos & Zmanim awareness utilities for KINYAN
 * Ensures the platform respects Shabbos/Yom Tov times
 */

interface ZmanimTimes {
  candleLighting: Date;
  havdalah: Date;
  isShabbos: boolean;
  isYomTov: boolean;
}

// Approximate candle lighting: 18 minutes before sunset
// This is a simplified version - production would use a proper zmanim API
const CANDLE_LIGHTING_OFFSET_MINUTES = 18;

/**
 * Get approximate sunset time for a given date and location
 * Uses a simplified calculation - in production, integrate with a zmanim API
 */
function getApproximateSunset(date: Date, lat: number = 40.7128, lng: number = -74.0060): Date {
  // Simplified sunset calculation for NYC area
  // In production, use KosherJava or hebcal API
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );

  // Approximate sunset hour (varies 4:30 PM to 8:30 PM in NYC)
  const sunsetHour = 17.5 + 2 * Math.sin(((dayOfYear - 80) / 365) * 2 * Math.PI);
  const hours = Math.floor(sunsetHour);
  const minutes = Math.round((sunsetHour - hours) * 60);

  const sunset = new Date(date);
  sunset.setHours(hours, minutes, 0, 0);
  return sunset;
}

/**
 * Check if it's currently Shabbos (Friday sunset to Saturday nightfall)
 */
export function isCurrentlyShabbos(lat?: number, lng?: number): boolean {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday

  if (dayOfWeek === 5) {
    // Friday - check if after candle lighting
    const sunset = getApproximateSunset(now, lat, lng);
    const candleLighting = new Date(sunset.getTime() - CANDLE_LIGHTING_OFFSET_MINUTES * 60000);
    return now >= candleLighting;
  }

  if (dayOfWeek === 6) {
    // Saturday - check if before havdalah (approx 42 min after sunset)
    const sunset = getApproximateSunset(now, lat, lng);
    const havdalah = new Date(sunset.getTime() + 42 * 60000);
    return now < havdalah;
  }

  return false;
}

/**
 * Get the next Shabbos times
 */
export function getNextShabbosTime(lat?: number, lng?: number): ZmanimTimes {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Days until Friday
  const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 6;
  const friday = new Date(now);
  friday.setDate(friday.getDate() + daysUntilFriday);
  friday.setHours(0, 0, 0, 0);

  const saturday = new Date(friday);
  saturday.setDate(saturday.getDate() + 1);

  const fridaySunset = getApproximateSunset(friday, lat, lng);
  const saturdaySunset = getApproximateSunset(saturday, lat, lng);

  return {
    candleLighting: new Date(fridaySunset.getTime() - CANDLE_LIGHTING_OFFSET_MINUTES * 60000),
    havdalah: new Date(saturdaySunset.getTime() + 42 * 60000),
    isShabbos: isCurrentlyShabbos(lat, lng),
    isYomTov: false, // Would need a Hebrew calendar library for full implementation
  };
}

/**
 * Format a time for display (e.g., "7:42 PM")
 */
export function formatZmanTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Get a Shabbos-aware message for the platform
 */
export function getShabbosMessage(): string | null {
  if (isCurrentlyShabbos()) {
    return "Good Shabbos! Live streams are paused until after Havdalah.";
  }

  const now = new Date();
  const dayOfWeek = now.getDay();

  if (dayOfWeek === 5) {
    const shabbos = getNextShabbosTime();
    const minutesUntil = Math.round(
      (shabbos.candleLighting.getTime() - now.getTime()) / 60000
    );

    if (minutesUntil > 0 && minutesUntil <= 120) {
      return `Candle lighting in ${minutesUntil} minutes — wrapping up soon!`;
    }
  }

  return null;
}

/**
 * Check if live streaming should be disabled (Shabbos/Yom Tov)
 */
export function isLiveStreamingDisabled(): boolean {
  return isCurrentlyShabbos();
}

/**
 * Get time until next available streaming window
 */
export function getTimeUntilStreaming(): string | null {
  if (!isCurrentlyShabbos()) return null;

  const shabbos = getNextShabbosTime();
  const now = new Date();
  const diff = shabbos.havdalah.getTime() - now.getTime();

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  if (hours > 0) {
    return `${hours}h ${minutes}m until Motzei Shabbos`;
  }
  return `${minutes}m until Motzei Shabbos`;
}
