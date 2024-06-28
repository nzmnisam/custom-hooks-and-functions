import { useState, useEffect, MutableRefObject } from "react";

export default function useElementDimensions(
  elementRef: MutableRefObject<HTMLDivElement | null>,
  withPadding = true
) {
  const [elementDimensions, setElementDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const getContentWidth = (element: HTMLDivElement, withPadding: boolean) => {
    const { clientWidth, clientHeight } = element;

    const elementComputedStyle = window.getComputedStyle(element, null);

    if (!withPadding) {
      const widthNoP =
        clientWidth -
        parseFloat(elementComputedStyle.paddingLeft) -
        parseFloat(elementComputedStyle.paddingRight);

      const heightNoP =
        clientHeight -
        parseFloat(elementComputedStyle.paddingTop) -
        parseFloat(elementComputedStyle.paddingBottom);

      return {
        width: widthNoP,
        height: heightNoP,
      };
    } else {
      return { width: clientWidth, height: clientHeight };
    }
  };

  useEffect(() => {
    const dimensions: { width: number; height: number } = {
      width: 0,
      height: 0,
    };

    if (elementRef?.current) {
      const contentWidth = getContentWidth(elementRef.current, withPadding);
      dimensions.width = contentWidth.width;
      dimensions.height = contentWidth.height;

      setElementDimensions(dimensions);
    }

    const getWidth = () => {
      if (elementRef?.current) {
        const { clientWidth, clientHeight } = elementRef.current;
        dimensions.width = clientWidth;
        dimensions.height = clientHeight;
        setElementDimensions(dimensions);
      }
    };
    window.addEventListener("resize", getWidth);

    return () => window.removeEventListener("resize", getWidth);
  }, [elementRef, withPadding]);

  return elementDimensions;
}
