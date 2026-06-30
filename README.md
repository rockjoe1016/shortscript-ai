# ScriptSpark

AI-powered short video script generator for TikTok, YouTube Shorts, and Instagram Reels.

## What it does

- Generate 3 scroll-stopping scripts from a single topic
- Platform-native hooks for TikTok, Reels, and Shorts
- Multiple styles: Educational, Storytelling, Trendy, Product Promo
- Copy-to-clipboard ready

## Tech stack

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **AI**: DeepSeek Chat API
- **Payments**: Stripe (optional, ready to wire in)
- **Deployment**: Vercel

## Local development

1. Clone the repo and install dependencies:

```bash
cd shortscript-ai
npm install
```

2. Copy the environment file and add your keys:

```bash
cp .env.example .env.local
```

3. Add your DeepSeek API key to `.env.local`:

```
DEEPSEEK_API_KEY=sk-...
```

> If you don't have an API key yet, the app will return mock scripts so you can still test the UI.

4. Run the dev server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add environment variables:
   - `DEEPSEEK_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your production URL)
4. Click Deploy

## Next steps to make it a real product

- [ ] Connect Stripe for paid plans
- [ ] Add user authentication (Supabase Auth or NextAuth)
- [ ] Add usage limits per account
- [ ] Connect a real email list for the waitlist form
- [ ] Add analytics (Plausible or Google Analytics)
