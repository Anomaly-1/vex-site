import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


function useTypewriter(text, active) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!active) {
      setOutput("");
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setOutput(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [text, active]);

  return output;
}

export default function TeamCard({
  name,
  role,
  short,
  long,
  image,
  terminalColor = "text-red-400",
  sectionId = "team", // pass section id as string
}) {
  const [active, setActive] = useState(false);
  const typed = useTypewriter(long, active);

  // Deactivate if team section is out of view
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActive(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return (
    <>
      {/* Background overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[999] backdrop-blur-sm"
            onClick={() => setActive(false)}
          />
        )}
      </AnimatePresence>

      {/* Grid card */}
      <motion.div
        onClick={() => setActive(true)}
        layoutId={`card-${name}`}
        className="relative border border-red-700 rounded-xl overflow-hidden bg-black/60 cursor-pointer z-50"
      >
        {/* Card image */}
        <motion.div
          className="h-128 overflow-hidden"
          layoutId={`image-${name}`}
          animate={{ scale: active ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </motion.div>

        {/* Grid info */}
        {!active && (
          <div className="p-5 space-y-1">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-sm text-accent tracking-wide">{role}</p>
          </div>
        )}
      </motion.div>

      {/* Centered popup */}
      <AnimatePresence>
        {active && (
          <motion.div
            layoutId={`card-${name}`}
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-11/12 md:w-1/2 lg:w-1/3 bg-black/95 border border-red-700 rounded-xl overflow-hidden shadow-2xl"
          >
            <motion.div layoutId={`image-${name}`} className="h-128 overflow-hidden">
              <img src={image} alt={name} className="h-full w-full object-cover" />
            </motion.div>

            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              <p className="text-sm text-accent tracking-wide">{role}</p>
              <p className="text-gray-300 font-mono">{short}</p>

              <pre className={`mt-4 text-sm font-mono whitespace-pre-wrap ${terminalColor}`}>
                {`> ${typed}`}
                <span className="animate-pulse">▮</span>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
