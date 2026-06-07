# ConcretIQ AI — Deployment Guide

> AI-powered construction chemicals specification platform  
> Built on Mapei product intelligence · Powered by Claude AI

---

## What You're Deploying

| File | Purpose |
|------|---------|
| `index.html` | Complete single-page platform |
| `functions/api/consult.js` | Cloudflare Pages Function (secure AI proxy) |
| `_headers` | Security headers |
| `_redirects` | SPA routing |
| `wrangler.toml` | Cloudflare project config |

---

## Prerequisites

Install these before starting:

```bash
# Node.js (v18+) — https://nodejs.org
node --version   # should show v18+

# Git — https://git-scm.com
git --version

# Wrangler CLI (Cloudflare's tool)
npm install -g wrangler
wrangler --version
```

---

## STEP 1 — Get Your Anthropic API Key

1. Go to **https://console.anthropic.com**
2. Sign in or create an account
3. Click **API Keys** in the left sidebar
4. Click **Create Key**
5. Copy the key — it starts with `sk-ant-...`
6. **Save it somewhere safe** — you only see it once

---

## STEP 2 — Create a GitHub Repository

### Option A — GitHub Website (easiest)

1. Go to **https://github.com/new**
2. Repository name: `concretiq` (or any name you like)
3. Set to **Public** (required for Cloudflare Pages free tier) or **Private** (with paid plan)
4. **Do NOT** check "Add README" — leave it empty
5. Click **Create repository**

### Option B — GitHub CLI

```bash
gh repo create concretiq --public
```

---

## STEP 3 — Push Your Files to GitHub

Open your terminal / command prompt in the folder where you downloaded these files:

```bash
# Navigate to your project folder
cd /path/to/concretiq

# Initialise git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "Initial ConcretIQ deployment"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/concretiq.git

# Push
git push -u origin main
```

**Verify on GitHub:** go to `https://github.com/YOUR_USERNAME/concretiq` and confirm all files appear:
- `index.html`
- `functions/api/consult.js`
- `_headers`
- `_redirects`
- `wrangler.toml`
- `README.md`

---

## STEP 4 — Create a Cloudflare Account

1. Go to **https://dash.cloudflare.com/sign-up**
2. Enter your email and create a password
3. Verify your email address
4. You are now on the **Free plan** — no credit card needed

---

## STEP 5 — Connect GitHub to Cloudflare Pages

1. In Cloudflare dashboard, click **Workers & Pages** in the left sidebar
2. Click **Create application**
3. Click the **Pages** tab
4. Click **Connect to Git**
5. Click **Connect GitHub**
6. Authorise Cloudflare to access your GitHub (click **Authorise Cloudflare Pages**)
7. Select your repository: `concretiq`
8. Click **Begin setup**

---

## STEP 6 — Configure the Build Settings

On the "Set up builds and deployments" screen:

| Setting | Value |
|---------|-------|
| Project name | `concretiq` |
| Production branch | `main` |
| Framework preset | **None** |
| Build command | *(leave blank)* |
| Build output directory | *(leave blank or `/`)* |
| Root directory | *(leave blank)* |

Click **Save and Deploy**

Cloudflare will now deploy your site. This takes about 60 seconds.  
You'll see a URL like: `https://concretiq.pages.dev`

---

## STEP 7 — Add Your Anthropic API Key (SECRET)

This is the most important step. The API key must NEVER go in your code.

1. In Cloudflare dashboard → **Workers & Pages**
2. Click your project `concretiq`
3. Click **Settings** tab
4. Click **Environment variables**
5. Under **Production**, click **Add variable**
6. Set:
   - **Variable name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your key (`sk-ant-...`)
   - Click the **Encrypt** toggle to make it a secret
7. Click **Save**

Then also add it for Preview deployments:
- Repeat the above under **Preview** environment

---

## STEP 8 — Trigger a Redeploy

After adding the API key, redeploy so the function picks it up:

1. Go to **Workers & Pages** → your project
2. Click **Deployments** tab
3. Click the three dots `...` next to the latest deployment
4. Click **Retry deployment**

