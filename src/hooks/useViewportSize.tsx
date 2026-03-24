import { useCallback, useState } from "react";
import useWindowEvent from "./useWindowEvent";

export default function useViewportSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = useCallback(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, [setWidth, setHeight]);

  useWindowEvent('resize', handleResize);

  return { height, width };
}