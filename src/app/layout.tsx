import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Calculators — Free Tools for Developers & Businesses",
    template: "%s | AICalculators.org",
  },
  description:
    "Free online calculators for AI token costs, LLM pricing, and more. Compare OpenAI, Anthropic, Google, Meta, Mistral, Cohere, and DeepSeek models side by side.",
  keywords: [
    "AI calculator", "token cost calculator", "LLM pricing", "OpenAI pricing",
    "Claude pricing", "GPT cost", "Gemini pricing", "AI API cost", "compare AI models",
  ],
  metadataBase: new URL("https://aicalculators.org"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://aicalculators.org",
    siteName: "AICalculators.org",
    title: "AI Calculators — Free Tools for Developers & Businesses",
    description:
      "Compare AI model pricing across OpenAI, Anthropic, Google, and more. Estimate token costs instantly.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Calculators — Free Tools for Developers & Businesses",
    description:
      "Compare AI model pricing across OpenAI, Anthropic, Google, and more. Estimate token costs instantly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        {/*
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        */}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
