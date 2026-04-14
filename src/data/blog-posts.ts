export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string | null;
  category: "ai-costs" | "gpu-computing" | "financial" | "guides";
  tags: string[];
  readingTimeMinutes: number;
  relatedCalculator: { title: string; href: string } | null;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-image-generation-costs-compared",
    title: "AI Image Generation Costs Compared: DALL-E 3 vs Flux vs Stable Diffusion",
    description:
      "A comprehensive comparison of AI image generation pricing across all major providers, with tips for reducing costs at scale.",
    publishedAt: "2025-04-13",
    updatedAt: null,
    category: "ai-costs",
    tags: ["image generation", "DALL-E", "Stable Diffusion", "Flux", "pricing"],
    readingTimeMinutes: 8,
    relatedCalculator: {
      title: "AI Image Generation Cost Calculator",
      href: "/ai-image-calculator",
    },
  },
  {
    slug: "how-much-does-ai-fine-tuning-cost",
    title: "How Much Does AI Fine-Tuning Cost? Complete Pricing Guide",
    description:
      "Everything you need to know about fine-tuning costs for GPT-4o, Llama, Mistral, and more. LoRA vs full fine-tuning compared.",
    publishedAt: "2025-04-13",
    updatedAt: null,
    category: "ai-costs",
    tags: ["fine-tuning", "LoRA", "GPT-4o", "Llama", "training costs"],
    readingTimeMinutes: 10,
    relatedCalculator: {
      title: "AI Fine-Tuning Cost Calculator",
      href: "/ai-fine-tuning-calculator",
    },
  },
  {
    slug: "gpu-rental-pricing-compared",
    title: "GPU Rental Pricing: AWS vs GCP vs Lambda Labs Compared",
    description:
      "Compare GPU rental costs across major cloud providers and GPU marketplaces. Find the cheapest H100 and A100 rentals.",
    publishedAt: "2025-04-13",
    updatedAt: null,
    category: "gpu-computing",
    tags: ["GPU", "cloud computing", "AWS", "GCP", "Lambda Labs", "H100", "A100"],
    readingTimeMinutes: 9,
    relatedCalculator: {
      title: "GPU Cost Calculator",
      href: "/gpu-cost-calculator",
    },
  },
  {
    slug: "how-to-estimate-ai-api-costs",
    title: "How to Estimate AI API Costs for Your Project",
    description:
      "A practical guide to estimating AI API costs before you build. Covers token counting, usage patterns, and cost optimization strategies.",
    publishedAt: "2025-04-13",
    updatedAt: null,
    category: "guides",
    tags: ["API costs", "tokens", "budgeting", "cost optimization"],
    readingTimeMinutes: 7,
    relatedCalculator: {
      title: "AI Project Cost Estimator",
      href: "/ai-project-estimator",
    },
  },
  {
    slug: "understanding-ai-token-pricing",
    title: "Understanding AI Token Pricing: A Beginner's Guide",
    description:
      "What are tokens, why do they cost money, and how can you estimate your AI API spend? A plain-English guide for developers and business owners.",
    publishedAt: "2025-04-13",
    updatedAt: null,
    category: "guides",
    tags: ["tokens", "pricing", "beginner", "LLM", "API"],
    readingTimeMinutes: 6,
    relatedCalculator: {
      title: "AI Token Cost Calculator",
      href: "/ai-cost-calculator",
    },
  },
  {
    slug: "when-to-refinance-your-mortgage",
    title: "When Should You Refinance Your Mortgage?",
    description:
      "Practical rules of thumb for deciding if refinancing makes sense. The 1% rule, breakeven analysis, term extension traps, and a decision checklist.",
    publishedAt: "2026-04-14",
    updatedAt: null,
    category: "financial",
    tags: ["mortgage", "refinancing", "breakeven", "interest rates", "home loans"],
    readingTimeMinutes: 7,
    relatedCalculator: {
      title: "Mortgage Refinance Calculator",
      href: "/mortgage-refinance-calculator",
    },
  },
];

export function getCategoryLabel(category: BlogPost["category"]): string {
  const labels: Record<BlogPost["category"], string> = {
    "ai-costs": "AI Costs",
    "gpu-computing": "GPU Computing",
    financial: "Financial",
    guides: "Guides",
  };
  return labels[category];
}

export function getCategoryColor(category: BlogPost["category"]): string {
  const colors: Record<BlogPost["category"], string> = {
    "ai-costs": "bg-blue-100 text-blue-700",
    "gpu-computing": "bg-purple-100 text-purple-700",
    financial: "bg-green-100 text-green-700",
    guides: "bg-amber-100 text-amber-700",
  };
  return colors[category];
}
