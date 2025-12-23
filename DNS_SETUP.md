# 🌐 DNS Configuration Guide

## Domain: harshranjan.in
**Subdomain:** drsubodh.harshranjan.in  
**Server IP:** 72.61.241.90

---

## 📋 DNS Records to Add

Login to your domain registrar (GoDaddy, Namecheap, CloudFlare, etc.) and add these DNS records:

### **A Records**

| Type | Name/Host | Value/Points To | TTL |
|------|-----------|----------------|-----|
| A | drsubodh | 72.61.241.90 | 3600 |
| A | @ | 72.61.241.90 | 3600 |
| A | www | 72.61.241.90 | 3600 |

### **Optional: CNAME (Alternative to A record for www)**

| Type | Name/Host | Value/Points To | TTL |
|------|-----------|----------------|-----|
| CNAME | www | harshranjan.in | 3600 |

---

## 🔧 Provider-Specific Instructions

### **GoDaddy**
1. Login to GoDaddy
2. Go to **My Products** > **DNS**
3. Click **Add** under Records
4. Select **A** record type
5. Enter:
   - **Name:** drsubodh
   - **Value:** 72.61.241.90
   - **TTL:** 1 Hour (3600)
6. Click **Save**

### **Namecheap**
1. Login to Namecheap
2. Go to **Domain List** > Click **Manage**
3. Go to **Advanced DNS** tab
4. Click **Add New Record**
5. Select **A Record**
6. Enter:
   - **Host:** drsubodh
   - **Value:** 72.61.241.90
   - **TTL:** Automatic
7. Click **Save**

### **Cloudflare** (Recommended for CDN & SSL)
1. Login to Cloudflare
2. Select your domain **harshranjan.in**
3. Go to **DNS** tab
4. Click **Add record**
5. Enter:
   - **Type:** A
   - **Name:** drsubodh
   - **IPv4 address:** 72.61.241.90
   - **Proxy status:** Proxied (orange cloud) for CDN & DDoS protection
   - **TTL:** Auto
6. Click **Save**

**Bonus:** Cloudflare provides free SSL automatically!

---

## ✅ Verify DNS Propagation

### **Method 1: Command Line**
```bash
# Windows (PowerShell)
nslookup drsubodh.harshranjan.in

# Should return:
# Name:    drsubodh.harshranjan.in
# Address: 72.61.241.90
```

### **Method 2: Online Tools**
- https://dnschecker.org
- https://www.whatsmydns.net
- Enter: `drsubodh.harshranjan.in`
- Check if it resolves to `72.61.241.90`

### **Method 3: Browser**
```bash
# Try accessing via domain
http://drsubodh.harshranjan.in
```

---

## ⏱️ DNS Propagation Time

- **Typical:** 15 minutes - 2 hours
- **Maximum:** Up to 48 hours (rare)
- **With Cloudflare:** Almost instant

---

## 🔒 SSL Certificate Setup (After DNS is Active)

Once DNS is working, setup SSL:

```bash
# On your server
ssh root@72.61.241.90

# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d drsubodh.harshranjan.in

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)
```

---

## 🌐 Multiple Subdomains (Optional)

If you want to add more subdomains later:

| Subdomain | Purpose | A Record |
|-----------|---------|----------|
| drsubodh.harshranjan.in | Dr. Subodh site | 72.61.241.90 |
| blog.harshranjan.in | Blog | 72.61.241.90 |
| api.harshranjan.in | API only | 72.61.241.90 |
| admin.harshranjan.in | Admin panel | 72.61.241.90 |

Each will need its own Nginx configuration file.

---

## 🆘 Troubleshooting

### DNS Not Resolving?
1. **Wait longer** - DNS can take up to 48 hours
2. **Check TTL** - Lower TTL (300-600) for faster updates
3. **Clear DNS cache:**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac/Linux
   sudo dnsmasq --clear-cache
   ```
4. **Verify with multiple tools** - Use dnschecker.org

### SSL Certificate Fails?
1. **Ensure DNS is resolving** - Test with `nslookup` first
2. **Check port 80 is open** - Certbot needs HTTP access
3. **Verify Nginx is running** - `systemctl status nginx`
4. **Check domain ownership** - Make sure you control the domain

### Site Not Loading?
1. **Check DNS:** `nslookup drsubodh.harshranjan.in`
2. **Check Nginx:** `systemctl status nginx`
3. **Check Server:** `curl http://72.61.241.90`
4. **Check Firewall:** Allow ports 80, 443

---

## 📝 Current Configuration Summary

✅ **Domain:** harshranjan.in  
✅ **Subdomain:** drsubodh.harshranjan.in  
✅ **Server IP:** 72.61.241.90  
✅ **Frontend:** https://drsubodh.harshranjan.in  
✅ **Backend API:** https://drsubodh.harshranjan.in/api  
✅ **SSL:** Let's Encrypt (Free)  

---

## 🎯 Next Steps After DNS Setup

1. ✅ Add A record for `drsubodh`
2. ⏱️ Wait for DNS propagation (check with `nslookup`)
3. 🚀 Deploy application (follow DEPLOYMENT_GUIDE.md)
4. 🔒 Setup SSL certificate with Certbot
5. 🧪 Test website in browser
6. 📊 Monitor with `pm2 logs`

---

**Need Help?** Contact your domain registrar's support or check their DNS documentation.
