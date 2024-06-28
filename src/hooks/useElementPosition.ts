import {
  useRef,
  useLayoutEffect,
  MutableRefObject,
  DependencyList,
} from "react";

interface IPosition {
  xl: number;
  xr: number;
  yt: number;
  yb: number;
}

interface IScrollProps {
  previousPosition: IPosition;
  currentPosition: IPosition;
}

type ElementRef = MutableRefObject<HTMLElement | null>;

const zeroPosition = { xl: 0, yt: 0, yb: 0, xr: 0 };

const getClientRect = (element?: HTMLElement) =>
  element?.getBoundingClientRect();

const getScrollPosition = (element?: ElementRef) => {
  if (typeof window !== "undefined") {
    const targetPosition = getClientRect(
      element?.current || window.document.body
    );

    if (!targetPosition) {
      return zeroPosition;
    }

    return {
      xl: targetPosition.left,
      xr: targetPosition.right,
      yt: targetPosition.top,
      yb: targetPosition.bottom,
    };
  }
  return {
    xl: 0,
    xr: 0,
    yt: 0,
    yb: 0,
  };
};

export const useScrollPosition = (
  effect: (props: IScrollProps) => void,
  element: ElementRef,
  dependencies?: DependencyList,
  wait?: number
) => {
  const position = useRef(getScrollPosition());

  let throttleTimeout: number | null = null;

  const callBack = () => {
    const currentPosition = getScrollPosition(element);
    effect({ previousPosition: position.current, currentPosition });
    position.current = currentPosition;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = window.setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, dependencies);
};
