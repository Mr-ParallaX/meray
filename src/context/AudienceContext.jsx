import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUDIENCES as DEFAULT_AUDIENCES } from '../data/audiences';
import { getSettings } from '../services/crmApi';

const AudienceContext = createContext();

export const AudienceProvider = ({ children }) => {
  const [audiences, setAudiences] = useState(DEFAULT_AUDIENCES);

  // Sync hero texts from CRM settings
  const applySettingsToAudiences = (settings) => {
    if (!settings || !settings.heroTexts) return;
    setAudiences((prev) =>
      prev.map((aud) => {
        const custom = settings.heroTexts[aud.id];
        if (!custom) return aud;
        return {
          ...aud,
          label: custom.label || aud.label,
          priceFrom: custom.priceFrom !== undefined ? custom.priceFrom : aud.priceFrom,
          description: custom.description || aud.description,
          words: Array.isArray(custom.words) && custom.words.length ? custom.words : aud.words
        };
      })
    );
  };

  useEffect(() => {
    // Initial fetch from crmApi
    getSettings().then((settings) => {
      applySettingsToAudiences(settings);
    });

    // Listen for live updates from CRM Settings
    const handleSettingsUpdate = (e) => {
      if (e.detail) {
        applySettingsToAudiences(e.detail);
      }
    };

    window.addEventListener('meray_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('meray_settings_updated', handleSettingsUpdate);
  }, []);

  const getInitialAudience = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryFor = params.get("for")?.toLowerCase();
      const matchedQuery = audiences.find(a => a.id === queryFor);
      if (matchedQuery) return matchedQuery;

      const saved = localStorage.getItem("meray_audience");
      const matchedSaved = audiences.find(a => a.id === saved);
      if (matchedSaved) return matchedSaved;
    }
    return audiences[0]; // Men is default
  };

  const [activeAudience, setActiveAudienceState] = useState(getInitialAudience);

  // Keep activeAudience in sync with updated audiences data
  useEffect(() => {
    const updatedMatch = audiences.find(a => a.id === activeAudience.id);
    if (updatedMatch) {
      setActiveAudienceState(updatedMatch);
    }
  }, [audiences, activeAudience.id]);

  const setActiveAudience = (audienceOrId) => {
    const target = typeof audienceOrId === "string"
      ? audiences.find(a => a.id === audienceOrId) || audiences[0]
      : audienceOrId;

    setActiveAudienceState(target);

    if (typeof window !== "undefined") {
      localStorage.setItem("meray_audience", target.id);

      // Sync URL search param without refreshing
      const url = new URL(window.location.href);
      url.searchParams.set("for", target.id);
      window.history.replaceState({}, "", url.toString());

      // Set CSS variable on <html>
      document.documentElement.style.setProperty("--accent", target.hex);
    }
  };

  useEffect(() => {
    // Initial CSS variable set
    document.documentElement.style.setProperty("--accent", activeAudience.hex);

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const queryFor = params.get("for")?.toLowerCase();
      if (queryFor) {
        const found = audiences.find(a => a.id === queryFor);
        if (found && found.id !== activeAudience.id) {
          setActiveAudienceState(found);
          document.documentElement.style.setProperty("--accent", found.hex);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeAudience.hex, activeAudience.id, audiences]);

  return (
    <AudienceContext.Provider value={{ activeAudience, setActiveAudience, AUDIENCES: audiences }}>
      {children}
    </AudienceContext.Provider>
  );
};

export const useAudience = () => {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudience must be used within an AudienceProvider");
  }
  return context;
};
