export function formatUSD(amount: number, decimals?: number): string {
  if (amount < 0.01 && amount > 0) return `$${amount.toFixed(6)}`;
  if (amount < 1 && amount > 0) return `$${amount.toFixed(4)}`;
  const d = decimals ?? (amount >= 100 ? 0 : 2);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(amount);
}

export function formatUSDExact(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("en-US");
}

export function formatPercent(n: number, decimals: number = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
