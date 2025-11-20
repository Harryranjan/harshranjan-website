import PropTypes from "prop-types";
import Button from "./Button";

/**
 * FormActions - Consistent form action button layout
 * Provides standard Cancel/Save button group with proper spacing
 *
 * @param {function} onCancel - Cancel button click handler
 * @param {function} onSubmit - Submit button click handler (optional if in form)
 * @param {string} submitText - Submit button text (default: "Save")
 * @param {string} cancelText - Cancel button text (default: "Cancel")
 * @param {boolean} loading - Shows loading state on submit button
 * @param {boolean} disabled - Disables submit button
 * @param {string} submitVariant - Submit button variant (default: "primary")
 * @param {ReactNode} leftActions - Additional actions on the left side
 * @param {ReactNode} centerActions - Additional actions in the center
 * @param {string} className - Additional CSS classes
 */
export default function FormActions({
  onCancel,
  onSubmit,
  submitText = "Save",
  cancelText = "Cancel",
  loading = false,
  disabled = false,
  submitVariant = "primary",
  leftActions,
  centerActions,
  className = "",
}) {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {/* Left side - Cancel and additional actions */}
      <div className="flex items-center gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        {leftActions}
      </div>

      {/* Center actions */}
      {centerActions && (
        <div className="flex items-center gap-3 flex-1 justify-center">
          {centerActions}
        </div>
      )}

      {/* Right side - Submit button */}
      <Button
        type={onSubmit ? "button" : "submit"}
        variant={submitVariant}
        onClick={onSubmit}
        loading={loading}
        disabled={disabled}
      >
        {submitText}
      </Button>
    </div>
  );
}

FormActions.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  submitVariant: PropTypes.string,
  leftActions: PropTypes.node,
  centerActions: PropTypes.node,
  className: PropTypes.string,
};
