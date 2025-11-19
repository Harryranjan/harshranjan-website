import { useState, useEffect } from "react";
import {
  FiMail,
  FiSend,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiInfo,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import api from "../../utils/api";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Toast from "../../components/Toast";
import { SettingsCard, InfoBox } from "../../components/ui";

const emailProviders = {
  gmail: {
    name: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    instructions:
      "Requires App Password. Enable 2FA, then generate at: https://myaccount.google.com/apppasswords",
  },
  zoho: {
    name: "Zoho Mail",
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    instructions:
      'Use your Zoho email and password. May need to enable "Less Secure Apps".',
  },
  hostinger: {
    name: "Hostinger",
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    instructions: "Use your Hostinger email account credentials from hPanel.",
  },
  godaddy: {
    name: "GoDaddy",
    host: "smtpout.secureserver.net",
    port: 587,
    secure: false,
    instructions: "Use your GoDaddy Workspace email credentials.",
  },
  custom: {
    name: "Custom SMTP",
    host: "",
    port: 587,
    secure: false,
    instructions:
      "Enter your custom SMTP server details from your email provider.",
  },
};

export default function EmailSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState(null);
  const [toast, setToast] = useState(null);
  const [testEmail, setTestEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    email_provider: "gmail",
    email_host: "smtp.gmail.com",
    email_port: 587,
    email_secure: false,
    email_user: "",
    email_password: "",
    email_from: "",
    admin_email: "",
    email_enabled: true,
  });

  useEffect(() => {
    loadSettings();
    checkStatus();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/settings/category/email");

      const settingsMap = {};
      data.forEach((setting) => {
        settingsMap[setting.key] = setting.value;
      });

      setSettings((prev) => ({ ...prev, ...settingsMap }));
    } catch (error) {
      console.error("Error loading settings:", error);
      setToast({ type: "error", message: "Failed to load email settings" });
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const { data } = await api.get("/settings/email/status");
      setStatus(data);
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  const handleProviderChange = (provider) => {
    const providerConfig = emailProviders[provider];
    setSettings((prev) => ({
      ...prev,
      email_provider: provider,
      email_host: providerConfig.host,
      email_port: providerConfig.port,
      email_secure: providerConfig.secure,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const settingsArray = Object.entries(settings).map(([key, value]) => {
        let type = "string";
        if (key === "email_port") type = "number";
        if (key === "email_secure" || key === "email_enabled") type = "boolean";
        if (key === "email_password") type = "encrypted";

        return {
          key,
          value: value === null || value === undefined ? "" : value,
          type,
          category: "email",
        };
      });

      await api.put("/settings", { settings: settingsArray });

      setToast({
        type: "success",
        message: "Email settings saved successfully!",
      });
      checkStatus();
    } catch (error) {
      console.error("Error saving settings:", error);
      setToast({ type: "error", message: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    if (!testEmail) {
      setToast({
        type: "error",
        message: "Please enter an email address to test",
      });
      return;
    }

    try {
      setTesting(true);
      const { data } = await api.post("/settings/email/test", {
        to: testEmail,
      });

      if (data.success) {
        setToast({
          type: "success",
          message: `Test email sent to ${testEmail}! Check your inbox.`,
        });
      } else {
        setToast({
          type: "error",
          message: data.message || "Failed to send test email",
        });
      }
    } catch (error) {
      console.error("Error testing email:", error);
      setToast({
        type: "error",
        message: error.response?.data?.message || "Failed to send test email",
      });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentProvider =
    emailProviders[settings.email_provider] || emailProviders.custom;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FiMail className="text-blue-600" />
            Email & SMTP Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Configure email notifications for form submissions and other alerts
          </p>
        </div>

        {/* Status Card */}
        {status && (
          <div
            className={`mb-6 p-4 rounded-lg border-2 ${
              status.configured
                ? "bg-green-50 border-green-200"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {status.configured ? (
                <>
                  <FiCheck className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">
                      Email Configured
                    </p>
                    <p className="text-sm text-green-700">
                      Provider: {status.provider} • {status.host}:{status.port}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <FiAlertCircle className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-yellow-900">
                      Email Not Configured
                    </p>
                    <p className="text-sm text-yellow-700">
                      Fill in the details below and click Save to enable email
                      notifications
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Main Settings Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              SMTP Configuration
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Email Provider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Provider
              </label>
              <select
                value={settings.email_provider}
                onChange={(e) => handleProviderChange(e.target.value)}
                className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                {Object.entries(emailProviders).map(([key, provider]) => (
                  <option key={key} value={key}>
                    {provider.name}
                  </option>
                ))}
              </select>
              {currentProvider.instructions && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-2">
                    <FiInfo className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800">
                      {currentProvider.instructions}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* SMTP Host & Port */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="SMTP Host"
                value={settings.email_host}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    email_host: e.target.value,
                  }))
                }
                placeholder="smtp.gmail.com"
              />
              <Input
                label="SMTP Port"
                type="number"
                value={settings.email_port}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    email_port: parseInt(e.target.value),
                  }))
                }
                placeholder="587"
              />
            </div>

            {/* SSL/TLS */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.email_secure}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    email_secure: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Use SSL/TLS (Port 465)
              </label>
            </div>

            {/* Username/Email */}
            <Input
              label="SMTP Username / Email"
              value={settings.email_user}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, email_user: e.target.value }))
              }
              placeholder="your.email@gmail.com"
            />

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={settings.email_password}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      email_password: e.target.value,
                    }))
                  }
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 pr-12 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {settings.email_provider === "gmail" && (
                <p className="text-xs text-gray-500 mt-1">
                  Use App Password, not your regular Gmail password
                </p>
              )}
            </div>

            {/* From Address */}
            <Input
              label="From Email Address"
              value={settings.email_from}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, email_from: e.target.value }))
              }
              placeholder="noreply@yourdomain.com"
              hint="Email address that will appear as sender"
            />

            {/* Admin Email */}
            <Input
              label="Admin Notification Email"
              value={settings.admin_email}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  admin_email: e.target.value,
                }))
              }
              placeholder="admin@yourdomain.com"
              hint="Where form submission notifications will be sent"
            />

            {/* Enable/Disable */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.email_enabled}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    email_enabled: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Enable Email Notifications
                </label>
                <p className="text-xs text-gray-600">
                  Turn on/off all email notifications globally
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t bg-gray-50 flex gap-3">
            <Button
              onClick={handleSave}
              loading={saving}
              icon={<FiCheck />}
              variant="primary"
              size="lg"
            >
              Save Configuration
            </Button>
          </div>
        </div>

        {/* Test Email Card */}
        <SettingsCard
          title="Test Email"
          subtitle="Send a test email to verify your configuration"
          className="mt-6"
        >
          <div className="flex gap-3">
            <Input
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="test@example.com"
              className="flex-1"
            />
            <Button
              onClick={handleTest}
              loading={testing}
              icon={<FiSend />}
              variant="secondary"
              size="lg"
            >
              Send Test Email
            </Button>
          </div>
          <InfoBox
            message="Make sure to save your configuration before testing"
            variant="gray"
            className="mt-3"
          />
        </SettingsCard>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
