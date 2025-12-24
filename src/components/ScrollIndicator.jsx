import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollIndicator({ containerId }) {
  const [width, setWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(1);

  const scrollX = useMotionValue(0);
  const progress = useTransform(scrollX, [0, scrollWidth - width], [0, 1]);

  const [progressPercent, setProgressPercent] = useState(0);

  // Subscribe to progress changes
  useEffect(() => {
    return progress.onChange((latest) => setProgressPercent(latest));
  }, [progress]);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const updateSizes = () => {
      setWidth(container.offsetWidth);
      setScrollWidth(container.scrollWidth);
    };
    updateSizes();
    window.addEventListener("resize", updateSizes);

    const onScroll = () => scrollX.set(container.scrollLeft);
    container.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", updateSizes);
      container.removeEventListener("scroll", onScroll);
    };
  }, [containerId]);

  return (
    <div className="relative w-full h-2 mt-2 bg-gray-800 rounded-full overflow-hidden">
      {/* Red progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-2 bg-red-600 rounded-full"
        style={{ width: `${progressPercent * 100}%` }}
      />

      {/* Moving comet dot */}
      <motion.div
        className="absolute top-0 h-2 w-2 bg-red-400 rounded-full shadow-md"
        style={{ left: `calc(${progressPercent * 100}% - 4px)` }}
      />
    </div>
  );
}
