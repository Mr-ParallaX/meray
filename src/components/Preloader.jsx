import React, { useState, useEffect } from 'react';
import { AUDIENCES, SALON_INTERIOR_IMAGES } from '../data/audiences';

const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let loadedCount = 0;
    let finished = false;

    // Preload only phone images on mobile (<768px) and only desktop images on desktop
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const targetPersonImages = isMobile
      ? AUDIENCES.map((a) => a.phoneImage)
      : AUDIENCES.map((a) => a.image);

    const imagesToPreload = [
      ...targetPersonImages,
      ...AUDIENCES.flatMap((a) => a.styles.map((s) => s.image)),
      ...SALON_INTERIOR_IMAGES
    ];

    const totalCount = imagesToPreload.length;

    const updateProgress = () => {
      const p = Math.round((loadedCount / totalCount) * 100);
      setPercent(p);
      if (loadedCount >= totalCount && !finished) {
        finished = true;
        setTimeout(() => setPercent(100), 100);
      }
    };

    const promises = imagesToPreload.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          updateProgress();
          resolve();
        };
        img.src = url;
      });
    });

    // Fallback maximum timeout of 1.6s so users don't wait if network slow
    const maxTimeout = setTimeout(() => {
      setPercent(100);
    }, 1600);

    Promise.all(promises).then(() => {
      clearTimeout(maxTimeout);
      setTimeout(() => setPercent(100), 150);
    });

    const titleTimer = setTimeout(() => setIsTitleVisible(true), 400);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(maxTimeout);
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (percent === 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 1000);
      }, 600);
      return () => clearTimeout(exitTimer);
    }
  }, [percent, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative overflow-hidden z-10">
        <h1
          className={`text-white font-thunder font-bold text-[18vw] md:text-[15vw] leading-[0.8] tracking-tighter transition-transform duration-1000 ease-out transform ${
            isTitleVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          MERAY
        </h1>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 flex flex-col items-end overflow-hidden">
        <div
          className={`transition-transform duration-500 ease-in-out ${
            isExiting ? "translate-y-full" : "translate-y-0"
          }`}
        >
          <span className="text-white font-thunder text-6xl md:text-9xl font-bold leading-none tracking-tighter">
            {percent}%
          </span>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16 overflow-hidden hidden md:block">
        <p
          className={`text-white/60 font-mono text-sm tracking-widest uppercase transition-opacity duration-500 ${
            percent > 40 ? "opacity-100" : "opacity-0"
          }`}
        >
          Hair Salon · Mt Prospect, IL
        </p>
      </div>
    </div>
  );
};

export default Preloader;
