# BYSIMON GIFTS — Basic Package

Status: **Phase 0–3 complete** (project foundation, design system, homepage UI).
Not yet built: shop/product pages, cart, checkout, Supabase connection, admin dashboard.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Before it's production-ready

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase project URL + anon key (once Phase 4 - database - is built).
2. Run `database/schema.sql` in the Supabase SQL editor to create the tables.
3. Replace the placeholder values in `lib/site-config.ts` with the real store name and WhatsApp number.
4. Replace `lib/placeholder-data.ts` with real products once photos are ready (or better — once the admin dashboard exists in Phase 13-14, manage products there instead).

## What's real vs. placeholder right now

- **Real**: project structure, design system (colors/fonts in `tailwind.config.ts` and `app/globals.css`), Header, Footer, ProductCard, WhatsAppButton, homepage layout.
- **Placeholder**: product data, category list, store name, WhatsApp number, hero image (icon standing in for a photo).
- **Not wired yet**: Add to Cart button is currently presentational only — cart logic comes in Phase 7.

## Project structure

```
app/            Next.js App Router pages
components/     Reusable UI components
lib/            Types, utilities, placeholder data, config
database/       schema.sql for Supabase
```

## Next steps (per the agreed build order)

Phase 4: Supabase database connection → Phase 5: connect products to DB → Phase 6: product detail pages → Phase 7: cart.
