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

// Step 0 = intro (shown before step 1)
// Steps 1-7 = form steps
// Step 8 = success

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "353861234567";

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const updateForm = (updates: Partial<QuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Build WhatsApp URL
      const url = buildWhatsAppUrl(formData, WHATSAPP_NUMBER);
      setWhatsappUrl(url);

      // Send backup email (fire & forget)
      try {
        await fetch("/api/send-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch {
        // Email is backup only – don't block on failure
        console.warn("Email backup failed");
      }

      setStep(8); // success
      // Open WhatsApp after a short delay
      setTimeout(() => {
        window.open(url, "_blank");
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8"
      style={{ background: "linear-gradient(160deg, #050d1f 0%, #0d1b2e 100%)" }}>

      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative">
            <Image src="/logo.png" alt="WeDo Travels" fill className="object-contain" />
          </div>
          <span className="text-white font-semibold text-sm hidden sm:block">WeDo Travels</span>
        </Link>

        {step > 0 && step < 8 && (
          <span className="text-slate-500 text-xs">
            Free quote · No card required
          </span>
        )}
      </div>

      {/* Main card */}
      <div className="w-full max-w-md">

        {/* Intro / step 0 */}
        {step === 0 && (
          <div className="quote-card animate-in">
            <h2 className="text-2xl font-bold text-white mb-2">
              Get your free moving quote
            </h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Tell us <span className="text-white font-medium">roughly</span> what
              you&apos;re moving, where it&apos;s going and your preferred date.
              We&apos;ll review the details and send your personalised quote on{" "}
              <span className="text-green-400 font-medium">WhatsApp</span>.
            </p>

            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">
              3 Simple Steps
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: "🏠", title: "Tell us about your move", desc: "Choose the move type, add the addresses and give a rough idea of the property size and what you're moving." },
                { icon: "👤", title: "Share your details", desc: "Add your name, phone number, email, moving date and any useful notes so we can price the move properly." },
                { icon: "✅", title: "Confirm everything on WhatsApp", desc: "We send your quote, answer questions and help you arrange the move smoothly on WhatsApp." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
                    <span>{icon}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={goNext}>
              Start my quote →
            </button>
            <p className="text-xs text-slate-500 mt-4 text-center">
              No card required. We only use your details to contact you about this move.
            </p>
          </div>
        )}

        {/* Form steps */}
        {step === 1 && (
          <div className="quote-card">
            <Step1MoveType data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} />
          </div>
        )}
        {step === 2 && (
          <div className="quote-card">
            <Step2PropertySize data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} />
          </div>
        )}
        {step === 3 && (
          <div className="quote-card">
            <Step3Quantity data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} />
          </div>
        )}
        {step === 4 && (
          <div className="quote-card">
            <Step4MovingFrom data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} />
          </div>
        )}
        {step === 5 && (
          <div className="quote-card">
            <Step5MovingTo data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} />
          </div>
        )}
        {step === 6 && (
          <div className="quote-card">
            <Step6ReadyStatus data={formData} onChange={updateForm} onNext={goNext} onBack={goBack} />
          </div>
        )}
        {step === 7 && (
          <div className="quote-card">
            <Step7ContactDetails
              data={formData}
              onChange={updateForm}
              onSubmit={handleSubmit}
              onBack={goBack}
              loading={loading}
            />
          </div>
        )}

        {/* Success */}
        {step === 8 && (
          <div className="quote-card">
            <StepSuccess name={formData.fullName} whatsappUrl={whatsappUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
