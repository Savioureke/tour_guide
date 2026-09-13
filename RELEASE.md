# Release & Deployment Steps

1. Build the React app locally (from repo root):

```powershell
cd react
npm install
npm run build
```

2. Commit and push to GitHub (from repo root):

```bash
git add .
git commit -m "chore: add React+Tailwind scaffold; migrate Hero/Service POC"
git push origin main
```

3. Deploy on Vercel:
- Go to https://vercel.com/import and import your GitHub repo.
- Vercel will detect the project. If it doesn't, set:
  - Root: repository root
  - Build Command: `npm run build`
  - Output Directory: `react/dist`
- Alternatively Vercel will use `vercel.json` present in the repo to locate `react/package.json` and `react/dist`.

4. Verify:
- After deployment, open the site and compare against the original `public/index.html` for pixel parity.

Notes
- If you want me to push and finish the Git steps, I can prepare a patch for you to apply or provide the exact `git` commands to run in your environment.
