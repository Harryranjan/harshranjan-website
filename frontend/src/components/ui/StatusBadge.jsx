export default function StatusBadge({ status }) {
  const statusConfig = {
    published: {
      label: "Published",
      variant: "success",
    },
    scheduled: {
      label: "Scheduled",
      variant: "info",
    },
    draft: {
      label: "Draft",
      variant: "warning",
    },
    active: {
      label: "Active",
      variant: "success",
    },
    inactive: {
      label: "Inactive",
      variant: "error",
    },
    pending: {
      label: "Pending",
      variant: "warning",
    },
  };

  const config = statusConfig[status] || { label: status, variant: "default" };

  const variants = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    error: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        variants[config.variant]
      }`}
    >
      {config.label}
    </span>
  );
}
