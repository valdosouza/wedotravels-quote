import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeDo Travels – Free Moving Quote",
  description: "Get your free personalised moving quote in minutes. WeDo Travels – Mobility & Solutions in Dublin since 2023.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#ffffff", fontFamily: "Inter, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
