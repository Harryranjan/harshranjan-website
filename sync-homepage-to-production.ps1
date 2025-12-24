# Sync Homepage to Production Server
# This script exports the homepage from local DB and imports to production

param(
    [string]$ServerIP = "72.61.241.90",
    [string]$DBUser = "drsubodh_user",
    [string]$DBName = "drsubodh_website"
)

Write-Host "🔄 Starting Homepage Sync to Production..." -ForegroundColor Green

# Step 1: Export homepage from local database
Write-Host "`n📦 Exporting homepage from local database..." -ForegroundColor Cyan
$exportFile = "homepage-sync-$(Get-Date -Format 'yyyyMMdd-HHmmss').sql"

mysqldump -u root -p drsubodh_website pages --where="slug='home'" > $exportFile

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Export failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Exported to $exportFile" -ForegroundColor Green

# Step 2: Upload to server
Write-Host "`n📤 Uploading to server..." -ForegroundColor Cyan
Write-Host "Enter server password when prompted:" -ForegroundColor Yellow

scp $exportFile root@${ServerIP}:/tmp/

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Uploaded to server" -ForegroundColor Green

# Step 3: SSH and import
Write-Host "`n📥 Importing to production database..." -ForegroundColor Cyan
Write-Host "You'll be prompted for:" -ForegroundColor Yellow
Write-Host "  1. Server SSH password" -ForegroundColor Yellow
Write-Host "  2. Database password" -ForegroundColor Yellow

ssh root@${ServerIP} "mysql -u $DBUser -p $DBName < /tmp/$exportFile && rm /tmp/$exportFile"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Import failed!" -ForegroundColor Red
    exit 1
}

# Cleanup local file
Remove-Item $exportFile

Write-Host "`n✅ Homepage synced successfully!" -ForegroundColor Green
Write-Host "🌐 Visit: https://drsubodh.harshranjan.in/pages/home" -ForegroundColor Cyan
