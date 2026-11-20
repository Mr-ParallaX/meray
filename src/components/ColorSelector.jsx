import React from 'react';
import { useAudience } from '../context/AudienceContext';

const ColorSelector = ({ currentVariant, onSelect, progress = 0 }) => {
  const { AUDIENCES } = useAudience();

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-white/90 text-xs md:text-sm font-trade font-bold tracking-[0.2em] uppercase">
        SELECT STYLE FOR
      </span>
      <div className="flex items-center gap-4 md:gap-5 bg-white/20 px-5 md:px-7 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
        {AUDIENCES.map((a) => {
          const isSelected = currentVariant.id === a.id;
          const radius = 15;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

          return (
            <button
              key={a.id}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const originX = `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`;
                const originY = `${((rect.top + rect.height / 2) / window.innerHeight) * 100}%`;
                onSelect(a, { originX, originY, userInitiated: true });
              }}
              className="flex flex-col items-center group focus:outline-none relative"
              aria-label={`Select ${a.name}`}
              aria-pressed={isSelected}
            >
              <div
                className="w-5 h-5 md:w-6 md:h-6 rounded-full transition-all duration-300 relative flex items-center justify-center"
                style={{ backgroundColor: a.hex }}
              >
                {/* Outer Progress Ring SVG on active dot */}
                {isSelected && (
                  <svg
                    className="absolute -inset-2 w-9 h-9 md:w-10 md:h-10 pointer-events-none -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    {/* Background track circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r={radius}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="1.5"
                    />
                    {/* Animated filling white progress ring */}
                    <circle
                      cx="18"
                      cy="18"
                      r={radius}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {/* Subtle hover ring when not active */}
                {!isSelected && (
                  <span
                    className="absolute inset-0 rounded-full border-2 border-white scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-40 transition-all duration-300"
                  />
                )}
              </div>
              <span
                className={`text-[9px] md:text-[10px] font-thunder font-bold tracking-wider uppercase mt-1.5 transition-opacity ${
                  isSelected ? "text-white opacity-100 scale-105" : "text-white/70 opacity-60 group-hover:opacity-100"
                }`}
              >
                {a.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
