"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QuoteFormData, INITIAL_FORM_DATA } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Step1MoveType from "@/components/steps/Step1MoveType";
import Step2PropertySize from "@/components/steps/Step2PropertySize";
import Step3Quantity from "@/components/steps/Step3Quantity";
import Step4MovingFrom from "@/components/steps/Step4MovingFrom";
import Step5MovingTo from "@/components/steps/Step5MovingTo";
import Step6ReadyStatus from "@/components/steps/Step6ReadyStatus";
import Step7ContactDetails from "@/components/steps/Step7ContactDetails";
import StepSuccess from "@/components/steps/StepSuccess";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "353861234567";

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const updateForm = (updates: Partial<QuoteFormData>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = buildWhatsAppUrl(formData, WHATSAPP_NUMBER);
      setWhatsappUrl(url);
      try {
        await fetch("/api/send-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch { /* email is backup only */ }
      setStep(8);
      setTimeout(() => window.open(url, "_blank"), 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Orange top bar */}
      <div className="h-1 w-full" style={{ backgroundColor: "#ea580c" }} />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image src="/logo.png" alt="WeDo Travels" fill className="object-contain" />
            </div>
            <span className="font-bold text-sm" style={{ color: "#ea580c" }}>WeDo Travels</span>
          </Link>
          {step > 0 && step < 8 && (
            <span className="text-xs text-gray-400">Free quote · No card required</span>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-8">

        {/* Step 0 – Intro */}
        {step === 0 && (
          <div className="quote-card animate-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image src="/logo.png" alt="WeDo Travels" fill className="object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get your free moving quote</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tell us <span className="text-gray-800 font-medium">roughly</span> what you&apos;re moving,
                where it&apos;s going and your preferred date. We&apos;ll send your personalised quote on{" "}
                <span className="font-semibold" style={{ color: "#25D366" }}>WhatsApp</span>.
              </p>
            </div>

            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">3 Simple Steps</p>
            <div className="space-y-4 mb-8">
              {[
                { icon: "🏠", title: "Tell us about your move", desc: "Choose the move type, addresses and a rough idea of what you're moving." },
                { icon: "👤", title: "Share your details", desc: "Add your name, phone, email, moving date and any useful notes." },
                { icon: "✅", title: "Confirm on WhatsApp", desc: "We send your quote and help you arrange the move on WhatsApp." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ backgroundColor: "#fff4ee", border: "1.5px solid #fbd5c0" }}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-semibold">{title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={goNext}>Start my quote →</button>
            <p className="text-xs text-gray-400 mt-4 text-center">
              No card required. We only use your details to contact you about this move.
            </p>
          </div>
        )}

        {step === 1 && <div className="quote-card"><Step1MoveType data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} /></div>}
        {step === 2 && <div className="quote-card"><Step2PropertySize data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} /></div>}
        {step === 3 && <div className="quote-card"><Step3Quantity data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} /></div>}
        {step === 4 && <div className="quote-card"><Step4MovingFrom data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} /></div>}
        {step === 5 && <div className="quote-card"><Step5MovingTo data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} /></div>}
        {step === 6 && <div className="quote-card"><Step6ReadyStatus data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} /></div>}
        {step === 7 && (
          <div className="quote-card">
            <Step7ContactDetails data={formData} onChange={updateForm} onSubmit={handleSubmit} onBack={goBack} loading={loading} />
          </div>
        )}
        {step === 8 && <div className="quote-card"><StepSuccess name={formData.fullName} whatsappUrl={whatsappUrl} /></div>}
      </div>
    </div>
  );
}
