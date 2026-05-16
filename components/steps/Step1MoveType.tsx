"use client";

import { QuoteFormData, MoveType } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";

interface Props {
  data: QuoteFormData;
  onChange: (updates: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MOVE_TYPES: { value: MoveType; icon: string; title: string; description: string }[] = [
  { value: "home",    icon: "🏠", title: "Home move",                description: "House or apartment move with furniture and boxes." },
  { value: "office",  icon: "🏢", title: "Office / commercial move", description: "Desks, equipment and business items." },
  { value: "partial", icon: "📦", title: "Partial / small move",     description: "A few items, one room or selected furniture." },
  { value: "storage", icon: "🔒", title: "Storage move",             description: "Moving items to or from storage." },
];

export default function Step1MoveType({ data, onChange, onNext, onBack }: Props) {
  const canContinue = data.moveType !== null;

  return (
    <div className="animate-in">
      <ProgressBar currentStep={1} totalSteps={7} />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">What type of move is it?</h2>
      <p className="text-gray-500 text-sm mb-6">
        Choose the move type that fits best. We&apos;ll use the next steps to size the job properly.
      </p>

      <div className="space-y-3 mb-8">
        {MOVE_TYPES.map((type) => (
          <div
            key={type.value}
            className={`option-card ${data.moveType === type.value ? "selected" : ""}`}
            onClick={() => onChange({ moveType: type.value })}
          >
            <span className="text-2xl flex-shrink-0">{type.icon}</span>
            <div className="flex-1">
              <p className="text-gray-800 font-semibold text-sm">{type.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{type.description}</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                borderColor: data.moveType === type.value ? "#ea580c" : "#d1d5db",
                backgroundColor: data.moveType === type.value ? "#ea580c" : "transparent",
              }}>
              {data.moveType === type.value && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button className="btn-primary" onClick={onNext} disabled={!canContinue}>Continue →</button>
        <button className="btn-secondary" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
