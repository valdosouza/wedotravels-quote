"use client";

import { QuoteFormData, IRELAND_COUNTIES, FLOOR_OPTIONS, AddressDetails } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";
import EircodeInput from "@/components/EircodeInput";

interface Props {
  data: QuoteFormData;
  onChange: (updates: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4MovingFrom({ data, onChange, onNext, onBack }: Props) {
  const from = data.from;
  const updateFrom = (updates: Partial<AddressDetails>) =>
    onChange({ from: { ...from, ...updates } });

  const canContinue =
    from.eircode.trim().length >= 3 &&
    from.address.trim().length >= 3 &&
    from.city.trim().length >= 2;

  return (
    <div className="animate-in">
      <ProgressBar currentStep={4} totalSteps={7} />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">Move details</h2>
      <p className="text-gray-500 text-sm mb-6">Add the collection and delivery details.</p>

      <div className="quote-card mb-6" style={{ borderColor: "#fbd5c0" }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📍</span>
          <p className="text-gray-800 font-semibold" style={{ color: "#ea580c" }}>Moving from</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Eircode <span className="text-red-400">*</span></label>
            <EircodeInput value={from.eircode} onChange={(v) => updateFrom({ eircode: v })}
              onLookup={({ address, city, county }) => updateFrom({ address, city, county })}
              placeholder="D02 Y033" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Address <span className="text-red-400">*</span></label>
            <input type="text" className="quote-input" value={from.address}
              onChange={(e) => updateFrom({ address: e.target.value })} placeholder="12 Main Street" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">City / town <span className="text-red-400">*</span></label>
            <input type="text" className="quote-input" value={from.city}
              onChange={(e) => updateFrom({ city: e.target.value })} placeholder="Dublin" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">County</label>
            <select className="quote-select" value={from.county}
              onChange={(e) => updateFrom({ county: e.target.value })}>
              <option value="">Select</option>
              {IRELAND_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Floor</label>
            <select className="quote-select" value={from.floor}
              onChange={(e) => updateFrom({ floor: e.target.value })}>
              {FLOOR_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-3 cursor-pointer pt-1">
            <input type="checkbox" className="quote-checkbox" checked={from.liftAvailable}
              onChange={(e) => updateFrom({ liftAvailable: e.target.checked })} />
            <span className="text-gray-600 text-sm">Lift available</span>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <button className="btn-primary" onClick={onNext} disabled={!canContinue}>Next step →</button>
        <button className="btn-secondary" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
