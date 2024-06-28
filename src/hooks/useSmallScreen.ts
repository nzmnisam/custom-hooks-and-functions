import useWindowDimensions from "./useWindowDimensions";

type SmallScreenType = {
  breakPoint?: string;
  customWidth?: number;
};

const useSmallScreen = ({ breakPoint, customWidth }: SmallScreenType) => {
  const { width } = useWindowDimensions();

  const lg = 1024;
  const md = 768;
  const sm = 640;

  let smallScreen;
  if (!customWidth) {
    if (breakPoint === "lg") {
      smallScreen = width < lg;
    }
    if (breakPoint === "md") {
      smallScreen = width < md;
    }
    if (breakPoint === "sm") {
      smallScreen = width < sm;
    }
  } else {
    smallScreen = width < customWidth;
  }

  return smallScreen;
};

export default useSmallScreen;
