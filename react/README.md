# React + Tailwind scaffold for Tour Guard

This folder contains a Vite React app scaffold that uses the existing `public/` assets and CSS to preserve the exact design, fonts and text.

Quick start

```bash
cd react
npm install
npm run dev
```

Build

```bash
npm run build
# serve the `dist` directory or deploy to Vercel
```

Notes
- The app uses `public/` at the repo root as the public directory (configured in `vite.config.js`).
- The original `assets/css/theme.css` is included in `index.html` to preserve design exactly; Tailwind is available for progressive conversion.

Deployment
- Push the repo to GitHub and connect the `react` folder as the project root in Vercel (set Build Command: `npm run build`, Output Directory: `react/dist`).
