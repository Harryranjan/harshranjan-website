const nodemailer = require("nodemailer");
const { getEmailConfig, isEmailConfigured } = require("../config/emailConfig");

class EmailService {
  constructor() {
    this.transporter = null;
    this.provider = process.env.EMAIL_PROVIDER || "custom";
    this.from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    this.initialized = false;
  }

  /**
   * Initialize email transporter
   */
  async initialize() {
    if (!isEmailConfigured()) {
      console.warn("⚠️  Email not configured. Emails will not be sent.");
      return false;
    }

    try {
      const config = getEmailConfig(this.provider);
      this.transporter = nodemailer.createTransport(config);

      // Verify connection
      await this.transporter.verify();
      this.initialized = true;
      console.log(
        `✅ Email service initialized with provider: ${this.provider}`
      );
      return true;
    } catch (error) {
      console.error("❌ Email service initialization failed:", error.message);
      this.initialized = false;
      return false;
    }
  }

  /**
   * Send email
   * @param {object} options - Email options
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.html - HTML content
   * @param {string} options.text - Plain text content (optional)
   */
  async sendEmail({ to, subject, html, text }) {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.transporter) {
      console.warn("Email not sent - transporter not initialized");
      return { success: false, error: "Email service not configured" };
    }

    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        html,
        text: text || this.stripHtml(html),
      });

      console.log(`✉️  Email sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`❌ Failed to send email to ${to}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send form submission notification to admin
   */
  async sendFormSubmissionNotification({
    formName,
    formId,
    submissionData,
    submissionId,
  }) {
    const subject = `New Form Submission: ${formName}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #4F46E5; margin-bottom: 5px; }
            .value { color: #333; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
            .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🎉 New Form Submission</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Form: ${formName}</p>
            </div>
            <div class="content">
              <p>You have received a new form submission. Here are the details:</p>
              ${this.formatSubmissionData(submissionData)}
              <a href="${
                process.env.FRONTEND_URL
              }/admin/forms/${formId}/submissions/${submissionId}" class="button">
                View Submission
              </a>
            </div>
            <div class="footer">
              <p>This is an automated notification from your website's form system.</p>
              <p>Submission ID: ${submissionId}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    return await this.sendEmail({
      to: adminEmail,
      subject,
      html,
    });
  }

  /**
   * Send confirmation email to form submitter
   */
  async sendFormConfirmation({ formName, userEmail, userName, customMessage }) {
    const subject = `Thank you for your submission: ${formName}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10B981; color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px 20px; border: 1px solid #e5e7eb; }
            .icon { font-size: 48px; margin-bottom: 10px; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="icon">✓</div>
              <h2 style="margin: 0;">Submission Received!</h2>
            </div>
            <div class="content">
              <p>Hi${userName ? " " + userName : ""},</p>
              <p>${
                customMessage ||
                "Thank you for your submission. We have received your information and will get back to you shortly."
              }</p>
              <p style="margin-top: 20px;">If you have any questions, feel free to reply to this email.</p>
              <p style="margin-top: 30px;">Best regards,<br><strong>Harsh Ranjan</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject,
      html,
    });
  }

  /**
   * Format submission data for email display
   */
  formatSubmissionData(data) {
    let html = "";
    for (const [key, value] of Object.entries(data.data || data)) {
      if (typeof value === "object" && Array.isArray(value)) {
        html += `
          <div class="field">
            <div class="label">${this.formatLabel(key)}</div>
            <div class="value">${value.join(", ")}</div>
          </div>
        `;
      } else if (typeof value !== "object") {
        html += `
          <div class="field">
            <div class="label">${this.formatLabel(key)}</div>
            <div class="value">${value}</div>
          </div>
        `;
      }
    }
    return html;
  }

  /**
   * Format field label (convert field-name to Field Name)
   */
  formatLabel(str) {
    return str
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  /**
   * Strip HTML tags for plain text version
   */
  stripHtml(html) {
    return html
      .replace(/<style[^>]*>.*<\/style>/gm, "")
      .replace(/<[^>]+>/gm, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Send download link email
   * @param {string} recipientEmail - User's email
   * @param {string} recipientName - User's name
   * @param {object} download - Download object with title, file_url, etc.
   */
  async sendDownloadLink(recipientEmail, recipientName, download) {
    const subject = `Your Download: ${download.title}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .download-card { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .download-title { font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 10px; }
          .download-btn { display: inline-block; background: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .download-btn:hover { background: #5568d3; }
          .info-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; border-radius: 4px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📥 Your Download is Ready!</h1>
          </div>
          <div class="content">
            <p>Hi ${recipientName},</p>
            <p>Thank you for your interest! Your download is ready.</p>
            
            <div class="download-card">
              <div class="download-title">${download.title}</div>
              ${
                download.short_description
                  ? `<p style="color: #6b7280;">${download.short_description}</p>`
                  : ""
              }
              ${
                download.file_size
                  ? `<p style="color: #9ca3af; font-size: 14px;">File Size: ${download.file_size}</p>`
                  : ""
              }
              
              <a href="${download.file_url}" class="download-btn">
                Download Now
              </a>
            </div>

            <div class="info-box">
              <strong>💡 Quick Tip:</strong> Save this email for future reference. The download link will remain active.
            </div>

            <p>If you have any questions or need assistance, feel free to reach out to us.</p>
            
            <p>Best regards,<br>The Team</p>
          </div>
          <div class="footer">
            <p>This email was sent because you requested a download from our website.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = this.stripHtml(html);

    return await this.sendEmail({
      to: recipientEmail,
      subject,
      html,
      text,
    });
  }

  /**
   * Test email configuration
   */
  async testConnection() {
    try {
      if (!this.transporter) {
        await this.initialize();
      }
      if (this.transporter) {
        await this.transporter.verify();
        return { success: true, message: "Email configuration is valid" };
      }
      return { success: false, message: "Email not configured" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

// Export singleton instance
module.exports = new EmailService();
