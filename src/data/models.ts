export interface AIModel {
  id: string;
  name: string;
  provider: string;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  contextWindow: number;
  batchDiscount: number | null; // percentage discount, e.g. 50 means 50% off
  category: "flagship" | "mid" | "budget" | "reasoning";
}

export interface Provider {
  id: string;
  name: string;
  color: string;
}

export const providers: Provider[] = [
  { id: "openai", name: "OpenAI", color: "#10a37f" },
  { id: "anthropic", name: "Anthropic", color: "#d97706" },
  { id: "google", name: "Google", color: "#4285f4" },
  { id: "meta", name: "Meta (Llama)", color: "#0668E1" },
  { id: "mistral", name: "Mistral", color: "#f97316" },
  { id: "cohere", name: "Cohere", color: "#39594d" },
  { id: "deepseek", name: "DeepSeek", color: "#5b6abf" },
];

export const models: AIModel[] = [
  // OpenAI
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    inputPricePerMillion: 2.5,
    outputPricePerMillion: 10,
    contextWindow: 128000,
    batchDiscount: 50,
    category: "flagship",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "openai",
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.6,
    contextWindow: 128000,
    batchDiscount: 50,
    category: "budget",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "openai",
    inputPricePerMillion: 2.0,
    outputPricePerMillion: 8.0,
    contextWindow: 1048576,
    batchDiscount: 50,
    category: "flagship",
  },
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 mini",
    provider: "openai",
    inputPricePerMillion: 0.4,
    outputPricePerMillion: 1.6,
    contextWindow: 1048576,
    batchDiscount: 50,
    category: "mid",
  },
  {
    id: "gpt-4.1-nano",
    name: "GPT-4.1 nano",
    provider: "openai",
    inputPricePerMillion: 0.1,
    outputPricePerMillion: 0.4,
    contextWindow: 1048576,
    batchDiscount: 50,
    category: "budget",
  },
  {
    id: "o1",
    name: "o1",
    provider: "openai",
    inputPricePerMillion: 15,
    outputPricePerMillion: 60,
    contextWindow: 200000,
    batchDiscount: null,
    category: "reasoning",
  },
  {
    id: "o3",
    name: "o3",
    provider: "openai",
    inputPricePerMillion: 2.0,
    outputPricePerMillion: 8.0,
    contextWindow: 200000,
    batchDiscount: null,
    category: "reasoning",
  },
  {
    id: "o3-mini",
    name: "o3-mini",
    provider: "openai",
    inputPricePerMillion: 1.1,
    outputPricePerMillion: 4.4,
    contextWindow: 200000,
    batchDiscount: null,
    category: "reasoning",
  },
  {
    id: "o4-mini",
    name: "o4-mini",
    provider: "openai",
    inputPricePerMillion: 1.1,
    outputPricePerMillion: 4.4,
    contextWindow: 200000,
    batchDiscount: null,
    category: "reasoning",
  },

  // Anthropic
  {
    id: "claude-opus-4",
    name: "Claude Opus 4",
    provider: "anthropic",
    inputPricePerMillion: 15,
    outputPricePerMillion: 75,
    contextWindow: 200000,
    batchDiscount: 50,
    category: "flagship",
  },
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "anthropic",
    inputPricePerMillion: 3,
    outputPricePerMillion: 15,
    contextWindow: 200000,
    batchDiscount: 50,
    category: "mid",
  },
  {
    id: "claude-sonnet-3.5",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    inputPricePerMillion: 3,
    outputPricePerMillion: 15,
    contextWindow: 200000,
    batchDiscount: 50,
    category: "mid",
  },
  {
    id: "claude-haiku-3.5",
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
    inputPricePerMillion: 0.8,
    outputPricePerMillion: 4,
    contextWindow: 200000,
    batchDiscount: 50,
    category: "budget",
  },

  // Google
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "google",
    inputPricePerMillion: 1.25,
    outputPricePerMillion: 10,
    contextWindow: 1048576,
    batchDiscount: 50,
    category: "flagship",
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "google",
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.6,
    contextWindow: 1048576,
    batchDiscount: 50,
    category: "mid",
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "google",
    inputPricePerMillion: 0.1,
    outputPricePerMillion: 0.4,
    contextWindow: 1048576,
    batchDiscount: 50,
    category: "budget",
  },

  // Meta / Llama (hosted pricing via Together AI)
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    provider: "meta",
    inputPricePerMillion: 0.59,
    outputPricePerMillion: 0.79,
    contextWindow: 131072,
    batchDiscount: null,
    category: "mid",
  },
  {
    id: "llama-4-scout",
    name: "Llama 4 Scout",
    provider: "meta",
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.6,
    contextWindow: 512000,
    batchDiscount: null,
    category: "budget",
  },
  {
    id: "llama-4-maverick",
    name: "Llama 4 Maverick",
    provider: "meta",
    inputPricePerMillion: 0.25,
    outputPricePerMillion: 0.75,
    contextWindow: 1048576,
    batchDiscount: null,
    category: "mid",
  },

  // Mistral
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "mistral",
    inputPricePerMillion: 2,
    outputPricePerMillion: 6,
    contextWindow: 128000,
    batchDiscount: 50,
    category: "flagship",
  },
  {
    id: "mistral-small",
    name: "Mistral Small",
    provider: "mistral",
    inputPricePerMillion: 0.1,
    outputPricePerMillion: 0.3,
    contextWindow: 32000,
    batchDiscount: 50,
    category: "budget",
  },
  {
    id: "codestral",
    name: "Codestral",
    provider: "mistral",
    inputPricePerMillion: 0.3,
    outputPricePerMillion: 0.9,
    contextWindow: 256000,
    batchDiscount: 50,
    category: "mid",
  },

  // Cohere
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "cohere",
    inputPricePerMillion: 2.5,
    outputPricePerMillion: 10,
    contextWindow: 128000,
    batchDiscount: null,
    category: "flagship",
  },
  {
    id: "command-r",
    name: "Command R",
    provider: "cohere",
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.6,
    contextWindow: 128000,
    batchDiscount: null,
    category: "budget",
  },

  // DeepSeek
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "deepseek",
    inputPricePerMillion: 0.27,
    outputPricePerMillion: 1.1,
    contextWindow: 131072,
    batchDiscount: null,
    category: "mid",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "deepseek",
    inputPricePerMillion: 0.55,
    outputPricePerMillion: 2.19,
    contextWindow: 131072,
    batchDiscount: null,
    category: "reasoning",
  },
];

