# 🚀 Production Deployment Guide

## Server Details

- **Domain:** harshranjan.in
- **Subdomain:** drsubodh.harshranjan.in
- **IP Address:** 72.61.241.90
- **Access:** SSH terminal available

---

## 📋 Pre-Deployment Checklist

### 1. Server Preparation

```bash
# SSH into your server
ssh root@72.61.241.90

# Update system
apt update && apt upgrade -y

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install MySQL
apt install -y mysql-server

# Install PM2 (Process Manager)
npm install -g pm2

# Install Nginx (Web Server)
apt install -y nginx
```

### 2. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE drsubodh_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create user (optional - recommended)
CREATE USER 'drsubodh_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON drsubodh_website.* TO 'drsubodh_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 🔧 Backend Deployment

### 1. Upload Backend Code

```bash
# On your local machine
cd "g:\AAA PROJECTS\Harsh Ranjan Website"

# Create deployment package (exclude unnecessary files)
# You can use git or manually upload

# OR push to GitHub and clone on server
git add .
git commit -m "Production ready"
git push origin master
```

### 2. On Server - Setup Backend

```bash
# Clone repository (if using Git)
cd /var/www
git clone YOUR_REPO_URL drsubodh-backend
cd drsubodh-backend/backend

# OR upload files manually to /var/www/drsubodh-backend/backend

# Install dependencies
npm install --production

# Copy production environment file
cp .env.production .env

# Edit .env with actual values
nano .env
```

### 3. Update .env File

```env
PORT=5000
NODE_ENV=production
DB_HOST=localhost
DB_USER=drsubodh_user
DB_PASSWORD=YOUR_ACTUAL_PASSWORD
DB_NAME=drsubodh_website
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=YOUR_APP_PASSWORD
EMAIL_FROM=noreply@harshranjan.in
FRONTEND_URL=https://drsubodh.harshranjan.in
```

### 4. Run Database Migrations

```bash
# If you have migrations
npm run migrate

# OR import schema manually
mysql -u drsubodh_user -p drsubodh_website < database-schema.sql
```

### 5. Start Backend with PM2

```bash
pm2 start server.js --name drsubodh-backend
pm2 save
pm2 startup
```

---

## 🎨 Frontend Deployment

### 1. Build Frontend Locally

```bash
# On your local machine
cd "g:\AAA PROJECTS\Harsh Ranjan Website\frontend"

# Copy production env file
cp .env.production .env.production.local

# Edit if needed (should already be configured)
# VITE_API_URL=https://drsubodh.harshranjan.in/api

# Build for production
npm run build
```

### 2. Upload to Server

```bash
# Upload the 'dist' folder to server
# Using SCP (from local machine)
scp -r dist root@72.61.241.90:/var/www/drsubodh-frontend

# OR manually upload the dist folder
```

### 3. Configure Nginx

```bash
# On server
nano /etc/nginx/sites-available/drsubodh
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name drsubodh.harshranjan.in;

    # Frontend
    location / {
        root /var/www/drsubodh-frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Static files (uploads)
    location /uploads {
        alias /var/www/drsubodh-backend/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site and restart Nginx:

```bash
ln -s /etc/nginx/sites-available/drsubodh /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 🔒 SSL/HTTPS Setup (Recommended)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate for your subdomain
certbot --nginx -d drsubodh.harshranjan.in

# Optional: Add main domain too
certbot --nginx -d harshranjan.in -d www.harshranjan.in

# Auto-renewal is configured automatically
certbot renew --dry-run
```

The frontend .env.production is already configured for HTTPS:

```env
VITE_API_URL=https://drsubodh.harshranjan.in/api
```

---

## 🧪 Testingharshranjan.in/api/health

# Or with IP: curl http://72.61.241.90:5000/api/health

````

### 2. Test Frontend
```bash
curl http://drsubodh.harshranjan.in
# Or with IP: curl http://72.61.241.90
````

### 3. Test in Browser

- Open: `https://drsubodh.harshranjan.in` (with SSL)
- Or: `http://drsubodh.harshranjan.in` (without SSL)
- Check browser console for errors
- Test form submissions
- Check API calls

### 4. DNS Verification

````bash
# Verify DNS is pointing correctly
nslookup drsubodh.harshranjan.in
# Should show: 72.61.241.90
```owser
- Open: `http://drsubodh.72.61.241.90`
- Check browser console for errors
- Test form submissions
- Check API calls

---

## 📊 Monitoring

```bash
# View backend logs
pm2 logs drsubodh-backend

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Monitor PM2 processes
pm2 monit
````

---

## 🔄 Updates & Maintenance

### Update Backend

```bash
cd /var/www/drsubodh-backend/backend
git pull origin master
npm install --production
pm2 restart drsubodh-backend
```

### Update Frontend

```bash
# Build locally
npm run build

# Upload new dist folder
scp -r dist root@72.61.241.90:/var/www/drsubodh-frontend
```

---

## 🆘 Troubleshooting

### CORS Errors

- Check `FRONTEND_URL` in backend .env
- Verify allowedOrigins in server.js includes your domain

### API Not Found (404)

- Check `VITE_API_URL` in frontend .env
- Verify backend is running: `pm2 status`
- Check Nginx proxy configuration

### Database Connection Failed

- Verify MySQL is running: `systemctl status mysql`
- Check database credentials in .env
- Test connection: `mysql -u drsubodh_user -p`

### Permission Errors

```bash
# Fix file permissions
chown -R www-data:www-data /var/www/drsubodh-frontend
chown -R www-data:www-data /var/www/drsubodh-backend/backend/uploads
chmod -R 755 /var/www/drsubodh-frontend
```

---

## 🎯 Quick Commands

```bash
# Restart everything
pm2 restart all
systemctl restart nginx

# View all logs
pm2 logs

# Stop backend
pm2 stop drsubodh-backend

# Start backend
pm2 start drsubodh-backend

# Check status
pm2 status
systemctl status nginx
systemctl status mysql
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend running and accessible
- [ ] Frontend loading correctly
- [ ] Database connected
- [ ] Forms submitting successfully
- [ ] Email notifications working
- [ ] File uploads working
- [ ] All pages loading
- [ ] SSL certificate installed (if using domain)
- [ ] Firewall configured (allow ports 80, 443)
- [ ] PM2 startup script enabled
- [ ] Regular backups scheduled

---

**Need Help?** Check the logs first:

- Backend: `pm2 logs drsubodh-backend`
- Nginx: `tail -f /var/log/nginx/error.log`
- MySQL: `tail -f /var/log/mysql/error.log`
