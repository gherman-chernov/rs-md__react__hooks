import { useViewportSize } from "../../hooks";

export default function ViewportSizeDemo() {
  const { height, width } = useViewportSize();

  return (
    <>
      Width: {width}, height: {height}
    </>
  );
}