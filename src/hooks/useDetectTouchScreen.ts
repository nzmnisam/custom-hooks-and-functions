import { useEffect, useState } from "react";
import { detectTouchScreen } from "../utils/utilFunctions";

const useDetectTouchScreen = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    setIsTouchScreen(detectTouchScreen);
  }, []);

  return isTouchScreen;
};

export default useDetectTouchScreen;
