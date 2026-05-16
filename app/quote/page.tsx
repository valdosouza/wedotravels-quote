import QuoteWizard from "@/components/QuoteWizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Moving Quote – WeDo Travels",
  description: "Get your free personalised moving quote in minutes.",
};

export default function QuotePage() {
  return <QuoteWizard />;
}
