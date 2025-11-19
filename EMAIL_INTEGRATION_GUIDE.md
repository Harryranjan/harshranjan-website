# Email Integration Guide

## Overview

The form system supports automatic email notifications with multiple email providers:

- ✉️ **Gmail** (with App Password)
- ✉️ **Zoho Mail**
- ✉️ **Hostinger Email**
- ✉️ **GoDaddy Email**
- ✉️ **Custom SMTP** (any provider)

## Features

- **Admin Notifications**: Get notified when someone submits a form
- **User Confirmations**: Send automatic thank you emails to submitters
- **Custom Messages**: Personalize confirmation emails per form
- **Multiple Providers**: Easy switch between email services

---

## Setup Instructions

### 1. Gmail Setup (Recommended for Testing)

#### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**

#### Step 2: Generate App Password

1. Visit [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Other (Custom name)**
3. Name it "Harsh Ranjan Website"
4. Click **Generate**
5. Copy the 16-character password

#### Step 3: Configure `.env`

```env
EMAIL_PROVIDER=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # 16-char app password
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

---

### 2. Zoho Mail Setup

#### Step 1: Get SMTP Credentials

- Your Zoho email and password are the credentials
- No app password needed

#### Step 2: Configure `.env`

```env
EMAIL_PROVIDER=zoho
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your.email@zoho.com
EMAIL_PASSWORD=your_zoho_password
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

#### Important Notes:

- If using custom domain with Zoho, use that email
- Enable **Less Secure Apps** if you get authentication errors
- For business accounts, you may need to enable SMTP in admin panel

---

### 3. Hostinger Email Setup

#### Step 1: Create Email Account

1. Go to Hostinger **hPanel**
2. Navigate to **Emails** → **Email Accounts**
3. Create or use existing email account

#### Step 2: Get SMTP Settings

- **SMTP Server**: smtp.hostinger.com
- **Port**: 587
- **Username**: Your full email address
- **Password**: Your email password

#### Step 3: Configure `.env`

```env
EMAIL_PROVIDER=hostinger
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

#### Troubleshooting:

- Make sure the email account exists in Hostinger
- Check if SMTP is enabled for your hosting plan
- Some shared hosting plans may block port 587

---

### 4. GoDaddy Email Setup

#### Step 1: Email Account

1. Go to GoDaddy **Email & Office Dashboard**
2. Create or use existing email account

#### Step 2: SMTP Settings

- **SMTP Server**: smtpout.secureserver.net
- **Port**: 587 (or 465 with SSL)
- **Username**: Your full email address
- **Password**: Your email password

#### Step 3: Configure `.env`

```env
EMAIL_PROVIDER=godaddy
EMAIL_HOST=smtpout.secureserver.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

#### Important:

- GoDaddy may require you to authenticate from your domain
- For GoDaddy Workspace email, use these exact settings
- Port 465 can be used with `EMAIL_SECURE=true`

---

### 5. Custom SMTP Setup

For any other email provider (cPanel, Plesk, AWS SES, etc.)

#### Step 1: Get SMTP Details from Your Provider

You'll need:

- SMTP host/server address
- Port number (usually 587 or 465)
- Authentication credentials
- Whether SSL/TLS is required

#### Step 2: Configure `.env`

```env
EMAIL_PROVIDER=custom
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false  # true for port 465
EMAIL_USER=your@email.com
EMAIL_PASSWORD=your_password
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

---

## Testing Email Configuration

### Method 1: Using API Endpoint

```bash
# Test email (requires authentication)
curl -X POST http://localhost:5000/api/email/test \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com"}'
```

### Method 2: Check Status

```bash
# Check email configuration status
curl http://localhost:5000/api/email/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Method 3: Frontend Test (Coming Soon)

- Go to Admin → Settings → Email
- Click "Test Email Configuration"
- Enter test email address
- Check if email is received

---

## Configuring Form Notifications

### In Form Builder:

1. **Open Form Settings** (⚙️ icon)
2. **Scroll to Email Notifications section**
3. **Enable options:**
   - ✅ **Send Admin Notification** - You get notified
   - ✅ **Send User Confirmation** - Submitter gets thank you email
4. **Customize user message** (optional)
5. **Save form**

### Admin Notification Email Contains:

- Form name and submission time
- All submitted field values
- Link to view submission in admin panel
- User's IP address and browser info

### User Confirmation Email Contains:

- Thank you message
- Custom message (if configured)
- Your branding
- Professional email template

---

## Email Templates

### Admin Notification Template

```html
Subject: New Form Submission: {Form Name} 📋 Form: {Form Name} 🕐 Submitted:
{Date/Time} Field Values: - Name: John Doe - Email: john@example.com - Message:
... [View Submission Button]
```

### User Confirmation Template

```html
Subject: Thank you for your submission: {Form Name} ✓ Submission Received! Hi
{User Name}, {Custom Message or Default} We have received your information and
will get back to you shortly. Best regards, Harsh Ranjan
```

---

## Troubleshooting

### Email Not Sending?

#### 1. Check Configuration

```bash
# View current email status
curl http://localhost:5000/api/email/status
```

#### 2. Check Server Logs

Look for email-related messages in terminal:

```
✅ Email service initialized with provider: gmail
✉️  Email sent to admin@example.com: <message-id>
❌ Failed to send email: Authentication failed
```

#### 3. Common Issues

**"Authentication failed"**

- Wrong username/password
- Gmail: Need App Password, not regular password
- Check if 2FA is enabled

**"Connection timeout"**

- Port might be blocked by firewall
- Try different port (587 or 465)
- Check if EMAIL_SECURE matches port

**"Email field not found"**

- User confirmation requires an email field in form
- Add a field with type "email" or name containing "email"

**"535 Authentication failed"** (Zoho)

- Enable "Less Secure Apps" in Zoho settings
- Or create app-specific password

**"Relay access denied"** (Hostinger/GoDaddy)

- Make sure FROM address matches authenticated email
- Some providers require FROM to be the same as USER

#### 4. Testing Tips

1. Start with Gmail (easiest to test)
2. Send test email first before testing with forms
3. Check spam folder for test emails
4. Verify EMAIL_FROM is a valid format
5. Make sure backend server restarted after .env changes

---

## Security Best Practices

### 1. Never Commit Credentials

```bash
# .env should be in .gitignore
echo ".env" >> .gitignore
```

### 2. Use App Passwords

- Gmail: Always use App Password
- Never use your main Google password

### 3. Limit Email Rate

- Forms have rate limiting built-in
- Prevents spam attacks

### 4. Validate Email Addresses

- Frontend and backend validation included
- Prevents malformed email addresses

### 5. Use Environment Variables

- All credentials in .env file
- Never hardcode in source code

---

## Advanced Configuration

### Multiple Recipients

Edit `backend/.env`:

```env
ADMIN_EMAIL=admin@domain.com,manager@domain.com,support@domain.com
```

### Custom Email Templates

Edit `backend/services/emailService.js`:

- Customize HTML templates
- Add your logo/branding
- Change colors and styling

### Email Logging

All emails are logged in console:

```
✉️  Email sent to user@example.com: <1234567890@domain.com>
```

### Async Sending

Emails send asynchronously (non-blocking):

- Form submits immediately
- Emails sent in background
- User doesn't wait for email delivery

---

## Provider Comparison

| Provider  | Setup Difficulty | Reliability | Cost     | Best For                   |
| --------- | ---------------- | ----------- | -------- | -------------------------- |
| Gmail     | Easy ⭐          | High        | Free     | Testing, personal sites    |
| Zoho      | Easy ⭐          | High        | Free     | Small business             |
| Hostinger | Medium ⭐⭐      | Good        | Included | Sites hosted on Hostinger  |
| GoDaddy   | Medium ⭐⭐      | Good        | Included | Sites with GoDaddy hosting |
| Custom    | Varies ⭐⭐⭐    | Varies      | Varies   | Enterprise, specific needs |

---

## Next Steps

1. ✅ Choose your email provider
2. ✅ Configure `.env` file
3. ✅ Restart backend server
4. ✅ Test email configuration
5. ✅ Enable notifications in forms
6. ✅ Test form submission
7. ✅ Check emails received!

---

## Support

Need help?

- Check server logs for error messages
- Test with Gmail first (easiest setup)
- Verify all .env values are correct
- Make sure no trailing spaces in .env
- Restart backend after .env changes

## API Reference

### Test Email

```
POST /api/email/test
Headers: Authorization: Bearer {token}
Body: { "to": "test@example.com" }
```

### Check Status

```
GET /api/email/status
Headers: Authorization: Bearer {token}
```

### Get Providers

```
GET /api/email/providers
Headers: Authorization: Bearer {token}
```
