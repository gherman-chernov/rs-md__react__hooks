import { useEffect, useRef, useState } from "react";

export default function useHover<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [hovered, setIsHovering] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  useEffect(() => {
    const current = ref.current;
    
    if (!current) return;

    current.addEventListener("mouseenter", handleMouseEnter);
    current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (current) {
        current.removeEventListener("mouseenter", handleMouseEnter);
        current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return {
    hovered,
    ref
  };
}