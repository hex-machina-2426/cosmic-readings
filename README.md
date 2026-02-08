# 🌙 Cosmic Readings

Personalized zodiac, numerology, and gematria readings powered by Claude AI.

## Architecture

```
cosmic-readings/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata/SEO
│   │   ├── page.tsx            # Main page (orchestrates everything)
│   │   ├── globals.css         # Tailwind + custom styles
│   │   ├── api/
│   │   │   ├── reading/
│   │   │   │   ├── route.ts    # Free reading (Claude API — server-side!)
│   │   │   │   └── full/
│   │   │   │       └── route.ts # Paid reading (verifies Stripe + Claude)
│   │   │   └── checkout/
│   │   │       └── route.ts    # Creates Stripe Checkout session
│   │   └── reading/
│   │       └── success/
│   │           └── page.tsx    # Post-payment success page
│   ├── components/
│   │   ├── StarField.tsx       # Memoized animated star background
│   │   ├── Hero.tsx            # Landing hero section
│   │   ├── InfoSection.tsx     # Scroll-reveal info sections (IntersectionObserver)
│   │   ├── ReadingForm.tsx     # Form with validation
│   │   └── ReadingResult.tsx   # Reading display + paywall + Stripe checkout
│   ├── lib/
│   │   ├── zodiac.ts           # Zodiac sign calculation
│   │   └── numerology.ts       # Life path + gematria calculation
│   └── hooks/
│       └── useIntersectionObserver.ts  # Scroll reveal hook
```

## Setup

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your keys
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```

4. **Deploy to Vercel:**
   - Push to GitHub
   - Connect repo in Vercel dashboard
   - Add environment variables in Vercel project settings
   - Deploy!

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `ANTHROPIC_API_KEY` | Server only | Claude API key |
| `STRIPE_SECRET_KEY` | Server only | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client | Stripe publishable key |
| `NEXT_PUBLIC_BASE_URL` | Client | Your domain URL |

## Security Notes

- API keys are **never** exposed to the browser
- All AI generation happens in server-side API routes
- Stripe payment is verified server-side before generating paid content
- Full readings require valid Stripe session ID with `payment_status: "paid"`

## Payment Flow

1. User gets free zodiac reading
2. Clicks "Unlock Full Reading — $4.44"
3. Redirected to Stripe Checkout
4. After payment → redirected to `/reading/success`
5. Success page verifies payment + generates full reading server-side

## What Changed from the Original

- **Security:** API key moved from client to server-side API routes
- **Performance:** Stars memoized, IntersectionObserver replaces scroll listeners, CSS animations replace JS parallax
- **Architecture:** Monolith split into focused components
- **TypeScript:** Full type safety
- **Payments:** Real Stripe integration (was just a visual button)
- **UX:** Proper loading spinner, error states, form validation
- **SEO:** Meta tags, semantic HTML, accessibility improvements
- **Mobile:** Better responsive design, scrollbar styling
