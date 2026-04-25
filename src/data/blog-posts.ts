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
  {
    slug: "how-to-finance-a-business-acquisition",
    title: "How to Buy a Business with an SBA Loan: A Complete Guide",
    description:
      "Everything you need to know about financing a small business acquisition with SBA 7(a) loans, seller financing, DSCR requirements, and cash-on-cash return targets.",
    publishedAt: "2026-04-23",
    updatedAt: null,
    category: "financial",
    tags: ["business acquisition", "SBA loan", "DSCR", "small business", "seller financing"],
    readingTimeMinutes: 9,
    relatedCalculator: {
      title: "Business Acquisition Calculator",
      href: "/business-acquisition-calculator",
    },
  },
  {
    slug: "how-compound-interest-works",
    title: "How Does Compound Interest Work? A Plain-English Guide",
    description:
      "Compound interest explained with real numbers: the formula, compounding frequency, the Rule of 72, and why starting early beats investing more later.",
    publishedAt: "2026-04-23",
    updatedAt: null,
    category: "financial",
    tags: ["compound interest", "savings", "investing", "Rule of 72", "APY"],
    readingTimeMinutes: 6,
    relatedCalculator: {
      title: "Compound Interest Calculator",
      href: "/compound-interest-calculator",
    },
  },
  {
    slug: "loan-amortization-schedule-explained",
    title: "Loan Amortization Schedule Explained",
    description:
      "Why your early mortgage payments are mostly interest, how an amortization schedule works, and how extra payments can save you years and thousands of dollars.",
    publishedAt: "2026-04-23",
    updatedAt: null,
    category: "financial",
    tags: ["loan amortization", "mortgage", "interest", "extra payments", "debt payoff"],
    readingTimeMinutes: 7,
    relatedCalculator: {
      title: "Loan Amortization Calculator",
      href: "/loan-amortization-calculator",
    },
  },
  {
    slug: "how-mortgage-payments-are-calculated",
    title: "How Is a Mortgage Payment Calculated?",
    description:
      "A plain-English breakdown of the mortgage payment formula, PITI, PMI, and how down payment, loan term, and interest rate each affect what you owe every month.",
    publishedAt: "2026-04-23",
    updatedAt: null,
    category: "financial",
    tags: ["mortgage", "home buying", "amortization", "PITI", "down payment"],
    readingTimeMinutes: 7,
    relatedCalculator: {
      title: "Mortgage Calculator",
      href: "/mortgage-calculator",
    },
  },
  {
    slug: "how-to-calculate-roi",
    title: "How to Calculate ROI (and Why Simple ROI Misleads You)",
    description:
      "The ROI formula explained clearly, why annualized ROI and CAGR matter for comparing investments, what counts as a good return by asset class, and the five mistakes most investors make.",
    publishedAt: "2026-04-23",
    updatedAt: null,
    category: "financial",
    tags: ["ROI", "return on investment", "annualized return", "CAGR", "investing"],
    readingTimeMinutes: 6,
    relatedCalculator: {
      title: "ROI Calculator",
      href: "/roi-calculator",
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
