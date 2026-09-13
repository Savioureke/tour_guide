# PowerShell release helper: builds the React app and shows next git commands.
Set-Location -Path (Join-Path $PSScriptRoot "..\react")
Write-Host "Building React app..."
npm run build
Write-Host "\nBuild complete. Next steps (run from repo root):"
Write-Host "  git add ."
Write-Host "  git commit -m \"chore: add React+Tailwind scaffold; migrate Hero/Service POC\""
Write-Host "  git push origin main"
Write-Host "\nThen import the repo to Vercel and set Build Command: 'npm run build' and Output Directory: 'react/dist' or let vercel.json handle it."
