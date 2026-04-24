import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import { getCategoryLabel, getCategoryColor, type BlogPost } from "@/data/blog-posts";

interface BlogLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
}

export default function BlogLayout({ post, children }: BlogLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-gray-700">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}
          >
            {getCategoryLabel(post.category)}
          </span>
          <span className="text-sm text-gray-500">
            {post.readingTimeMinutes} min read
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {post.title}
        </h1>
        <p className="text-lg text-gray-600">{post.description}</p>
        <div className="mt-3 text-sm text-gray-500">
          Published {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.updatedAt && (
            <span>
              {" "}
              &middot; Updated{" "}
              {new Date(post.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-xl prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
        {children}
      </article>

      <AdBanner className="mt-10 mb-4" />

      {/* Related calculator CTA */}
      {post.relatedCalculator && (
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Try the Calculator
          </h3>
          <p className="text-gray-600 mb-4">
            Use our free {post.relatedCalculator.title} to run the numbers for
            your specific use case.
          </p>
          <Link
            href={post.relatedCalculator.href}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Open {post.relatedCalculator.title} →
          </Link>
        </div>
      )}

      {/* Tags */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
