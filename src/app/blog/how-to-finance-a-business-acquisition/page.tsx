import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogLayout from "@/components/BlogLayout";
import Link from "next/link";

const post = blogPosts.find(
  (p) => p.slug === "how-to-finance-a-business-acquisition"
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
        Building a business from scratch takes years. Buying one that already
        generates cash flow can get you there in months. For aspiring small
        business owners eyeing the $500K&ndash;$2M range, acquisition is
        increasingly the faster path &mdash; and SBA loans have made it more
        accessible than most people realize. But the math has to work. This
        guide walks you through how businesses are valued, how acquisition
        financing is structured, and the metrics lenders and savvy buyers use
        to decide whether a deal makes sense.
      </p>

      <h2>Buying vs. Building: Why Acquisition Can Win</h2>
      <p>
        Starting a business means zero revenue on day one, months (or years)
        of losses, and the brutal uncertainty of whether your concept will even
        find customers. Buying an established business flips that equation: you
        acquire existing customers, trained staff, proven systems, and
        &mdash; most importantly &mdash; a track record of cash flow.
      </p>
      <p>
        That track record is what makes bank financing possible. Lenders
        won&apos;t touch a startup with a ten-foot pole, but they&apos;ll
        eagerly finance the acquisition of a business with three years of clean
        books showing $250K in annual profit. The business&apos;s own cash flow
        services the debt. You pay a premium for that certainty, which is
        exactly what the valuation multiples below reflect &mdash; but in most
        cases, the premium is worth it.
      </p>
      <p>
        The sweet spot for first-time buyers is the $500K&ndash;$2M range.
        These are businesses large enough to support a full-time owner-operator
        salary plus debt service, but small enough to fly under the radar of
        private equity. Competition is lower, seller financing is common, and
        SBA 7(a) loans were practically designed for this market.
      </p>

      <h2>How Small Businesses Are Valued: SDE Multiples</h2>
      <p>
        Most small businesses are valued as a multiple of{" "}
        <strong>Seller&apos;s Discretionary Earnings (SDE)</strong> &mdash; not
        revenue, not EBITDA, but a number that represents the total financial
        benefit flowing to a single owner-operator. SDE starts with net profit
        and adds back:
      </p>
      <ul>
        <li>The owner&apos;s salary and any personal benefits run through the business</li>
        <li>Depreciation and amortization</li>
        <li>Interest expense</li>
        <li>One-time or non-recurring expenses (e.g., a one-time legal settlement)</li>
        <li>Non-cash expenses</li>
      </ul>
      <p>
        The resulting number is what a new owner-operator could reasonably
        expect to pocket (before debt service) if they replaced the seller.
        A business with $300K SDE and a 3x multiple has an asking price of
        $900K. The multiple reflects risk, growth trajectory, owner
        dependence, and industry dynamics.
      </p>
      <table>
        <thead>
          <tr>
            <th>Business Type</th>
            <th>Typical SDE Multiple</th>
            <th>Key Drivers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Service business (landscaping, cleaning, HVAC)</td>
            <td>2.0&ndash;3.0x</td>
            <td>Recurring contracts, owner independence</td>
          </tr>
          <tr>
            <td>SaaS / software</td>
            <td>4.0&ndash;6.0x</td>
            <td>Recurring revenue, low churn, scalability</td>
          </tr>
          <tr>
            <td>Retail (brick-and-mortar)</td>
            <td>1.5&ndash;2.5x</td>
            <td>Lease terms, inventory risk, foot traffic trends</td>
          </tr>
          <tr>
            <td>Restaurant / food service</td>
            <td>1.5&ndash;2.0x</td>
            <td>Location, lease, staff retention, margins</td>
          </tr>
          <tr>
            <td>E-commerce</td>
            <td>2.5&ndash;4.0x</td>
            <td>SKU concentration, platform risk, brand moat</td>
          </tr>
          <tr>
            <td>Professional services (accounting, dental)</td>
            <td>1.0&ndash;2.5x</td>
            <td>Client transferability, referral dependence</td>
          </tr>
        </tbody>
      </table>
      <p>
        Multiples are negotiable and vary by deal size &mdash; a $200K SDE
        business might trade at 2.5x while a $1M SDE business in the same
        industry commands 3.5x, simply because larger businesses attract more
        buyers and carry less concentration risk.
      </p>

      <h2>SBA 7(a) Loans: The Acquisition Buyer&apos;s Best Friend</h2>
      <p>
        The <strong>SBA 7(a) loan program</strong> is the dominant financing
        vehicle for small business acquisitions in the United States. Here are
        the key terms:
      </p>
      <ul>
        <li><strong>Maximum loan amount:</strong> $5 million</li>
        <li><strong>Term:</strong> Up to 10 years for business acquisitions (25 years for real estate)</li>
        <li>
          <strong>Interest rate:</strong> Variable, typically Prime + 2.75%
          (as of early 2026, Prime is 7.5%, making the all-in rate around 10.25%)
        </li>
        <li><strong>Down payment:</strong> Typically 10% of the purchase price</li>
        <li><strong>SBA guarantee fee:</strong> 0.5&ndash;3.5% of the guaranteed portion, financed into the loan</li>
        <li><strong>Collateral:</strong> Business assets; personal guarantee required; home may be required if equity is available</li>
      </ul>
      <p>
        The 10% down payment is the headline feature. For a $750K acquisition,
        you need $75K in equity &mdash; not $150&ndash;300K like a conventional
        commercial loan might require. That leverage is what makes the cash-on-cash
        returns so attractive (more on that below).
      </p>
      <p>
        <strong>Seller financing</strong> is a common and lender-approved
        complement to SBA loans. The seller holds a subordinated note for
        10&ndash;20% of the purchase price, which can sometimes substitute for
        part of the buyer&apos;s down payment (with lender approval). Sellers
        are often willing to carry a note because it signals their confidence
        in the business &mdash; and because they get a better price than a
        distressed all-cash sale. A typical structure: 80% SBA loan, 10%
        seller note, 10% buyer equity.
      </p>

      <h2>DSCR: The Number That Makes or Breaks Your Loan</h2>
      <p>
        Before any SBA lender approves your acquisition loan, they will
        calculate the <strong>Debt Service Coverage Ratio (DSCR)</strong>.
        This single metric determines whether the deal is financeable.
      </p>
      <p>
        <strong>DSCR = Net Operating Income &divide; Annual Debt Service</strong>
      </p>
      <p>
        Most SBA lenders require a minimum DSCR of <strong>1.25x</strong>,
        meaning the business must generate $1.25 in operating income for every
        $1.00 of annual loan payments. A DSCR below 1.0 means the business
        cannot service its own debt &mdash; a deal-killer. Lenders prefer
        1.35x or higher; anything above 1.5x is considered strong.
      </p>
      <p>
        Here&apos;s a full worked example for a $750K acquisition:
      </p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Value</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Business SDE</td>
            <td>$250,000</td>
            <td>3x multiple &rarr; $750K asking price</td>
          </tr>
          <tr>
            <td>Less: owner salary (replacement)</td>
            <td>&ndash;$80,000</td>
            <td>Market rate for an owner-operator</td>
          </tr>
          <tr>
            <td>Net Operating Income (NOI)</td>
            <td>$170,000</td>
            <td>SDE minus owner salary</td>
          </tr>
          <tr>
            <td>Loan amount (90% of $750K)</td>
            <td>$675,000</td>
            <td>10% down = $75K buyer equity</td>
          </tr>
          <tr>
            <td>Annual debt service (10 yr, ~10.25%)</td>
            <td>~$107,400</td>
            <td>Monthly payment ~$8,950</td>
          </tr>
          <tr>
            <td>DSCR</td>
            <td><strong>1.58x</strong></td>
            <td>$170K &divide; $107.4K &mdash; strong approval likely</td>
          </tr>
          <tr>
            <td>Annual cash flow after debt service</td>
            <td>$62,600</td>
            <td>NOI minus annual debt service</td>
          </tr>
        </tbody>
      </table>
      <p>
        This deal passes comfortably. Now change the assumptions: same business,
        but the buyer&apos;s lender requires a $100K owner salary, reducing NOI
        to $150K. DSCR drops to 1.40x &mdash; still approvable but tighter.
        Push the rate to 11% and DSCR falls to 1.30x &mdash; you&apos;re right
        at the edge. This sensitivity is why running the numbers carefully before
        making an offer matters so much.
      </p>

      <h2>Cash-on-Cash Return: What Investors Should Target</h2>
      <p>
        DSCR tells you whether the bank will lend. Cash-on-cash return tells
        you whether the deal is worth your equity capital.
      </p>
      <p>
        <strong>Cash-on-Cash Return = Annual Cash Flow After Debt Service &divide; Total Equity Invested</strong>
      </p>
      <p>
        Using the example above: $62,600 annual cash flow &divide; $75,000
        equity invested = <strong>83% cash-on-cash return</strong> in year one.
        That&apos;s exceptional, and it&apos;s driven by the high leverage the
        SBA program enables. Even more conservative scenarios &mdash; a higher
        owner salary, a slower business &mdash; regularly produce 20&ndash;40%
        cash-on-cash returns.
      </p>
      <p>
        For context: high-quality rental real estate typically yields 5&ndash;10%
        cash-on-cash. The S&amp;P 500 averages roughly 10% annually over long
        periods. Small business acquisition, done right, can dramatically
        outperform both &mdash; though with correspondingly higher operational
        risk and time commitment.
      </p>
      <p>
        A reasonable target for most acquisition buyers is <strong>15&ndash;25%+ cash-on-cash</strong> in
        year one. Below 15%, you may be overpaying or taking on a business
        with thin margins. Above 30%, you either found an exceptional deal or
        you&apos;re underestimating the owner&apos;s role in running it.
      </p>

      <h2>Red Flags to Watch When Buying a Business</h2>
      <p>
        The financials are only part of the story. Experienced acquisition buyers
        learn to spot the patterns that turn a promising deal into a nightmare
        after close.
      </p>
      <ul>
        <li>
          <strong>Owner-dependent revenue.</strong> If the business&apos;s
          best customers buy because of their personal relationship with the
          current owner, those customers may walk when the owner does. Ask how
          many of the top 10 customers know the owner personally, and how long
          they&apos;ve been with the business.
        </li>
        <li>
          <strong>Customer concentration.</strong> If a single customer
          represents more than 20&ndash;25% of revenue, you have a
          concentration risk. Losing that one customer could blow up your DSCR
          and your livelihood simultaneously.
        </li>
        <li>
          <strong>Declining margins.</strong> Three years of tax returns tells
          you more than any listing description. If revenue is flat but margins
          are shrinking, something structural is wrong &mdash; competition,
          pricing power, cost creep &mdash; and it will get worse after you buy.
        </li>
        <li>
          <strong>Unverifiable cash revenue.</strong> A business that claims
          significant cash sales with no paper trail is a due diligence
          nightmare. Lenders can only underwrite what&apos;s on the tax
          returns. If the seller says &ldquo;the real numbers are higher,&rdquo;
          the real numbers are what&apos;s documented.
        </li>
        <li>
          <strong>Lease risk.</strong> For location-dependent businesses
          (retail, restaurants, service territories), confirm the lease
          assignment terms before going far in diligence. A landlord who
          won&apos;t assign the lease on reasonable terms &mdash; or a lease
          expiring in 18 months &mdash; can crater an otherwise solid deal.
        </li>
        <li>
          <strong>Deferred maintenance and capex.</strong> Sellers often
          reduce maintenance spending in the years before a sale to boost SDE.
          Factor replacement costs for equipment, vehicles, or systems into
          your offer price.
        </li>
      </ul>

      <h2>Run the Numbers</h2>
      <p>
        Every acquisition is different. The same $250K SDE business can be a
        great deal at one purchase price and a terrible one at another &mdash;
        depending on financing terms, your required owner salary, and what
        cash-on-cash return you need to justify the risk.
      </p>
      <p>
        Use our{" "}
        <Link href="/business-acquisition-calculator">
          Business Acquisition Calculator
        </Link>{" "}
        to model your specific deal: plug in the asking price, SDE, loan terms,
        and your equity contribution to instantly see your projected DSCR,
        annual cash flow, and cash-on-cash return. You can also run our{" "}
        <Link href="/roi-calculator">ROI Calculator</Link> to compare the
        return on a business acquisition against other uses of your capital.
        The numbers won&apos;t make the decision for you &mdash; but they
        will tell you whether the deal deserves a closer look.
      </p>
    </BlogLayout>
  );
}
