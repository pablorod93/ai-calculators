import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find(
  (p) => p.slug === "when-to-refinance-your-mortgage"
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
        Refinancing can save you tens of thousands of dollars &mdash; or cost you
        more than you expect. Here&apos;s how to tell the difference.
      </p>

      <h2>What is mortgage refinancing?</h2>
      <p>
        Refinancing means replacing your existing mortgage with a new one &mdash;
        ideally at a lower interest rate, a shorter term, or both. You apply for
        a new loan, use it to pay off the old one, and start making payments on
        the new loan instead.
      </p>
      <p>
        There are two main types: <strong>rate-and-term refinancing</strong> (you
        change the rate, the term, or both, but the loan amount stays the same)
        and <strong>cash-out refinancing</strong> (you borrow more than you owe
        and pocket the difference as cash).
      </p>

      <h2>The 1% rule (and when to ignore it)</h2>
      <p>
        The most common rule of thumb: <strong>refinance if you can drop your
        rate by at least 1 percentage point.</strong> Going from 6.5% to 5.5%?
        The 1% rule says go for it.
      </p>
      <p>
        But the 1% rule is a rough guideline, not a universal law:
      </p>
      <ul>
        <li>
          <strong>Large balances amplify small rate drops.</strong> On a $500,000
          loan, even a 0.5% rate reduction saves ~$160/month. On a $150,000 loan,
          a 1% drop only saves ~$90/month. The absolute dollar savings matter
          more than the percentage.
        </li>
        <li>
          <strong>High closing costs raise the bar.</strong> If your lender
          charges $10,000 in closing costs, you need larger savings to break
          even. A 1% rate drop might not be enough.
        </li>
        <li>
          <strong>Short remaining terms lower the payoff.</strong> If you have 8
          years left on your current mortgage, a rate drop saves less total
          interest because there&apos;s less time for savings to accumulate.
        </li>
      </ul>
      <p>
        Bottom line: the 1% rule is a decent starting point, but the real
        question is breakeven.
      </p>

      <h2>Breakeven analysis: the number that actually matters</h2>
      <p>
        Refinancing isn&apos;t free. Closing costs typically run 2&ndash;5% of
        the loan amount &mdash; on a $280,000 loan, that&apos;s $5,600 to
        $14,000. The breakeven point tells you when your monthly savings pay
        back those costs.
      </p>
      <pre>Breakeven = Closing Costs &divide; Monthly Savings</pre>
      <p>
        Example: $6,000 closing costs &divide; $200/month savings = 30 months
        (2.5 years).
      </p>
      <p>
        <strong>If your breakeven point is under 3 years, refinancing is almost
        always worth it</strong> (assuming you plan to stay in the home at least
        that long). Under 5 years is still solid. Over 5 years gets risky
        &mdash; a lot can change.
      </p>
      <p>
        The critical question people forget: <strong>how long do you plan to
        stay in this home?</strong> If your breakeven is 36 months but
        you&apos;re likely to move in 24 months, refinancing loses money.
      </p>

      <h2>The hidden cost of extending your term</h2>
      <p>
        This is the most common refinancing mistake. You have 22 years left on a
        30-year mortgage, and you refinance into a <em>new</em> 30-year
        mortgage. Your monthly payment drops dramatically &mdash; but you just
        added 8 years of interest payments.
      </p>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Monthly</th>
            <th>Total Interest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current: $280K at 6.5%, 22 yrs left</td>
            <td>$2,095</td>
            <td>$273,080</td>
          </tr>
          <tr>
            <td>Refinance: $280K at 5.5%, 22 yrs</td>
            <td>$1,901</td>
            <td>$221,864</td>
          </tr>
          <tr>
            <td>Refinance: $280K at 5.5%, <strong>30 yrs</strong></td>
            <td>$1,590</td>
            <td>$292,294</td>
          </tr>
        </tbody>
      </table>
      <p>
        The 30-year refinance saves $505/month &mdash; but costs $19,000{" "}
        <em>more</em> in total interest than staying put. The 22-year refinance
        saves less per month ($194) but actually saves $51,000 in total interest.
      </p>
      <p>
        <strong>If you refinance into a longer term, know that you&apos;re
        trading lower payments today for higher total cost.</strong> That
        trade-off can make sense (cash flow matters), but go in with eyes open.
      </p>

      <h2>When refinancing makes sense</h2>
      <p>
        Refinancing is likely a good move if most of these are true:
      </p>
      <ul>
        <li>Your rate drops by 0.75&ndash;1%+ (or more than $100/month in absolute savings)</li>
        <li>Your breakeven is under 3&ndash;5 years</li>
        <li>You plan to stay in the home well past the breakeven point</li>
        <li>Your credit score has improved since your original mortgage</li>
        <li>You want to switch from an adjustable-rate mortgage (ARM) to a fixed rate</li>
      </ul>

      <h2>When refinancing does NOT make sense</h2>
      <ul>
        <li><strong>You&apos;re close to paying off the loan.</strong> With 5&ndash;7 years left, most of your payment is principal. A rate drop saves little total interest.</li>
        <li><strong>The breakeven exceeds your time in the home.</strong> Moving in 3 years? Don&apos;t refinance if breakeven is 4.</li>
        <li><strong>Closing costs are unusually high.</strong> Shop around &mdash; costs vary widely between lenders. Get quotes from at least 3.</li>
        <li><strong>Your credit score has dropped.</strong> You may not qualify for a rate that makes refinancing worthwhile.</li>
      </ul>

      <h2>Cash-out refinancing: proceed with caution</h2>
      <p>
        Cash-out refinancing lets you tap your home equity &mdash; borrow more
        than you owe and receive the difference as cash. Common uses include home
        renovations, consolidating high-interest debt, or covering a major
        expense.
      </p>
      <p>
        It can be smart when the alternative is worse debt. Consolidating a 22%
        credit card into a 5.5% mortgage saves real money. But you&apos;re
        converting unsecured debt into debt secured by your home &mdash; if you
        can&apos;t make payments, you risk foreclosure.
      </p>
      <p>
        <strong>The danger zone:</strong> using cash-out refinancing for
        lifestyle spending (vacations, cars, consumer goods). You&apos;re
        borrowing against your future self for consumption today. The math
        almost never works out.
      </p>

      <h2>Quick-reference decision checklist</h2>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Rate drop &ge; 0.75&ndash;1%</td><td>Strong signal</td></tr>
          <tr><td>Breakeven under 3 years</td><td>Almost always worth it</td></tr>
          <tr><td>Breakeven 3&ndash;5 years</td><td>Worth it if staying</td></tr>
          <tr><td>Breakeven over 5 years</td><td>Think carefully</td></tr>
          <tr><td>Extending term significantly</td><td>Check total interest</td></tr>
          <tr><td>Cash-out for debt consolidation</td><td>Compare rates carefully</td></tr>
          <tr><td>Cash-out for lifestyle spending</td><td>Avoid</td></tr>
        </tbody>
      </table>

      <h2>Run the numbers yourself</h2>
      <p>
        Every situation is different. The best way to know if refinancing makes
        sense for <em>your</em> mortgage is to plug in your actual numbers and
        see the breakeven point, monthly savings, and total interest comparison.
        Use our{" "}
        <Link href="/mortgage-refinance-calculator">
          Mortgage Refinance Calculator
        </Link>{" "}
        to compare your current loan against a refinanced one, or the{" "}
        <Link href="/mortgage-calculator">Mortgage Calculator</Link> to
        estimate payments on a new home purchase.
      </p>
    </BlogLayout>
  );
}
