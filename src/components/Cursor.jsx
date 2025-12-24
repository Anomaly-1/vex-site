import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    // HARD mobile cutoff — matches Tailwind md breakpoint
    if (window.innerWidth < 768) return;

    document.body.style.cursor = "none";

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = "";
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      className="cursor"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        position: "fixed",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
