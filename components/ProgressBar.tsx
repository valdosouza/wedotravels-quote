"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="step-label">Step {currentStep} of {totalSteps}</span>
        <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: "#ea580c" }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ backgroundColor: i < currentStep ? "#ea580c" : "#e5e7eb" }} />
        ))}
      </div>
    </div>
  );
}
