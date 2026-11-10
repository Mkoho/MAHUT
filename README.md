# MAHUT — Hospital Business Development & Operations Website

> **Trust & Ethics** — A business development and operations partner for small and mid-sized hospitals and nursing homes.

This package contains the MAHUT marketing website with a **fully working contact form** that emails every submission directly to **mosharof719@gmail.com** — no backend server, database, or hosting-side code required.

---

## Repository Structure

```
mahut-website/
├── index.html                 # Public marketing website, including the contact form
├── assets/
│   ├── css/
│   │   └── style.css          # Full site stylesheet (site + contact form styling)
│   └── js/
│       └── main.js            # Site scripts: nav, animations, counters, AJAX form submit
└── README.md                   # You are here
```

No build tools, frameworks, or package manager are required. Open `index.html` directly in a browser, or deploy the whole folder to any static host (GitHub Pages, GoDaddy, Hostinger, Netlify, etc.).

---

## ⚠️ IMPORTANT — One-time setup before the contact form will deliver emails

The contact form uses **[FormSubmit.co](https://formsubmit.co)**, a free email-relay service built specifically for static HTML sites with no backend. It works by submitting the form directly to:

```
https://formsubmit.co/mosharof719@gmail.com
```

**Before the form will deliver any emails, FormSubmit requires a one-time activation:**

1. Deploy the site (or even just open `index.html` locally) and submit the contact form **once**, with any test data.
2. FormSubmit will send an **activation email to `mosharof719@gmail.com`** titled something like *"Confirm your email address"* or *"Activate Form"*.
3. Open that email and click the **confirmation/activation link** inside it.
4. From that point forward, every future form submission will be delivered straight to `mosharof719@gmail.com` automatically — no further setup needed.

This is a one-time step per recipient email address and is required by FormSubmit to prevent spam/abuse of their free relay service.

### If you want to change the recipient email later
Open `index.html`, find the `<form>` tag, and update **both**:
```html
<form ... action="https://formsubmit.co/NEW-EMAIL@example.com" ...>
```
and in `assets/js/main.js`, update:
```js
const recipient = 'NEW-EMAIL@example.com';
```
Then repeat the one-time activation step above for the new address.

---

## How the Contact Form Works

- **Fields captured:** Full Name, Designation/Role, Email, Phone/WhatsApp, Hospital/Nursing Home Name, City/Location, Service Interested In (dropdown), Message, and a required consent checkbox.
- **Submission method:** The form submits via JavaScript (`fetch`) to FormSubmit's AJAX endpoint, so the visitor **stays on the page** — no redirect, no page reload. A success or error message appears directly below the form.
- **Spam protection:** Includes a hidden honeypot field (`_honey`) that silently traps bots, plus FormSubmit's own filtering. `_captcha` is set to `false` for a smoother user experience; you can set it to `true` in `index.html` if you'd prefer FormSubmit's built-in CAPTCHA step instead.
- **Email format:** Submissions arrive as a clean, readable table (`_template value="table"`) with a clear subject line ("New MAHUT Website Consultation Request") so they're easy to scan in your inbox.
- **No data stored on the website.** Submissions go directly from the visitor's browser to FormSubmit's relay to your inbox — nothing is saved in any database or file on this site.

---

## Getting Started (Local Preview)

**Option A — Open directly:**
```bash
open index.html         # macOS
start index.html         # Windows
xdg-open index.html       # Linux
```

**Option B — Serve locally (recommended, avoids file:// quirks with some browsers' fetch() restrictions):**
```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

> Note: some browsers restrict `fetch()` requests from `file://` pages. If the form doesn't submit when opening `index.html` directly, serve it locally (Option B) or deploy it — it will work correctly once served over `http://` or `https://`.

---

## Deploying to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MAHUT website with working contact form"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/mahut-website.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source → Deploy from a branch**.
3. Choose branch **`main`**, folder **`/ (root)`**, then **Save**.
4. Your site will be live at `https://YOUR-USERNAME.github.io/mahut-website/` within a few minutes.
5. Submit the contact form once on the live site to trigger the FormSubmit activation email (see the setup section above).

## Deploying to Traditional Shared Hosting (GoDaddy / Hostinger)

1. Log in to your hosting control panel (cPanel for GoDaddy, hPanel for Hostinger) → **File Manager**.
2. Navigate to **`public_html`**.
3. Upload `index.html` and the entire `assets/` folder, preserving the `css/` and `js/` subfolders.
4. Visit your domain — the site should now be live.
5. Activate the free SSL certificate included with your hosting plan.
6. Submit the contact form once to trigger the FormSubmit activation email.

---

## Customization Guide

| Want to change… | Where |
|---|---|
| Brand colors | `:root` CSS variables at the top of `assets/css/style.css` |
| Services list / copy | `#services` section in `index.html` |
| Contact form fields | `<form id="mahutContactForm">` block in `index.html` — add/remove `.form-group` blocks as needed; each `name="..."` attribute becomes the column label in the email |
| Recipient email | See "If you want to change the recipient email later" above |
| Email subject line | The `_subject` hidden input inside the `<form>` tag |
| Success/error message wording | `showStatus(...)` calls inside the contact-form script block at the bottom of `assets/js/main.js` |

---

## Known Limitations

- **Requires one-time FormSubmit activation** (see above) before emails are delivered — this is a one-time step, not an ongoing requirement.
- **Free-tier FormSubmit** does not retain or archive submissions on their end beyond delivering the email — treat your inbox as the system of record.
- **No images or external fonts/icons** are used elsewhere on the site — all icons are emoji and effects are pure CSS, keeping the site fast and dependency-free.
- **No backend/database** beyond the FormSubmit relay — this remains a static site.

## Browser Support

Built with modern, broadly-supported CSS/JS (CSS Grid, `clamp()`, `IntersectionObserver`, `fetch`, `backdrop-filter`). Tested against current versions of Chrome, Edge, Firefox, and Safari.
