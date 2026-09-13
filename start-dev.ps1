<#
PowerShell helper to start the dev server from repo root.
Run from PowerShell: .\start-dev.ps1
#>
Push-Location -Path (Join-Path $PSScriptRoot 'react')
if (-not (Test-Path 'node_modules')) {
  Write-Host "Installing dependencies..."
  npm install
}
Write-Host "Starting Vite dev server..."
npm run dev
Pop-Location
