"use client";

import { QuoteFormData, PackingStatus } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";

interface Props {
  data: QuoteFormData;
  onChange: (updates: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PACKING_OPTIONS: { value: PackingStatus; label: string }[] = [
  { value: "not_packed",    label: "Not packed yet" },
  { value: "partly_packed", label: "Partly packed" },
  { value: "mostly_packed", label: "Mostly packed" },
  { value: "ready_to_load", label: "Ready to load" },
];

export default function Step6ReadyStatus({ data, onChange, onNext, onBack }: Props) {
  const canContinue = data.packingStatus !== null;

  return (
    <div className="animate-in">
      <ProgressBar currentStep={6} totalSteps={7} />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">How ready is the move right now?</h2>
      <p className="text-gray-500 text-sm mb-6">Choose the closest stage of the move.</p>

      <div className="space-y-2 mb-5">
        {PACKING_OPTIONS.map((opt) => (
          <button key={opt.value}
            className="w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-150"
            onClick={() => onChange({ packingStatus: opt.value })}
            style={{
              backgroundColor: data.packingStatus === opt.value ? "#fff4ee" : "#f9fafb",
              border: `1.5px solid ${data.packingStatus === opt.value ? "#ea580c" : "#e5e7eb"}`,
              color: data.packingStatus === opt.value ? "#ea580c" : "#374151",
            }}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Needs ride */}
      <div className="quote-card mb-5 cursor-pointer" style={{ borderColor: "#fbd5c0" }}
        onClick={() => onChange({ needsRide: !data.needsRide })}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="quote-checkbox mt-0.5" checked={data.needsRide}
            onChange={(e) => onChange({ needsRide: e.target.checked })}
            onClick={(e) => e.stopPropagation()} />
          <div>
            <p className="text-gray-800 text-sm font-semibold">🚌 I need a ride too</p>
            <p className="text-gray-500 text-xs mt-1">
              If needed, we can usually take you in the vehicle with your belongings, so you do not have to arrange a separate trip.
            </p>
          </div>
        </label>
      </div>

      {/* Extra details */}
      <div className="mb-8">
        <label className="text-sm text-gray-700 font-semibold mb-2 block">
          Extra details for the quote <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea className="quote-input resize-none" rows={4} value={data.extraDetails}
          onChange={(e) => onChange({ extraDetails: e.target.value })}
          placeholder="Heavy items, fragile pieces, access or parking details..." />
      </div>

      <div className="space-y-3">
        <button className="btn-primary" onClick={onNext} disabled={!canContinue}>Next step →</button>
        <button className="btn-secondary" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
