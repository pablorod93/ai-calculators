import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find(
  (p) => p.slug === "gpu-rental-pricing-compared"
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
        Whether you&apos;re training models, running inference, or
        experimenting with AI, GPU costs are likely your biggest expense. The
        good news: competition among providers has driven prices down
        significantly. The challenge: comparing pricing across 7+ providers
        with different commitment models, spot pricing, and instance types.
      </p>

      <h2>H100 Pricing: The Current King</h2>
      <p>
        NVIDIA&apos;s H100 SXM is the most sought-after GPU for AI workloads.
        Here&apos;s how providers compare for on-demand pricing:
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>$/hr (on-demand)</th>
            <th>Monthly (24/7)</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CoreWeave</td><td>$2.06</td><td>$1,483</td><td>Rental</td></tr>
          <tr><td>Vast.ai</td><td>$2.20</td><td>$1,584</td><td>Marketplace</td></tr>
          <tr><td>Lambda Labs</td><td>$2.49</td><td>$1,793</td><td>Rental</td></tr>
          <tr><td>RunPod</td><td>$3.29</td><td>$2,369</td><td>Rental</td></tr>
          <tr><td>Azure</td><td>$3.67</td><td>$2,642</td><td>Cloud</td></tr>
          <tr><td>GCP</td><td>$3.76</td><td>$2,707</td><td>Cloud</td></tr>
          <tr><td>AWS</td><td>$4.14</td><td>$2,981</td><td>Cloud</td></tr>
        </tbody>
      </table>

      <h2>Cloud vs GPU Marketplace vs On-Premise</h2>

      <h3>Major Cloud Providers (AWS, GCP, Azure)</h3>
      <ul>
        <li>Highest prices but strongest reliability and SLAs</li>
        <li>Best integration with existing cloud infrastructure</li>
        <li>Reserved instances (1-3 year) can cut costs 40-60%</li>
        <li>Spot/preemptible instances offer 60-70% savings but can be interrupted</li>
      </ul>

      <h3>GPU Rental Platforms (Lambda, CoreWeave, RunPod)</h3>
      <ul>
        <li>30-50% cheaper than major clouds for on-demand</li>
        <li>Purpose-built for ML workloads</li>
        <li>Less overhead — no need to manage full cloud infrastructure</li>
        <li>Availability can be limited for popular GPUs</li>
      </ul>

      <h3>GPU Marketplaces (Vast.ai)</h3>
      <ul>
        <li>Cheapest option — peer-to-peer GPU rental</li>
        <li>Highly variable pricing and reliability</li>
        <li>Best for experimental work, not production</li>
      </ul>

      <h2>A100 80GB: The Workhorse</h2>
      <p>
        If you don&apos;t need the latest hardware, the A100 80GB offers
        excellent value:
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>$/hr (on-demand)</th>
            <th>Monthly (24/7)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Vast.ai</td><td>$1.10</td><td>$792</td></tr>
          <tr><td>CoreWeave</td><td>$1.28</td><td>$922</td></tr>
          <tr><td>Lambda Labs</td><td>$1.29</td><td>$929</td></tr>
          <tr><td>RunPod</td><td>$1.64</td><td>$1,181</td></tr>
          <tr><td>GCP</td><td>$2.21</td><td>$1,591</td></tr>
          <tr><td>Azure</td><td>$2.48</td><td>$1,786</td></tr>
          <tr><td>AWS</td><td>$3.06</td><td>$2,203</td></tr>
        </tbody>
      </table>

      <h2>On-Premise: When Does It Make Sense?</h2>
      <p>
        Purchasing GPUs outright makes sense when you have consistent, high
        utilization. An H100 costs roughly $30,000 to purchase. Amortized over
        4 years with electricity, the effective monthly cost is around $700-800
        — compared to $1,500-3,000/month in the cloud.
      </p>
      <p>
        The break-even point for buying vs renting is typically 12-18 months of
        24/7 usage against the cheapest cloud provider, or 6-8 months against
        major clouds.
      </p>

      <h2>Tips for Reducing GPU Costs</h2>
      <ol>
        <li>
          <strong>Use spot instances for training</strong> — Training can be
          checkpointed and resumed. The 60-70% savings outweigh the
          interruption risk.
        </li>
        <li>
          <strong>Right-size your GPU</strong> — An RTX 4090 ($0.25-0.39/hr)
          handles many inference workloads that don&apos;t need 80GB VRAM.
        </li>
        <li>
          <strong>Commit when you can</strong> — 1-year reserved instances
          save 40% on AWS/GCP/Azure.
        </li>
        <li>
          <strong>Consider mixed strategies</strong> — Production inference on
          reserved instances, training on spot, experiments on Vast.ai.
        </li>
      </ol>

      <p>
        Use our{" "}
        <Link href="/gpu-cost-calculator">GPU Cost Calculator</Link> to compare
        prices across all providers for your specific GPU and usage pattern.
      </p>
    </BlogLayout>
  );
}
