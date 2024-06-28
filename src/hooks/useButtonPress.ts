import { useState } from "react";
import useDetectTouchScreen from "./useDetectTouchScreen";

interface PressInput {
  onPress?: () => void | undefined;
  onRelease?: () => void | undefined;
  effectDuration?: number | undefined;
}

interface PressOutput {
  onMouseDown: (event?: React.MouseEvent) => void;
  onMouseUp: () => void;
  onTouchStart: (event?: React.TouchEvent) => void;
  onTouchEnd: () => void;
  isButtonPressed: boolean;
}

const useButtonPress = ({
  onPress,
  onRelease,
  effectDuration,
}: PressInput): PressOutput => {
  const isTouch = useDetectTouchScreen();
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const onPressDefault = () => {
    setIsButtonPressed(true);
  };

  const onReleaseDefault = () => {
    setTimeout(() => setIsButtonPressed(false), effectDuration || 300);
  };

  const onMouseDown = () => {
    if (isTouch) return;
    onPressDefault();
    if (onPress) onPress();
  };

  const onMouseUp = () => {
    if (isTouch) return;
    onReleaseDefault();
    if (onRelease) onRelease();
  };

  const onTouchStart = () => {
    if (!isTouch) return;
    onPressDefault();
    if (onPress) onPress();
  };

  const onTouchEnd = () => {
    if (!isTouch) return;
    onReleaseDefault();
    if (onRelease) onRelease();
  };

  return { isButtonPressed, onMouseDown, onMouseUp, onTouchStart, onTouchEnd };
};

export default useButtonPress;
