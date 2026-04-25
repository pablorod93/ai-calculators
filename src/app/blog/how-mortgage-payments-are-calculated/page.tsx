import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find(
  (p) => p.slug === "how-mortgage-payments-are-calculated"
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
        Most people know their mortgage payment as a number that shows up in
        their bank account every month. Fewer know how that number is actually
        calculated &mdash; or why a small change in interest rate or down
        payment can shift it by hundreds of dollars. Here&apos;s the full
        picture, from the core formula to the hidden line items that catch
        buyers off guard.
      </p>

      <h2>The mortgage payment formula</h2>
      <p>
        The monthly principal and interest payment on a fixed-rate mortgage is
        determined by one formula:
      </p>
      <pre>M = P &times; [r(1+r)&sup2;&sup3;] &divide; [(1+r)&sup2;&sup3; &minus; 1]</pre>
      <p>Each variable has a plain-English meaning:</p>
      <ul>
        <li>
          <strong>M</strong> &mdash; the monthly payment you&apos;re solving for
        </li>
        <li>
          <strong>P</strong> &mdash; the principal, meaning the loan amount
          (home price minus your down payment)
        </li>
        <li>
          <strong>r</strong> &mdash; the monthly interest rate, which is your
          annual rate divided by 12. A 6.5% annual rate becomes 0.065 &divide;
          12 = 0.005417 per month.
        </li>
        <li>
          <strong>n</strong> &mdash; the total number of monthly payments. A
          30-year mortgage has 360; a 15-year has 180.
        </li>
      </ul>
      <p>
        The formula produces a fixed payment that covers the interest owed each
        month and chips away at the principal, so the loan reaches exactly zero
        at payment number <em>n</em>. In the early years, most of each payment
        goes to interest. By the final years, almost all of it reduces the
        principal &mdash; this gradual shift is called <strong>amortization</strong>.
      </p>
      <p>
        As a concrete example: a $280,000 loan at 6.5% for 30 years gives
        r&nbsp;=&nbsp;0.005417 and n&nbsp;=&nbsp;360. Plugging those into the
        formula produces a monthly principal-and-interest payment of
        roughly <strong>$1,770</strong>.
      </p>

      <h2>PITI: the four pieces of a real mortgage payment</h2>
      <p>
        The formula above gives you principal and interest (P&amp;I) only.
        Your actual monthly obligation is almost always higher because lenders
        collect two additional items through an escrow account:
      </p>
      <ul>
        <li>
          <strong>Principal (P)</strong> &mdash; the portion of your payment
          that reduces what you owe on the loan.
        </li>
        <li>
          <strong>Interest (I)</strong> &mdash; the cost of borrowing, paid to
          the lender. This is front-loaded: in month one of a 30-year
          mortgage, roughly 80&ndash;85% of your payment is interest.
        </li>
        <li>
          <strong>Taxes (T)</strong> &mdash; your annual property tax bill
          divided by 12. On a $350,000 home in a county with a 1.2% tax rate,
          that&apos;s $350 per month added to your payment.
        </li>
        <li>
          <strong>Insurance (I)</strong> &mdash; homeowner&apos;s insurance,
          typically $100&ndash;$200 per month depending on the home and
          location.
        </li>
      </ul>
      <p>
        There is a fifth item that applies to many buyers:{" "}
        <strong>PMI</strong>, or private mortgage insurance. If your down
        payment is less than 20% of the home&apos;s purchase price, most
        conventional lenders require PMI to protect themselves in case you
        default. PMI typically costs 0.5&ndash;1.5% of the loan amount per
        year &mdash; on a $300,000 loan, that is $125&ndash;$375 per month.
        The good news: once you build 20% equity (through payments or
        appreciation), you can request PMI removal.
      </p>

      <h2>How your down payment changes everything</h2>
      <p>
        The down payment is the single biggest lever a buyer controls before
        signing. It affects three things simultaneously: the loan amount, the
        monthly payment, and whether you pay PMI. The table below shows a
        $350,000 home at 6.5% for 30 years with three different down payments.
        Property tax and insurance are assumed at $350 and $150 per month
        respectively; PMI is estimated at 0.85% of the loan per year.
      </p>
      <table>
        <thead>
          <tr>
            <th>Down payment</th>
            <th>Loan amount</th>
            <th>P&amp;I payment</th>
            <th>PMI</th>
            <th>Total PITI+PMI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5% ($17,500)</td>
            <td>$332,500</td>
            <td>$2,102</td>
            <td>$235/mo</td>
            <td>$2,837/mo</td>
          </tr>
          <tr>
            <td>10% ($35,000)</td>
            <td>$315,000</td>
            <td>$1,991</td>
            <td>$223/mo</td>
            <td>$2,714/mo</td>
          </tr>
          <tr>
            <td>20% ($70,000)</td>
            <td>$280,000</td>
            <td>$1,770</td>
            <td>None</td>
            <td>$2,270/mo</td>
          </tr>
        </tbody>
      </table>
      <p>
        Going from 5% to 20% down cuts the monthly payment by roughly
        $567 &mdash; about $6,800 per year. More than half of that gap comes
        from eliminating PMI alone, not from the smaller loan. This is why
        &ldquo;save to 20%&rdquo; is standard advice: it&apos;s not just a
        smaller balance, it&apos;s also the point where you stop paying for
        insurance that protects the lender, not you.
      </p>

      <h2>15-year vs. 30-year: the great trade-off</h2>
      <p>
        Choosing a loan term is choosing between a lower monthly payment (30
        years) and dramatically lower total interest paid (15 years). On a
        $300,000 loan at 6.5%, the numbers look like this:
      </p>
      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Monthly P&amp;I</th>
            <th>Total interest paid</th>
            <th>Total paid (principal + interest)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>30-year at 6.5%</td>
            <td>$1,896</td>
            <td>$382,560</td>
            <td>$682,560</td>
          </tr>
          <tr>
            <td>15-year at 6.5%</td>
            <td>$2,614</td>
            <td>$170,520</td>
            <td>$470,520</td>
          </tr>
        </tbody>
      </table>
      <p>
        The 15-year mortgage costs $718 more per month but saves over
        $212,000 in interest over the life of the loan. In addition, 15-year
        rates are typically 0.5&ndash;0.75% lower than 30-year rates, which
        widens the total-cost gap further.
      </p>
      <p>
        The 30-year is not irrational, though. The lower required payment
        gives you flexibility: you can always pay extra toward principal when
        cash is available, while keeping your contractual obligation low during
        tight months. Many financial planners argue that if your investment
        returns exceed your mortgage rate, putting extra cash into a brokerage
        account instead of mortgage principal can build more wealth over time.
      </p>

      <h2>How interest rate changes your total cost</h2>
      <p>
        A 1-percentage-point change in rate feels small on paper but
        compounds dramatically over 30 years. The table below shows a
        $300,000, 30-year mortgage at three common rate scenarios:
      </p>
      <table>
        <thead>
          <tr>
            <th>Interest rate</th>
            <th>Monthly P&amp;I</th>
            <th>Total interest paid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5.5%</td>
            <td>$1,703</td>
            <td>$313,080</td>
          </tr>
          <tr>
            <td>6.5%</td>
            <td>$1,896</td>
            <td>$382,560</td>
          </tr>
          <tr>
            <td>7.5%</td>
            <td>$2,098</td>
            <td>$455,280</td>
          </tr>
        </tbody>
      </table>
      <p>
        Moving from 5.5% to 7.5% costs an additional $395 per month and over
        $142,000 in extra interest over the life of the loan. This is why
        buyers are advised to shop multiple lenders: even a 0.25% rate
        difference on a $300,000 mortgage saves roughly $16,000 in total
        interest. Every eighth of a point matters.
      </p>
      <p>
        Credit score is the most direct lever most buyers have over their
        rate. Borrowers with scores above 760 routinely qualify for rates
        0.5&ndash;1% lower than those with scores in the 620&ndash;680 range.
        On a $300,000 loan, that half-point difference alone is worth more
        than $30,000 in interest over 30 years.
      </p>

      <h2>Run the numbers</h2>
      <p>
        The formula and tables above give you the concepts, but your actual
        numbers &mdash; your purchase price, your down payment, your local tax
        rate, your credit score &mdash; are what determine your real monthly
        payment. Use our{" "}
        <Link href="/mortgage-calculator">Mortgage Calculator</Link> to plug
        in your specifics and see an instant breakdown of principal, interest,
        taxes, insurance, and PMI, along with a full amortization schedule
        showing exactly how much of each payment goes where, month by month.
      </p>
    </BlogLayout>
  );
}
