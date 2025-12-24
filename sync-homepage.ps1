# Quick Homepage Sync
Write-Host "Syncing Homepage to Production..." -ForegroundColor Green

$mysqldump = "C:\Program Files\MySQL\MySQL Workbench 8.0 CE\mysqldump.exe"

# Step 1: Export from local database
Write-Host "`nStep 1: Exporting homepage..." -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$exportFile = "homepage-export-$timestamp.sql"

& $mysqldump -u root --password="" drsubodh_website pages --where="slug='home'" --skip-comments > $exportFile 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Enter your local MySQL root password:" -ForegroundColor Yellow
    & $mysqldump -u root -p drsubodh_website pages --where="slug='home'" --skip-comments > $exportFile
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Export failed!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Exported to $exportFile" -ForegroundColor Green

# Step 2: Upload to server
Write-Host "`nStep 2: Uploading to server..." -ForegroundColor Cyan
scp $exportFile root@72.61.241.90:/tmp/homepage-sync.sql

if ($LASTEXITCODE -ne 0) {
    Write-Host "Upload failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Uploaded successfully" -ForegroundColor Green

# Step 3: Import on server
Write-Host "`nStep 3: Importing to production..." -ForegroundColor Cyan
ssh root@72.61.241.90 "bash -c 'mysql -u drsubodh_user -pDr@Subodh2025! drsubodh_website < /tmp/homepage-sync.sql && rm /tmp/homepage-sync.sql && echo Import successful'"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Import failed!" -ForegroundColor Red
    exit 1
}

# Cleanup
Remove-Item $exportFile -ErrorAction SilentlyContinue

Write-Host "`nHomepage synced successfully!" -ForegroundColor Green
Write-Host "Check: https://drsubodh.harshranjan.in/pages/home" -ForegroundColor Cyan
Write-Host "Note: Clear browser cache (Ctrl+Shift+R) to see changes" -ForegroundColor Yellow
