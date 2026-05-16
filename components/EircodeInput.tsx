"use client";

import { useState, useCallback, useRef } from "react";

interface EircodeInputProps {
  value: string;
  onChange: (val: string) => void;
  onLookup: (result: { address: string; city: string; county: string }) => void;
  placeholder?: string;
}

export default function EircodeInput({
  value,
  onChange,
  onLookup,
  placeholder = "D02 Y033",
}: EircodeInputProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (raw: string) => {
      const formatted = raw.toUpperCase().replace(/[^A-Z0-9\s]/g, "");
      onChange(formatted);
      setError("");

      if (debounceRef.current) clearTimeout(debounceRef.current);

      // Auto-lookup when eircode looks complete (7 chars without space, or 8 with)
      const cleaned = formatted.replace(/\s/g, "");
      if (cleaned.length >= 7) {
        debounceRef.current = setTimeout(async () => {
          setLoading(true);
          try {
            const res = await fetch(`/api/eircode?code=${encodeURIComponent(formatted)}`);
            const data = await res.json();
            if (data.success) {
              onLookup(data);
              setError("");
            } else {
              setError("Eircode not found. Please fill in the address manually.");
            }
          } catch {
            setError("Could not look up Eircode. Please fill in manually.");
          } finally {
            setLoading(false);
          }
        }, 600);
      }
    },
    [onChange, onLookup]
  );

  return (
    <div className="relative">
      <input
        type="text"
        className="quote-input pr-10"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        maxLength={9}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="spinner" />
        </div>
      )}
      {!loading && value.replace(/\s/g, "").length >= 7 && !error && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-sm">✓</div>
      )}
      {error && (
        <p className="text-amber-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
