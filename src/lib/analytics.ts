declare function gtag(...args: unknown[]): void;

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof gtag !== "undefined") {
    gtag("event", eventName, params);
  }
}
