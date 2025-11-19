# Email System - Quick Setup

## ✅ What's Been Implemented

### Backend

1. **Email Service** (`backend/services/emailService.js`)

   - Nodemailer integration
   - Support for Gmail, Zoho, Hostinger, GoDaddy, Custom SMTP
   - Admin notification emails
   - User confirmation emails
   - Beautiful HTML email templates

2. **Email Config** (`backend/config/emailConfig.js`)

   - Pre-configured settings for popular providers
   - Easy provider switching

3. **Email Routes** (`backend/routes/email.routes.js`)

   - `POST /api/email/test` - Test email configuration
   - `GET /api/email/status` - Check email status
   - `GET /api/email/providers` - List available providers

4. **Updated Form Submission** (`backend/controllers/formSubmission.controller.js`)
   - Automatic email sending on form submission
   - Checks form settings for notification preferences
   - Non-blocking async email sending

### Frontend

1. **Form Settings Enhanced** (`frontend/src/pages/admin/FormBuilderNew.jsx`)
   - ✅ Send Admin Notification checkbox
   - ✅ Send User Confirmation checkbox
   - ✅ Custom confirmation message field
   - Beautiful UI with icons and colors

### Configuration

1. **Environment Variables** (`backend/.env`)
   - Added EMAIL_PROVIDER field
   - Added ADMIN_EMAIL field
   - Detailed comments for each provider
   - Instructions for App Passwords

---

## 🚀 Quick Start

### 1. Choose Your Email Provider

**For Testing - Use Gmail:**

```env
EMAIL_PROVIDER=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Get from https://myaccount.google.com/apppasswords
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=your.email@gmail.com
```

**For Production - Use Your Hosting Email:**

```env
# Hostinger
EMAIL_PROVIDER=hostinger
EMAIL_HOST=smtp.hostinger.com

# GoDaddy
EMAIL_PROVIDER=godaddy
EMAIL_HOST=smtpout.secureserver.net

# Zoho
EMAIL_PROVIDER=zoho
EMAIL_HOST=smtp.zoho.com
```

### 2. Restart Backend Server

```bash
cd backend
npm run dev
```

Look for: `✅ Email service initialized with provider: gmail`

### 3. Enable in Forms

1. Open any form in Form Builder
2. Click ⚙️ Settings
3. Scroll to "Email Notifications"
4. Check ✅ Send Admin Notification
5. Check ✅ Send User Confirmation (optional)
6. Save form

### 4. Test It!

1. Submit the form from frontend
2. Check your email inbox
3. You should receive notification!

---

## 📧 Email Types

### Admin Notification

**When:** Someone submits a form  
**To:** ADMIN_EMAIL from .env  
**Contains:**

- Form name
- All submitted data
- Link to view in admin panel
- User info (IP, browser)

### User Confirmation

**When:** User submits form (if enabled)  
**To:** User's email (auto-detected from form)  
**Contains:**

- Thank you message
- Custom message (if set)
- Professional branding

---

## 🔧 Provider-Specific Setup

### Gmail (Easiest - Recommended for Testing)

1. Enable 2-Factor Authentication
2. Go to https://myaccount.google.com/apppasswords
3. Generate App Password for "Mail"
4. Copy 16-character password
5. Use in EMAIL_PASSWORD

### Zoho Mail

- Use your Zoho email and password directly
- May need to enable "Less Secure Apps" in Zoho settings

### Hostinger

- Create email account in hPanel
- Use full email address as EMAIL_USER
- Use email password as EMAIL_PASSWORD

### GoDaddy

- Use GoDaddy Workspace email
- Host: `smtpout.secureserver.net`
- Use full email address and password

### Custom SMTP

- Get SMTP details from your hosting provider
- Set EMAIL_PROVIDER=custom
- Fill in EMAIL_HOST, EMAIL_PORT, credentials

---

## 🎨 What Emails Look Like

### Admin Notification

```
Subject: New Form Submission: Contact Form

🎉 New Form Submission
Form: Contact Form

━━━━━━━━━━━━━━━━━━━━━━━━

Name
John Doe

Email
john@example.com

Message
I'd like to discuss...

━━━━━━━━━━━━━━━━━━━━━━━━

[View Submission Button]

Submission ID: 123
```

### User Confirmation

```
Subject: Thank you for your submission: Contact Form

✓ Submission Received!

Hi John,

Thank you for your submission. We have received
your information and will get back to you shortly.

If you have any questions, feel free to reply
to this email.

Best regards,
Harsh Ranjan
```

---

## 🧪 Testing

### Test Email Configuration

```bash
# Using curl (replace TOKEN with your JWT)
curl -X POST http://localhost:5000/api/email/test \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com"}'
```

### Check Status

```bash
curl http://localhost:5000/api/email/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐛 Troubleshooting

### "Email service not configured"

- Check .env has EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD
- Restart backend server after changing .env

### "Authentication failed"

- **Gmail:** Use App Password, not regular password
- **Zoho:** Enable "Less Secure Apps"
- **Others:** Verify username/password are correct

### "Connection timeout"

- Port might be blocked
- Try EMAIL_PORT=465 with EMAIL_SECURE=true
- Check firewall settings

### "No email received"

- Check spam folder
- Verify ADMIN_EMAIL is correct
- Check server logs for errors
- Make sure form has email field (for user confirmation)

### Server Logs Show

```
✅ Email service initialized      → Working!
✉️  Email sent to...              → Sent successfully
⚠️  Email not configured          → Check .env
❌ Failed to send email...        → Check error message
```

---

## 🎯 Key Features

✅ **Multiple Providers** - Gmail, Zoho, Hostinger, GoDaddy, Custom  
✅ **Easy Setup** - Pre-configured for popular services  
✅ **Beautiful Templates** - Professional HTML emails  
✅ **Per-Form Control** - Enable/disable per form  
✅ **Custom Messages** - Personalize confirmation emails  
✅ **Non-Blocking** - Emails send asynchronously  
✅ **Error Handling** - Graceful fallback if email fails  
✅ **Auto-Detection** - Finds email field automatically  
✅ **Logging** - All emails logged to console

---

## 📝 Next Steps

1. Configure your email provider in `.env`
2. Restart backend server
3. Open a form and enable notifications in settings
4. Test by submitting the form
5. Check your email!

For detailed provider-specific instructions, see **EMAIL_INTEGRATION_GUIDE.md**
