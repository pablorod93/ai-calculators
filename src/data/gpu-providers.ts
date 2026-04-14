export interface GPU {
  id: string;
  name: string;
  vram: number;
  fp16Tflops: number;
  architecture: string;
  powerWatts: number;
  purchasePrice: number;
  lifespanYears: number;
}

export interface GPUProvider {
  id: string;
  name: string;
  color: string;
  type: "cloud" | "rental";
}

export interface GPUOffering {
  id: string;
  gpuId: string;
  providerId: string;
  pricePerHour: number;
  commitment: "on-demand" | "1-month" | "1-year" | "3-year";
  spotAvailable: boolean;
  spotDiscount: number | null;
  notes: string;
}

export const gpus: GPU[] = [
  {
    id: "h100-sxm",
    name: "NVIDIA H100 SXM",
    vram: 80,
    fp16Tflops: 989,
    architecture: "Hopper",
    powerWatts: 700,
    purchasePrice: 30000,
    lifespanYears: 4,
  },
  {
    id: "h100-pcie",
    name: "NVIDIA H100 PCIe",
    vram: 80,
    fp16Tflops: 756,
    architecture: "Hopper",
    powerWatts: 350,
    purchasePrice: 25000,
    lifespanYears: 4,
  },
  {
    id: "a100-80gb",
    name: "NVIDIA A100 80GB",
    vram: 80,
    fp16Tflops: 312,
    architecture: "Ampere",
    powerWatts: 300,
    purchasePrice: 15000,
    lifespanYears: 4,
  },
  {
    id: "a100-40gb",
    name: "NVIDIA A100 40GB",
    vram: 40,
    fp16Tflops: 312,
    architecture: "Ampere",
    powerWatts: 300,
    purchasePrice: 10000,
    lifespanYears: 4,
  },
  {
    id: "l40s",
    name: "NVIDIA L40S",
    vram: 48,
    fp16Tflops: 362,
    architecture: "Ada Lovelace",
    powerWatts: 350,
    purchasePrice: 8000,
    lifespanYears: 4,
  },
  {
    id: "rtx-4090",
    name: "NVIDIA RTX 4090",
    vram: 24,
    fp16Tflops: 165,
    architecture: "Ada Lovelace",
    powerWatts: 450,
    purchasePrice: 1600,
    lifespanYears: 4,
  },
];

export const gpuProviders: GPUProvider[] = [
  { id: "aws", name: "AWS", color: "#ff9900", type: "cloud" },
  { id: "gcp", name: "Google Cloud", color: "#4285f4", type: "cloud" },
  { id: "azure", name: "Azure", color: "#0078d4", type: "cloud" },
  { id: "lambda", name: "Lambda Labs", color: "#8b5cf6", type: "rental" },
  { id: "vastai", name: "Vast.ai", color: "#10b981", type: "rental" },
  { id: "runpod", name: "RunPod", color: "#6366f1", type: "rental" },
  { id: "coreweave", name: "CoreWeave", color: "#f97316", type: "rental" },
];

