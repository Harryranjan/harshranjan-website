import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX, FiCode, FiGrid, FiEdit3 } from "react-icons/fi";

const FORM_TEMPLATES = [
  {
    id: "contact",
    name: "Contact Form",
    description: "Simple contact form with name, email, and message",
    icon: "📧",
    fields: [
      {
        type: "text",
        label: "Full Name",
        name: "full_name",
        placeholder: "John Doe",
        required: true,
      },
      {
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "john@example.com",
        required: true,
      },
      {
        type: "tel",
        label: "Phone Number",
        name: "phone",
        placeholder: "+1 (555) 000-0000",
        required: false,
      },
      {
        type: "textarea",
        label: "Message",
        name: "message",
        placeholder: "Your message here...",
        required: true,
      },
    ],
  },
  {
    id: "newsletter",
    name: "Newsletter Signup",
    description: "Collect email subscribers with optional name",
    icon: "📰",
    fields: [
      {
        type: "text",
        label: "First Name",
        name: "first_name",
        placeholder: "John",
        required: true,
      },
      {
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "john@example.com",
        required: true,
      },
      {
        type: "checkbox",
        label: "I agree to receive marketing emails",
        name: "consent",
        required: true,
        options: [{ label: "Yes, I want to receive updates", value: "yes" }],
      },
    ],
  },
  {
    id: "feedback",
    name: "Feedback Form",
    description: "Gather user feedback with ratings",
    icon: "💬",
    fields: [
      {
        type: "text",
        label: "Your Name",
        name: "name",
        placeholder: "John Doe",
        required: true,
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        placeholder: "john@example.com",
        required: false,
      },
      {
        type: "rating",
        label: "Overall Experience",
        name: "rating",
        required: true,
        max: 5,
      },
      {
        type: "textarea",
        label: "Your Feedback",
        name: "feedback",
        placeholder: "Tell us what you think...",
        required: true,
      },
    ],
  },
  {
    id: "survey",
    name: "Customer Survey",
    description: "Comprehensive survey with multiple question types",
    icon: "📊",
    fields: [
      {
        type: "radio",
        label: "How did you hear about us?",
        name: "source",
        required: true,
        options: [
          { label: "Social Media", value: "social" },
          { label: "Search Engine", value: "search" },
          { label: "Friend/Referral", value: "referral" },
          { label: "Advertisement", value: "ad" },
        ],
      },
      {
        type: "rating",
        label: "Rate our service",
        name: "service_rating",
        required: true,
        max: 5,
      },
      {
        type: "yesno",
        label: "Would you recommend us?",
        name: "recommend",
        required: true,
      },
      {
        type: "textarea",
        label: "Additional Comments",
        name: "comments",
        required: false,
      },
    ],
  },
  {
    id: "registration",
    name: "Event Registration",
    description: "Register attendees for events",
    icon: "🎟️",
    fields: [
      {
        type: "text",
        label: "Full Name",
        name: "full_name",
        placeholder: "John Doe",
        required: true,
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        placeholder: "john@example.com",
        required: true,
      },
      {
        type: "tel",
        label: "Phone",
        name: "phone",
        placeholder: "+1 (555) 000-0000",
        required: true,
      },
      {
        type: "select",
        label: "Ticket Type",
        name: "ticket_type",
        required: true,
        options: [
          { label: "General Admission", value: "general" },
          { label: "VIP", value: "vip" },
          { label: "Student", value: "student" },
        ],
      },
      {
        type: "number",
        label: "Number of Guests",
        name: "guests",
        required: true,
      },
      {
        type: "textarea",
        label: "Special Requirements",
        name: "requirements",
        required: false,
      },
    ],
  },
  {
    id: "appointment",
    name: "Appointment Booking",
    description: "Schedule appointments with date and time",
    icon: "📅",
    fields: [
      { type: "text", label: "Full Name", name: "full_name", required: true },
      { type: "email", label: "Email", name: "email", required: true },
      { type: "tel", label: "Phone Number", name: "phone", required: true },
      { type: "date", label: "Preferred Date", name: "date", required: true },
      { type: "time", label: "Preferred Time", name: "time", required: true },
      {
        type: "select",
        label: "Service Type",
        name: "service",
        required: true,
        options: [
          { label: "Consultation", value: "consultation" },
          { label: "Follow-up", value: "followup" },
          { label: "New Patient", value: "new" },
        ],
      },
      {
        type: "textarea",
        label: "Reason for Visit",
        name: "reason",
        required: false,
      },
    ],
  },
  {
    id: "job_application",
    name: "Job Application",
    description: "Collect job applicant information",
    icon: "💼",
    fields: [
      { type: "text", label: "Full Name", name: "full_name", required: true },
      { type: "email", label: "Email Address", name: "email", required: true },
      { type: "tel", label: "Phone Number", name: "phone", required: true },
      {
        type: "text",
        label: "LinkedIn Profile",
        name: "linkedin",
        required: false,
      },
      {
        type: "select",
        label: "Position Applied For",
        name: "position",
        required: true,
        options: [
          { label: "Software Developer", value: "dev" },
          { label: "Designer", value: "designer" },
          { label: "Marketing Manager", value: "marketing" },
          { label: "Sales Representative", value: "sales" },
        ],
      },
      { type: "file", label: "Upload Resume", name: "resume", required: true },
      {
        type: "textarea",
        label: "Cover Letter",
        name: "cover_letter",
        required: false,
      },
    ],
  },
  {
    id: "quote_request",
    name: "Quote Request",
    description: "Request pricing quotes from customers",
    icon: "💰",
    fields: [
      { type: "text", label: "Company Name", name: "company", required: true },
      {
        type: "text",
        label: "Contact Person",
        name: "contact_name",
        required: true,
      },
      { type: "email", label: "Email", name: "email", required: true },
      { type: "tel", label: "Phone", name: "phone", required: false },
      {
        type: "select",
        label: "Service Interested In",
        name: "service",
        required: true,
        options: [
          { label: "Web Development", value: "web" },
          { label: "Mobile App", value: "mobile" },
          { label: "Consulting", value: "consulting" },
          { label: "Other", value: "other" },
        ],
      },
      {
        type: "slider",
        label: "Budget Range",
        name: "budget",
        required: false,
        min: 1000,
        max: 50000,
        step: 1000,
      },
      {
        type: "textarea",
        label: "Project Description",
        name: "description",
        required: true,
      },
    ],
  },
  {
    id: "support_ticket",
    name: "Support Ticket",
    description: "Technical support request form",
    icon: "🛠️",
    fields: [
      { type: "text", label: "Your Name", name: "name", required: true },
      { type: "email", label: "Email", name: "email", required: true },
      {
        type: "select",
        label: "Priority Level",
        name: "priority",
        required: true,
        options: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
          { label: "Critical", value: "critical" },
        ],
      },
      {
        type: "select",
        label: "Issue Category",
        name: "category",
        required: true,
        options: [
          { label: "Technical Issue", value: "technical" },
          { label: "Account Problem", value: "account" },
          { label: "Billing Question", value: "billing" },
          { label: "Feature Request", value: "feature" },
        ],
      },
      {
        type: "textarea",
        label: "Issue Description",
        name: "description",
        required: true,
      },
      {
        type: "file",
        label: "Attach Screenshot",
        name: "screenshot",
        required: false,
      },
    ],
  },
  {
    id: "rsvp",
    name: "RSVP Form",
    description: "Event RSVP with guest details",
    icon: "✉️",
    fields: [
      { type: "text", label: "Your Name", name: "name", required: true },
      { type: "email", label: "Email", name: "email", required: true },
      {
        type: "yesno",
        label: "Will you attend?",
        name: "attending",
        required: true,
      },
      {
        type: "number",
        label: "Number of Guests",
        name: "guest_count",
        required: false,
      },
      {
        type: "checkbox",
        label: "Dietary Restrictions",
        name: "dietary",
        required: false,
        options: [
          { label: "Vegetarian", value: "vegetarian" },
          { label: "Vegan", value: "vegan" },
          { label: "Gluten-free", value: "gluten_free" },
          { label: "None", value: "none" },
        ],
      },
      {
        type: "textarea",
        label: "Special Requests",
        name: "requests",
        required: false,
      },
    ],
  },
];

