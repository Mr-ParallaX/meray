import React from 'react';
import { AnimatedOutlineWord } from '../animations/textEffects';

export const StaggeredWord = ({ word, audienceId, baseDelay = 0, effect = 'staggerSlide' }) => {
  return (
    <AnimatedOutlineWord
      word={word}
      effect={effect}
      baseDelay={baseDelay}
    />
  );
};

export const DriftingOutlineRow = ({
  word,
  audienceId,
  direction = 'left',
  delay = 0,
  className = "text-[24vw]",
  effect = 'staggerSlide'
}) => {
  const repeatedText = `${word} • ${word} • ${word} • ${word} • `;

  return (
    <div
      className="overflow-hidden whitespace-nowrap w-full py-0.5"
    >
      <div
        className={`flex whitespace-nowrap will-change-transform outline-shine ${
          direction === 'left' ? 'animate-drift-left' : 'animate-drift-right'
        }`}
      >
        <span className={`flex-shrink-0 text-stroke-outline font-thunder font-bold leading-[0.85] tracking-tighter uppercase select-none pr-4 ${className}`}>
          <StaggeredWord word={repeatedText} audienceId={audienceId} baseDelay={delay} effect={effect} />
        </span>
        <span className={`flex-shrink-0 text-stroke-outline font-thunder font-bold leading-[0.85] tracking-tighter uppercase select-none pr-4 ${className}`}>
          <StaggeredWord word={repeatedText} audienceId={audienceId} baseDelay={delay} effect={effect} />
        </span>
      </div>
    </div>
  );
};
