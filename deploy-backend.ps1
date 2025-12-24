# Deploy Backend to Production via Git Pull
Write-Host "Deploying backend to production..." -ForegroundColor Green

# Pull latest changes and restart
ssh root@72.61.241.90 @"
cd /var/www/drsubodh/backend
echo '=== Checking .env file ==='
if [ ! -f .env ]; then
    echo 'ERROR: .env file missing! Please create it before deploying.'
    exit 1
fi
echo '.env file exists'
echo ''
echo '=== Pulling latest changes ==='
git pull origin master
if [ \`$?\` -ne 0 ]; then
    echo 'ERROR: Git pull failed!'
    exit 1
fi
echo ''
echo '=== Installing dependencies ==='
npm install --production
echo ''
echo '=== Restarting backend ==='
pm2 restart drsubodh-backend
pm2 list | grep drsubodh-backend
"@

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Backend deployed successfully!" -ForegroundColor Green
    Write-Host "Visit: https://drsubodh.harshranjan.in" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Deployment failed!" -ForegroundColor Red
}
