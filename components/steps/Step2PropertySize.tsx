"use client";

import { QuoteFormData } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";

interface Props {
  data: QuoteFormData;
  onChange: (updates: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BEDROOM_OPTIONS = ["S", "1", "2", "3", "4+"];
const LIVING_ROOM_OPTIONS = ["0", "1", "2", "3", "4+"];

export default function Step2PropertySize({ data, onChange, onNext, onBack }: Props) {
  return (
    <div className="animate-in">
      <ProgressBar currentStep={2} totalSteps={7} />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">Approximate property size</h2>
      <p className="text-gray-500 text-sm mb-6">
        It only needs to be approximate — a rough estimate is perfect.
      </p>

      <div className="quote-card mb-4" style={{ borderColor: "#fbd5c0" }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🛏️</span>
          <p className="text-gray-800 font-semibold text-sm">How many bedrooms are involved?</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {BEDROOM_OPTIONS.map((opt) => (
            <button key={opt} className={`pill-btn ${data.bedrooms === opt ? "selected" : ""}`}
              onClick={() => onChange({ bedrooms: opt })}>{opt}</button>
          ))}
        </div>
      </div>

      <div className="quote-card mb-8" style={{ borderColor: "#fbd5c0" }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🛋️</span>
          <p className="text-gray-800 font-semibold text-sm">How many living rooms / lounge areas?</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {LIVING_ROOM_OPTIONS.map((opt) => (
            <button key={opt} className={`pill-btn ${data.livingRooms === opt ? "selected" : ""}`}
              onClick={() => onChange({ livingRooms: opt })}>{opt}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button className="btn-primary" onClick={onNext}>Continue →</button>
        <button className="btn-secondary" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
