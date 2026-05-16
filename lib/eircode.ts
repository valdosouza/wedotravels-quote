// ============================================================
// EirCode Lookup via OpenStreetMap Nominatim (free, no key needed)
// ============================================================

export interface EircodeResult {
  address: string;
  city: string;
  county: string;
  lat: number;
  lon: number;
}

export async function lookupEircode(eircode: string): Promise<EircodeResult | null> {
  try {
    const cleaned = eircode.replace(/\s+/g, "").toUpperCase();
    if (cleaned.length < 3) return null;

    // Use Nominatim free geocoding with Ireland bias
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleaned + ", Ireland")}&format=json&addressdetails=1&limit=1&countrycodes=ie`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "WeDo-Travels-Quote-System/1.0",
        "Accept-Language": "en",
      },
    });

    if (!res.ok) return null;
    const data = await res.json();

    if (!data || data.length === 0) return null;

    const result = data[0];
    const addr = result.address || {};

    const road = addr.road || addr.pedestrian || "";
    const houseNumber = addr.house_number || "";
    const addressLine = houseNumber ? `${houseNumber} ${road}` : road;

    const city =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.suburb ||
      addr.municipality ||
      "";

    const county =
      addr.county?.replace("County ", "") ||
      addr.state_district?.replace("County ", "") ||
      "";

    return {
      address: addressLine,
      city,
      county,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
    };
  } catch (err) {
    console.error("EirCode lookup failed:", err);
    return null;
  }
}
