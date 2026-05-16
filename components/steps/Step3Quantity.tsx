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
  { key: "beds",       icon: "🛏️", label: "Beds" },
  { key: "sofas",      icon: "🛋️", label: "Sofas" },
  { key: "tables",     icon: "🪑", label: "Tables / desks" },
  { key: "wardrobes",  icon: "🗄️", label: "Wardrobes" },
  { key: "appliances", icon: "📦", label: "Appliances" },
  { key: "boxes",      icon: "🧱", label: "Boxes" },
] as const;

type QuantityKey = keyof QuoteFormData["quantities"];

export default function Step3Quantity({ data, onChange, onNext, onBack }: Props) {
  const update = (key: QuantityKey, delta: number) => {
    const next = Math.max(0, data.quantities[key] + delta);
    onChange({ quantities: { ...data.quantities, [key]: next } });
  };

  return (
    <div className="animate-in">
      <ProgressBar currentStep={3} totalSteps={7} />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">Rough moving quantity</h2>
      <p className="text-gray-500 text-sm mb-6">Don&apos;t worry about being exact — a rough count is enough.</p>

      <div className="quote-card mb-8" style={{ borderColor: "#fbd5c0" }}>
        <div className="divide-y divide-gray-100">
          {ITEMS.map(({ key, icon, label }) => (
            <div key={key} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: "#fff4ee", border: "1.5px solid #fbd5c0" }}>
                  {icon}
                </div>
                <span className="text-gray-700 font-medium text-sm">{label}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="counter-btn" onClick={() => update(key as QuantityKey, -1)}
                  disabled={data.quantities[key as QuantityKey] === 0}>−</button>
                <span className="text-gray-800 font-bold text-base w-6 text-center">
                  {data.quantities[key as QuantityKey]}
                </span>
                <button className="counter-btn" onClick={() => update(key as QuantityKey, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button className="btn-primary" onClick={onNext}>Next step →</button>
        <button className="btn-secondary" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
