"use client";

import { QuoteFormData, IRELAND_COUNTIES, FLOOR_OPTIONS, FLEXIBILITY_OPTIONS, AddressDetails } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";
import EircodeInput from "@/components/EircodeInput";

interface Props {
  data: QuoteFormData;
  onChange: (updates: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5MovingTo({ data, onChange, onNext, onBack }: Props) {
  const to = data.to;

  const updateTo = (updates: Partial<AddressDetails>) => {
    onChange({ to: { ...to, ...updates } });
  };

  const canContinue =
    to.eircode.trim().length >= 3 &&
    to.address.trim().length >= 3 &&
    to.city.trim().length >= 2 &&
    data.preferredDate.length > 0;

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="animate-in">
      <ProgressBar currentStep={5} totalSteps={7} />

      <div className="quote-card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🚀</span>
          <p className="text-white font-semibold">Moving to</p>
        </div>

        <div className="space-y-3">
          {/* Eircode */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">
              Eircode <span className="text-red-400">*</span>
            </label>
            <EircodeInput
              value={to.eircode}
              onChange={(val) => updateTo({ eircode: val })}
              onLookup={({ address, city, county }) =>
                updateTo({ address, city, county })
              }
              placeholder="T12 AB34"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">
              Address <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="quote-input"
              value={to.address}
              onChange={(e) => updateTo({ address: e.target.value })}
              placeholder="5 New Road"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">
              City / town <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="quote-input"
              value={to.city}
              onChange={(e) => updateTo({ city: e.target.value })}
              placeholder="Cork"
            />
          </div>

          {/* County */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">County</label>
            <select
              className="quote-select"
              value={to.county}
              onChange={(e) => updateTo({ county: e.target.value })}
            >
              <option value="">Select</option>
              {IRELAND_COUNTIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Floor */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Floor</label>
            <select
              className="quote-select"
              value={to.floor}
              onChange={(e) => updateTo({ floor: e.target.value })}
            >
              {FLOOR_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Lift */}
          <label className="flex items-center gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              className="quote-checkbox"
              checked={to.liftAvailable}
              onChange={(e) => updateTo({ liftAvailable: e.target.checked })}
            />
            <span className="text-slate-300 text-sm">Lift available</span>
          </label>
        </div>
      </div>

      {/* Date & Flexibility */}
      <div className="quote-card mb-6">
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">
              Preferred date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              className="quote-input"
              value={data.preferredDate}
              min={today}
              onChange={(e) => onChange({ preferredDate: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Flexibility</label>
            <select
              className="quote-select"
              value={data.flexibility}
              onChange={(e) => onChange({ flexibility: e.target.value as QuoteFormData["flexibility"] })}
            >
              {FLEXIBILITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!canContinue}
          style={{ opacity: canContinue ? 1 : 0.5, cursor: canContinue ? "pointer" : "not-allowed" }}
        >
          Next step →
        </button>
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
