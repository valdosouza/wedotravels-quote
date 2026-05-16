import { QuoteFormData } from "./types";

const MOVE_TYPE_LABELS = {
  home: "🏠 Home move",
  office: "🏢 Office / commercial move",
  partial: "📦 Partial / small move",
  storage: "🔒 Storage move",
};

const PACKING_LABELS = {
  not_packed: "Not packed yet",
  partly_packed: "Partly packed",
  mostly_packed: "Mostly packed",
  ready_to_load: "Ready to load",
};

const FLEXIBILITY_LABELS = {
  exact: "Exact date only",
  few_days: "± a few days",
  week: "± a week",
  flexible: "Very flexible",
};

export function buildWhatsAppMessage(data: QuoteFormData): string {
  const lines: string[] = [
    "🚛 *NEW MOVING QUOTE REQUEST*",
    "────────────────────────────",
    "",
    "👤 *CONTACT DETAILS*",
    `• Name: ${data.fullName}`,
    `• Email: ${data.email}`,
    `• Phone: ${data.phone}`,
    "",
    "📦 *MOVE DETAILS*",
    `• Type: ${data.moveType ? MOVE_TYPE_LABELS[data.moveType] : "N/A"}`,
    `• Bedrooms: ${data.bedrooms}`,
    `• Living rooms: ${data.livingRooms}`,
    "",
    "🛋️ *ITEMS TO MOVE*",
    `• Beds: ${data.quantities.beds}`,
    `• Sofas: ${data.quantities.sofas}`,
    `• Tables/Desks: ${data.quantities.tables}`,
    `• Wardrobes: ${data.quantities.wardrobes}`,
    `• Appliances: ${data.quantities.appliances}`,
    `• Boxes: ${data.quantities.boxes}`,
    "",
    "📍 *MOVING FROM*",
    `• Eircode: ${data.from.eircode}`,
    `• Address: ${data.from.address}`,
    `• City: ${data.from.city}`,
    `• County: ${data.from.county}`,
    `• Floor: ${data.from.floor}`,
    `• Lift: ${data.from.liftAvailable ? "Yes ✅" : "No ❌"}`,
    "",
    "🏁 *MOVING TO*",
    `• Eircode: ${data.to.eircode}`,
    `• Address: ${data.to.address}`,
    `• City: ${data.to.city}`,
    `• County: ${data.to.county}`,
    `• Floor: ${data.to.floor}`,
    `• Lift: ${data.to.liftAvailable ? "Yes ✅" : "No ❌"}`,
    "",
    "📅 *SCHEDULE*",
    `• Preferred date: ${data.preferredDate || "N/A"}`,
    `• Flexibility: ${FLEXIBILITY_LABELS[data.flexibility]}`,
    "",
    "📋 *STATUS*",
    `• Packing: ${data.packingStatus ? PACKING_LABELS[data.packingStatus] : "N/A"}`,
    `• Needs ride: ${data.needsRide ? "Yes ✅" : "No"}`,
    "",
  ];

  if (data.extraDetails) {
    lines.push("💬 *EXTRA DETAILS*");
    lines.push(data.extraDetails);
    lines.push("");
  }

  lines.push("────────────────────────────");
  lines.push("_Sent via WeDo Travels Quote System_");

  return lines.join("\n");
}

export function buildWhatsAppUrl(data: QuoteFormData, phoneNumber: string): string {
  const message = buildWhatsAppMessage(data);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}
