import DynamicHeader from "../components/DynamicHeader";
import DynamicFooter from "../components/DynamicFooter";
import ModalManager from "../components/ModalManager";
import PopupManager from "../components/PopupManager";
import CTAFormModal from "../components/CTAFormModal";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <DynamicHeader />
      <main className="flex-grow">{children}</main>
      <DynamicFooter />
      <ModalManager />
      <PopupManager />
      <CTAFormModal />
    </div>
  );
};

export default PublicLayout;
