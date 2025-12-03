import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../store/popupSlice";
import PopupEmbed from "./PopupEmbed";
import api from "../utils/api";

export default function PopupManager() {
  const [popups, setPopups] = useState([]);
  const [activePopups, setActivePopups] = useState([]);
  const closedPopups = useSelector((state) => state.popups.closedPopups);
  const dispatch = useDispatch();

  useEffect(() => {
    loadActivePopups();
  }, []);

  const loadActivePopups = async () => {
    try {
      const { data } = await api.get("/popups/active");
      setPopups(data || []);

      // Initialize trigger handlers for each popup
      data.forEach((popup) => {
        if (shouldShowOnCurrentPage(popup)) {
          handleTrigger(popup);
        }
      });
    } catch (error) {
      console.error("Error loading popups:", error);
    }
  };

  const shouldShowOnCurrentPage = (popup) => {
    const currentPath = window.location.pathname;
    const displayRules = popup.display_rules || {};
    const pageTargeting = displayRules.pageTargeting || "all";
    const pages = displayRules.pages || [];

    // Check if already closed
    if (closedPopups.includes(popup.id)) {
      return false;
    }

    // Check page targeting
    if (pageTargeting === "all") {
      return true;
    } else if (pageTargeting === "specific") {
      return pages.some((page) => {
        if (page.includes("*")) {
          // Wildcard matching
          const pattern = page.replace("*", ".*");
          return new RegExp(`^${pattern}$`).test(currentPath);
        }
        return currentPath === page || currentPath.startsWith(page + "/");
      });
    } else if (pageTargeting === "exclude") {
      return !pages.some((page) => {
        if (page.includes("*")) {
          const pattern = page.replace("*", ".*");
          return new RegExp(`^${pattern}$`).test(currentPath);
        }
        return currentPath === page || currentPath.startsWith(page + "/");
      });
    }

    return false;
  };

  const handleTrigger = (popup) => {
    const triggerType = popup.trigger_type || "immediate";
    const triggerValue = popup.trigger_value;

    switch (triggerType) {
      case "immediate":
        showPopup(popup);
        break;

      case "time":
        const delay = parseInt(triggerValue) || 3;
        setTimeout(() => showPopup(popup), delay * 1000);
        break;

      case "scroll":
        handleScrollTrigger(popup, parseInt(triggerValue) || 50);
        break;

      case "exit":
        handleExitIntent(popup);
        break;

      case "click":
        handleClickTrigger(popup, triggerValue);
        break;

      case "manual":
        // Manual popups are triggered by code, not auto-shown
        break;

      default:
        break;
    }
  };

  const handleScrollTrigger = (popup, percentage) => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercentage >= percentage) {
        showPopup(popup);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
  };

  const handleExitIntent = (popup) => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        showPopup(popup);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
  };

  const handleClickTrigger = (popup, selector) => {
    const element = document.querySelector(selector);
    if (element) {
      const handleClick = () => {
        showPopup(popup);
        element.removeEventListener("click", handleClick);
      };
      element.addEventListener("click", handleClick);
    }
  };

  const showPopup = (popup) => {
    // Check if popup is already showing
    if (activePopups.find((p) => p.id === popup.id)) {
      return;
    }

    // Check if closed before
    if (closedPopups.includes(popup.id)) {
      return;
    }

    setActivePopups((prev) => [...prev, popup]);
  };

  const handleClosePopup = (popupId) => {
    // Remove from active popups
    setActivePopups((prev) => prev.filter((p) => p.id !== popupId));

    // Add to Redux store (persisted automatically)
    dispatch(closePopup(popupId));
  };

  const handleTrackView = async (popupId) => {
    try {
      await api.post(`/popups/${popupId}/track/view`);
    } catch (error) {
      console.error("Error tracking popup view:", error);
    }
  };

  const handleTrackClick = async (popupId) => {
    try {
      await api.post(`/popups/${popupId}/track/click`);
    } catch (error) {
      console.error("Error tracking popup click:", error);
    }
  };

  const handleTrackDismissal = async (popupId) => {
    try {
      await api.post(`/popups/${popupId}/track/dismissal`);
    } catch (error) {
      console.error("Error tracking popup dismissal:", error);
    }
  };

  return (
    <>
      {activePopups.map((popup) => (
        <PopupEmbed
          key={popup.id}
          popup={popup}
          onClose={() => handleClosePopup(popup.id)}
          onTrackView={() => handleTrackView(popup.id)}
          onTrackClick={() => handleTrackClick(popup.id)}
          onTrackDismissal={() => handleTrackDismissal(popup.id)}
        />
      ))}
    </>
  );
}
