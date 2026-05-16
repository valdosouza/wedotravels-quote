import { NextRequest, NextResponse } from "next/server";
import { QuoteFormData } from "@/lib/types";

// ============================================================
// Backup email route – sends quote data as email fallback
// Configure via .env.local (see .env.local.example)
// ============================================================

function buildEmailHtml(data: QuoteFormData): string {
  const moveLabels: Record<string, string> = {
    home: "🏠 Home move",
    office: "🏢 Office / commercial move",
    partial: "📦 Partial / small move",
    storage: "🔒 Storage move",
  };
  const packingLabels: Record<string, string> = {
    not_packed: "Not packed yet",
    partly_packed: "Partly packed",
    mostly_packed: "Mostly packed",
    ready_to_load: "Ready to load",
  };
  const flexLabels: Record<string, string> = {
    exact: "Exact date only",
    few_days: "± a few days",
    week: "± a week",
    flexible: "Very flexible",
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .card { background: white; border-radius: 12px; padding: 24px; max-width: 600px; margin: 0 auto; }
    h1 { color: #ea580c; margin: 0 0 20px; }
    h2 { color: #1e3a5f; font-size: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 6px; margin-top: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    td { padding: 6px 4px; font-size: 14px; color: #333; }
    td:first-child { color: #666; width: 40%; }
    .badge { background: #ea580c; color: white; padding: 2px 8px; border-radius: 20px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚛 New Moving Quote Request</h1>
    <p style="color:#666;font-size:13px">Submitted via WeDo Travels Quote System</p>

    <h2>👤 Contact Details</h2>
    <table>
      <tr><td>Name</td><td><strong>${data.fullName}</strong></td></tr>
      <tr><td>Email</td><td>${data.email}</td></tr>
      <tr><td>Phone</td><td>${data.phone}</td></tr>
    </table>

    <h2>📦 Move Details</h2>
    <table>
      <tr><td>Type</td><td>${data.moveType ? moveLabels[data.moveType] : "N/A"}</td></tr>
      <tr><td>Bedrooms</td><td>${data.bedrooms}</td></tr>
      <tr><td>Living rooms</td><td>${data.livingRooms}</td></tr>
    </table>

    <h2>🛋️ Items to Move</h2>
    <table>
      <tr><td>Beds</td><td>${data.quantities.beds}</td></tr>
      <tr><td>Sofas</td><td>${data.quantities.sofas}</td></tr>
      <tr><td>Tables/Desks</td><td>${data.quantities.tables}</td></tr>
      <tr><td>Wardrobes</td><td>${data.quantities.wardrobes}</td></tr>
      <tr><td>Appliances</td><td>${data.quantities.appliances}</td></tr>
      <tr><td>Boxes</td><td>${data.quantities.boxes}</td></tr>
    </table>

    <h2>📍 Moving From</h2>
    <table>
      <tr><td>Eircode</td><td>${data.from.eircode}</td></tr>
      <tr><td>Address</td><td>${data.from.address}</td></tr>
      <tr><td>City</td><td>${data.from.city}</td></tr>
      <tr><td>County</td><td>${data.from.county}</td></tr>
      <tr><td>Floor</td><td>${data.from.floor}</td></tr>
      <tr><td>Lift</td><td>${data.from.liftAvailable ? "Yes ✅" : "No"}</td></tr>
    </table>

    <h2>🏁 Moving To</h2>
    <table>
      <tr><td>Eircode</td><td>${data.to.eircode}</td></tr>
      <tr><td>Address</td><td>${data.to.address}</td></tr>
      <tr><td>City</td><td>${data.to.city}</td></tr>
      <tr><td>County</td><td>${data.to.county}</td></tr>
      <tr><td>Floor</td><td>${data.to.floor}</td></tr>
      <tr><td>Lift</td><td>${data.to.liftAvailable ? "Yes ✅" : "No"}</td></tr>
    </table>

    <h2>📅 Schedule</h2>
    <table>
      <tr><td>Preferred date</td><td>${data.preferredDate || "N/A"}</td></tr>
      <tr><td>Flexibility</td><td>${flexLabels[data.flexibility]}</td></tr>
    </table>

    <h2>📋 Status</h2>
    <table>
      <tr><td>Packing</td><td>${data.packingStatus ? packingLabels[data.packingStatus] : "N/A"}</td></tr>
      <tr><td>Needs ride</td><td>${data.needsRide ? "Yes ✅" : "No"}</td></tr>
    </table>

    ${data.extraDetails ? `
    <h2>💬 Extra Details</h2>
    <p style="background:#f9f9f9;padding:12px;border-radius:8px;font-size:13px;">${data.extraDetails}</p>
    ` : ""}
  </div>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const data: QuoteFormData = await req.json();

    // ---- Option A: Nodemailer (SMTP) ----
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const emailTo = process.env.EMAIL_TO || process.env.NEXT_PUBLIC_QUOTE_EMAIL;

    if (smtpUser && smtpPass && emailTo) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"WeDo Travels Quotes" <${smtpUser}>`,
        to: emailTo,
        subject: `New Moving Quote – ${data.fullName} (${data.from.city || data.from.eircode} → ${data.to.city || data.to.eircode})`,
        html: buildEmailHtml(data),
      });

      return NextResponse.json({ success: true, method: "smtp" });
    }

    // ---- Option B: Resend API ----
    const resendKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "quotes@wedotravels.ie";

    if (resendKey && emailTo) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [emailTo],
          subject: `New Moving Quote – ${data.fullName}`,
          html: buildEmailHtml(data),
        }),
      });

      if (!res.ok) throw new Error("Resend API error");
      return NextResponse.json({ success: true, method: "resend" });
    }

    // No email config – just acknowledge
    console.log("No email config found. Quote data:", JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true, method: "none", note: "No email config found" });
  } catch (err) {
    console.error("Send quote error:", err);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}
