import { useState } from "react";
import {
  FiX,
  FiMail,
  FiUser,
  FiPhone,
  FiDownload,
} from "react-icons/fi";
import api from "../utils/api";
import Input from "./ui/Input";
import GradientButton from "./ui/GradientButton";

export default function DownloadModal({ download, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const { data } = await api.post("/download-leads/submit", {
        download_id: download.id,
        ...formData,
      });

      // Open download in new tab
      if (data.download_url) {
        window.open(data.download_url, "_blank");
      }

      onSuccess(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to submit. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-md w-full my-auto mx-auto"
        style={{ maxHeight: 'calc(100vh - 24px)' }}
      >
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 24px)' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 sm:p-1.5 transition-colors touch-manipulation"
            aria-label="Close modal"
          >
            <FiX size={18} className="sm:w-5 sm:h-5" />
          </button>

          <div className="text-center pr-6 sm:pr-8">
            <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Get Your Free Download</h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-snug">
              We'll send the download link to your email instantly.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <Input
            label="Full Name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
            icon={<FiUser />}
            error={errors.name}
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
            icon={<FiMail />}
            error={errors.email}
            hint="We'll send the download link here"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            icon={<FiPhone />}
          />

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <GradientButton
            type="submit"
            loading={loading}
            icon={<FiDownload size={18} />}
            variant="blue-purple"
            size="md"
          >
            Get Download Link
          </GradientButton>

          <p className="text-xs text-gray-500 text-center -mt-1">
            We'll never spam you. Unsubscribe anytime.
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}
