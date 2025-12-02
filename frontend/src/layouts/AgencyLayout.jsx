import { Link } from "react-router-dom";
import DynamicHeader from "../components/DynamicHeader";
import DynamicFooter from "../components/DynamicFooter";

const AgencyLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Use existing menu system for header */}
      <DynamicHeader />

      {/* Main Content */}
      <main>{children}</main>

      {/* Use existing menu system for footer */}
      <DynamicFooter />
    </div>
  );
};

export default AgencyLayout;
