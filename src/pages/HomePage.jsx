import React from 'react';
import Hero from '../components/Hero';
import TechSpecs from '../components/TechSpecs';
import Story from '../components/Story';
import LabBlueprint from '../components/LabBlueprint';
import CultureBanner from '../components/CultureBanner';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
import { useAudience } from '../context/AudienceContext';
import { useSEO } from '../hooks/useSEO';

const HomePage = () => {
  const { activeAudience, setActiveAudience } = useAudience();

  useSEO({
    title: "Meray Hair Salon — Mt Prospect, IL",
    description: "Meray Hair Salon at 1582 Busse Rd, Mt Prospect, IL 60056. Modern precision grooming, haircuts, fades, balayage, and styling for men, women, girls and boys."
  });

  return (
    <div className="w-full bg-black min-h-screen">
      <Hero
        activeVariant={activeAudience}
        setActiveVariant={setActiveAudience}
      />
      <TechSpecs />
      <Story />
      <LabBlueprint />
      <CultureBanner />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default HomePage;