export const useCasePresets = [
  {
    name: "Chatbot reply",
    description: "A typical back-and-forth conversation turn",
    inputTokens: 500,
    outputTokens: 300,
  },
  {
    name: "Document summary",
    description: "Summarizing a 5-page document",
    inputTokens: 4000,
    outputTokens: 500,
  },
  {
    name: "Code generation",
    description: "Generating a function with context",
    inputTokens: 2000,
    outputTokens: 1000,
  },
  {
    name: "Long document analysis",
    description: "Analyzing a 50-page report",
    inputTokens: 40000,
    outputTokens: 2000,
  },
  {
    name: "RAG query",
    description: "Retrieval-augmented generation with context chunks",
    inputTokens: 8000,
    outputTokens: 500,
  },
  {
    name: "Full context window",
    description: "Using maximum context of the selected model",
    inputTokens: 0, // will be replaced with model's context window
    outputTokens: 4000,
  },
];

export function formatContextWindow(tokens: number): string {
  if (tokens >= 1048576) return `${(tokens / 1048576).toFixed(0)}M`;
  return `${(tokens / 1000).toFixed(0)}K`;
}

export function calculateCost(
  model: AIModel,
  inputTokens: number,
  outputTokens: number,
  useBatch: boolean = false
): { inputCost: number; outputCost: number; totalCost: number } {
  const discount = useBatch && model.batchDiscount ? model.batchDiscount / 100 : 0;
  const inputCost = (inputTokens / 1_000_000) * model.inputPricePerMillion * (1 - discount);
  const outputCost = (outputTokens / 1_000_000) * model.outputPricePerMillion * (1 - discount);
  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
  };
}

export function formatCurrency(amount: number): string {
  if (amount < 0.01 && amount > 0) {
    return `$${amount.toFixed(6)}`;
  }
  if (amount < 1) {
    return `$${amount.toFixed(4)}`;
  }
  return `$${amount.toFixed(2)}`;
}
