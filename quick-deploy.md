# 🚀 Quick Deployment Guide

## 🔥 Quick Update (Git-Based) - **RECOMMENDED**

If Git is already set up on the server, use this super-fast method:

### 1️⃣ Make Changes Locally

```powershell
# Make your code changes
git add .
git commit -m "Your changes"
git push origin master
```

### 2️⃣ Update Server

```bash
# SSH to server
ssh root@72.61.241.90

# Run update script
~/update-backend.sh
```

**Done! Backend updated in 10 seconds!** ✅

---

## 📦 Full Deployment (SCP Upload Method)

### Step 1️⃣: On Your Local Machine (PowerShell)

```powershell
cd "g:\AAA PROJECTS\Harsh Ranjan Website"
.\deploy-to-server.ps1
```

This will:

- ✅ Build the frontend
- ✅ Upload frontend to server
- ✅ Upload backend to server

**You'll be prompted for server password 2 times.**

---

## Step 2️⃣: On Your Server (SSH Terminal)

### Option A: Automated Setup

```bash
# Copy the setup script to server
cd /tmp
cat > server-setup.sh << 'EOF'
# Paste the entire content of server-setup-commands.sh here
EOF

chmod +x server-setup.sh
./server-setup.sh
```

### Option B: Manual Commands

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo bash -
sudo apt install -y nodejs

# 2. Install PM2 and Nginx
sudo npm install -g pm2
sudo apt install -y nginx

# 3. Create database
sudo mysql -u root -p
```

In MySQL:

```sql
CREATE DATABASE drsubodh_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'drsubodh_user'@'localhost' IDENTIFIED BY 'YourPassword123!';
GRANT ALL PRIVILEGES ON drsubodh_website.* TO 'drsubodh_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```bash
# 4. Setup directories
sudo mkdir -p /var/www/drsubodh/backend
sudo mkdir -p /var/www/drsubodh-frontend

# 5. Move files
sudo cp -r /tmp/drsubodh-backend-deploy/* /var/www/drsubodh/backend/
sudo cp -r /tmp/drsubodh-frontend-dist/* /var/www/drsubodh-frontend/

# 6. Install backend dependencies
cd /var/www/drsubodh/backend
npm install --production

# 7. Setup .env
cp .env.production .env
nano .env
```

Update in .env:

- DB_PASSWORD
- JWT_SECRET (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- EMAIL_USER
- EMAIL_PASSWORD

```bash
# 8. Import database
mysql -u drsubodh_user -p drsubodh_website < database-schema.sql

# 9. Start backend
pm2 start server.js --name drsubodh-backend
pm2 save
sudo pm2 startup

# 10. Configure Nginx
sudo nano /etc/nginx/sites-available/drsubodh
```

Paste nginx config (see server-setup-commands.sh), then:

```bash
sudo ln -s /etc/nginx/sites-available/drsubodh /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 11. Setup SSL
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d drsubodh.harshranjan.in
```

---

## ✅ Verify Deployment

```bash
# Check backend
pm2 status
pm2 logs drsubodh-backend

# Check in browser
# Visit: https://drsubodh.harshranjan.in
```

---

## 🔄 Future Updates

### Option 1: Quick Update with Git (Fastest) ⚡

```bash
# SSH to server
ssh root@72.61.241.90

# Run the update script
~/update-backend.sh
```

This script automatically:

- Fetches latest code from GitHub
- Updates backend to latest commit
- Installs new dependencies
- Restarts PM2
- Shows status

### Option 2: Manual Update

```bash
cd /var/www/drsubodh/backend
git fetch origin master
git reset --hard origin/master
npm install
pm2 restart drsubodh-backend
```

### Update Frontend:

```powershell
# On local machine
cd "g:\AAA PROJECTS\Harsh Ranjan Website\frontend"
npm run build
scp -r dist root@72.61.241.90:/var/www/drsubodh-frontend
```

---

## 🆘 Troubleshooting

### Backend not starting?

```bash
pm2 logs drsubodh-backend
# Check .env file
# Verify database credentials
```

### Frontend not loading?

```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Database connection failed?

```bash
mysql -u drsubodh_user -p
# Test connection
```
