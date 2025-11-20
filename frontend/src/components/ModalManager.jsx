import { useState, useEffect } from "react";
import ModalEmbed from "./ModalEmbed";
import api from "../utils/api";

/**
 * ModalManager - Loads and displays active modals on the frontend
 * Handles trigger logic (time, scroll, exit intent, etc.)
 */
export default function ModalManager() {
  const [activeModals, setActiveModals] = useState([]);
  const [visibleModals, setVisibleModals] = useState({});
  const [closedModals, setClosedModals] = useState(() => {
    // Load closed modals from localStorage
    const stored = localStorage.getItem("closedModals");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    loadActiveModals();
  }, []);

  useEffect(() => {
    // Setup event listeners for different trigger types
    activeModals.forEach((modal) => {
      if (closedModals[modal.id]) return; // Skip if already closed

      switch (modal.trigger_type) {
        case "time":
          handleTimeDelay(modal);
          break;
        case "scroll":
          handleScrollTrigger(modal);
          break;
        case "exit":
          handleExitIntent(modal);
          break;
        case "click":
          handleClickTrigger(modal);
          break;
        case "manual":
          // Manual modals are triggered by custom code
          break;
        default:
          break;
      }
    });

    return () => {
      // Cleanup listeners
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeModals, closedModals]);

  const loadActiveModals = async () => {
    try {
      const { data } = await api.get("/modals/active");
      console.log("📋 Active modals loaded:", data);
      console.log("📋 Number of active modals:", data?.length || 0);
      setActiveModals(data || []);
    } catch (error) {
      console.error("❌ Error loading active modals:", error);
    }
  };

  const handleTimeDelay = (modal) => {
    const delay = parseInt(modal.trigger_value) * 1000 || 3000;
    setTimeout(() => {
      showModal(modal.id);
    }, delay);
  };

  const handleScrollTrigger = (modal) => {
    const scrollPercent = parseInt(modal.trigger_value) || 50;
    
    const checkScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      if (scrolled >= scrollPercent) {
        showModal(modal.id);
        window.removeEventListener("scroll", checkScroll);
      }
    };

    window.addEventListener("scroll", checkScroll);
  };

  const handleExitIntent = (modal) => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 50) {
        showModal(modal.id);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
  };

  const handleClickTrigger = (modal) => {
    // Click trigger handled via data-modal-trigger attribute in HTML
    const triggerElements = document.querySelectorAll(
      `[data-modal-trigger="${modal.id}"]`
    );
    
    triggerElements.forEach((element) => {
      element.addEventListener("click", () => showModal(modal.id));
    });
  };

  const shouldShowOnCurrentPage = (modal) => {
    const currentPath = window.location.pathname;
    const pageRules = modal.display_rules || {};
    
    // Check page targeting
    if (!pageRules.pageTargeting || pageRules.pageTargeting === "all") {
      return true; // Show on all pages
    }
    
    const targetPages = pageRules.pages || [];
    
    if (pageRules.pageTargeting === "specific") {
      // Show only on specific pages
      return targetPages.some((pattern) => {
        if (pattern.includes("*")) {
          // Wildcard matching
          const regex = new RegExp("^" + pattern.replace("*", ".*") + "$");
          return regex.test(currentPath);
        }
        return currentPath === pattern;
      });
    }
    
    if (pageRules.pageTargeting === "exclude") {
      // Show on all pages except specified
      return !targetPages.some((pattern) => {
        if (pattern.includes("*")) {
          // Wildcard matching
          const regex = new RegExp("^" + pattern.replace("*", ".*") + "$");
          return regex.test(currentPath);
        }
        return currentPath === pattern;
      });
    }
    
    return true;
  };

  const showModal = (modalId) => {
    if (closedModals[modalId]) return; // Don't show if user closed it
    
    // Check if modal should show on current page
    const modal = activeModals.find((m) => m.id === modalId);
    if (modal && !shouldShowOnCurrentPage(modal)) {
      console.log(`🚫 Modal ${modalId} not shown - page targeting rules`);
      return;
    }
    
    setVisibleModals((prev) => ({ ...prev, [modalId]: true }));
  };

  const handleClose = (modalId) => {
    setVisibleModals((prev) => ({ ...prev, [modalId]: false }));
    
    // Save to localStorage to prevent showing again
    const newClosedModals = { ...closedModals, [modalId]: Date.now() };
    setClosedModals(newClosedModals);
    localStorage.setItem("closedModals", JSON.stringify(newClosedModals));
  };

  const handleScroll = () => {
    // Placeholder for scroll handler
  };

  const handleMouseLeave = () => {
    // Placeholder for mouse leave handler
  };

  return (
    <>
      {activeModals.map((modal) => (
        <ModalEmbed
          key={modal.id}
          modalId={modal.id}
          isOpen={visibleModals[modal.id] || false}
          onClose={() => handleClose(modal.id)}
        />
      ))}
    </>
  );
}
