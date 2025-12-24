import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export default function TimelineItem({
  contest,
  active,
  setActive,
  sectionId,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" }); // trigger slightly before entering

  // Collapse when section leaves viewport
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setActive(null);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  const isCurrent = contest.status === "upcoming";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex items-start gap-6"
    >
      {/* Pin */}
      <div
        className={`
          relative z-10 mt-1
          h-4 w-4 rounded-full
          ${isCurrent ? "bg-red-500 shadow-[0_0_12px_rgba(255,0,0,0.9)]" : "bg-red-700"}
        `}
      />

      {/* Label */}
      <div className="flex-1">
        <button
          onClick={() => setActive(active ? null : contest.id)}
          className="
            text-left w-full
            text-lg font-semibold text-red-500
            hover:text-red-400
            hover:drop-shadow-[0_0_6px_rgba(255,80,80,0.8)]
            transition
          "
        >
          {contest.name}
        </button>

        <p className="text-sm text-gray-400">
          {contest.location} • {contest.date}
        </p>

        {/* EXPANDABLE PANEL */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="
                relative mt-4 overflow-hidden
                border border-red-700 rounded-lg
                bg-black/80
              "
            >
              {/* Red scan bar */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "250%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="
                  absolute top-0 left-0 h-full w-1/3
                  bg-gradient-to-r from-transparent via-red-600/40 to-transparent
                "
              />

              <div className="relative p-4 text-sm text-gray-300">
                {contest.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
