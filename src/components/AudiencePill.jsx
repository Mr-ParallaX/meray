import React from 'react';
import { useAudience } from '../context/AudienceContext';

const AudiencePill = ({ className = "" }) => {
  const { activeAudience, setActiveAudience, AUDIENCES } = useAudience();

  return (
    <div className={`flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-md ${className}`}>
      <span className="text-white/70 text-xs font-mono tracking-widest uppercase hidden sm:inline">
        For:
      </span>
      <div className="flex items-center gap-2">
        {AUDIENCES.map((a) => {
          const isSelected = activeAudience.id === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setActiveAudience(a)}
              className={`px-3 py-1 rounded-full text-xs font-thunder font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-white text-black shadow-lg scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              style={isSelected ? {} : {}}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: a.hex }}
              />
              {a.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AudiencePill;
