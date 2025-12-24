# Deploy Frontend to Production
Write-Host "Deploying frontend to production..." -ForegroundColor Green

Write-Host "`nBuilding frontend..." -ForegroundColor Cyan
cd "G:\AAA PROJECTS\Harsh Ranjan Website\frontend"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`nCreating backup and uploading..." -ForegroundColor Cyan
ssh root@72.61.241.90 "sudo cp -r /var/www/drsubodh-frontend /var/www/drsubodh-frontend-backup-`$(date +%Y%m%d-%H%M%S) && ls -dt /var/www/drsubodh-frontend-backup-* | tail -n +4 | xargs -r sudo rm -rf"

scp -r dist/* root@72.61.241.90:/tmp/drsubodh-frontend-new/
ssh root@72.61.241.90 "sudo cp -r /tmp/drsubodh-frontend-new/* /var/www/drsubodh-frontend/ && rm -rf /tmp/drsubodh-frontend-new"

Write-Host "`n✅ Frontend deployed successfully!" -ForegroundColor Green
Write-Host "Visit: https://drsubodh.harshranjan.in" -ForegroundColor Cyan
