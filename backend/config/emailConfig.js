// Email provider configurations
const emailProviders = {
  gmail: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requiresAuth: true,
    description: "Gmail (requires App Password)",
    docs: "https://support.google.com/accounts/answer/185833",
  },
  zoho: {
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    requiresAuth: true,
    description: "Zoho Mail",
    docs: "https://www.zoho.com/mail/help/zoho-smtp.html",
  },
  hostinger: {
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    requiresAuth: true,
    description: "Hostinger Email",
    docs: "https://support.hostinger.com/en/articles/1583298-how-to-set-up-an-email-account",
  },
  godaddy: {
    host: "smtpout.secureserver.net",
    port: 587,
    secure: false,
    requiresAuth: true,
    description: "GoDaddy Email",
    docs: "https://www.godaddy.com/help/server-and-port-settings-for-workspace-email-6949",
  },
  custom: {
    // Will use values from .env directly
    description: "Custom SMTP Server",
    requiresAuth: true,
  },
};

/**
 * Get email configuration based on provider
 * @param {string} provider - Email provider name (gmail, zoho, hostinger, godaddy, custom)
 * @returns {object} Nodemailer transport configuration
 */
const getEmailConfig = (provider = "custom") => {
  const providerConfig = emailProviders[provider] || emailProviders.custom;

  // If custom or provider config doesn't have host, use env values
  if (provider === "custom" || !providerConfig.host) {
    return {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === "true" || false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
  }

  // Use predefined provider config
  return {
    host: providerConfig.host,
    port: providerConfig.port,
    secure: providerConfig.secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };
};

/**
 * Validate email configuration
 * @returns {boolean} True if email is configured
 */
const isEmailConfigured = () => {
  return !!(
    process.env.EMAIL_HOST &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASSWORD
  );
};

module.exports = {
  emailProviders,
  getEmailConfig,
  isEmailConfigured,
};
