# 🏝️ Aurelia — Luxury Hotel Booking Experience

A premium, 5-star resort booking website with cinematic parallax scrolling,
glassmorphism, smooth motion design and a full hotel-management dashboard.
Built to feel like a world-class hospitality brand.

![React](https://img.shields.io/badge/React-18-61dafb) ![Vite](https://img.shields.io/badge/Vite-5-646cff) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0080) ![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88ce02)

---

## ✨ Highlights

- **Cinematic hero** with multi-layer GSAP parallax, masked headline reveal,
  glassmorphism search bar (destination · dates · guests) and animated stats.
- **Featured hotels** — interactive cards with image-zoom hover, ratings,
  amenities, price-per-night and *Book Now*.
- **Luxury experience** section with a parallax background and animated blocks
  (Spa · Pools · Fine Dining · Conferences).
- **Popular destinations** — interactive world map with pulsing markers and a
  live destination card + dynamic travel statistics.
- **Room showcase** — 3D mouse-tilt cards, image-gallery slider, live room
  switching, details and pricing.
- **Customer reviews** — seamless auto-scrolling testimonial marquee with star
  ratings and guest photos.
- **Amenities** grid with animated icons (Gym · Wi-Fi · Transfer · Restaurant ·
  Pool · Concierge).
- **Special offers** — live countdown timer, limited-time promotional banners.
- **Booking section** — modern form with **real-time price calculation**
  (nights × rate + tax + service fee), instant confirmation and a secure-payment
  UI.
- **Footer** — contact info, social links, newsletter signup and an embedded
  Google Map.
- **Admin dashboard** (`/admin`) — KPI cards, an animated SVG revenue chart,
  occupancy bars, recent-bookings table and room-inventory tracker.

### Cross-cutting polish

- 🌗 **Dark & light mode** with persisted preference.
- 🖱️ **Mouse-follow custom cursor**, floating ambient orbs, scroll-progress bar.
- 🎬 **Loading screen**, **page transitions**, scroll-triggered & image-reveal
  animations, animated counters.
- 📱 **Fully responsive** with an animated mobile menu.
- ⚡ Lazy-loaded, shimmer-skeleton images.
- 🔍 **SEO-ready** — meta/OG/Twitter tags, JSON-LD structured data, semantic HTML.

---

## 🎨 Design system

| Token | Value |
|-------|-------|
| Deep Navy | `#0a1228` → `#050a18` |
| Gold accent | `#e2b53a` |
| White / Soft gray | `#e7ecf5` / `#a9b6d8` |
| Display font | Cormorant Garamond (serif) |
| Body font | Plus Jakarta Sans |

---

## 🚀 Getting started

```bash
cd hotel-booking
npm install
npm run dev        # http://localhost:5173
```

Build & preview the production bundle:

```bash
npm run build
npm run preview
```

The site is a static SPA — deploy the `dist/` folder to any static host
(Netlify, Vercel, GitHub Pages, S3…). SPA routing fallbacks for `/admin` are
included via `public/_redirects` (Netlify) and `vercel.json` (Vercel).

---

## 🧱 Tech stack

| Area | Tool |
|------|------|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (custom navy/gold theme, `light:` variant) |
| Motion | Framer Motion (UI motion & transitions) |
| Parallax | GSAP + ScrollTrigger |
| Routing | React Router 6 |
| Icons | lucide-react |
| Fonts | Google Fonts |

---

## 📁 Structure

```
hotel-booking/
├── index.html                 # SEO meta, fonts, JSON-LD
├── src/
│   ├── main.jsx / App.jsx      # Router, page transitions, loader
│   ├── context/ThemeContext    # Dark/light mode
│   ├── hooks/                  # useScrollReveal, useCountUp
│   ├── components/
│   │   ├── Navbar, Loader, Cursor, ScrollProgress, BackToTop
│   │   ├── ui/                 # LazyImage, Counter, StarRating, SectionHeading
│   │   └── sections/           # Hero, FeaturedHotels, LuxuryExperience,
│   │       │                     Destinations, RoomShowcase, Reviews,
│   │       │                     Amenities, SpecialOffers, Booking, Footer
│   ├── pages/                  # Home, AdminDashboard
│   └── data/                   # data.js, adminData.js
└── tailwind.config.js
```

> Note: this `hotel-booking/` app is a standalone front-end project and is
> independent of the PHP café POS system at the repository root.

---

Crafted for travellers who expect more. ✨
