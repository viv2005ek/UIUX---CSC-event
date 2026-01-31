export const motionTokens = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
    slowest: 1.2,
  },

  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94],
    bounce: [0.68, -0.55, 0.265, 1.55],
    springy: [0.34, 1.56, 0.64, 1],
    sharp: [0.4, 0, 0.2, 1],
    expressive: [0.87, 0, 0.13, 1],
  },

  spring: {
    gentle: { type: "spring", stiffness: 100, damping: 15 },
    bouncy: { type: "spring", stiffness: 300, damping: 20 },
    snappy: { type: "spring", stiffness: 400, damping: 25 },
    stiff: { type: "spring", stiffness: 500, damping: 30 },
  },

  delay: {
    stagger: (index) => index * 0.05,
    staggerLarge: (index) => index * 0.1,
  },
};

export const pageTransition = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -20 },
  transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth },
};

export const cardHover = {
  scale: 1.02,
  y: -8,
  rotateX: 2,
  rotateY: 2,
  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
  transition: motionTokens.spring.gentle,
};

export const buttonHover = {
  scale: 1.05,
  transition: motionTokens.spring.bouncy,
};

export const buttonTap = {
  scale: 0.95,
  transition: motionTokens.spring.snappy,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: motionTokens.duration.normal },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: motionTokens.spring.bouncy,
};
