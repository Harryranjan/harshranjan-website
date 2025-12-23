# Production Deployment Script
# Run this on your LOCAL machine

Write-Host "Starting deployment process..." -ForegroundColor Green

# Step 1: Build Frontend
Write-Host "`nBuilding frontend..." -ForegroundColor Cyan
cd "g:\AAA PROJECTS\Harsh Ranjan Website\frontend"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Frontend built successfully" -ForegroundColor Green

# Step 2: Upload frontend dist to server
Write-Host "`nUploading frontend to server..." -ForegroundColor Cyan
Write-Host "Enter server password when prompted:" -ForegroundColor Yellow

scp -r dist root@72.61.241.90:/tmp/drsubodh-frontend-dist

if ($LASTEXITCODE -ne 0) {
    Write-Host "Upload failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Frontend uploaded to /tmp/drsubodh-frontend-dist" -ForegroundColor Green

# Step 3: Package backend (excluding node_modules)
Write-Host "`nPackaging backend..." -ForegroundColor Cyan
cd "g:\AAA PROJECTS\Harsh Ranjan Website"

# Create a temporary directory for backend files
$tempDir = "g:\AAA PROJECTS\Harsh Ranjan Website\temp-deploy"
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy backend files (excluding node_modules)
Write-Host "Copying backend files..." -ForegroundColor Yellow
Copy-Item -Path "backend\*" -Destination $tempDir -Recurse -Exclude "node_modules","uploads","*.log"

# Upload backend to server
Write-Host "`nUploading backend to server..." -ForegroundColor Cyan
scp -r $tempDir root@72.61.241.90:/tmp/drsubodh-backend-deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "Upload failed!" -ForegroundColor Red
    Remove-Item -Recurse -Force $tempDir
    exit 1
}

# Cleanup
Remove-Item -Recurse -Force $tempDir
Write-Host "Backend uploaded to /tmp/drsubodh-backend-deploy" -ForegroundColor Green

Write-Host "`nFiles uploaded successfully!" -ForegroundColor Green
Write-Host "`nNext: Run the server setup commands in your SSH terminal" -ForegroundColor Cyan
Write-Host "File: server-setup-commands.sh" -ForegroundColor Yellow
