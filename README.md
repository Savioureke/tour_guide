# Tour Guard — React + Tailwind Scaffold

This repo contains the original static site in `public/` and a React + Vite app scaffold under `react/` that reuses the original assets and CSS to keep the design identical.

Quick start (local)

```bash
cd react
npm install
npm run dev
```

Build (production)

```bash
cd react
npm run build
```

Deployment to Vercel

1. Push the repository to GitHub.
2. In Vercel, import the GitHub repo and select the root project. Vercel will use `vercel.json` to build `react/dist`.
   - Build Command: `npm run build`
   - Output Directory: `react/dist`

CI

There is a GitHub Actions workflow at `.github/workflows/ci.yml` that builds the React app on push.

Notes

- The React app is wired to serve the existing `public/` folder (`vite.config.js` publicDir) so visuals remain pixel-perfect.
- Tailwind is configured for progressive migration; currently the app uses the original `assets/css/theme.css` to preserve styles.
## Jadoo theme by ThemeWagon team.
---
Thank you for using Jadoo See the "public" folder, you will find everything ready to use there. If you want to use the gulp based workflow, cd to this directory in your terminal and run this command: npm i && gulp