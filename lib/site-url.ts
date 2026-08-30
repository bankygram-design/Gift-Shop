/**
 * The site's canonical URL. Falls back to localhost during development.
 *
 * IMPORTANT: once deployed (Phase 26), set NEXT_PUBLIC_SITE_URL in the
 * production environment (e.g. Vercel project settings) to the real
 * domain, e.g. https://bysimongifts.com.ng - this feeds the sitemap,
 * robots.txt, and Open Graph tags used when the site is shared on
 * WhatsApp/social media.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
