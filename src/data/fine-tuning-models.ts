export interface FineTuningModel {
  id: string;
  name: string;
  provider: string;
  trainingCostPerMillionTokens: number;
  inferenceInput: number;
  inferenceOutput: number;
  supportsLoRA: boolean;
  loRACostMultiplier: number | null;
  minExamples: number;
  contextWindow: number;
  notes: string;
}

export interface FineTuningProvider {
  id: string;
  name: string;
  color: string;
}

export const fineTuningProviders: FineTuningProvider[] = [
  { id: "openai", name: "OpenAI", color: "#10a37f" },
  { id: "google", name: "Google", color: "#4285f4" },
  { id: "together", name: "Together AI", color: "#6366f1" },
  { id: "fireworks", name: "Fireworks AI", color: "#f97316" },
  { id: "anyscale", name: "Anyscale", color: "#0ea5e9" },
];

export const fineTuningModels: FineTuningModel[] = [
  // OpenAI
  {
    id: "gpt-4o-ft",
    name: "GPT-4o",
    provider: "openai",
    trainingCostPerMillionTokens: 25.0,
    inferenceInput: 3.75,
    inferenceOutput: 15.0,
    supportsLoRA: false,
    loRACostMultiplier: null,
    minExamples: 10,
    contextWindow: 128000,
    notes: "Most capable OpenAI model for fine-tuning. Higher cost, best quality.",
  },
  {
    id: "gpt-4o-mini-ft",
    name: "GPT-4o mini",
    provider: "openai",
    trainingCostPerMillionTokens: 3.0,
    inferenceInput: 0.3,
    inferenceOutput: 1.2,
    supportsLoRA: false,
    loRACostMultiplier: null,
    minExamples: 10,
    contextWindow: 128000,
    notes: "Best value for OpenAI fine-tuning. Great for most use cases.",
  },
  {
    id: "gpt-4.1-mini-ft",
    name: "GPT-4.1 mini",
    provider: "openai",
    trainingCostPerMillionTokens: 4.0,
    inferenceInput: 0.8,
    inferenceOutput: 3.2,
    supportsLoRA: false,
    loRACostMultiplier: null,
    minExamples: 10,
    contextWindow: 1048576,
    notes: "Latest mini model with 1M context. Better instruction following.",
  },

  // Google
  {
    id: "gemini-flash-ft",
    name: "Gemini 2.0 Flash",
    provider: "google",
    trainingCostPerMillionTokens: 2.0,
    inferenceInput: 0.15,
    inferenceOutput: 0.6,
    supportsLoRA: true,
    loRACostMultiplier: 0.5,
    minExamples: 100,
    contextWindow: 1048576,
    notes: "Affordable fine-tuning via Vertex AI. LoRA supported.",
  },

  // Together AI (open-source models)
  {
    id: "llama-3.3-70b-ft",
    name: "Llama 3.3 70B",
    provider: "together",
    trainingCostPerMillionTokens: 5.0,
    inferenceInput: 0.59,
    inferenceOutput: 0.79,
    supportsLoRA: true,
    loRACostMultiplier: 0.3,
    minExamples: 1,
    contextWindow: 131072,
    notes: "Full fine-tuning or LoRA. Great open-source option for production.",
  },
  {
    id: "llama-3.1-8b-ft",
    name: "Llama 3.1 8B",
    provider: "together",
    trainingCostPerMillionTokens: 0.48,
    inferenceInput: 0.1,
    inferenceOutput: 0.1,
    supportsLoRA: true,
    loRACostMultiplier: 0.3,
    minExamples: 1,
    contextWindow: 131072,
    notes: "Cheapest fine-tuning option. Ideal for simple classification tasks.",
  },
  {
    id: "mistral-7b-ft",
    name: "Mistral 7B",
    provider: "together",
    trainingCostPerMillionTokens: 0.48,
    inferenceInput: 0.1,
    inferenceOutput: 0.1,
    supportsLoRA: true,
    loRACostMultiplier: 0.3,
    minExamples: 1,
    contextWindow: 32000,
    notes: "Fast, efficient model. Good for multilingual tasks.",
  },

  // Fireworks AI
  {
    id: "llama-3.1-8b-fireworks",
    name: "Llama 3.1 8B",
    provider: "fireworks",
    trainingCostPerMillionTokens: 0.6,
    inferenceInput: 0.1,
    inferenceOutput: 0.1,
    supportsLoRA: true,
    loRACostMultiplier: 0.4,
    minExamples: 1,
    contextWindow: 131072,
    notes: "Fireworks serverless deployment. Fast inference after fine-tuning.",
  },
  {
    id: "llama-3.3-70b-fireworks",
    name: "Llama 3.3 70B",
    provider: "fireworks",
    trainingCostPerMillionTokens: 6.0,
    inferenceInput: 0.59,
    inferenceOutput: 0.79,
    supportsLoRA: true,
    loRACostMultiplier: 0.4,
    minExamples: 1,
    contextWindow: 131072,
    notes: "Fireworks optimized serving with LoRA adapters.",
  },
];

export function estimateTrainingTokens(
  examples: number,
  avgTokensPerExample: number,
  epochs: number
): number {
  return examples * avgTokensPerExample * epochs;
}

export function estimateTrainingCost(
  model: FineTuningModel,
  trainingTokens: number,
  useLoRA: boolean
): number {
  const baseCost = (trainingTokens / 1_000_000) * model.trainingCostPerMillionTokens;
  if (useLoRA && model.supportsLoRA && model.loRACostMultiplier) {
    return baseCost * model.loRACostMultiplier;
  }
  return baseCost;
}

export function estimateInferenceCost(
  model: FineTuningModel,
  inputTokens: number,
  outputTokens: number,
  requestsPerDay: number
): { perRequest: number; daily: number; monthly: number; yearly: number } {
  const perRequest =
    (inputTokens / 1_000_000) * model.inferenceInput +
    (outputTokens / 1_000_000) * model.inferenceOutput;
  const daily = perRequest * requestsPerDay;
  return {
    perRequest,
    daily,
    monthly: daily * 30,
    yearly: daily * 365,
  };
}

export function formatFineTuningCurrency(amount: number): string {
  if (amount < 0.01 && amount > 0) return `$${amount.toFixed(6)}`;
  if (amount < 1) return `$${amount.toFixed(4)}`;
  if (amount >= 1000) return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `$${amount.toFixed(2)}`;
}
