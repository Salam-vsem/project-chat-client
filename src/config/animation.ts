export const pageVariants = {
  initial: {
    opacity: 0,
    x: "100vw",
    // scale: 0.8
  },
  in: {
    opacity: 1,
    x: 0,
    // scale: 1
  },
  out: {
    opacity: 0,
    x: "-100vw",
    // scale: 1.2
  }
};

export const springTransition = {
  type: "spring",
  ease: "anticipate",
  duration: 0.5
};

export const tweenTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
};

export const linearTransition = {
  type: "linear",
  ease: "anticipate",
  duration: 0.3
};