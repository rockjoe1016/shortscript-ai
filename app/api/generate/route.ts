import { NextRequest, NextResponse } from "next/server";

// ─── Rate Limiter (in-memory, per-IP, MVP-level) ───

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per window per IP

const requestLog = new Map<string, number[]>(); // ip → timestamps

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];

  // Remove timestamps outside the current window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }

  // Record this request
  recent.push(now);
  requestLog.set(ip, recent);

  // Cleanup stale entries every 100 requests (lightweight housekeeping)
  if (requestLog.size > 100) {
    for (const [key, vals] of requestLog) {
      const filtered = vals.filter((t) => now - t < RATE_LIMIT_WINDOW);
      if (filtered.length === 0) {
        requestLog.delete(key);
      } else {
        requestLog.set(key, filtered);
      }
    }
  }

  return false;
}

function getClientIp(req: NextRequest): string {
  // Vercel / proxy headers first, then fallback
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ─── Mock Scripts (fallback data) ───

const MOCK_SCRIPTS = [
  {
    hook: "I tried posting every day for 30 days. Here's what actually moved the needle...",
    body: "Most creators burn out because they think volume = growth. The truth? One strong hook beats ten weak videos. In this video, I'll show you the 3-part hook formula that doubled my watch time.",
    cta: "Save this and comment 'HOOK' if you want the full template.",
  },
  {
    hook: "Stop doing this if you want to grow on social media in 2026.",
    body: "The biggest mistake I see? Leading with your product instead of the problem. Start with the pain point your audience already feels, then position your content as the relief. Here's a 15-second example.",
    cta: "Follow for part 2 where I break down the exact script structure.",
  },
  {
    hook: "This one change made my videos go from 200 views to 20,000 views.",
    body: "It wasn't better lighting. It wasn't hashtags. It was the first 3 seconds. I rewrote my hook using this simple framework, and everything changed.",
    cta: "Drop a 🔥 if you want me to share the framework in the comments.",
  },
];

// ─── Robust JSON parser for AI responses ───

function parseAIResponse(content: string): { scripts: Array<{ hook: string; body: string; cta: string }> } | null {
  // Strategy 1: Try parsing the raw content directly
  try {
    const result = JSON.parse(content);
    if (result.scripts && Array.isArray(result.scripts)) return result;
  } catch { /* continue */ }

  // Strategy 2: Extract JSON block from markdown (```json ... ```)
  const markdownMatch = content.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (markdownMatch) {
    try {
      const result = JSON.parse(markdownMatch[1]);
      if (result.scripts && Array.isArray(result.scripts)) return result;
    } catch { /* continue */ }
  }

  // Strategy 3: Find outermost { ... } brace block
  const braceMatch = content.match(/\{[\s\S]*\}/);
  if (braceMatch) {
    try {
      const result = JSON.parse(braceMatch[0]);
      if (result.scripts && Array.isArray(result.scripts)) return result;
    } catch { /* continue */ }
  }

  // Strategy 4: Try to fix common issues — trailing commas, single quotes
  if (braceMatch) {
    try {
      let fixed = braceMatch[0]
        .replace(/,\s*([}\]])/g, "$1") // remove trailing commas before } or ]
        .replace(/'/g, '"'); // single quotes → double quotes
      const result = JSON.parse(fixed);
      if (result.scripts && Array.isArray(result.scripts)) return result;
    } catch { /* continue */ }
  }

  return null;
}

// ─── Main POST handler ───

export async function POST(req: NextRequest) {
  try {
    // ── Rate limit check ──
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a minute and try again.",
          retryAfter: 60,
        },
        { status: 429 }
      );
    }

    // ── Parse input ──
    const { topic, platform, style, duration } = await req.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    // If no API key, return mock scripts so the UI can be tested immediately
    if (!apiKey) {
      console.log("No DEEPSEEK_API_KEY found, returning mock scripts");
      return NextResponse.json({
        scripts: MOCK_SCRIPTS.map((s, i) => ({
          ...s,
          hook: `[MOCK ${i + 1}] ${s.hook}`,
        })),
        mock: true,
      });
    }

    // ── Build prompt ──
    const prompt = `You are an expert short-form video scriptwriter for ${platform}.

Create 3 complete ${duration}-second video scripts about: "${topic}".
Style: ${style}.

For each script, return:
- hook: a scroll-stopping first 3 seconds (short, punchy)
- body: the middle content (concise, valuable)
- cta: a clear call-to-action at the end

Return ONLY valid JSON in this exact format, no markdown fences, no extra text:
{
  "scripts": [
    {"hook": "...", "body": "...", "cta": "..."},
    {"hook": "...", "body": "...", "cta": "..."},
    {"hook": "...", "body": "...", "cta": "..."}
  ]
}`;

    // ── Call DeepSeek API ──
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that writes short-form video scripts. ALWAYS return valid JSON. Never wrap it in markdown code fences. Never add any text outside the JSON object.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `DeepSeek API error: ${response.status}`
      );
    }

    const data = await response.json();
    const content: string = data.choices?.[0]?.message?.content || "";

    // ── Robust JSON parsing ──
    const parsed = parseAIResponse(content);

    if (parsed && parsed.scripts) {
      return NextResponse.json({
        scripts: parsed.scripts,
        mock: false,
      });
    }

    // If parsing completely failed, return mock scripts instead of crashing
    console.warn("Failed to parse AI response, falling back to mock scripts. Raw content:", content.slice(0, 200));
    return NextResponse.json({
      scripts: MOCK_SCRIPTS.map((s, i) => ({
        ...s,
        hook: `[AI formatting issue — showing backup] ${s.hook}`,
      })),
      mock: true,
      fallback: true,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate scripts",
      },
      { status: 500 }
    );
  }
}
