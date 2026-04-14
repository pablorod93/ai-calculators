export interface ImagePricingTier {
  size: string;
  quality: string;
  price: number;
}

export interface ImageModel {
  id: string;
  name: string;
  provider: string;
  tiers: ImagePricingTier[];
  notes: string;
}

export interface ImageProvider {
  id: string;
  name: string;
  color: string;
}

export const imageProviders: ImageProvider[] = [
  { id: "openai", name: "OpenAI", color: "#10a37f" },
  { id: "stability", name: "Stability AI", color: "#8b5cf6" },
  { id: "bfl", name: "Black Forest Labs", color: "#2563eb" },
  { id: "google", name: "Google", color: "#4285f4" },
  { id: "amazon", name: "Amazon", color: "#ff9900" },
  { id: "midjourney", name: "Midjourney", color: "#e11d48" },
];

export const standardSizes = [
  { id: "1024x1024", label: "Square (1024x1024)" },
  { id: "1536x1024", label: "Landscape (1536x1024)" },
  { id: "1024x1536", label: "Portrait (1024x1536)" },
];

export const standardQualities = [
  { id: "standard", label: "Standard" },
  { id: "hd", label: "HD" },
];

export const imageModels: ImageModel[] = [
  // OpenAI
  {
    id: "gpt-image-1",
    name: "GPT Image 1",
    provider: "openai",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.042 },
      { size: "1024x1024", quality: "hd", price: 0.167 },
      { size: "1536x1024", quality: "standard", price: 0.063 },
      { size: "1536x1024", quality: "hd", price: 0.25 },
      { size: "1024x1536", quality: "standard", price: 0.063 },
      { size: "1024x1536", quality: "hd", price: 0.25 },
    ],
    notes: "OpenAI's latest image model with native text rendering and high fidelity",
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "openai",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.04 },
      { size: "1024x1024", quality: "hd", price: 0.08 },
      { size: "1536x1024", quality: "standard", price: 0.08 },
      { size: "1536x1024", quality: "hd", price: 0.12 },
      { size: "1024x1536", quality: "standard", price: 0.08 },
      { size: "1024x1536", quality: "hd", price: 0.12 },
    ],
    notes: "Strong prompt following and text generation",
  },
  {
    id: "dall-e-2",
    name: "DALL-E 2",
    provider: "openai",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.02 },
    ],
    notes: "Legacy model, only supports 1024x1024 standard",
  },

  // Stability AI
  {
    id: "sd3-large",
    name: "Stable Diffusion 3 Large",
    provider: "stability",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.065 },
      { size: "1536x1024", quality: "standard", price: 0.065 },
      { size: "1024x1536", quality: "standard", price: 0.065 },
    ],
    notes: "Stability AI's most capable open model via API",
  },
  {
    id: "sd3-medium",
    name: "Stable Diffusion 3 Medium",
    provider: "stability",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.035 },
      { size: "1536x1024", quality: "standard", price: 0.035 },
      { size: "1024x1536", quality: "standard", price: 0.035 },
    ],
    notes: "Good balance of quality and cost",
  },
  {
    id: "sdxl",
    name: "SDXL 1.0",
    provider: "stability",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.002 },
      { size: "1536x1024", quality: "standard", price: 0.002 },
      { size: "1024x1536", quality: "standard", price: 0.002 },
    ],
    notes: "Very affordable, great for high-volume use cases",
  },

  // Black Forest Labs (Flux)
  {
    id: "flux-pro-ultra",
    name: "Flux Pro 1.1 Ultra",
    provider: "bfl",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.06 },
      { size: "1024x1024", quality: "hd", price: 0.06 },
      { size: "1536x1024", quality: "standard", price: 0.06 },
      { size: "1536x1024", quality: "hd", price: 0.06 },
      { size: "1024x1536", quality: "standard", price: 0.06 },
      { size: "1024x1536", quality: "hd", price: 0.06 },
    ],
    notes: "Highest quality Flux model, supports up to 4MP",
  },
  {
    id: "flux-pro",
    name: "Flux Pro 1.1",
    provider: "bfl",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.04 },
      { size: "1536x1024", quality: "standard", price: 0.04 },
      { size: "1024x1536", quality: "standard", price: 0.04 },
    ],
    notes: "Great quality-to-price ratio, fast generation",
  },
  {
    id: "flux-schnell",
    name: "Flux Schnell",
    provider: "bfl",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.003 },
      { size: "1536x1024", quality: "standard", price: 0.003 },
      { size: "1024x1536", quality: "standard", price: 0.003 },
    ],
    notes: "Fastest and cheapest Flux model, ideal for prototyping",
  },

  // Google
  {
    id: "imagen-3",
    name: "Imagen 3",
    provider: "google",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.03 },
      { size: "1536x1024", quality: "standard", price: 0.03 },
      { size: "1024x1536", quality: "standard", price: 0.03 },
      { size: "1024x1024", quality: "hd", price: 0.06 },
      { size: "1536x1024", quality: "hd", price: 0.06 },
      { size: "1024x1536", quality: "hd", price: 0.06 },
    ],
    notes: "Via Vertex AI, strong photorealism",
  },

  // Amazon
  {
    id: "titan-image-v2",
    name: "Titan Image Generator v2",
    provider: "amazon",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.01 },
      { size: "1536x1024", quality: "standard", price: 0.012 },
      { size: "1024x1536", quality: "standard", price: 0.012 },
    ],
    notes: "Via AWS Bedrock, very affordable",
  },

  // Midjourney (estimated per-image from subscription)
  {
    id: "midjourney-v6",
    name: "Midjourney v6",
    provider: "midjourney",
    tiers: [
      { size: "1024x1024", quality: "standard", price: 0.033 },
      { size: "1024x1024", quality: "hd", price: 0.033 },
      { size: "1536x1024", quality: "standard", price: 0.033 },
      { size: "1536x1024", quality: "hd", price: 0.033 },
      { size: "1024x1536", quality: "standard", price: 0.033 },
      { size: "1024x1536", quality: "hd", price: 0.033 },
    ],
    notes: "Subscription-based (~$30/mo for ~900 images). Price shown is estimated per-image cost",
  },
];

export function getPrice(
  model: ImageModel,
  size: string,
  quality: string
): number | null {
  const tier = model.tiers.find(
    (t) => t.size === size && t.quality === quality
  );
  return tier?.price ?? null;
}

export function formatImageCurrency(amount: number): string {
  if (amount < 0.01 && amount > 0) return `$${amount.toFixed(4)}`;
  if (amount < 1) return `$${amount.toFixed(3)}`;
  if (amount >= 1000) return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `$${amount.toFixed(2)}`;
}
