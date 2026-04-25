import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find(
  (p) => p.slug === "loan-amortization-schedule-explained"
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
        You just signed a 30-year mortgage and made your first payment. You paid
        $1,580 &mdash; and only $271 of it went toward what you actually owe.
        The other $1,309 went straight to the bank as interest. That&apos;s not
        a mistake or a scam. It&apos;s amortization, and understanding it can
        save you tens of thousands of dollars.
      </p>

      <h2>What is amortization and why does it matter?</h2>
      <p>
        Amortization is the process of paying off a debt through regular
        installments over time. Each payment covers two things: interest on the
        outstanding balance, and a reduction of the principal (the actual amount
        you borrowed). The total monthly payment stays fixed throughout the
        loan &mdash; but what that payment is <em>doing</em> changes
        dramatically over time.
      </p>
      <p>
        Early in the loan, most of your payment covers interest because you owe
        a large balance and interest is calculated on what you still owe. As you
        pay down the principal, the interest portion shrinks and the principal
        portion grows. By the end of the loan, almost every dollar goes to
        principal.
      </p>
      <p>
        Why does this matter? Because the total interest you pay over 30 years
        can easily exceed the original loan amount. On a $250,000 mortgage at
        6.5%, you&apos;ll pay roughly $318,000 in interest over 30 years &mdash;
        more than the home itself. Knowing this motivates the strategies covered
        below.
      </p>

      <h2>Reading an amortization schedule: first 5 years</h2>
      <p>
        An amortization schedule is a table that breaks down every payment for
        the life of the loan. Here&apos;s a year-by-year summary for a
        $250,000 loan at 6.5% for 30 years (monthly payment: $1,580.17):
      </p>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Annual payment</th>
            <th>Principal paid</th>
            <th>Interest paid</th>
            <th>Remaining balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>$18,962</td>
            <td>$3,253</td>
            <td>$15,709</td>
            <td>$246,747</td>
          </tr>
          <tr>
            <td>2</td>
            <td>$18,962</td>
            <td>$3,470</td>
            <td>$15,492</td>
            <td>$243,277</td>
          </tr>
          <tr>
            <td>3</td>
            <td>$18,962</td>
            <td>$3,701</td>
            <td>$15,261</td>
            <td>$239,576</td>
          </tr>
          <tr>
            <td>4</td>
            <td>$18,962</td>
            <td>$3,947</td>
            <td>$15,015</td>
            <td>$235,629</td>
          </tr>
          <tr>
            <td>5</td>
            <td>$18,962</td>
            <td>$4,210</td>
            <td>$14,752</td>
            <td>$231,419</td>
          </tr>
        </tbody>
      </table>
      <p>
        After five years of payments &mdash; $94,810 paid in total &mdash; you
        still owe $231,419. You&apos;ve paid down less than 7.5% of your
        original balance. Most of your money has gone to the bank, not to
        building equity.
      </p>

      <h2>The front-loading problem: why your early payments are mostly interest</h2>
      <p>
        This isn&apos;t arbitrary &mdash; it&apos;s math. Interest is calculated
        as a percentage of your <em>outstanding balance</em>. In month one of
        the loan above:
      </p>
      <pre>Interest = $250,000 &times; (6.5% &divide; 12) = $1,354.17</pre>
      <p>
        Your payment is $1,580.17, so principal reduction is only $226 in the
        very first month. That $226 reduces the balance to $249,774 &mdash; a
        tiny drop. In month two, interest is slightly lower ($1,352.95), and
        principal paydown is slightly higher ($227.22). The progress accelerates,
        but it takes years to become noticeable.
      </p>
      <p>
        In year 1, roughly <strong>83% of every payment is interest</strong> and
        only 17% reduces principal. By year 25, that ratio has flipped: about
        75% of each payment goes to principal. The loan is finally working for
        you &mdash; but only in its final years.
      </p>
      <p>
        This front-loading is why refinancing into a new 30-year loan can be a
        trap even at a lower rate &mdash; you reset the clock and start the
        interest-heavy years all over again. It&apos;s also why extra payments
        made early have an outsized effect.
      </p>

      <h2>How extra payments accelerate payoff</h2>
      <p>
        Any payment above your minimum goes directly to principal. That&apos;s
        important: it doesn&apos;t just reduce next month&apos;s balance by that
        amount &mdash; it eliminates all the future interest that would have
        accrued on that principal for the remainder of the loan. Each extra
        dollar paid today cancels multiple future dollars of interest.
      </p>
      <p>
        On the $250,000 / 6.5% / 30-year loan, adding just $100 per month
        in extra principal payments produces remarkable results:
      </p>
      <ul>
        <li>
          <strong>Payoff timeline:</strong> Reduced from 30 years to approximately
          25 years and 8 months &mdash; saving you over 4 years of payments.
        </li>
        <li>
          <strong>Interest saved:</strong> Approximately $56,000 in total interest
          eliminated over the life of the loan.
        </li>
        <li>
          <strong>Total extra cost:</strong> About $30,800 in additional payments
          ($100 &times; 308 months) to save $56,000 in interest.
        </li>
      </ul>
      <p>
        That&apos;s a nearly 2-to-1 return on every extra dollar &mdash; guaranteed,
        risk-free, and equal to your loan&apos;s interest rate. If your mortgage
        is at 6.5%, paying extra principal gives you a 6.5% guaranteed return,
        which is hard to beat in a low-risk investment.
      </p>
      <p>
        Before making extra payments, confirm your lender applies them to
        principal immediately (most do, but specify &ldquo;apply to
        principal&rdquo; to be safe) and that there&apos;s no prepayment
        penalty.
      </p>

      <h2>The biweekly payment strategy</h2>
      <p>
        Instead of making one monthly payment, you split it in half and pay every
        two weeks. Since there are 52 weeks in a year, biweekly payments result
        in 26 half-payments &mdash; equivalent to <strong>13 full monthly
        payments</strong> instead of 12. That one extra payment per year goes
        entirely to principal.
      </p>
      <p>
        On the $250,000 / 6.5% / 30-year loan, switching to biweekly payments:
      </p>
      <ul>
        <li>Saves approximately 4&ndash;5 years of payments</li>
        <li>Eliminates roughly $50,000&ndash;$60,000 in total interest</li>
        <li>Requires no change in lifestyle &mdash; just the payment cadence</li>
      </ul>
      <p>
        The biweekly strategy is particularly effective because it aligns with
        how most people get paid (every two weeks), making it easier to budget.
        Some lenders offer formal biweekly programs; others let you simply make
        13 full payments per year &mdash; the math is identical.
      </p>
      <p>
        One caution: some banks charge fees for biweekly programs or hold your
        payment until month-end, defeating the purpose. If your lender charges
        for biweekly setup, just make one extra full payment per year in January
        instead.
      </p>

      <h2>Amortization in other loan types</h2>
      <p>
        Mortgages get the most attention, but amortization applies to any
        installment loan:
      </p>
      <ul>
        <li>
          <strong>Auto loans</strong> (typically 4&ndash;7 years): Front-loading
          is less severe because terms are shorter, but early payoff still saves
          meaningful interest on higher-balance loans.
        </li>
        <li>
          <strong>Student loans</strong>: Income-driven repayment plans can result
          in payments that don&apos;t cover accruing interest, causing
          &ldquo;negative amortization&rdquo; where balances grow despite
          payments.
        </li>
        <li>
          <strong>Personal loans</strong>: Often 2&ndash;5 years; the front-loading
          effect exists but is much smaller. Extra payments still help if the
          rate is high.
        </li>
      </ul>
      <p>
        The principle is universal: the longer the loan and the higher the rate,
        the more front-loading distorts the principal-to-interest ratio in early
        years, and the more an extra payment saves.
      </p>

      <h2>Run the numbers</h2>
      <p>
        The specific impact of extra payments, biweekly schedules, or different
        loan terms on your exact situation requires your actual numbers. Use our{" "}
        <Link href="/loan-amortization-calculator">
          Loan Amortization Calculator
        </Link>{" "}
        to generate your full amortization schedule, see the principal vs.
        interest breakdown for any payment, and model what adding $50, $100, or
        $500/month in extra payments does to your payoff date and total interest.
        If you&apos;re evaluating a home purchase, the{" "}
        <Link href="/mortgage-calculator">Mortgage Calculator</Link> can help
        you compare loan amounts and rates before you commit.
      </p>
    </BlogLayout>
  );
}
