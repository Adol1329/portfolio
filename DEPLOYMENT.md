# Deployment & Operations Guide

## Architecture Overview

This portfolio is a **static React SPA** deployed on Vercel.

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React 18 + TypeScript + Vite | Public portfolio + admin panel |
| Routing | React Router v6 | `/` = portfolio, `/admin/*` = admin |
| Content storage | `localStorage` | Per-browser; see persistence note below |
| Auth | bcrypt hash in env var | Password never in source code |
| File hosting | Vercel static (`public/cv/`) | CV PDF served as a static asset |
| Deployment | Vercel | Free tier, auto-deploy from GitHub |

### Persistence Note

Content edited in the admin panel (projects, profile, skills) is stored in the **browser's localStorage**.
This means:
- Changes persist across page refreshes in the same browser ✅
- Changes are **not** shared across different browsers or devices ⚠️
- Changes are **not** lost on Vercel redeployment (they live in the browser, not the build) ✅

**To get true multi-device persistence**, integrate a backend such as:
- [Supabase](https://supabase.com) (free tier, Postgres + Storage)
- [Firebase Firestore](https://firebase.google.com)
- A custom Node/Express API

The data layer (`src/store/portfolioStore.ts`) is intentionally isolated so swapping
`localStorage` for an API requires changing only that file.

---

## Required Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_ADMIN_PASSWORD_HASH` | bcrypt hash (cost 12) of the admin password | ✅ Yes |

### Generating a new password hash

```bash
node -e "const b=require('bcryptjs');console.log(b.hashSync('YourNewPassword',12))"
```

Copy the output and set it as `VITE_ADMIN_PASSWORD_HASH`.

---

## Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/Adol1329/your-portfolio-repo.git
cd your-portfolio-repo

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env
# Edit .env and set VITE_ADMIN_PASSWORD_HASH

# 4. Start the dev server
npm run dev
# Open http://localhost:5173
```

### Admin panel (local)
- Visit: http://localhost:5173/admin/login
- Default password: `Admin@Portfolio2025`
- **Change this before deploying.**

---

## Creating / Changing the Admin Password

1. Generate a new hash:
   ```bash
   node -e "const b=require('bcryptjs');console.log(b.hashSync('YourNewSecurePassword',12))"
   ```
2. Copy the hash output.
3. Set it in your `.env` (local) and in Vercel environment variables (production).
4. Redeploy.

There is no public registration. Only one admin account is supported.

---

## Production Deployment (Vercel)

### First deployment

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo.
3. In **Environment Variables**, add:
   - `VITE_ADMIN_PASSWORD_HASH` = your bcrypt hash
4. Click **Deploy**.

### Subsequent deployments

```bash
git add .
git commit -m "your message"
git push origin main
```
Vercel auto-deploys on push to `main`.

### SPA routing

`vercel.json` is already configured to rewrite all routes to `index.html`,
so `/admin/login`, `/admin/dashboard`, etc. all work correctly.

---

## Updating the CV / Resume

### Option A — Manual (current setup)

1. Place your new PDF in `public/cv/` with the exact filename shown in the admin panel.
2. In the admin panel → **Resume / CV**, select the new file to update the metadata.
3. Commit and push:
   ```bash
   git add public/cv/
   git commit -m "Update CV"
   git push
   ```
4. Vercel will redeploy automatically.

### Option B — Without redeployment (requires backend storage)

Integrate [Supabase Storage](https://supabase.com/docs/guides/storage):
1. Create a Supabase project and a public bucket named `cv`.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your env.
3. Update `AdminResume.tsx` to upload to Supabase Storage.
4. Update `Resume.tsx` and `Hero.tsx` to read the CV URL from Supabase.

---

## Adding / Updating Projects

### Via admin panel (recommended)
1. Go to `/admin/login` and sign in.
2. Navigate to **Projects**.
3. Click **Add Project** or the edit icon on an existing project.
4. Fill in the form and click **Save Project**.
5. Toggle **Published** to make it visible publicly.

### Via source code
Edit `src/store/initialData.ts` — changes take effect on next build/deploy.
Note: localStorage data takes precedence over `initialData` once the site has been visited.
To reset to `initialData`, call `resetStore()` from the browser console:
```js
// In browser console on your portfolio domain:
localStorage.removeItem('portfolio_data');
location.reload();
```

---

## Backup & Recovery

### Backup localStorage data
In the browser console on your portfolio domain:
```js
console.log(JSON.stringify(localStorage.getItem('portfolio_data')));
```
Copy the output and save it.

### Restore from backup
```js
localStorage.setItem('portfolio_data', '<paste your backup here>');
location.reload();
```

### Reset to defaults
```js
localStorage.removeItem('portfolio_data');
location.reload();
```

---

## Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build (output: dist/)
npm run preview  # Preview production build locally
npm run lint     # ESLint
```

---

## File Structure

```
src/
  components/         # Public portfolio components (read from store)
  admin/
    components/       # AdminLayout, ProtectedRoute
    pages/            # AdminLogin, AdminDashboard, AdminProjects,
                      # AdminProfile, AdminSkills, AdminResume
  store/
    types.ts          # TypeScript interfaces
    initialData.ts    # Default seed data
    portfolioStore.ts # localStorage CRUD operations
    authStore.ts      # bcrypt login / session management
  App.tsx             # Route definitions
  main.tsx            # BrowserRouter entry point
public/
  cv/                 # CV PDF files
  3V9A1410==.jpg      # Profile photo
.env                  # Secrets (gitignored)
.env.example          # Template for env vars
vercel.json           # SPA rewrite rules
```

---

## Remaining Manual Steps

| Step | Action Required |
|---|---|
| Change admin password | Generate new hash, update `.env` and Vercel env var |
| Verify LinkedIn URL | Confirm `https://www.linkedin.com/in/adolphe-uwayo-173b1537b` is correct |
| Add AGUKA SMART FARMING KIT | Add via admin panel once GitHub/live URL is confirmed |
| Multi-device content sync | Integrate Supabase or Firebase (optional) |
| True CV file upload | Integrate Supabase Storage (optional) |
