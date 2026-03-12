import { useState } from "react";
import useWindowEvent from "./useWindowEvent";

export default function useViewportSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

  useWindowEvent('resize', handleResize);

  return { height, width };
}