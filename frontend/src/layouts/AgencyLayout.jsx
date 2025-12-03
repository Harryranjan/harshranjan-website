import { Link } from "react-router-dom";
import DynamicHeader from "../components/DynamicHeader";
import DynamicFooter from "../components/DynamicFooter";
import ModalManager from "../components/ModalManager";
import PopupManager from "../components/PopupManager";

const AgencyLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Use existing menu system for header */}
      <DynamicHeader />

      {/* Main Content */}
      <main>{children}</main>

      {/* Use existing menu system for footer */}
      <DynamicFooter />

      {/* Modals and Popups */}
      <ModalManager />
      <PopupManager />
    </div>
  );
};

export default AgencyLayout;
