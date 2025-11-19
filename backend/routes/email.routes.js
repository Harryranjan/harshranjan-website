const express = require("express");
const router = express.Router();
const emailService = require("../services/emailService");
const { authMiddleware } = require("../middleware/auth.middleware");

// Test email configuration (protected route)
router.post("/test", authMiddleware, async (req, res) => {
  try {
    const { to } = req.body;
    const testEmail = to || process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    const result = await emailService.sendEmail({
      to: testEmail,
      subject: "Test Email - Harsh Ranjan Website",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px 20px; border: 1px solid #e5e7eb; }
              .success { background: #10B981; color: white; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">✉️ Email Test Successful!</h2>
              </div>
              <div class="content">
                <div class="success">
                  <strong>✓ Your email configuration is working correctly!</strong>
                </div>
                <p>This is a test email from your Harsh Ranjan Website email system.</p>
                <p><strong>Configuration Details:</strong></p>
                <ul>
                  <li>Provider: ${process.env.EMAIL_PROVIDER || "custom"}</li>
                  <li>Host: ${process.env.EMAIL_HOST}</li>
                  <li>Port: ${process.env.EMAIL_PORT}</li>
                  <li>From: ${process.env.EMAIL_FROM}</li>
                </ul>
                <p style="margin-top: 30px;">Your form submission notifications are now ready to use!</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (result.success) {
      res.json({
        success: true,
        message: `Test email sent successfully to ${testEmail}`,
        messageId: result.messageId,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to send test email",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message,
    });
  }
});

// Check email configuration status
router.get("/status", authMiddleware, async (req, res) => {
  try {
    const result = await emailService.testConnection();
    res.json({
      configured: result.success,
      provider: process.env.EMAIL_PROVIDER || "custom",
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      from: process.env.EMAIL_FROM,
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      configured: false,
      message: error.message,
    });
  }
});

// Get available email providers
router.get("/providers", authMiddleware, (req, res) => {
  const { emailProviders } = require("../config/emailConfig");
  res.json(emailProviders);
});

module.exports = router;
