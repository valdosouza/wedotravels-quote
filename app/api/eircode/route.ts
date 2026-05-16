import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code") || "";
  const cleaned = code.replace(/\s+/g, "").toUpperCase();

  if (cleaned.length < 3) {
    return NextResponse.json({ success: false, error: "Eircode too short" }, { status: 400 });
  }

  try {
    // Use Nominatim (OpenStreetMap) – free, no API key needed
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(code + ", Ireland")}&format=json&addressdetails=1&limit=1&countrycodes=ie`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "WeDo-Travels-Quote-System/1.0 (contact@wedotravels.ie)",
        "Accept-Language": "en",
      },
      // Cache for 1 hour
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Nominatim error: ${res.status}`);
    }

    const data = await res.json();

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const result = data[0];
    const addr = result.address || {};

    const road = addr.road || addr.pedestrian || addr.street || "";
    const houseNumber = addr.house_number || "";
    const addressLine = houseNumber ? `${houseNumber} ${road}` : road;

    const city =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.suburb ||
      addr.municipality ||
      "";

    const county = (
      addr.county?.replace(/^County\s+/i, "") ||
      addr.state_district?.replace(/^County\s+/i, "") ||
      ""
    );

    return NextResponse.json({
      success: true,
      address: addressLine.trim(),
      city: city.trim(),
      county: county.trim(),
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
    });
  } catch (err) {
    console.error("EirCode API error:", err);
    return NextResponse.json(
      { success: false, error: "Lookup failed" },
      { status: 500 }
    );
  }
}
