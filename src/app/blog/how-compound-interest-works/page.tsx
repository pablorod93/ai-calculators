import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find((p) => p.slug === "how-compound-interest-works")!;

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
        Compound interest is the single most powerful force in personal finance
        &mdash; and also the most misunderstood. Once you see it in real numbers,
        you&apos;ll never think about saving and investing the same way again.
      </p>

      <h2>Simple interest vs. compound interest</h2>
      <p>
        Simple interest is straightforward: you earn interest only on your
        original principal, every year, forever. Compound interest is different
        &mdash; you earn interest on your principal <em>and</em> on all the
        interest you&apos;ve already earned. That distinction sounds minor. It
        isn&apos;t.
      </p>
      <p>
        Take $10,000 invested at 7% for 20 years:
      </p>
      <ul>
        <li>
          <strong>Simple interest:</strong> $10,000 &times; 7% &times; 20 years
          = $14,000 in interest. Final balance: <strong>$24,000</strong>.
        </li>
        <li>
          <strong>Compound interest (annual):</strong> $10,000 &times;
          (1.07)&sup2;&sup0; = <strong>$38,697</strong>.
        </li>
      </ul>
      <p>
        The same money, the same rate, the same time period &mdash; and
        compounding produces $14,697 more. That gap widens dramatically as time
        increases. At 30 years, simple interest gives you $31,000 while
        compounding delivers $76,123. This is why people say time in the market
        matters more than timing the market.
      </p>

      <h2>The compound interest formula</h2>
      <p>
        The math behind compounding is captured in one equation:
      </p>
      <pre>A = P(1 + r/n)^(nt)</pre>
      <p>Each variable has a plain-English meaning:</p>
      <ul>
        <li>
          <strong>A</strong> &mdash; the future value (what you end up with)
        </li>
        <li>
          <strong>P</strong> &mdash; principal (what you start with)
        </li>
        <li>
          <strong>r</strong> &mdash; annual interest rate as a decimal (7% = 0.07)
        </li>
        <li>
          <strong>n</strong> &mdash; number of compounding periods per year
          (1 = annual, 12 = monthly, 365 = daily)
        </li>
        <li>
          <strong>t</strong> &mdash; time in years
        </li>
      </ul>
      <p>
        The exponent <strong>(nt)</strong> is where the magic lives. When you
        multiply a number greater than 1 by itself many times, growth accelerates.
        At a 7% annual rate over 20 years, that exponent is 20 &mdash; and
        (1.07)&sup2;&sup0; equals 3.87. Your money nearly quadruples before you
        add a single additional dollar.
      </p>

      <h2>How compounding frequency changes your outcome</h2>
      <p>
        The formula&apos;s <strong>n</strong> variable &mdash; how often interest
        compounds &mdash; matters more than most people realize. More frequent
        compounding means interest starts earning interest sooner. The difference
        between annual and daily compounding on the same stated rate can add up
        to hundreds of dollars over a decade.
      </p>
      <p>
        Here&apos;s $10,000 at 8% for 10 years under different compounding
        frequencies:
      </p>
      <table>
        <thead>
          <tr>
            <th>Compounding frequency</th>
            <th>n</th>
            <th>Final balance</th>
            <th>Interest earned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Annual</td>
            <td>1</td>
            <td>$21,589</td>
            <td>$11,589</td>
          </tr>
          <tr>
            <td>Quarterly</td>
            <td>4</td>
            <td>$22,080</td>
            <td>$12,080</td>
          </tr>
          <tr>
            <td>Monthly</td>
            <td>12</td>
            <td>$22,196</td>
            <td>$12,196</td>
          </tr>
          <tr>
            <td>Daily</td>
            <td>365</td>
            <td>$22,253</td>
            <td>$12,253</td>
          </tr>
        </tbody>
      </table>
      <p>
        Daily compounding earns $664 more than annual over the same decade on
        the same principal &mdash; without any extra effort. This is why{" "}
        <strong>APY (Annual Percentage Yield)</strong> matters when comparing
        savings accounts. APY reflects the effective annual return after
        compounding, making it the apples-to-apples comparison number. A savings
        account advertising 5% APR compounding daily has an APY of 5.13% &mdash;
        meaningfully better than a 5% APY account compounding annually.
      </p>

      <h2>The Rule of 72: estimating doubling time in your head</h2>
      <p>
        You don&apos;t need a calculator to estimate how long it takes your money
        to double. The <strong>Rule of 72</strong> says: divide 72 by your annual
        interest rate, and you get the approximate number of years to double your
        money.
      </p>
      <p>
        At 6%: 72 &divide; 6 = 12 years. At 9%: 72 &divide; 9 = 8 years. It&apos;s
        a mental shortcut that stays remarkably accurate across typical investment
        return ranges.
      </p>
      <table>
        <thead>
          <tr>
            <th>Annual rate</th>
            <th>Rule of 72 estimate</th>
            <th>Exact years to double</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4%</td>
            <td>18.0 years</td>
            <td>17.7 years</td>
          </tr>
          <tr>
            <td>6%</td>
            <td>12.0 years</td>
            <td>11.9 years</td>
          </tr>
          <tr>
            <td>8%</td>
            <td>9.0 years</td>
            <td>9.0 years</td>
          </tr>
          <tr>
            <td>10%</td>
            <td>7.2 years</td>
            <td>7.3 years</td>
          </tr>
          <tr>
            <td>12%</td>
            <td>6.0 years</td>
            <td>6.1 years</td>
          </tr>
        </tbody>
      </table>
      <p>
        The Rule of 72 also works in reverse: if you want to double your money
        in 9 years, you need to earn roughly 8% (72 &divide; 9 = 8). Use it to
        quickly gut-check whether an investment return claim is realistic.
      </p>

      <h2>The power of regular contributions</h2>
      <p>
        Compounding on a lump sum is impressive. Compounding on a lump sum{" "}
        <em>plus</em> regular monthly contributions is transformative.
      </p>
      <p>
        Consider two scenarios starting with $10,000 at a 7% annual return over
        20 years:
      </p>
      <ul>
        <li>
          <strong>No contributions:</strong> The $10,000 grows to $38,697.
          Total invested: $10,000. Gain: $28,697.
        </li>
        <li>
          <strong>$500/month added:</strong> The balance grows to $284,905.
          Total invested: $10,000 + ($500 &times; 240 months) = $130,000.
          Gain: $154,905.
        </li>
      </ul>
      <p>
        Adding $500 a month turns a $28,697 gain into a $154,905 gain &mdash; a
        5.4&times; improvement in the earnings component alone. And of that
        $284,905 final balance, nearly $155,000 is pure interest. You put in
        $130,000 and compound interest did the rest.
      </p>
      <p>
        This math illustrates the cardinal rule of compounding:{" "}
        <strong>start earlier, contribute consistently, and let time do
        the heavy lifting.</strong> A 25-year-old investing $300/month at 8%
        will retire with more than a 35-year-old investing $600/month at the
        same rate &mdash; despite contributing half as much total.
      </p>

      <h2>Compounding works against you too</h2>
      <p>
        Everything above applies equally to debt. Credit card balances at 24%
        APR compound monthly &mdash; meaning unpaid balances nearly triple in
        five years without a single new purchase. A $5,000 balance at 24% left
        untouched for five years becomes $14,693. That&apos;s the same
        exponential curve working in reverse.
      </p>
      <p>
        The practical implication: high-interest debt should almost always be
        paid off before investing. You&apos;ll never reliably earn 20&ndash;24%
        in the stock market, but you can guarantee a &ldquo;return&rdquo; of
        exactly that rate by eliminating credit card debt.
      </p>

      <h2>Run the numbers</h2>
      <p>
        The examples above use round numbers to make the math clear. Your
        situation is different &mdash; different starting balance, different rate,
        different time horizon, different monthly contribution. Use our{" "}
        <Link href="/compound-interest-calculator">
          Compound Interest Calculator
        </Link>{" "}
        to model your exact scenario, compare compounding frequencies, and see
        how changing your monthly contribution by even $50 alters your outcome
        over decades.
      </p>
    </BlogLayout>
  );
}
