# Logvinenko Atelier — course landing page

Static, single-page site for Ksenia Logvinenko's online oil-painting course.
No build step, no dependencies: HTML, one stylesheet, one small script.

```
index.html              markup and JSON-LD
assets/css/style.css    tokens, layout, components
assets/js/main.js       sticky header, reveal, FAQ, form guard
assets/img/             photos (see assets/img/README.md for the shot list)
.github/workflows/      GitHub Pages deploy
robots.txt, sitemap.xml
```

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Push to `main`. The workflow in `.github/workflows/pages.yml` publishes the repo
root to GitHub Pages. Enable it once in **Settings → Pages → Source: GitHub Actions**.
`.nojekyll` keeps Jekyll from touching the files.

## Design

| | |
| --- | --- |
| Display | **Zodiak** (Indian Type Foundry) — high-contrast serif, catalogue voice |
| Text / UI | **Switzer** (Indian Type Foundry) — neutral grotesque |
| Delivery | Fontshare CDN, free for commercial use |
| Dark | `#0E0E0F` ground, `#F2F1EC` type — hero, author, waitlist, footer |
| Light | `#FAFAF8` ground, `#17181A` type — outcomes, curriculum, pricing, FAQ |
| Accent | `#E3A98E`, used only on the featured tier flag and focus rings |

To self-host the fonts instead of using the CDN, download both families from
fontshare.com, drop the woff2 files into `assets/fonts/`, declare them with
`@font-face` and delete the `<link>` to `api.fontshare.com`.

## Before this goes live

- [ ] `[YOUR-DOMAIN]` in `<link rel=canonical>`, Open Graph, `robots.txt`, `sitemap.xml`
- [ ] `[YOUR FORM ENDPOINT]` on the waitlist form (Formspree, Tally, Buttondown, own handler)
- [ ] `[STUDIO EMAIL]` in the FAQ and the footer
- [ ] `[BUSINESS NAME, ADDRESS, TAX NUMBER]` in the footer — required for selling in the EU
- [ ] Real pages behind Terms of sale / Privacy / Refund policy
- [ ] Photos in `assets/img/`, placeholders (`.ph`) removed
- [ ] Prices confirmed — $199 / $490 / €1,200 are a proposal, not a decision
- [ ] The artist's quote in the author section

## Notes

- Everything works with JavaScript off; `main.js` only adds polish.
- Selling digital goods to EU consumers means VAT by the buyer's country. Use a
  merchant of record (Lemon Squeezy, Paddle) rather than raw Stripe, and add the
  explicit waiver of the 14-day withdrawal right at checkout.
- Porting to Next.js later is mechanical: the markup is plain sections and the
  CSS is token-driven, so `next-intl` can be added for EN / PL / UA without a redesign.
