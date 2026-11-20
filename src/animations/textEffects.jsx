import React, { useState, useEffect } from 'react';

export const MERAY_TEXT_EFFECTS = ['rise', 'flip', 'decode', 'blur', 'split'];
export const OUTLINE_TEXT_EFFECTS = ['decode', 'staggerSlide'];

export function getRandomMerayEffect(lastEffect) {
  const choices = MERAY_TEXT_EFFECTS.filter(e => e !== lastEffect);
  return choices[Math.floor(Math.random() * choices.length)] || MERAY_TEXT_EFFECTS[0];
}

export function getRandomOutlineEffect(lastEffect) {
  const choices = OUTLINE_TEXT_EFFECTS.filter(e => e !== lastEffect);
  return choices[Math.floor(Math.random() * choices.length)] || OUTLINE_TEXT_EFFECTS[0];
}

/**
 * Animated Giant MERAY word with 5 selectable effects
 */
export const AnimatedMerayWord = ({ effect = 'rise', className = '' }) => {
  const targetWord = "MERAY";
  const [displayText, setDisplayText] = useState(targetWord);

  useEffect(() => {
    if (effect !== 'decode') {
      setDisplayText(targetWord);
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let step = 0;
    const maxSteps = 16;
    const interval = setInterval(() => {
      step++;
      const progress = step / maxSteps;
      const lockedCount = Math.floor(progress * targetWord.length);

      const randomized = targetWord
        .split('')
        .map((char, i) => {
          if (i < lockedCount) return targetWord[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(randomized);

      if (step >= maxSteps) {
        clearInterval(interval);
        setDisplayText(targetWord);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [effect]);

  // Decode renders the resolved randomized text with crisp finish
  if (effect === 'decode') {
    return (
      <span className={`inline-block font-thunder ${className}`}>
        {displayText}
      </span>
    );
  }

  // Rise: letters rise from an overflow-hidden mask (stagger 40ms)
  if (effect === 'rise') {
    return (
      <span className={`inline-flex overflow-hidden font-thunder ${className}`}>
        {targetWord.split('').map((letter, i) => (
          <span
            key={`rise-${i}`}
            className="inline-block animate-meray-rise"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    );
  }

  // Flip: rotateX 90deg -> 0, perspective 600px, stagger 35ms
  if (effect === 'flip') {
    return (
      <span
        className={`inline-flex font-thunder ${className}`}
        style={{ perspective: '600px' }}
      >
        {targetWord.split('').map((letter, i) => (
          <span
            key={`flip-${i}`}
            className="inline-block animate-meray-flip origin-bottom"
            style={{ animationDelay: `${i * 35}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    );
  }

  // Blur: letter-spacing 0.3em -> normal, blur 12px -> 0
  if (effect === 'blur') {
    return (
      <span className={`inline-block font-thunder animate-meray-blur ${className}`}>
        {targetWord}
      </span>
    );
  }

  // Split: center outward slide
  if (effect === 'split') {
    const letters = targetWord.split('');
    const mid = (letters.length - 1) / 2;
    return (
      <span className={`inline-flex font-thunder ${className}`}>
        {letters.map((letter, i) => {
          const offset = i - mid;
          const animClass = offset < 0 ? 'animate-meray-split-left' : offset > 0 ? 'animate-meray-split-right' : 'animate-meray-split-center';
          return (
            <span
              key={`split-${i}`}
              className={`inline-block ${animClass}`}
              style={{ animationDelay: `${Math.abs(offset) * 45}ms` }}
            >
              {letter}
            </span>
          );
        })}
      </span>
    );
  }

  return <span className={`inline-block font-thunder ${className}`}>{targetWord}</span>;
};

/**
 * Animated Outline Word supporting decode and stagger slide
 */
export const AnimatedOutlineWord = ({ word, effect = 'staggerSlide', baseDelay = 0 }) => {
  const [displayText, setDisplayText] = useState(word);

  useEffect(() => {
    if (effect !== 'decode') {
      setDisplayText(word);
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let step = 0;
    const maxSteps = 12;
    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        const progress = step / maxSteps;
        const lockedCount = Math.floor(progress * word.length);

        const randomized = word
          .split('')
          .map((char, i) => {
            if (i < lockedCount) return word[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        setDisplayText(randomized);

        if (step >= maxSteps) {
          clearInterval(interval);
          setDisplayText(word);
        }
      }, 30);
      return () => clearInterval(interval);
    }, baseDelay);

    return () => clearTimeout(delayTimeout);
  }, [word, effect, baseDelay]);

  if (effect === 'decode') {
    return <span>{displayText}</span>;
  }

  // Stagger slide
  return (
    <span className="inline-flex overflow-hidden">
      {word.split('').map((letter, i) => (
        <span
          key={`stagger-${i}`}
          className="inline-block animate-letter-slide-up"
          style={{ animationDelay: `${baseDelay + i * 30}ms` }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};
