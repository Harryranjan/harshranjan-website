const Setting = require("../models/Setting");
const emailService = require("../services/emailService");

// Get all settings by category
exports.getSettingsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const settings = await Setting.findAll({
      where: { category },
      attributes: ["id", "key", "value", "type", "description"],
    });

    // Don't send encrypted values to frontend (send placeholder instead)
    const sanitizedSettings = settings.map((setting) => {
      if (setting.type === "encrypted" && setting.value) {
        return {
          ...setting.toJSON(),
          value: "••••••••••••",
          hasValue: true,
        };
      }
      return setting.toJSON();
    });

    res.json(sanitizedSettings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch settings", error: error.message });
  }
};

// Get single setting
exports.getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const value = await Setting.getSetting(key);

    if (value === null) {
      return res.status(404).json({ message: "Setting not found" });
    }

    res.json({ key, value });
  } catch (error) {
    console.error("Error fetching setting:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch setting", error: error.message });
  }
};

// Update multiple settings
exports.updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;

    if (!Array.isArray(settings)) {
      return res.status(400).json({ message: "Settings must be an array" });
    }

    const updates = [];

    for (const { key, value, type, category } of settings) {
      // Skip if trying to set encrypted field with placeholder
      if (type === "encrypted" && value === "••••••••••••") {
        continue;
      }

      const setting = await Setting.setSetting(key, value, type, category);
      updates.push(setting);
    }

    // If email settings were updated, reinitialize email service
    const emailKeys = settings.map((s) => s.key);
    if (emailKeys.some((key) => key.startsWith("email_"))) {
      // Update process.env for email service
      const emailSettings = await Setting.getByCategory("email");
      if (emailSettings.email_host)
        process.env.EMAIL_HOST = emailSettings.email_host;
      if (emailSettings.email_port)
        process.env.EMAIL_PORT = String(emailSettings.email_port);
      if (emailSettings.email_user)
        process.env.EMAIL_USER = emailSettings.email_user;
      if (emailSettings.email_password)
        process.env.EMAIL_PASSWORD = emailSettings.email_password;
      if (emailSettings.email_from)
        process.env.EMAIL_FROM = emailSettings.email_from;
      if (emailSettings.email_provider)
        process.env.EMAIL_PROVIDER = emailSettings.email_provider;
      if (emailSettings.admin_email)
        process.env.ADMIN_EMAIL = emailSettings.admin_email;
      if (emailSettings.email_secure !== undefined)
        process.env.EMAIL_SECURE = String(emailSettings.email_secure);

      // Reinitialize email service
      await emailService.initialize();
    }

    res.json({
      message: "Settings updated successfully",
      updated: updates.length,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res
      .status(500)
      .json({ message: "Failed to update settings", error: error.message });
  }
};

// Update single setting
exports.updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, type, category } = req.body;

    const setting = await Setting.setSetting(key, value, type, category);

    res.json({
      message: "Setting updated successfully",
      setting,
    });
  } catch (error) {
    console.error("Error updating setting:", error);
    res
      .status(500)
      .json({ message: "Failed to update setting", error: error.message });
  }
};

// Get email configuration status
exports.getEmailStatus = async (req, res) => {
  try {
    const emailSettings = await Setting.getByCategory("email");
    const testResult = await emailService.testConnection();

    res.json({
      configured: testResult.success,
      provider: emailSettings.email_provider || "custom",
      host: emailSettings.email_host,
      port: emailSettings.email_port,
      from: emailSettings.email_from,
      adminEmail: emailSettings.admin_email,
      enabled: emailSettings.email_enabled,
      status: testResult.message,
    });
  } catch (error) {
    console.error("Error getting email status:", error);
    res.status(500).json({
      configured: false,
      message: error.message,
    });
  }
};

// Test email configuration
exports.testEmail = async (req, res) => {
  try {
    const { to } = req.body;
    const emailSettings = await Setting.getByCategory("email");
    const testEmail = to || emailSettings.admin_email || process.env.EMAIL_USER;

    if (!testEmail) {
      return res.status(400).json({
        success: false,
        message: "No recipient email provided",
      });
    }

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
                  <li>Provider: ${emailSettings.email_provider || "custom"}</li>
                  <li>Host: ${emailSettings.email_host}</li>
                  <li>Port: ${emailSettings.email_port}</li>
                  <li>From: ${emailSettings.email_from}</li>
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
};

module.exports = exports;
