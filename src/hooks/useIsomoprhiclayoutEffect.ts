import { useEffect, useLayoutEffect } from "react";

const useIsomoprhiclayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomoprhiclayoutEffect;
