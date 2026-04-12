import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AICalculators.org. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-300 text-xs hidden md:inline">
              Prices are approximate. Always verify with the provider.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
