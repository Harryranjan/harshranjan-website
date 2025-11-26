import React from 'react';
import Modal from './Modal';

/**
 * Reusable Confirmation Modal Component
 * Handles delete confirmations, action confirmations, and warnings
 * 
 * @param {boolean} isOpen - Modal visibility state
 * @param {function} onClose - Close modal callback
 * @param {function} onConfirm - Confirm action callback
 * @param {string} title - Modal title
 * @param {string} message - Confirmation message
 * @param {string} confirmLabel - Confirm button text (default: "Confirm")
 * @param {string} cancelLabel - Cancel button text (default: "Cancel")
 * @param {string} variant - Visual style: 'danger', 'warning', 'primary' (default: 'danger')
 * @param {boolean} loading - Show loading state on confirm button
 * @param {boolean} showCheckbox - Show "I understand" checkbox (default: false)
 * @param {string} checkboxLabel - Checkbox label text
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  showCheckbox = false,
  checkboxLabel = 'I understand this action cannot be undone',
  icon = null,
}) => {
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [isConfirming, setIsConfirming] = React.useState(false);

  // Reset checkbox when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setCheckboxChecked(false);
      setIsConfirming(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (showCheckbox && !checkboxChecked) return;
    
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  };

  // Variant styles
  const variantStyles = {
    danger: {
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      iconBg: 'bg-red-100',
      confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    warning: {
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      iconBg: 'bg-yellow-100',
      confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    },
    primary: {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-blue-100',
      confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
  };

  const style = variantStyles[variant] || variantStyles.danger;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="bg-white px-6 py-6">
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className={`rounded-full ${style.iconBg} p-3`}>
            {icon || style.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-600 text-center mb-6">
          {message}
        </p>

        {/* Optional Checkbox */}
        {showCheckbox && (
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 select-none">
                {checkboxLabel}
              </span>
            </label>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isConfirming || loading}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={(showCheckbox && !checkboxChecked) || isConfirming || loading}
            className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${style.confirmButton}`}
          >
            {(isConfirming || loading) && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
