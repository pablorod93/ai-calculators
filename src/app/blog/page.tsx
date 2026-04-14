import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, getCategoryLabel, getCategoryColor } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and analysis on AI costs, GPU pricing, fine-tuning, and more. Learn how to estimate and optimize your AI spending.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — AICalculators.org",
    description:
      "Guides and analysis on AI costs, GPU pricing, fine-tuning, and more.",
    url: "https://aicalculators.org/blog",
  },
};

export default function BlogIndex() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Guides, comparisons, and analysis to help you understand and optimize
          AI costs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}
              >
                {getCategoryLabel(post.category)}
              </span>
              <span className="text-xs text-gray-500">
                {post.readingTimeMinutes} min read
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{post.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
