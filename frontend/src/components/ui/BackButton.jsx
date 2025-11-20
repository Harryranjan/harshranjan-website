import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

/**
 * BackButton - Consistent back navigation button
 *
 * @param {string} to - Navigation path (optional, uses navigate(-1) if not provided)
 * @param {string} label - Button label text (default: "Back")
 * @param {function} onClick - Custom click handler (overrides navigation)
 * @param {string} className - Additional CSS classes
 */
export default function BackButton({
  to,
  label = "Back",
  onClick,
  className = "",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
    >
      <FiArrowLeft className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}

BackButton.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
