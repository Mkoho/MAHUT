# MAHUT — Hospital Business Development & Operations Website

> **Trust & Ethics** — A business development and operations partner for small and mid-sized hospitals and nursing homes.

This release fixes the **"Our Services section not visible on mobile"** bug, replaces the header logo with the **new red-square elephant mark**, and adds a **WhatsApp group link** for quick contact and community updates. As always, the entire page is one fully self-contained `index.html` — no separate CSS/JS/image files to lose track of.

---

## What's New in This Update

### 1. Fixed: "Our Services" section invisible on mobile
This was caused by the services grid relying on `grid-template-columns: repeat(auto-fit, minmax(290px,1fr))`, combined with content only becoming visible once an animation observer detects it on-screen. On some mobile browsers/viewports, that combination could leave the section's cards stuck at `opacity: 0` indefinitely. Two independent fixes were applied so this **cannot happen again, regardless of the underlying cause**:

- **CSS — explicit mobile grid overrides.** The services grid now has hard, explicit column counts at each breakpoint (2 columns ≤900px, 1 column ≤700px) instead of relying only on automatic track-sizing. This removes any ambiguity in how the browser computes the grid on narrow screens.
- **JavaScript — a hard "reveal" safety net.** All scroll-reveal animations (used across the whole site, not just Services) are still driven by `IntersectionObserver` for the nice fade-in effect, but now there's also a guaranteed fallback: **2.5 seconds after the page finishes loading** (with a second backup check at 4 seconds), *any* section that hasn't yet been revealed is force-shown automatically. This makes it structurally impossible for any section to stay permanently invisible, on any device or browser, even if `IntersectionObserver` misbehaves for an unrelated reason.

### 2. Logo replaced with your new mark
- Replaced the previous elephant silhouette logo with your new **red rounded-square icon** (the "MAHUT / Trust & Ethics" lockup you provided).
- The icon portion was isolated from the lockup, background-removed (the near-white background made fully transparent with clean edges), and used as the header/footer mark — paired with the site's own existing styled "MAHUT / Trust & Ethics" text, matching the site's typography instead of using a flattened image of the text.
- As before, the logo is embedded directly inside `index.html` as inline image data — it is structurally impossible for it to go missing due to a separated file.
- A matching favicon (browser tab icon) was generated from the new mark and is also embedded inline.

### 3. WhatsApp group added for contact & communication
Your WhatsApp group link is now surfaced in **four places** so visitors can reach you however they prefer:
1. A **floating WhatsApp button** (bottom-left, pulsing, always visible) on every page scroll position.
2. A dedicated **"Join Our WhatsApp Community"** section between "Who We Serve" and the contact form.
3. A note directly under the **contact form** ("Prefer instant messaging? Join our WhatsApp group instead").
4. A link in the **footer**, under a new "Connect" column.

All four open the group in a new tab (`target="_blank" rel="noopener noreferrer"`, standard safe practice for outbound links) and point to:
`https://chat.whatsapp.com/KPSnbLtqqV17kxn7OG9Wqe`

---

## Repository / Package Structure

```
mahut-website/
├── index.html                 # The entire website — HTML, CSS, JS, logo, favicon, all in one file
├── assets/
│   └── img/                   # OPTIONAL bonus icon pack (NOT required for index.html to work)
│       ├── mahut-logo.png             # Standalone transparent logo file
│       ├── mahut-icon-master.png      # High-res square master
│       ├── favicon.ico                # Multi-resolution .ico (16/32/48/64px)
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── favicon-48x48.png
│       ├── apple-touch-icon.png       # 180×180, branded black background (iOS home screen)
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       └── site.webmanifest           # PWA manifest referencing the Android icons above
└── README.md                   # You are here
```

**`index.html` alone is a complete, fully working website.** The `assets/img/` folder is only needed if you later want a file-based favicon, an iOS "Add to Home Screen" icon, or PWA installability — none of which are required for the site to look and work exactly as designed.

---

## Mobile Testing Checklist (please verify on a real device)

I don't have access to a real browser/device in this environment to capture a live screenshot, so please do a quick pass after deploying:

- [ ] Open on an actual phone (iOS Safari + Android Chrome, if possible)
- [ ] Scroll all the way down through **Services** specifically — confirm all 12 cards appear, single-column, each fully readable
- [ ] Tap the floating WhatsApp button (bottom-left) — confirm it opens the correct group in a new tab
- [ ] Tap "Join WhatsApp Group" in the new Connect section and in the footer — same check
- [ ] Open the hamburger menu, expand "Services," tap into a sub-item, confirm it jumps to the right card and the card flashes gold briefly
- [ ] Tap into each contact form field — confirm no unwanted auto-zoom
- [ ] Submit a test entry through the contact form (after the one-time FormSubmit activation — see below) to confirm email delivery

---

## One-Time Setup: Contact Form Email Delivery

The contact form uses **FormSubmit.co** to deliver submissions to `mosharof719@gmail.com` with no backend required.

1. Deploy the site (or open `index.html` locally) and submit the form once with test data.
2. FormSubmit sends a one-time **activation email** to `mosharof719@gmail.com`.
3. Click the confirmation link inside that email.
4. All future submissions are delivered automatically from that point on.

---

## Getting Started (Local Preview)

```bash
open index.html         # macOS
start index.html         # Windows
xdg-open index.html       # Linux
```

Or serve locally (recommended, since some browsers restrict `fetch()` on `file://` pages, which affects the contact form):
```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploying

**GitHub Pages:** push the repo, enable Pages under **Settings → Pages → Deploy from a branch → main / root**.

**GoDaddy / Hostinger (shared hosting):** File Manager → `public_html` → upload `index.html` (optionally `assets/` too) → visit your domain.

---

## If You'd Like Further Help

A few things that would let me refine this further:
- **The exact phone/browser** where "Our Services" previously appeared blank, if it still happens after this update — that would point to a more specific root cause I can target directly.
- **A vector/SVG version of the new logo**, if you have one, for an even crisper result at every size.
- **Real office contact details** (phone, address) to replace any remaining placeholder content.
