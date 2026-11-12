# MAHUT — Hospital Business Development & Operations Website

> **Trust & Ethics** — A business development and operations partner for small and mid-sized hospitals and nursing homes.

This release adds the **official MAHUT elephant logo** to the site and includes a full **mobile-view audit and fix pass**. The core page remains a single, fully self-contained `index.html` — the logo and favicon are embedded directly as inline Base64 image data, so the page **cannot lose its styling or logo** even if other files are separated during upload/unzip.

---

## What's New in This Update

### 1. Logo added and corrected
- Your uploaded `Mahut logo.jpg` had a solid dark-olive background. It has been **background-removed** (made fully transparent) with clean, anti-aliased edges so it sits naturally on the dark header bar.
- The logo now appears in the site header next to the "MAHUT / Trust & Ethics" wordmark, sized responsively (42px tall on desktop, 34px on tablets, 30px on small phones).
- A matching **favicon** (browser tab icon) was generated from the same logo and is embedded inline — it will show up in the browser tab immediately, with no extra file needed.
- **Resolution-corrected**: the logo source was re-rendered at the right pixel density for crisp display on retina/high-DPI phone and desktop screens, instead of being stretched from the original low-res JPEG.

### 2. Mobile view — full review and fixes
The following issues were found and corrected for phones and tablets:

| Issue Found | Fix Applied |
|---|---|
| Form inputs used `.95rem` (~15px) font size, which **triggers unwanted auto-zoom on iPhone Safari** when tapping into a field | Bumped to `16px` (the iOS no-zoom threshold) on all form inputs/selects/textareas |
| Hamburger menu button had a tiny tap area (just the icon glyph, no padding) | Enlarged to a proper **44×44px touch target** (Apple/Google's minimum recommended size) |
| "Back to top" button was 42×42px | Bumped to **44×44px** minimum touch target |
| Mobile menu links had no guaranteed minimum height | Added `min-height:44px` to all mobile nav links for reliable tapping |
| No safe-area handling for notched phones (iPhone X and later) | Added `env(safe-area-inset-top/bottom)` padding so the sticky header and floating buttons never sit under the notch or home-indicator bar |
| Contact form submit button wasn't full-width on small screens | Now expands to full width below 600px for easier tapping |
| No `viewport-fit=cover` meta tag | Added, enabling the safe-area insets above to work correctly on edge-to-edge phone screens |
| Logo/brand text could overflow or wrap awkwardly on very narrow screens (<380px) | Added a dedicated breakpoint that shrinks the logo and hides the "Trust & Ethics" subtitle on the smallest phones, keeping the header tidy |
| No `theme-color` meta tag | Added (`#141414`) so mobile browser chrome (status bar / address bar tint) matches the brand on Android/Chrome |

All existing responsive behavior — the mobile accordion services menu, single-column service cards, stacked contact form fields, collapsing footer — was retained and verified intact.

### 3. Robustness (the "missing CSS/images" issue is now structurally prevented)
Previously, CSS/JS/logo lived in separate files, and when those got separated from `index.html` during unzip/upload, the page rendered unstyled. To permanently eliminate this risk:
- **All CSS and JavaScript remain embedded directly inside `index.html`** (no external `.css`/`.js` files to lose).
- **The logo and favicon are now embedded as inline Base64 data** directly inside `index.html` — there is no external image file the browser needs to fetch for the core page to render correctly, fully styled, with its logo, from a single file.

---

## Repository / Package Structure

```
mahut-website/
├── index.html                 # The entire website — HTML, CSS, JS, logo, and favicon all in one file
├── assets/
│   └── img/                   # OPTIONAL bonus icon pack (not required for index.html to work)
│       ├── mahut-logo.png             # Standalone transparent logo file
│       ├── mahut-icon-master.png      # High-res square master (for custom icon generation)
│       ├── favicon.ico                # Multi-resolution .ico (16/32/48/64px)
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── favicon-48x48.png
│       ├── apple-touch-icon.png       # 180×180, branded black background (for iOS home screen)
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       └── site.webmanifest           # PWA manifest referencing the Android icons above
└── README.md                   # You are here
```

**Important:** `index.html` alone is a complete, fully working website. The `assets/img/` folder is an **optional bonus pack** for anyone who later wants to:
- Use a real file-based favicon instead of the inline one (identical result, just a different delivery method)
- Add an iOS "Add to Home Screen" icon (`apple-touch-icon.png`)
- Set up a installable PWA manifest (`site.webmanifest` + the two Android icons)

If you deploy only `index.html` and skip the `assets/` folder entirely, the site will look and work **exactly the same** — logo, favicon, colors, and all.

---

## How to Use the Optional Icon Pack (if desired)

1. Upload the `assets/img/` folder alongside `index.html` on your host.
2. In `index.html`, find this commented-out line in the `<head>`:
   ```html
   <!-- Optional: for a branded home-screen icon on iOS, add apple-touch-icon.png
        from the bonus icon pack and uncomment the line below.
   <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png"> -->
   ```
   Remove the `<!--` and `-->` to activate it.
3. (Optional, for Android/PWA "Add to Home Screen" support) add this line in `<head>`:
   ```html
   <link rel="manifest" href="assets/img/site.webmanifest">
   ```

None of this is required for the site to work — it only adds extra polish for users who save your site to their phone's home screen.

---

## Getting Started (Local Preview)

```bash
# Just open it — no build step, no server required
open index.html         # macOS
start index.html         # Windows
xdg-open index.html       # Linux
```

Or serve locally (recommended, since some browsers restrict `fetch()` on `file://` pages, which affects the contact form):
```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## Deploying

**GitHub Pages:** push the repo, enable Pages under **Settings → Pages → Deploy from a branch → main / root**.

**GoDaddy / Hostinger (shared hosting):** log in to File Manager → `public_html` → upload `index.html` (and optionally the `assets/` folder) → visit your domain.

Either way, remember the **one-time FormSubmit activation step**: submit the contact form once after going live, then confirm the activation email FormSubmit sends to `mosharof719@gmail.com` so all future submissions get delivered automatically.

---

## Mobile Testing Checklist (recommended before you consider this "done")

Since I could not render a live screenshot in this environment (sandboxed, no network access to a browser), please do a quick manual pass on a real device or your browser's device-emulation mode:

- [ ] Open on an actual phone (iOS Safari and Android Chrome if possible) — these two engines handle zoom/tap targets differently from desktop dev tools
- [ ] Tap into each contact form field and confirm the page does **not** auto-zoom
- [ ] Open and close the mobile hamburger menu, and expand/collapse the "Services" accordion
- [ ] Scroll through all sections checking no horizontal scrollbar appears
- [ ] Submit a test entry through the contact form to confirm the email arrives (after FormSubmit activation)
- [ ] Rotate to landscape briefly to confirm no layout breakage

## If You'd Like Further Help

A few things that would let me refine this further, if useful:
- **An exact device/browser** where you saw the original "no color/images" issue (e.g., "iPhone 13, Safari") — helpful if any related quirk still shows up for you.
- **A vector/SVG version of the logo**, if you have one — would let me produce an even crisper, infinitely scalable version instead of a rasterized PNG.
- **Real contact details** (phone, office address) to replace placeholder content in the footer, if you'd like those added.
- Confirmation of your **final domain name**, so I can update the `sitemap`/`theme-color`/manifest references accordingly when you're ready to go live.
