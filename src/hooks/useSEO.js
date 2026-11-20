import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

export const useSEO = ({ title, description }) => {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | ${SITE_CONFIG.name} — Mt Prospect, IL`
      : `${SITE_CONFIG.name} — Mt Prospect, IL | Haircuts for Men, Women & Kids`;
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const defaultDesc = "Meray Hair Salon at 1582 Busse Rd, Mt Prospect, IL. Premier haircuts, fades, balayage, color, and styling for men, women, girls, and boys.";
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDesc);
    }
  }, [title, description]);
};
