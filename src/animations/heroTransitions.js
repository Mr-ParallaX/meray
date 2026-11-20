/**
 * Hero image transition definitions
 * 750–900ms duration, smooth cubic-bezier(0.22, 1, 0.36, 1)
 */

export const TRANSITION_TYPES = [
  'circle',
  'diagonal',
  'slideBlur',
  'zoom',
  'centerSplit',
  'curtain'
];

/**
 * Returns a random transition type that is guaranteed different from the last one used
 */
export function getRandomTransition(lastType) {
  const choices = TRANSITION_TYPES.filter(t => t !== lastType);
  return choices[Math.floor(Math.random() * choices.length)] || TRANSITION_TYPES[0];
}

/**
 * Transition styling definitions for Old (outgoing) and New (incoming) layers
 */
export const HERO_TRANSITIONS = {
  circle: {
    name: 'Circle Reveal',
    duration: 850,
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    oldStyle: {
      zIndex: 1,
      opacity: 1
    },
    newStyle: (originX = '50%', originY = '85%') => ({
      zIndex: 2,
      opacity: 1,
      animation: `heroCircleReveal 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
      '--circle-x': originX,
      '--circle-y': originY
    })
  },
  diagonal: {
    name: 'Diagonal Wipe',
    duration: 850,
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    oldStyle: {
      zIndex: 1,
      opacity: 1
    },
    newStyle: () => ({
      zIndex: 2,
      opacity: 1,
      animation: `heroDiagonalWipe 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
    })
  },
  slideBlur: {
    name: 'Slide + Blur',
    duration: 800,
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    oldStyle: {
      zIndex: 1,
      animation: `heroSlideBlurOut 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
    },
    newStyle: () => ({
      zIndex: 2,
      animation: `heroSlideBlurIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
    })
  },
  zoom: {
    name: 'Zoom Through',
    duration: 850,
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    oldStyle: {
      zIndex: 1,
      animation: `heroZoomOut 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
    },
    newStyle: () => ({
      zIndex: 2,
      animation: `heroZoomIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
    })
  },
  centerSplit: {
    name: 'Center Split',
    duration: 850,
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    oldStyle: {
      zIndex: 1,
      opacity: 1
    },
    newStyle: () => ({
      zIndex: 2,
      opacity: 1,
      animation: `heroCenterSplit 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
    })
  },
  curtain: {
    name: 'Curtain Reveal',
    duration: 880,
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    oldStyle: {
      zIndex: 1,
      opacity: 1
    },
    newStyle: () => ({
      zIndex: 2,
      opacity: 1,
      animation: `heroCurtain 880ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
    })
  }
};
