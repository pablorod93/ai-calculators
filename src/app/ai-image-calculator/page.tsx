import type { Metadata } from "next";
import AIImageCalculatorClient from "./AIImageCalculatorClient";

export const metadata: Metadata = {
  title: "AI Image Generation Cost Calculator",
  description:
    "Compare AI image generation costs across DALL-E 3, GPT Image 1, Stable Diffusion, Flux, Midjourney, and Imagen. See per-image and monthly costs instantly.",
  alternates: { canonical: "/ai-image-calculator" },
  openGraph: {
    title: "AI Image Generation Cost Calculator — Compare 12+ Models",
    description:
      "Compare costs for AI image generation across DALL-E, Stable Diffusion, Flux, Midjourney, and more. Free, no sign-up required.",
    url: "https://aicalculators.org/ai-image-calculator",
  },
};

export default function AIImageCalculatorPage() {
  return <AIImageCalculatorClient />;
}
