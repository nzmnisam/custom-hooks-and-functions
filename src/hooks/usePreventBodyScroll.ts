import { useCallback, useEffect, useState } from "react";

const preventDefault = (ev: Event) => {
  ev.preventDefault();
};

const enableBodyScroll = () => {
  document && document.removeEventListener("wheel", preventDefault, false);
};

const disableBodyScroll = () => {
  document &&
    document.addEventListener("wheel", preventDefault, {
      passive: false,
    });
};

function usePreventBodyScroll() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    hidden ? disableBodyScroll() : enableBodyScroll();

    return enableBodyScroll;
  }, [hidden]);

  const disableScroll = useCallback(() => setHidden(true), []);
  const enableScroll = useCallback(() => setHidden(false), []);
  return { disableScroll, enableScroll };
}

export default usePreventBodyScroll;
