import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CalcHub - Free Online Calculators",
  description:
    "Free online calculators for AI costs, tokens, and more. Compare pricing across OpenAI, Anthropic, Google, and other AI providers.",
  keywords: ["AI calculator", "token cost", "LLM pricing", "OpenAI pricing", "Claude pricing", "GPT cost"],
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
