"use client";

import { useState } from "react";

const tokenExamples = [
  {
    label: "A short tweet",
    text: "Just launched our new product! Check it out at our website. Super excited to share this with everyone.",
    tokens: 20,
    type: "input" as const,
  },
  {
    label: "A quick question",
    text: "Can you explain what machine learning is and how it's different from regular programming?",
    tokens: 18,
    type: "input" as const,
  },
  {
    label: "A short email",
    text: `Hi Sarah,

Thanks for sending over the quarterly report. I reviewed the numbers and everything looks good. Revenue is up 12% from last quarter, which is great news.

I have a few minor suggestions on the formatting — can we hop on a quick call tomorrow afternoon to discuss?

Best,
John`,
    tokens: 65,
    type: "input" as const,
  },
  {
    label: "A detailed prompt",
    text: `You are a senior software engineer reviewing a pull request. Please analyze the following code changes for:
1. Security vulnerabilities (SQL injection, XSS, etc.)
2. Performance issues (N+1 queries, memory leaks)
3. Code style and best practices
4. Missing error handling
5. Test coverage gaps

Be specific about line numbers and suggest fixes. Format your response as a code review with inline comments.

Here is the diff to review:
[... code diff would go here, typically 200-500 lines ...]`,
    tokens: 500,
    type: "input" as const,
  },
  {
    label: "A chatbot reply",
    text: `Machine learning is a type of artificial intelligence where computers learn from data instead of being explicitly programmed with rules.

Think of it like this: traditional programming is like giving someone a recipe — you tell them exactly what to do step by step. Machine learning is more like showing someone thousands of photos of cats and dogs until they can tell the difference on their own.

The key difference is that in regular programming, a human writes all the rules. In machine learning, the computer figures out the rules by finding patterns in large amounts of data.`,
    tokens: 100,
    type: "output" as const,
  },
  {
    label: "A blog post summary",
    text: `Here's a comprehensive summary of the article:

The article discusses five key trends shaping the future of remote work in 2026. First, hybrid models have become the dominant approach, with 73% of companies now offering flexible arrangements. Second, AI-powered collaboration tools are replacing traditional video calls, enabling asynchronous work across time zones.

Third, companies are rethinking compensation to reflect location-independent value rather than geographic cost of living. Fourth, mental health support has become a standard benefit, with companies investing in digital wellness platforms. Finally, the rise of "work-from-anywhere" visas in 47 countries has created a new class of digital nomads.

The author concludes that companies resistant to these trends risk losing top talent to more flexible competitors. The data suggests that remote-friendly companies see 25% lower turnover and 18% higher employee satisfaction scores.`,
    tokens: 175,
    type: "output" as const,
  },
  {
    label: "A full page of text (~1 page)",
    text: "A single page of a book or document, roughly 300-400 words of content with paragraphs, descriptions, and details...",
    tokens: 500,
    type: "input" as const,
    isApproximate: true,
  },
  {
    label: "A 5-page report",
    text: "A detailed business report with executive summary, analysis sections, charts descriptions, and recommendations...",
    tokens: 2500,
    type: "input" as const,
    isApproximate: true,
  },
  {
    label: "A short novel chapter",
    text: "An entire chapter of a book, approximately 10-15 pages of text with dialogue, descriptions, and narrative...",
    tokens: 5000,
    type: "input" as const,
    isApproximate: true,
  },
];

export default function TokenExplainer() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            What are tokens? (New to AI?)
          </h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-5">
          {/* Simple explanation */}
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Tokens are how AI companies measure and charge for text.</strong>{" "}
              Think of tokens as small pieces of words. On average, <strong>1 token is about 3/4 of a word</strong>, or roughly 4 characters.
            </p>
            <p>
              When you use an AI tool like ChatGPT or Claude, you pay for two things:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                <div className="font-semibold text-blue-700 text-sm mb-1">
                  What you send (Input)
                </div>
                <div className="text-xs text-gray-600">
                  Your question, prompt, or document — everything you send to the AI
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-3 border border-purple-100">
                <div className="font-semibold text-purple-700 text-sm mb-1">
                  What you get back (Output)
                </div>
                <div className="text-xs text-gray-600">
                  The AI&apos;s response — the answer, summary, or generated content
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Output tokens usually cost 2-5x more than input tokens because generating text is harder than reading it.
            </p>
          </div>

          {/* Quick reference */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Quick Reference: How many tokens is that?
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "100 tokens", equiv: "~75 words", desc: "A short paragraph" },
                { label: "500 tokens", equiv: "~375 words", desc: "About 1 page" },
                { label: "1,000 tokens", equiv: "~750 words", desc: "A short blog post" },
                { label: "10,000 tokens", equiv: "~7,500 words", desc: "A long article" },
              ].map((item) => (
                <div key={item.label} className="bg-white/70 rounded-lg p-3 text-center border border-gray-100">
                  <div className="font-bold text-gray-900 text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.equiv}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Real examples */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Real Examples (click to see the text)
            </h4>
            <div className="space-y-2">
              {tokenExamples.map((example, i) => (
                <div key={i}>
                  <button
                    onClick={() => setSelectedExample(selectedExample === i ? null : i)}
                    className="w-full text-left flex items-center justify-between p-3 bg-white/70 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          example.type === "input"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {example.type === "input" ? "Input" : "Output"}
                      </span>
                      <span className="text-sm text-gray-800">{example.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold text-gray-700">
                        ~{example.tokens.toLocaleString()} tokens
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          selectedExample === i ? "rotate-180" : ""
                        }`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {selectedExample === i && !example.isApproximate && (
                    <div className="mt-1 ml-4 p-3 bg-white rounded-lg border border-gray-200 text-xs text-gray-600 whitespace-pre-wrap font-mono">
                      {example.text}
                    </div>
                  )}
                  {selectedExample === i && example.isApproximate && (
                    <div className="mt-1 ml-4 p-3 bg-white rounded-lg border border-gray-200 text-xs text-gray-500 italic">
                      {example.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
