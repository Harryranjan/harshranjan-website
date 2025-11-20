import { useState, useEffect } from 'react';
import api from '../utils/api';
import CTABanner from './CTABanner';

/**
 * CTABannerEmbed Component
 * Renders a CTA banner from the database using its ID
 * Can be used via shortcode: [cta_banner id="1"]
 */
const CTABannerEmbed = ({ id }) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBanner();
    }
  }, [id]);

  const fetchBanner = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/cta-banners/${id}/embed`);
      
      // Only show active banners
      if (response.data.status === 'active') {
        setBanner(response.data);
        
        // Track view
        api.post(`/cta-banners/${id}/track-view`).catch(err => 
          console.error('Failed to track view:', err)
        );
      }
    } catch (err) {
      console.error('Error loading CTA banner:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (banner) {
      // Track click
      api.post(`/cta-banners/${banner.id}/track-click`).catch(err => 
        console.error('Failed to track click:', err)
      );

      // Handle button action
      if (banner.button_url) {
        if (banner.button_url.startsWith('http')) {
          window.open(banner.button_url, '_blank');
        } else {
          window.location.href = banner.button_url;
        }
      } else {
        // Default action - could open a modal or navigate to contact
        window.location.href = '/contact';
      }
    }
  };

  if (loading) {
    return null; // Don't show anything while loading
  }

  if (error || !banner) {
    return null; // Don't show error to end users
  }

  // Check if banner should be shown on current page
  const currentPath = window.location.pathname;
  const placement = banner.placement || ['all'];
  
  const shouldShow = placement.includes('all') || placement.some(p => {
    if (p === 'homepage') return currentPath === '/';
    return currentPath.includes(`/${p}`);
  });

  if (!shouldShow) {
    return null;
  }

  // Extract color classes from database
  const colorClasses = {
    background: banner.colors?.background || 'from-red-500 to-red-600',
    buttonBg: banner.colors?.buttonBg || 'white',
    buttonText: banner.colors?.buttonText || 'red-600',
    text: banner.colors?.text || 'white'
  };

  return (
    <CTABanner
      variant={banner.variant}
      title={banner.title}
      description={banner.description}
      buttonText={banner.button_text}
      phoneNumber={banner.show_phone ? banner.phone_number : null}
      onButtonClick={handleClick}
      showAfterScroll={banner.show_after_scroll || 100}
      dismissible={banner.dismissible}
      storageKey={`cta-banner-${banner.id}-dismissed`}
      customColors={colorClasses}
    />
  );
};

export default CTABannerEmbed;
