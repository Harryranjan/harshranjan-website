# Deploy Both Backend and Frontend to Production
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Full Deployment to Production" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Deploy Backend
Write-Host "`n[1/2] Deploying Backend..." -ForegroundColor Yellow
.\deploy-backend.ps1

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Backend deployment failed! Stopping." -ForegroundColor Red
    exit 1
}

# Deploy Frontend
Write-Host "`n[2/2] Deploying Frontend..." -ForegroundColor Yellow
.\deploy-frontend.ps1

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "  ✅ Full Deployment Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "`nWebsite: https://drsubodh.harshranjan.in" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Frontend deployment failed!" -ForegroundColor Red
}
