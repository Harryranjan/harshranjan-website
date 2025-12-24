# Restore Nginx Configuration for drsubodh.harshranjan.in
Write-Host "Restoring Nginx configuration..." -ForegroundColor Green

# Create temp config file locally
$nginxConfig = @"
server {
    listen 80;
    listen [::]:80;
    server_name drsubodh.harshranjan.in www.drsubodh.harshranjan.in;
    return 301 https://`$host`$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name drsubodh.harshranjan.in www.drsubodh.harshranjan.in;

    ssl_certificate /etc/letsencrypt/live/drsubodh.harshranjan.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/drsubodh.harshranjan.in/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/drsubodh-frontend;
    index index.html;

    location / {
        try_files `$uri `$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
        proxy_cache_bypass `$http_upgrade;
    }

    location /uploads/ {
        alias /var/www/drsubodh/backend/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
"@

# Save to temp file
$nginxConfig | Out-File -FilePath "drsubodh-nginx.conf" -Encoding ASCII -NoNewline

# Upload and install
scp drsubodh-nginx.conf root@72.61.241.90:/tmp/
ssh root@72.61.241.90 "sudo mv /tmp/drsubodh-nginx.conf /etc/nginx/sites-available/drsubodh.harshranjan.in && sudo ln -sf /etc/nginx/sites-available/drsubodh.harshranjan.in /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx && echo 'Nginx reloaded'"

# Cleanup
Remove-Item "drsubodh-nginx.conf" -ErrorAction SilentlyContinue

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Nginx configuration restored!" -ForegroundColor Green
    Write-Host "Visit: https://drsubodh.harshranjan.in" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Failed to restore nginx config" -ForegroundColor Red
}
