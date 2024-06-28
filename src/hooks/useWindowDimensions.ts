import { useState, useEffect } from "react";

function getWindowDimensions() {
  const dimensions: { width: number; height: number } = {
    width: 0,
    height: 0,
  };

  if (typeof window !== "undefined") {
    const { innerWidth, innerHeight } = window;
    dimensions.width = innerWidth;
    dimensions.height = innerHeight;
  }
  return dimensions;
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
}
