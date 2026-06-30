"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Zap, Copy, Wand2, ArrowRight, Check } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Sparkles className="h-4 w-4" />
            <span>AI-powered script generator for creators</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Writer's Block Killed{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              My Posting Schedule
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Generate 3 scroll-stopping short video scripts in 30 seconds. For TikTok, YouTube Shorts & Instagram Reels.
          </p>

          <p className="mt-4 text-sm text-slate-400">
            ✨ Already used by <span className="font-semibold text-indigo-400">1,000+ creators</span> worldwide
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
            >
              Generate Your First Script Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#pricing"
              className="text-slate-400 transition hover:text-white"
            >
              See pricing →
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="glass rounded-2xl p-8">
              <div className="mb-4 inline-flex rounded-xl bg-indigo-500/20 p-3">
                <Zap className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Hooks That Work</h3>
              <p className="mt-2 text-slate-400">
                Every script starts with a high-retention hook designed to stop the scroll.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="mb-4 inline-flex rounded-xl bg-violet-500/20 p-3">
                <Wand2 className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Platform-Native</h3>
              <p className="mt-2 text-slate-400">
                Optimized for TikTok, Reels and Shorts algorithms — not generic copy-paste.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="mb-4 inline-flex rounded-xl bg-fuchsia-500/20 p-3">
                <Copy className="h-6 w-6 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Post More, Stress Less</h3>
              <p className="mt-2 text-slate-400">
                Go from staring at a blank page to 3 ready-to-shoot scripts in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo scripts */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white">What you get in 30 seconds</h2>
          <div className="mt-10 space-y-4">
            <div className="glass rounded-xl p-6">
              <div className="text-sm font-medium text-indigo-400">Hook</div>
              <p className="mt-1 text-lg text-white">
                "I spent $0 on ads last month and made $12K. Here's the exact script I used..."
              </p>
              <div className="mt-4 text-sm font-medium text-slate-400">Body + CTA</div>
              <p className="mt-1 text-slate-300">
                Break down the 3-part framework, show a quick example, then tell viewers to save this and follow for part 2.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-sm font-medium text-violet-400">Hook</div>
              <p className="mt-1 text-lg text-white">
                "Stop doing this if you want to grow on TikTok in 2026..."
              </p>
              <div className="mt-4 text-sm font-medium text-slate-400">Body + CTA</div>
              <p className="mt-1 text-slate-300">
                Reveal the common mistake, explain why it kills reach, give the fix, ask viewers to comment "FIX" for a checklist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-white">Simple pricing</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
            Start free. Upgrade when you're ready to scale.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white">Free</h3>
              <div className="mt-4 text-4xl font-bold text-white">$0</div>
              <p className="text-slate-400">/month</p>
              <ul className="mt-6 space-y-3 text-slate-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> 3 scripts/day</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Basic styles</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Copy to clipboard</li>
              </ul>
              <Link href="/generate" className="mt-8 block w-full rounded-xl border border-slate-600 py-3 text-center font-medium text-white transition hover:bg-slate-800">
                Get started
              </Link>
            </div>

            <div className="relative rounded-2xl border-2 border-indigo-500 bg-slate-900/80 p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-semibold text-white">Creator</h3>
              <div className="mt-4 text-4xl font-bold text-white">$9.9</div>
              <p className="text-slate-400">/month</p>
              <ul className="mt-6 space-y-3 text-slate-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Unlimited scripts</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> 5 writing styles</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> History & saves</li>
              </ul>
              <Link href="/generate" className="mt-8 block w-full rounded-xl bg-indigo-600 py-3 text-center font-medium text-white transition hover:bg-indigo-500">
                Start creating
              </Link>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white">Pro</h3>
              <div className="mt-4 text-4xl font-bold text-white">$19.9</div>
              <p className="text-slate-400">/month</p>
              <ul className="mt-6 space-y-3 text-slate-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Everything in Creator</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Bulk generation</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Export PDF</li>
              </ul>
              <Link href="/generate" className="mt-8 block w-full rounded-xl border border-slate-600 py-3 text-center font-medium text-white transition hover:bg-slate-800">
                Go Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-10 text-center">
          <h2 className="text-3xl font-bold text-white">Get early access to new features</h2>
          <p className="mt-3 text-indigo-100">
            Join creators getting the latest templates and platform updates. No spam.
          </p>

          {submitted ? (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-3 text-white">
              <Check className="h-5 w-5" />
              You're on the list!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl bg-white/10 px-5 py-3 text-white placeholder-indigo-200 outline-none ring-white/30 transition focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                Join the list
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-slate-500">
        <p>© 2026 ScriptSpark. Built for creators who ship.</p>
      </footer>
    </main>
  );
}