export default function FormCreationModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customCode, setCustomCode] = useState("");

  if (!isOpen) return null;

  const handleCreateFromTemplate = (template) => {
    const formData = {
      name: template.name,
      description: template.description,
      type: "custom",
      status: "draft",
      fields: template.fields.map((field, index) => ({
        ...field,
        id: Date.now() + index,
        name: field.name || `field_${Date.now() + index}`,
        placeholder: field.placeholder || "",
        description: field.description || "",
        options: field.options || [],
        content: field.content || "",
        max: field.max,
        min: field.min,
        step: field.step,
      })),
      submit_button_text: "Submit",
      success_message: "Thank you for your submission!",
      error_message: "Something went wrong. Please try again.",
    };

    // Navigate to builder with template data
    navigate("/admin/forms/new", { state: { templateData: formData } });
    onClose();
  };

  const handleCreateCustomCode = () => {
    // Navigate to custom code form
    navigate("/admin/forms/new", { state: { customCode } });
    onClose();
  };

  const handleBuildYourOwn = () => {
    navigate("/admin/forms/new");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create New Form</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {!selectedOption ? (
            // Step 1: Choose creation method
            <div>
              <p className="text-gray-600 text-sm mb-4">
                How would you like to create your form?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Custom Code */}
                <button
                  onClick={() => setSelectedOption("code")}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition">
                    <FiCode size={20} className="text-purple-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Custom Code
                  </h3>
                  <p className="text-xs text-gray-600">
                    Paste HTML or embed code
                  </p>
                </button>

                {/* Form Templates */}
                <button
                  onClick={() => setSelectedOption("template")}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition">
                    <FiGrid size={20} className="text-green-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Form Templates
                  </h3>
                  <p className="text-xs text-gray-600">Pre-built templates</p>
                </button>

                {/* Build Your Own */}
                <button
                  onClick={handleBuildYourOwn}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition">
                    <FiEdit3 size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Build Your Own
                  </h3>
                  <p className="text-xs text-gray-600">Start from scratch</p>
                </button>
              </div>
            </div>
          ) : selectedOption === "code" ? (
            // Step 2a: Custom Code Input
            <div>
              <button
                onClick={() => setSelectedOption(null)}
                className="text-blue-600 hover:text-blue-700 mb-3 flex items-center gap-1 text-sm"
              >
                ← Back
              </button>
              <h3 className="text-base font-semibold mb-3">
                Paste Your Custom Code
              </h3>
              <textarea
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="Paste your HTML form code or embed code here..."
                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleCreateCustomCode}
                  disabled={!customCode.trim()}
                  className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Form
                </button>
                <button
                  onClick={() => setSelectedOption(null)}
                  className="px-5 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Step 2b: Template Selection
            <div>
              <button
                onClick={() => setSelectedOption(null)}
                className="text-blue-600 hover:text-blue-700 mb-3 flex items-center gap-1 text-sm"
              >
                ← Back
              </button>
              <h3 className="text-base font-semibold mb-3">
                Choose a Template
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {FORM_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleCreateFromTemplate(template)}
                    className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left group"
                  >
                    <div className="text-3xl mb-2">{template.icon}</div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {template.fields.length} fields
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
