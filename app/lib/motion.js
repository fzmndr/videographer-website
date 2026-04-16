export const easing = [0.22, 1, 0.36, 1];
export const duration = {
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
};

export const viewportDefault = {
  once: true,
  amount: 0.2,
};

export const sectionIntro = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: easing,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easing,
    },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: easing,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },
};

export const lineReveal = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: easing,
    },
  },
};

export const staggerWrap = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const staggerWrapSlow = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: easing,
    },
  },
};