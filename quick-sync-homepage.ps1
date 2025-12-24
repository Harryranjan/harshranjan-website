# Quick Homepage Sync Script
Write-Host "🔄 Syncing Homepage to Production..." -ForegroundColor Green

# Step 1: Export from local database
Write-Host "`n📦 Step 1: Exporting homepage from local database..." -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$exportFile = "homepage-export-$timestamp.sql"

# Try export with empty password first
$env:MYSQL_PWD = ""
mysqldump -u root drsubodh_website pages --where="slug='home'" --skip-comments > $exportFile 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Enter your local MySQL root password:" -ForegroundColor Yellow
    $mysqlPass = Read-Host -AsSecureString
    $env:MYSQL_PWD = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($mysqlPass))
    mysqldump -u root drsubodh_website pages --where="slug='home'" --skip-comments > $exportFile
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Export failed!" -ForegroundColor Red
        exit 1
    }
}

$env:MYSQL_PWD = ""
Write-Host "✅ Exported to $exportFile" -ForegroundColor Green

# Step 2: Upload to server
Write-Host "`n📤 Step 2: Uploading to production server..." -ForegroundColor Cyan
Write-Host "Enter SSH password for root@72.61.241.90:" -ForegroundColor Yellow
scp $exportFile root@72.61.241.90:/tmp/homepage-sync.sql

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Uploaded to server" -ForegroundColor Green

# Step 3: Import on server
Write-Host "`n📥 Step 3: Importing to production database..." -ForegroundColor Cyan
Write-Host "Enter SSH password again:" -ForegroundColor Yellow

ssh root@72.61.241.90 "mysql -u drsubodh_user -p'Dr@Subodh2025!' drsubodh_website < /tmp/homepage-sync.sql ; rm /tmp/homepage-sync.sql ; echo 'Import successful'"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Import failed!" -ForegroundColor Red
    exit 1
}

# Cleanup
Remove-Item $exportFile -ErrorAction SilentlyContinue

Write-Host "`n✅ Homepage synced successfully!" -ForegroundColor Green
Write-Host "🌐 Check: https://drsubodh.harshranjan.in/pages/home" -ForegroundColor Cyan
Write-Host "💡 Note: Clear browser cache (Ctrl+Shift+R) to see changes" -ForegroundColor Yellow
