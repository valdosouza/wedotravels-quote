"use client";

import { useState } from "react";
import { QuoteFormData } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";

interface Props {
  data: QuoteFormData;
  onChange: (updates: Partial<QuoteFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading?: boolean;
}

function validateEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validateIrishPhone(p: string) {
  const c = p.replace(/[\s\-().+]/g, "");
  return /^(08[3-9]\d{7}|3538[3-9]\d{7}|003538[3-9]\d{7})$/.test(c);
}

export default function Step7ContactDetails({ data, onChange, onSubmit, onBack, loading }: Props) {
  const [touched, setTouched] = useState({ fullName: false, email: false, phone: false });

  const errors = {
    fullName: data.fullName.trim().length < 2 ? "Full name is required" : "",
    email: !validateEmail(data.email) ? "Please enter a valid email address" : "",
    phone: !validateIrishPhone(data.phone) ? "Please enter a valid Irish phone (e.g. 085 123 4567)" : "",
  };
  const canSubmit = !errors.fullName && !errors.email && !errors.phone;

  const handleSubmit = () => {
    setTouched({ fullName: true, email: true, phone: true });
    if (canSubmit) onSubmit();
  };

  return (
    <div className="animate-in">
      <ProgressBar currentStep={7} totalSteps={7} />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">Almost done!</h2>
      <p className="text-gray-500 text-sm mb-6">
        Enter your contact details so we can reach you with your personalised quote on WhatsApp.
      </p>

      <div className="quote-card mb-5" style={{ borderColor: "#fbd5c0" }}>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Full Name <span className="text-red-400">*</span></label>
            <input type="text" className="quote-input" value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
              placeholder="John Murphy" autoComplete="name" />
            {touched.fullName && errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email <span className="text-red-400">*</span></label>
            <input type="email" className="quote-input" value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="john@example.ie" autoComplete="email" />
            {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Phone <span className="text-red-400">*</span></label>
            <input type="tel" className="quote-input" value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value.replace(/[^\d+\s]/g, "") })}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              placeholder="085 123 4567" autoComplete="tel" />
            {touched.phone && errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl px-4 py-3 mb-5 text-xs space-y-1" style={{ backgroundColor: "#fff4ee", border: "1.5px solid #fbd5c0" }}>
        <p className="text-gray-700 font-semibold text-sm mb-2">📋 Quote summary</p>
        <p className="text-gray-500">Type: <span className="text-gray-700 font-medium capitalize">{data.moveType?.replace("_", " ") || "—"}</span></p>
        <p className="text-gray-500">From: <span className="text-gray-700 font-medium">{data.from.city || data.from.eircode || "—"}</span></p>
        <p className="text-gray-500">To: <span className="text-gray-700 font-medium">{data.to.city || data.to.eircode || "—"}</span></p>
        <p className="text-gray-500">Date: <span className="text-gray-700 font-medium">{data.preferredDate ? new Date(data.preferredDate).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" }) : "—"}</span></p>
      </div>

      <p className="text-xs text-gray-400 mb-4 text-center">
        By submitting, your details will be sent to WeDo Travels via WhatsApp so we can send you a quote.
      </p>

      <div className="space-y-3">
        <button className="btn-primary" onClick={handleSubmit} disabled={loading}
          style={{ backgroundColor: "#25D366" }}>
          {loading ? (
            <><div className="spinner" /><span>Sending...</span></>
          ) : (
            <><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg><span>Send quote via WhatsApp</span></>
          )}
        </button>
        <button className="btn-secondary" onClick={onBack} disabled={loading}>Back</button>
      </div>
    </div>
  );
}
