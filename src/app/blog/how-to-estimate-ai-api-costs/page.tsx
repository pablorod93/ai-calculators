import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find(
  (p) => p.slug === "how-to-estimate-ai-api-costs"
)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `https://aicalculators.org/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
  },
};

export default function Page() {
  return (
    <BlogLayout post={post}>
      <p>
        Before building an AI-powered feature, you need a realistic cost
        estimate. Underestimate and you blow your budget. Overestimate and you
        might kill a project that would have been profitable. Here&apos;s how
        to get it right.
      </p>

      <h2>Step 1: Understand Your Usage Pattern</h2>
      <p>
        Every AI API cost comes down to three variables:
      </p>
      <ol>
        <li>
          <strong>Tokens per request</strong> — How much text goes in (prompt +
          context) and comes out (response).
        </li>
        <li>
          <strong>Requests per day</strong> — How often your users trigger the
          AI.
        </li>
        <li>
          <strong>Model choice</strong> — Flagship models (GPT-4o, Claude Opus)
          cost 10-50x more than budget models (GPT-4o mini, Haiku).
        </li>
      </ol>

      <h2>Step 2: Estimate Token Counts</h2>
      <p>
        A rough rule of thumb: <strong>1 token ≈ 4 characters</strong> in
        English, or about <strong>3/4 of a word</strong>. Here are typical
        token counts for common use cases:
      </p>
      <table>
        <thead>
          <tr>
            <th>Use Case</th>
            <th>Input Tokens</th>
            <th>Output Tokens</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Chatbot reply</td><td>500</td><td>300</td></tr>
          <tr><td>Document summary (5 pages)</td><td>4,000</td><td>500</td></tr>
          <tr><td>Code generation</td><td>2,000</td><td>1,000</td></tr>
          <tr><td>RAG query</td><td>8,000</td><td>500</td></tr>
          <tr><td>Long report analysis</td><td>40,000</td><td>2,000</td></tr>
        </tbody>
      </table>

      <h2>Step 3: Pick the Right Model Tier</h2>
      <p>
        Don&apos;t default to the most capable model. Match the model to the
        task:
      </p>
      <ul>
        <li>
          <strong>Simple classification/extraction:</strong> GPT-4o mini, Claude
          Haiku, Gemini Flash ($0.10-0.15/M input tokens)
        </li>
        <li>
          <strong>General-purpose tasks:</strong> GPT-4o, Claude Sonnet, Gemini
          Pro ($1.25-3.00/M input tokens)
        </li>
        <li>
          <strong>Complex reasoning:</strong> Claude Opus, o3, GPT-4.1
          ($2.00-15.00/M input tokens)
        </li>
      </ul>

      <h2>Step 4: Calculate Monthly Cost</h2>
      <p>
        The formula is straightforward:
      </p>
      <pre>
        Monthly Cost = (Input Tokens × Input Price + Output Tokens × Output
        Price) × Requests/Day × 30
      </pre>
      <p>
        For example, a chatbot using GPT-4o mini (500 input, 300 output tokens
        per request, 1,000 requests/day):
      </p>
      <pre>
        (500 × $0.15/M + 300 × $0.60/M) × 1,000 × 30 = $8.10/month
      </pre>
      <p>
        The same chatbot on GPT-4o would cost $105/month — 13x more. Model
        choice is the biggest lever.
      </p>

      <h2>Step 5: Plan for Growth</h2>
      <p>
        Multiply your estimate by 2-3x for a realistic budget. Usage patterns
        change, prompts get longer with added features, and successful products
        attract more users.
      </p>

      <h2>Cost Optimization Strategies</h2>
      <ol>
        <li>
          <strong>Start with the cheapest model that works</strong> — Test your
          use case on budget models first. Upgrade only when quality demands it.
        </li>
        <li>
          <strong>Use prompt caching</strong> — Anthropic and OpenAI offer
          cached prompt pricing at 75-90% discount for repeated system prompts.
        </li>
        <li>
          <strong>Batch non-urgent requests</strong> — Batch API pricing is
          typically 50% off standard rates.
        </li>
        <li>
          <strong>Shorten your prompts</strong> — Every token costs money.
          Tighten system prompts, remove unnecessary context.
        </li>
      </ol>

      <p>
        Use our{" "}
        <Link href="/ai-project-estimator">AI Project Cost Estimator</Link> to
        get a detailed breakdown for your specific project type, or the{" "}
        <Link href="/ai-cost-calculator">AI Token Cost Calculator</Link> to
        compare individual model pricing.
      </p>
    </BlogLayout>
  );
}