Or push any small change to trigger it:

```bash
# In your local project folder
echo "" >> README.md
git add .
git commit -m "Trigger redeploy after adding API key"
git push
```

---

## STEP 9 — Test Your Live Site

1. Visit `https://concretiq.pages.dev` (or your custom domain)
2. Click **Begin AI Consultation**
3. Select a module (e.g. **Waterproofing Expert**)
4. Answer all questions
5. Click **Generate Specification**
6. You should see the AI-generated spec appear in ~15–30 seconds

**If the AI generation fails**, the platform automatically shows an offline specification preview using built-in Mapei data — so it always works.

---

## STEP 10 — Add a Custom Domain (Optional)

To use `concretiq.ai` or `yoursite.com` instead of `pages.dev`:

1. Buy your domain from any registrar (Namecheap, GoDaddy, Google Domains, etc.)
2. In Cloudflare Pages → your project → **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain name
5. Follow the DNS instructions shown

If your domain is registered through Cloudflare, it connects automatically.  
If through another registrar, you'll update your domain's nameservers to Cloudflare's.

---

## Local Development (Optional)

To run and test locally before deploying:

```bash
# Install Wrangler locally
npm install -g wrangler

# Log in to Cloudflare
wrangler login

# Set your API key locally for testing
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .dev.vars

# Start local dev server (includes Functions support)
wrangler pages dev . --compatibility-date=2024-01-01

# Open http://localhost:8788
```

---

## Making Updates

Any time you update files and push to GitHub, Cloudflare auto-deploys:

```bash
# Edit your files locally, then:
git add .
git commit -m "Update: improved wizard questions"
git push
```

Cloudflare Pages detects the push and deploys in ~30–60 seconds.

---

## Troubleshooting

### "Unexpected end of JSON input" or API errors
- Check the API key is correctly set in Cloudflare environment variables
- Make sure you clicked **Encrypt** and saved
- Trigger a redeploy after adding the key

### Functions not working (500 error)
- Go to Cloudflare → Workers & Pages → your project → **Functions** tab
- Check the **Invocation logs** for error details
- Ensure `functions/api/consult.js` is in the repository

### Site not updating after git push
- Check **Deployments** tab — look for failed builds
- Verify your production branch is set to `main`

### CORS errors in browser console
- The `_headers` file handles CORS — ensure it was committed to GitHub
- Check it appears at the root level of your repo

---

## Project Structure

```
concretiq/
├── index.html              ← Complete frontend platform
├── functions/
│   └── api/
│       └── consult.js      ← Cloudflare Pages Function (AI proxy)
├── _headers                ← Security + CORS headers
├── _redirects              ← SPA routing
├── wrangler.toml           ← Cloudflare project config
└── README.md               ← This file
```

---

## Architecture

```
Browser (index.html)
    │
    │  POST /api/consult
    │  {module, answers}
    ▼
Cloudflare Pages Function
(functions/api/consult.js)
    │
    │  Reads ANTHROPIC_API_KEY secret
    │  Builds expert system prompt
    │  Calls Anthropic API
    ▼
Claude AI (claude-sonnet-4-20250514)
    │
    │  Returns structured JSON spec
    ▼
Cloudflare Pages Function
    │
    │  Parses + validates JSON
    │  Returns to browser
    ▼
Browser renders:
  • System Layers
  • Technical Specification
  • BOQ
  • Method Statement
  • ITP
  • Risk Register
  • Value Engineering
```

---

## Cost Estimate

| Service | Cost |
|---------|------|
| Cloudflare Pages | **Free** (unlimited requests) |
| Cloudflare Functions | **Free** (100,000 req/day) |
| Anthropic API | ~$0.003 per consultation (Sonnet) |
| Custom domain | ~$10–15/year |

**Estimated cost for 1,000 consultations/month: ~$3 USD**

---

## Support

- Cloudflare Pages docs: https://developers.cloudflare.com/pages/
- Anthropic API docs: https://docs.anthropic.com/
- Mapei technical support: https://www.mapei.com/

---

*ConcretIQ AI — Built for construction professionals across the UAE and beyond.*
