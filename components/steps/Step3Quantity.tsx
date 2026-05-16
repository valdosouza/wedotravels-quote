"use client";

import { QuoteFormData } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";

interface Props {
  data: QuoteFormData;
  onChange: (updates: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ITEMS = [
  { key: "beds", icon: "🛏️", label: "Beds" },
  { key: "sofas", icon: "🛋️", label: "Sofas" },
  { key: "tables", icon: "🪑", label: "Tables / desks" },
  { key: "wardrobes", icon: "🗄️", label: "Wardrobes" },
  { key: "appliances", icon: "📦", label: "Appliances" },
  { key: "boxes", icon: "🧱", label: "Boxes" },
] as const;

type QuantityKey = keyof QuoteFormData["quantities"];

export default function Step3Quantity({ data, onChange, onNext, onBack }: Props) {
  const update = (key: QuantityKey, delta: number) => {
    const current = data.quantities[key];
    const next = Math.max(0, current + delta);
    onChange({ quantities: { ...data.quantities, [key]: next } });
  };

  return (
    <div className="animate-in">
      <ProgressBar currentStep={3} totalSteps={7} />

      <h2 className="text-2xl font-bold text-white mb-2">Rough moving quantity</h2>
      <p className="text-slate-400 text-sm mb-6">
        Give us a rough count of the main items. Don&apos;t worry about being exact.
      </p>

      <div className="quote-card mb-8">
        <div className="space-y-4">
          {ITEMS.map(({ key, icon, label }) => (
            <div key={key} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                >
                  {icon}
                </div>
                <span className="text-white font-medium text-sm">{label}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="counter-btn"
                  onClick={() => update(key as QuantityKey, -1)}
                  disabled={data.quantities[key as QuantityKey] === 0}
                  style={{ opacity: data.quantities[key as QuantityKey] === 0 ? 0.4 : 1 }}
                >
                  −
                </button>
                <span
                  className="text-white font-bold text-base w-8 text-center"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {data.quantities[key as QuantityKey]}
                </span>
                <button
                  className="counter-btn"
                  onClick={() => update(key as QuantityKey, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button className="btn-primary" onClick={onNext}>
          Next step →
        </button>
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
