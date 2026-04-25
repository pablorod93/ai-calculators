import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find((p) => p.slug === "how-to-calculate-roi")!;

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
        Return on investment is one of the most-used phrases in business and
        personal finance &mdash; and one of the most frequently misapplied.
        Calculating a raw ROI percentage is straightforward. Calculating it in
        a way that actually lets you compare two investments is where most
        people go wrong. This guide covers the formula, the annualized version
        that makes comparisons meaningful, the mistakes that lead to bad
        decisions, and what a &ldquo;good&rdquo; ROI looks like across
        different asset classes.
      </p>

      <h2>The ROI formula</h2>
      <p>
        Simple ROI measures how much you gained relative to what you put in:
      </p>
      <pre>ROI = (Net Profit &divide; Cost) &times; 100</pre>
      <p>Breaking down each term:</p>
      <ul>
        <li>
          <strong>Net Profit</strong> &mdash; the total gain from the
          investment minus what you originally paid. If you bought a stock for
          $5,000 and sold it for $7,200, your net profit is $2,200.
        </li>
        <li>
          <strong>Cost</strong> &mdash; the total amount you invested,
          including any fees, commissions, or additional capital put in along
          the way. Using the full cost, not just the initial outlay, is
          essential for accuracy.
        </li>
      </ul>
      <p>
        So in the example above: ROI = ($2,200 &divide; $5,000) &times; 100 ={" "}
        <strong>44%</strong>. On the surface that sounds excellent &mdash; but
        it tells you nothing about how long you held the investment or whether
        you could have done better elsewhere. That&apos;s what annualized ROI
        is for.
      </p>

      <h2>Annualized ROI and CAGR: why time changes everything</h2>
      <p>
        A 44% return is very different depending on whether it took 2 years or
        10 years to achieve. To compare investments on equal footing, you need
        to convert to an annualized rate. The formula is:
      </p>
      <pre>Annualized ROI = (Final Value &divide; Initial Value)^(1 &divide; years) &minus; 1</pre>
      <p>
        This is also called <strong>CAGR</strong> &mdash; Compound Annual
        Growth Rate. It answers: &ldquo;If my investment grew at a constant
        rate each year, what rate would produce this total return?&rdquo;
      </p>
      <p>
        Using the same $5,000 investment that grew to $7,200:
      </p>
      <ul>
        <li>
          Over <strong>2 years</strong>: (7,200 &divide; 5,000)^(1&divide;2)
          &minus; 1 = <strong>19.9% per year</strong>
        </li>
        <li>
          Over <strong>5 years</strong>: (7,200 &divide; 5,000)^(1&divide;5)
          &minus; 1 = <strong>7.6% per year</strong>
        </li>
        <li>
          Over <strong>10 years</strong>: (7,200 &divide; 5,000)^(1&divide;10)
          &minus; 1 = <strong>3.7% per year</strong>
        </li>
      </ul>
      <p>
        Same 44% total return. Three completely different investment
        performances. Without annualizing, you&apos;re comparing apples to
        bicycles.
      </p>

      <h2>The time trap: same simple ROI, very different reality</h2>
      <p>
        Here is a concrete example of why simple ROI misleads. Three
        investments all show a 60% total return. Which one is best?
      </p>
      <table>
        <thead>
          <tr>
            <th>Investment</th>
            <th>Initial value</th>
            <th>Final value</th>
            <th>Simple ROI</th>
            <th>Holding period</th>
            <th>Annualized ROI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rental property</td>
            <td>$100,000</td>
            <td>$160,000</td>
            <td>60%</td>
            <td>10 years</td>
            <td>4.8%/yr</td>
          </tr>
          <tr>
            <td>Stock portfolio</td>
            <td>$100,000</td>
            <td>$160,000</td>
            <td>60%</td>
            <td>5 years</td>
            <td>9.9%/yr</td>
          </tr>
          <tr>
            <td>Small business</td>
            <td>$100,000</td>
            <td>$160,000</td>
            <td>60%</td>
            <td>3 years</td>
            <td>16.96%/yr</td>
          </tr>
        </tbody>
      </table>
      <p>
        Simple ROI says all three are equal. Annualized ROI reveals that the
        small business investment outperformed the stock portfolio by 7
        percentage points per year &mdash; a dramatic difference that
        compounds significantly over time. The rental property, stretched over
        a decade, barely kept pace with a high-yield savings account. The
        total return headline obscured three very different outcomes.
      </p>

      <h2>What counts as a good ROI by asset class</h2>
      <p>
        &ldquo;Good&rdquo; ROI is always relative to the risk taken and the
        alternatives available. A 5% annual return is excellent for a
        government bond but disappointing for a venture investment that could
        have gone to zero. Here are widely cited benchmarks for common asset
        classes:
      </p>
      <table>
        <thead>
          <tr>
            <th>Asset class</th>
            <th>Typical annualized ROI</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S&amp;P 500 (stocks)</td>
            <td>~10% (7% inflation-adjusted)</td>
            <td>Long-run historical average; significant year-to-year volatility</td>
          </tr>
          <tr>
            <td>Real estate</td>
            <td>8&ndash;12%</td>
            <td>Includes rental income and appreciation; excludes leverage effects</td>
          </tr>
          <tr>
            <td>High-yield savings / CDs</td>
            <td>4&ndash;5%</td>
            <td>As of mid-2020s rate environment; near-zero risk</td>
          </tr>
          <tr>
            <td>Small business</td>
            <td>15&ndash;30%+</td>
            <td>Higher potential return, much higher risk and time commitment</td>
          </tr>
          <tr>
            <td>Bonds (investment grade)</td>
            <td>3&ndash;5%</td>
            <td>Lower risk, predictable income; rate-sensitive</td>
          </tr>
        </tbody>
      </table>
      <p>
        The key principle: higher expected returns come bundled with higher
        risk, more illiquidity, or more active management. An 8% annual return
        from a passive index fund and an 8% return from a rental property
        requiring 5 hours a week of your time are not the same thing. Your
        time is a cost, even if the formula doesn&apos;t automatically include
        it.
      </p>

      <h2>Common ROI mistakes that lead to bad decisions</h2>
      <p>
        Even people who know the formula regularly make these errors:
      </p>
      <ul>
        <li>
          <strong>Ignoring time.</strong> Comparing a 3-year investment to a
          10-year investment using simple ROI is meaningless. Always annualize
          before comparing.
        </li>
        <li>
          <strong>Ignoring opportunity cost.</strong> An investment that
          returns 6% per year is not great if you could have earned 10% in an
          index fund with less risk. ROI should always be benchmarked against
          a realistic alternative &mdash; what would that capital have earned
          elsewhere?
        </li>
        <li>
          <strong>Forgetting all costs.</strong> Transaction fees, taxes on
          gains, maintenance costs on real estate, time spent managing an
          investment &mdash; all of these reduce net profit and therefore
          reduce true ROI. A rental property with a 9% gross ROI might be a
          5% net ROI after vacancy, repairs, management fees, and taxes.
        </li>
        <li>
          <strong>Using total return for multi-year comparisons.</strong> As
          the table above showed, quoting a raw percentage without specifying
          the time period is actively misleading when comparing investments of
          different durations.
        </li>
        <li>
          <strong>Counting unrealized gains as returns.</strong> A stock that
          is up 80% on paper hasn&apos;t returned 80% until you sell it and
          account for the tax liability. Paper gains can disappear; taxed,
          realized gains cannot.
        </li>
      </ul>

      <h2>Run the numbers</h2>
      <p>
        Whether you&apos;re evaluating a stock, a rental property, a business
        acquisition, or a marketing campaign, the math is the same &mdash;
        but the inputs vary. Our{" "}
        <Link href="/roi-calculator">ROI Calculator</Link> handles both simple
        ROI and annualized ROI automatically. Plug in your initial investment,
        final value, and holding period, and it will tell you both the raw
        percentage return and the annualized rate you can use to compare
        against any benchmark or alternative investment.
      </p>
    </BlogLayout>
  );
}
