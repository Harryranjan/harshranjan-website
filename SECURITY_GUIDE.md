# Security Implementation Guide

## ✅ Implemented Security Features

### 1. Rate Limiting

**Location:** `backend/middleware/rateLimiter.js`

#### Rate Limits:

- **General API**: 100 requests per 15 minutes (1000 in dev)
- **Authentication** (`/api/auth/*`): 5 attempts per 15 minutes
- **Form Submissions** (`/api/contact`, `/api/forms`): 10 per hour
- **Downloads** (`/api/downloads`, `/api/download-leads`): 20 per hour
- **Email Sending** (`/api/email`): 3 per hour
- **File Uploads** (`/api/upload`): 20 per hour

#### Response When Limited:

```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

#### Headers:

- `RateLimit-Limit`: Maximum requests allowed
- `RateLimit-Remaining`: Requests remaining
- `RateLimit-Reset`: Time when limit resets

### 2. Input Sanitization

**Location:** `backend/middleware/sanitize.js`

#### What's Protected:

✅ **XSS Prevention**: Removes `<script>` tags, event handlers (`onclick`, `onerror`)
✅ **Protocol Filtering**: Blocks `javascript:`, `vbscript:`, malicious `data:` URIs
✅ **HTML Escaping**: Converts `<`, `>`, `&`, `"`, `'` to safe entities in non-content fields

#### Field Types:

1. **Plain Text** (titles, names, emails):

   - Full HTML escaping applied
   - Example: `<script>` → `&lt;script&gt;`

2. **Rich Text** (blog content, page content):

   - Only dangerous patterns removed
   - Safe HTML preserved
   - Custom CSS/JS preserved for authorized users

3. **Protected Fields** (never sanitized):
   - Passwords
   - Authentication tokens
   - Encrypted data

### 3. Security Headers

**Location:** `backend/server.js` (via Helmet.js)

Applied headers:

- `X-Frame-Options`: Prevent clickjacking
- `X-Content-Type-Options`: Prevent MIME sniffing
- `X-XSS-Protection`: Enable browser XSS filter
- `Strict-Transport-Security`: Force HTTPS (production)
- `Cross-Origin-Resource-Policy`: Control resource loading

## 🔒 Security Best Practices

### For Developers:

1. **Never disable sanitization** for user input
2. **Always use rate limiters** on public endpoints
3. **Validate input** before sanitization (use express-validator)
4. **Hash passwords** with bcrypt (already implemented)
5. **Use JWT** for authentication (already implemented)

### For Administrators:

1. **Monitor rate limit violations** in logs
2. **Update environment variables** for production:
   ```env
   NODE_ENV=production
   JWT_SECRET=<strong-random-string>
   ```
3. **Enable HTTPS** in production
4. **Regular security audits**: `npm audit`
5. **Keep dependencies updated**: `npm update`

## 🛡️ Attack Prevention

### Prevented Attacks:

✅ **Brute Force**: Rate limiting on auth endpoints
✅ **XSS (Cross-Site Scripting)**: Input sanitization
✅ **SQL Injection**: Sequelize ORM parameterized queries
✅ **CSRF**: CORS configuration
✅ **DDoS**: Rate limiting
✅ **Clickjacking**: X-Frame-Options header

## 📊 Monitoring

### Check Rate Limit Status:

Response headers show current limits:

```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1732558800
```

### Server Logs:

Rate limit violations are logged:

```
[2025-11-25T18:00:00.000Z] Rate limit exceeded: IP 192.168.1.1
```

## 🔧 Configuration

### Adjust Rate Limits:

Edit `backend/middleware/rateLimiter.js`:

```javascript
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Change time window
  max: 5, // Change max attempts
  // ...
});
```

### Whitelist IPs (if needed):

```javascript
const authLimiter = rateLimit({
  // ...
  skip: (req) => {
    const whitelist = ["127.0.0.1", "::1"];
    return whitelist.includes(req.ip);
  },
});
```

## 🚨 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up firewall rules
- [ ] Enable database backups
- [ ] Set up error monitoring (Sentry)
- [ ] Review all rate limits
- [ ] Test authentication flows
- [ ] Audit npm dependencies (`npm audit`)

## 📞 Support

For security concerns, contact: admin@harshranjan.com

**Last Updated:** November 25, 2025
