"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, Loader2, Sparkles } from "lucide-react";

const platforms = [
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube Shorts" },
  { id: "instagram", label: "Instagram Reels" },
];

const styles = [
  { id: "educational", label: "Educational" },
  { id: "storytelling", label: "Storytelling" },
  { id: "trendy", label: "Trendy / Viral" },
  { id: "promo", label: "Product Promo" },
];

const durations = [
  { id: "15", label: "15 sec" },
  { id: "30", label: "30 sec" },
  { id: "60", label: "60 sec" },
];

interface Script {
  hook: string;
  body: string;
  cta: string;
}

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("tiktok");
  const [style, setStyle] = useState("educational");
  const [duration, setDuration] = useState("30");
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setScripts([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, platform, style, duration }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show friendly message for rate limit
        if (res.status === 429) {
          throw new Error("You're generating too fast! Please wait about 1 minute and try again.");
        }
        throw new Error(data.error || "Failed to generate scripts");
      }

      setScripts(data.scripts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyScript = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-10 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Generate your script
          </h1>
          <p className="mt-2 text-slate-400">
            Fill in the topic and settings, get 3 ready-to-shoot scripts.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="mt-8 space-y-6 rounded-2xl bg-slate-900/50 p-6 ring-1 ring-slate-800">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-300">
              Video topic or keyword
            </label>
            <input
              id="topic"
              type="text"
              required
              placeholder="e.g. how to grow on TikTok without paid ads"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition focus:ring-indigo-500"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-300">Platform</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      platform === p.id
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Style</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s.id)}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      style === s.id
                        ? "bg-violet-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Duration</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {durations.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDuration(d.id)}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      duration === d.id
                        ? "bg-fuchsia-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-lg font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Writing scripts...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate 3 Scripts
              </>
            )}
          </button>

          {error && (
            <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-300 ring-1 ring-red-500/20">
              {error}
            </div>
          )}
        </form>

        {scripts.length > 0 && (
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-white">Your scripts</h2>
            {scripts.map((script, index) => (
              <div
                key={index}
                className="relative rounded-2xl bg-slate-900/80 p-6 ring-1 ring-slate-800"
              >
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() =>
                      copyScript(index, `${script.hook}\n\n${script.body}\n\n${script.cta}`)
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-700"
                  >
                    {copied === index ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4 pr-24">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      Hook
                    </span>
                    <p className="mt-1 text-lg font-medium text-white">{script.hook}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Body
                    </span>
                    <p className="mt-1 text-slate-300">{script.body}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400">
                      CTA
                    </span>
                    <p className="mt-1 text-white">{script.cta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
