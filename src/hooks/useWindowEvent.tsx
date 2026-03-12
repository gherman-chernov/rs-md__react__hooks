import { useEffect } from "react";

export default function useWindowEvent(
  type: string,
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(type, handler, options);
    return () => {
      window.removeEventListener(type, handler, options);
    };
  }, [type, handler]);
}
