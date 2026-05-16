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

      <h2 className="text-2xl font-bold text-white mb-2">Approximate property size</h2>
      <p className="text-slate-400 text-sm mb-6">
        Choose the closest option below. It only needs to be approximate, so a rough estimate is perfect.
      </p>

      {/* Bedrooms */}
      <div className="quote-card mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🛏️</span>
          <p className="text-white font-semibold text-sm">How many bedrooms are involved?</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {BEDROOM_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`pill-btn ${data.bedrooms === opt ? "selected" : ""}`}
              onClick={() => onChange({ bedrooms: opt })}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Living rooms */}
      <div className="quote-card mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🛋️</span>
          <p className="text-white font-semibold text-sm">How many living rooms / lounge areas?</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {LIVING_ROOM_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`pill-btn ${data.livingRooms === opt ? "selected" : ""}`}
              onClick={() => onChange({ livingRooms: opt })}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button className="btn-primary" onClick={onNext}>
          Continue →
        </button>
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
