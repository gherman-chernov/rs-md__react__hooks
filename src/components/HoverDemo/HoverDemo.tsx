import { useHover } from "../../hooks";

export default function HoverDemo() {
  const { hovered, ref } = useHover<HTMLDivElement>();

  return (
    <div ref={ref}>
      {hovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}
    </div>
  );
}