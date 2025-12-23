#!/bin/bash
# Server Setup Commands
# Run these commands in your SSH terminal (connected to 72.61.241.90)

set -e  # Exit on error

echo "🚀 Starting server setup..."

# Colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install required software
echo -e "${CYAN}📦 Installing required software...${NC}"
sudo apt update
sudo apt install -y curl

# Install Node.js 18
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Installing Node.js...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo bash -
    sudo apt install -y nodejs
fi

echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"
echo -e "${GREEN}✅ NPM version: $(npm --version)${NC}"

# Install PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    sudo npm install -g pm2
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Installing Nginx...${NC}"
    sudo apt install -y nginx
fi

# Step 2: Setup database
echo -e "${CYAN}📊 Setting up database...${NC}"
echo "Run these MySQL commands manually:"
echo "  sudo mysql -u root -p"
echo "  CREATE DATABASE drsubodh_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo "  CREATE USER 'drsubodh_user'@'localhost' IDENTIFIED BY 'YourStrongPassword123!';"
echo "  GRANT ALL PRIVILEGES ON drsubodh_website.* TO 'drsubodh_user'@'localhost';"
echo "  FLUSH PRIVILEGES;"
echo "  EXIT;"
echo ""
read -p "Press Enter after creating the database..."

# Step 3: Setup directories
echo -e "${CYAN}📁 Setting up directories...${NC}"
sudo mkdir -p /var/www/drsubodh/backend
sudo mkdir -p /var/www/drsubodh-frontend

# Step 4: Move uploaded files
echo -e "${CYAN}📂 Moving uploaded files...${NC}"
sudo cp -r /tmp/drsubodh-backend-deploy/* /var/www/drsubodh/backend/
sudo cp -r /tmp/drsubodh-frontend-dist/* /var/www/drsubodh-frontend/

# Step 5: Setup backend
echo -e "${CYAN}⚙️  Setting up backend...${NC}"
cd /var/www/drsubodh/backend

# Install dependencies
echo -e "${YELLOW}Installing backend dependencies...${NC}"
npm install --production

# Setup .env file
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.production .env
    
    echo -e "${YELLOW}Generating JWT secret...${NC}"
    JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    
    # Update .env with generated JWT secret
    sed -i "s/REPLACE_WITH_STRONG_SECRET_MIN_32_CHARS/$JWT_SECRET/" .env
    
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANT: Edit /var/www/drsubodh/backend/.env and update:${NC}"
    echo "  - DB_PASSWORD"
    echo "  - EMAIL_USER"
    echo "  - EMAIL_PASSWORD"
    echo ""
    read -p "Press Enter after editing .env file..."
fi

# Import database schema
echo -e "${CYAN}📊 Importing database schema...${NC}"
if [ -f database-schema.sql ]; then
    mysql -u drsubodh_user -p drsubodh_website < database-schema.sql
    echo -e "${GREEN}✅ Database schema imported${NC}"
fi

# Step 6: Start backend with PM2
echo -e "${CYAN}🚀 Starting backend...${NC}"
pm2 stop drsubodh-backend 2>/dev/null || true
pm2 delete drsubodh-backend 2>/dev/null || true
pm2 start server.js --name drsubodh-backend
pm2 save
sudo pm2 startup

echo -e "${GREEN}✅ Backend started${NC}"

# Step 7: Configure Nginx
echo -e "${CYAN}🌐 Configuring Nginx...${NC}"

sudo tee /etc/nginx/sites-available/drsubodh > /dev/null <<'EOF'
server {
    listen 80;
    server_name drsubodh.harshranjan.in;

    location / {
        root /var/www/drsubodh-frontend;
        try_files $uri $uri/ /index.html;
    }

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

    location /uploads {
        alias /var/www/drsubodh/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/drsubodh /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

echo -e "${GREEN}✅ Nginx configured${NC}"

# Step 8: Setup SSL
echo -e "${CYAN}🔒 Setting up SSL...${NC}"
if ! command -v certbot &> /dev/null; then
    sudo apt install -y certbot python3-certbot-nginx
fi

echo -e "${YELLOW}Running Certbot for SSL certificate...${NC}"
sudo certbot --nginx -d drsubodh.harshranjan.in --non-interactive --agree-tos --email admin@harshranjan.in || {
    echo -e "${YELLOW}⚠️  Automatic SSL setup failed. Run manually:${NC}"
    echo "  sudo certbot --nginx -d drsubodh.harshranjan.in"
}

# Step 9: Set permissions
echo -e "${CYAN}🔐 Setting permissions...${NC}"
sudo chown -R www-data:www-data /var/www/drsubodh-frontend
sudo chown -R www-data:www-data /var/www/drsubodh/backend/uploads
sudo chmod -R 755 /var/www/drsubodh-frontend

# Step 10: Cleanup
echo -e "${CYAN}🧹 Cleaning up...${NC}"
rm -rf /tmp/drsubodh-backend-deploy
rm -rf /tmp/drsubodh-frontend-dist

# Final status
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${CYAN}📊 Status:${NC}"
pm2 status
echo ""
echo -e "${CYAN}🌐 Your site should be live at:${NC}"
echo "  http://drsubodh.harshranjan.in"
echo "  https://drsubodh.harshranjan.in (if SSL setup succeeded)"
echo ""
echo -e "${CYAN}📋 Useful commands:${NC}"
echo "  pm2 logs drsubodh-backend  - View backend logs"
echo "  pm2 restart drsubodh-backend  - Restart backend"
echo "  pm2 status  - Check process status"
echo "  sudo systemctl status nginx  - Check Nginx status"
echo "  sudo tail -f /var/log/nginx/error.log  - View Nginx errors"