export const gpuOfferings: GPUOffering[] = [
  // H100 SXM
  { id: "aws-h100", gpuId: "h100-sxm", providerId: "aws", pricePerHour: 4.14, commitment: "on-demand", spotAvailable: true, spotDiscount: 60, notes: "p5.xlarge instance" },
  { id: "aws-h100-1y", gpuId: "h100-sxm", providerId: "aws", pricePerHour: 2.48, commitment: "1-year", spotAvailable: false, spotDiscount: null, notes: "1-year reserved" },
  { id: "gcp-h100", gpuId: "h100-sxm", providerId: "gcp", pricePerHour: 3.76, commitment: "on-demand", spotAvailable: true, spotDiscount: 65, notes: "a3-highgpu-1g instance" },
  { id: "gcp-h100-1y", gpuId: "h100-sxm", providerId: "gcp", pricePerHour: 2.26, commitment: "1-year", spotAvailable: false, spotDiscount: null, notes: "1-year CUD" },
  { id: "azure-h100", gpuId: "h100-sxm", providerId: "azure", pricePerHour: 3.67, commitment: "on-demand", spotAvailable: true, spotDiscount: 60, notes: "ND H100 v5 series" },
  { id: "lambda-h100", gpuId: "h100-sxm", providerId: "lambda", pricePerHour: 2.49, commitment: "on-demand", spotAvailable: false, spotDiscount: null, notes: "On-demand, no commitment" },
  { id: "coreweave-h100", gpuId: "h100-sxm", providerId: "coreweave", pricePerHour: 2.06, commitment: "on-demand", spotAvailable: false, spotDiscount: null, notes: "Kubernetes-based" },
  { id: "vastai-h100", gpuId: "h100-sxm", providerId: "vastai", pricePerHour: 2.20, commitment: "on-demand", spotAvailable: true, spotDiscount: 30, notes: "Marketplace pricing varies" },
  { id: "runpod-h100", gpuId: "h100-sxm", providerId: "runpod", pricePerHour: 3.29, commitment: "on-demand", spotAvailable: true, spotDiscount: 40, notes: "Serverless or pod" },

  // A100 80GB
  { id: "aws-a100", gpuId: "a100-80gb", providerId: "aws", pricePerHour: 3.06, commitment: "on-demand", spotAvailable: true, spotDiscount: 65, notes: "p4de.xlarge instance" },
  { id: "aws-a100-1y", gpuId: "a100-80gb", providerId: "aws", pricePerHour: 1.84, commitment: "1-year", spotAvailable: false, spotDiscount: null, notes: "1-year reserved" },
  { id: "gcp-a100", gpuId: "a100-80gb", providerId: "gcp", pricePerHour: 2.21, commitment: "on-demand", spotAvailable: true, spotDiscount: 70, notes: "a2-ultragpu-1g" },
  { id: "azure-a100", gpuId: "a100-80gb", providerId: "azure", pricePerHour: 2.48, commitment: "on-demand", spotAvailable: true, spotDiscount: 60, notes: "ND A100 v4" },
  { id: "lambda-a100", gpuId: "a100-80gb", providerId: "lambda", pricePerHour: 1.29, commitment: "on-demand", spotAvailable: false, spotDiscount: null, notes: "On-demand" },
  { id: "coreweave-a100", gpuId: "a100-80gb", providerId: "coreweave", pricePerHour: 1.28, commitment: "on-demand", spotAvailable: false, spotDiscount: null, notes: "Kubernetes-based" },
  { id: "vastai-a100", gpuId: "a100-80gb", providerId: "vastai", pricePerHour: 1.10, commitment: "on-demand", spotAvailable: true, spotDiscount: 30, notes: "Marketplace, varies" },
  { id: "runpod-a100", gpuId: "a100-80gb", providerId: "runpod", pricePerHour: 1.64, commitment: "on-demand", spotAvailable: true, spotDiscount: 40, notes: "Community or secure cloud" },

  // A100 40GB
  { id: "gcp-a100-40", gpuId: "a100-40gb", providerId: "gcp", pricePerHour: 1.65, commitment: "on-demand", spotAvailable: true, spotDiscount: 70, notes: "a2-highgpu-1g" },
  { id: "lambda-a100-40", gpuId: "a100-40gb", providerId: "lambda", pricePerHour: 1.10, commitment: "on-demand", spotAvailable: false, spotDiscount: null, notes: "On-demand" },
  { id: "vastai-a100-40", gpuId: "a100-40gb", providerId: "vastai", pricePerHour: 0.70, commitment: "on-demand", spotAvailable: true, spotDiscount: 30, notes: "Marketplace, varies" },
  { id: "runpod-a100-40", gpuId: "a100-40gb", providerId: "runpod", pricePerHour: 1.14, commitment: "on-demand", spotAvailable: true, spotDiscount: 40, notes: "Community cloud" },

  // L40S
  { id: "lambda-l40s", gpuId: "l40s", providerId: "lambda", pricePerHour: 0.99, commitment: "on-demand", spotAvailable: false, spotDiscount: null, notes: "On-demand" },
  { id: "vastai-l40s", gpuId: "l40s", providerId: "vastai", pricePerHour: 0.55, commitment: "on-demand", spotAvailable: true, spotDiscount: 30, notes: "Marketplace, varies" },
  { id: "runpod-l40s", gpuId: "l40s", providerId: "runpod", pricePerHour: 0.74, commitment: "on-demand", spotAvailable: true, spotDiscount: 40, notes: "Community cloud" },
  { id: "coreweave-l40s", gpuId: "l40s", providerId: "coreweave", pricePerHour: 0.77, commitment: "on-demand", spotAvailable: false, spotDiscount: null, notes: "Kubernetes-based" },

  // RTX 4090
  { id: "vastai-4090", gpuId: "rtx-4090", providerId: "vastai", pricePerHour: 0.25, commitment: "on-demand", spotAvailable: true, spotDiscount: 20, notes: "Community marketplace" },
  { id: "runpod-4090", gpuId: "rtx-4090", providerId: "runpod", pricePerHour: 0.39, commitment: "on-demand", spotAvailable: true, spotDiscount: 40, notes: "Community cloud" },
];

export function calculateOnPremiseMonthlyCost(
  gpu: GPU,
  numGPUs: number,
  hoursPerDay: number,
  electricityCostPerKwh: number
): {
  hardwareMonthly: number;
  electricityMonthly: number;
  totalMonthly: number;
} {
  const hardwareMonthly = (gpu.purchasePrice * numGPUs) / (gpu.lifespanYears * 12);
  const electricityMonthly =
    (gpu.powerWatts / 1000) * hoursPerDay * 30 * electricityCostPerKwh * numGPUs;
  return {
    hardwareMonthly,
    electricityMonthly,
    totalMonthly: hardwareMonthly + electricityMonthly,
  };
}

export function formatGPUCurrency(amount: number): string {
  if (amount < 0.01 && amount > 0) return `$${amount.toFixed(4)}`;
  if (amount >= 10000) return `$${Math.round(amount).toLocaleString("en-US")}`;
  if (amount >= 1000) return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `$${amount.toFixed(2)}`;
}
