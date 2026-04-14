import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find(
  (p) => p.slug === "how-much-does-ai-fine-tuning-cost"
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
        Fine-tuning lets you customize an AI model for your specific use case —
        better accuracy, consistent formatting, and domain-specific knowledge.
        But it comes with upfront training costs and higher inference prices.
        Here&apos;s what you need to know before committing.
      </p>

      <h2>What Does Fine-Tuning Actually Cost?</h2>
      <p>
        Fine-tuning costs have two components:{" "}
        <strong>one-time training costs</strong> (proportional to your dataset
        size and number of epochs) and <strong>ongoing inference costs</strong>{" "}
        (typically 1.5-2x higher than the base model).
      </p>

      <h3>Training Costs by Provider</h3>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Training $/M tokens</th>
            <th>1K examples (500 tok/ea, 3 epochs)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Llama 3.1 8B (Together)</td><td>$0.48</td><td>$0.72</td></tr>
          <tr><td>Mistral 7B (Together)</td><td>$0.48</td><td>$0.72</td></tr>
          <tr><td>Gemini 2.0 Flash</td><td>$2.00</td><td>$3.00</td></tr>
          <tr><td>GPT-4o mini</td><td>$3.00</td><td>$4.50</td></tr>
          <tr><td>GPT-4.1 mini</td><td>$4.00</td><td>$6.00</td></tr>
          <tr><td>Llama 3.3 70B (Together)</td><td>$5.00</td><td>$7.50</td></tr>
          <tr><td>GPT-4o</td><td>$25.00</td><td>$37.50</td></tr>
        </tbody>
      </table>

      <h2>LoRA vs Full Fine-Tuning</h2>
      <p>
        <strong>LoRA (Low-Rank Adaptation)</strong> modifies only a small subset
        of model parameters, reducing training costs by 60-70% while preserving
        most of the quality gains. It&apos;s the recommended approach for most
        use cases.
      </p>
      <ul>
        <li>
          <strong>Full fine-tuning:</strong> Updates all model weights. Higher
          quality ceiling but much more expensive and slower.
        </li>
        <li>
          <strong>LoRA:</strong> Updates small adapter layers. 60-70% cheaper,
          faster, and easier to iterate. Supported by Together AI, Fireworks,
          and Google.
        </li>
      </ul>
      <p>
        OpenAI does not currently support LoRA — they handle optimization
        internally. Open-source model providers like Together AI and Fireworks
        give you the choice.
      </p>

      <h2>Total Cost of Ownership</h2>
      <p>
        Training cost is just the beginning. The real expense is ongoing
        inference. A model that&apos;s cheap to train but expensive to run can
        cost more over 6 months than a model with higher training costs but
        cheaper inference.
      </p>
      <p>
        For example, fine-tuning GPT-4o costs $37.50 for 1K examples, but
        inference runs $3.75/$15.00 per million input/output tokens. At 100
        requests/day, that&apos;s about $15/month in inference. Meanwhile,
        Llama 3.1 8B costs just $0.72 to train and under $1/month for the same
        inference volume.
      </p>

      <h2>When Is Fine-Tuning Worth It?</h2>
      <ol>
        <li>
          <strong>Consistent output format</strong> — If you need structured
          JSON, specific tone, or domain-specific terminology every time.
        </li>
        <li>
          <strong>Reducing prompt length</strong> — Fine-tuned models learn
          context from training data, so you can use shorter prompts and save on
          input tokens.
        </li>
        <li>
          <strong>Performance on niche tasks</strong> — Classification,
          extraction, or domain-specific reasoning where the base model
          struggles.
        </li>
      </ol>

      <h2>When to Skip Fine-Tuning</h2>
      <ul>
        <li>
          <strong>Few-shot prompting works well enough</strong> — Try prompt
          engineering first. It&apos;s free and instant.
        </li>
        <li>
          <strong>Your data changes frequently</strong> — Re-training every
          week gets expensive. Consider RAG instead.
        </li>
        <li>
          <strong>You need broad general knowledge</strong> — Fine-tuning can
          narrow a model&apos;s capabilities. Use the base model with good
          prompts.
        </li>
      </ul>

      <h2>Getting Started</h2>
      <p>
        The most cost-effective approach for most teams: start with{" "}
        <strong>GPT-4o mini</strong> or <strong>Llama 3.1 8B with LoRA</strong>.
        Both offer excellent quality-to-cost ratios. Prepare 500-1,000
        high-quality examples, run 3 epochs, and evaluate before scaling up.
      </p>
      <p>
        Use our{" "}
        <Link href="/ai-fine-tuning-calculator">
          AI Fine-Tuning Cost Calculator
        </Link>{" "}
        to estimate your total cost of ownership across all providers.
      </p>
    </BlogLayout>
  );
}
