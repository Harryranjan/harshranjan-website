import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch menu items from database
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/menus/location/header"
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          // Transform database format to component format
          const transformedItems = data.items.map((item) => ({
            label: item.title,
            path: item.url || (item.page ? `/pages/${item.page.slug}` : "#"),
            submenu:
              item.children && item.children.length > 0
                ? item.children.map((child) => ({
                    label: child.title,
                    path:
                      child.url ||
                      (child.page ? `/pages/${child.page.slug}` : "#"),
                  }))
                : undefined,
          }));
          setMenuItems(transformedItems);
        } else {
          // No active menu - show empty navigation
          setMenuItems([]);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
        // API error - show empty navigation
        setMenuItems([]);
      }
    };

    fetchMenuItems();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-3" : "bg-white shadow-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/pages/home" className="group">
            <div className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
              Dr. Subodh Kumar
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <>
                    <button className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all flex items-center gap-1.5 hover:bg-blue-50 rounded-lg h-10 text-sm">
                      {item.label}
                      <i className="fas fa-chevron-down text-xs group-hover:rotate-180 transition-transform duration-300"></i>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 border border-gray-100">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group/item"
                        >
                          <i className="fas fa-chevron-right text-xs text-blue-600 opacity-0 group-hover/item:opacity-100 transition-opacity"></i>
                          <span className="font-medium">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 font-medium transition-all rounded-lg h-10 inline-flex items-center text-sm whitespace-nowrap ${
                      isActive(item.path)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:8160754633"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all px-3 py-2 hover:bg-blue-50 rounded-lg h-10 text-sm whitespace-nowrap"
            >
              <i className="fas fa-phone-alt text-xs"></i>
              <span className="font-semibold">8160754633</span>
            </a>
            <Link
              to="/pages/contact"
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 h-10 text-sm whitespace-nowrap"
            >
              <i className="fas fa-calendar-check"></i>
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center text-gray-700 hover:bg-blue-50 rounded-xl transition-all"
          >
            <i
              className={`fas ${
                isMenuOpen ? "fa-times" : "fa-bars"
              } text-2xl transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : ""
              }`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <>
                    <div className="font-bold text-gray-900 px-5 py-3 bg-gray-50 rounded-lg">
                      {item.label}
                    </div>
                    <div className="pl-3 space-y-1 mt-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2 pl-6 pr-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all rounded-lg"
                        >
                          <i className="fas fa-chevron-right text-xs"></i>
                          <span className="font-medium">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all font-semibold ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-6 border-t border-gray-200 mt-4 space-y-3">
              <a
                href="tel:8160754633"
                className="flex items-center justify-center gap-3 text-gray-700 py-3 bg-gray-50 rounded-xl font-bold"
              >
                <i className="fas fa-phone-alt text-blue-600"></i>
                <span>8160754633</span>
              </a>
              <Link
                to="/pages/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg"
              >
                <i className="fas fa-calendar-check"></i>
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
