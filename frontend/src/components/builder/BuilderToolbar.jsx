import {
  FiSave,
  FiEye,
  FiSettings,
  FiArrowLeft,
  FiMoreVertical,
} from "react-icons/fi";
import Button from "../Button";
import { useState, useRef, useEffect } from "react";

/**
 * Reusable Builder Toolbar - Top toolbar with common actions
 *
 * @param {String} title - Builder title
 * @param {Function} onSave - Save callback
 * @param {Function} onPreview - Preview callback
 * @param {Function} onSettings - Settings callback
 * @param {Function} onBack - Back/cancel callback
 * @param {Boolean} saving - Whether currently saving
 * @param {Array} extraActions - Additional action buttons
 */
export default function BuilderToolbar({
  title = "Builder",
  subtitle,
  onSave,
  onPreview,
  onSettings,
  onBack,
  saving = false,
  extraActions = [],
  className = "",
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className={`bg-white border-b px-6 py-3 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left: Back button and title */}
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Go back"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          {/* Preview Button */}
          {onPreview && (
            <Button
              variant="outline"
              size="md"
              icon={<FiEye />}
              onClick={onPreview}
            >
              Preview
            </Button>
          )}

          {/* Settings Button */}
          {onSettings && (
            <Button
              variant="ghost"
              size="md"
              icon={<FiSettings />}
              onClick={onSettings}
              title="Settings"
            />
          )}

          {/* Save Button */}
          {onSave && (
            <Button
              variant="primary"
              size="md"
              icon={<FiSave />}
              onClick={onSave}
              loading={saving}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          )}

          {/* Extra Actions Menu */}
          {extraActions.length > 0 && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <FiMoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                  {extraActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.onClick?.();
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      {action.icon && (
                        <span className="text-gray-500">{action.icon}</span>
                      )}
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
