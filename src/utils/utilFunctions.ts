export const breakpointToNumber = (breakpoint: string): number => {
  return +breakpoint.substring(0, breakpoint.length - 2);
};

export const scrollToTop = (behavior?: ScrollBehavior) => {
  const scrollBehavior = behavior ? behavior : "smooth";

  window.scrollTo({
    top: 0,
    behavior: scrollBehavior,
  });
};

export const detectTouchScreen = (): boolean => {
  return window.matchMedia("(pointer: coarse)").matches;
};
