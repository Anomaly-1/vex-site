import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = ["Home", "Team", "Season", "Awards", "Iterations", "Contact"];

export default function SideNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");

    const onMove = (e) => {
      // Show navbar if mouse is near left edge OR hero section is visible
      const nearEdge = e.clientX < 96;

      let heroVisible = false;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // Consider hero visible if top is above viewport bottom and bottom below viewport top
        heroVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      }

      setVisible(nearEdge || heroVisible);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.nav
      initial={{ x: -96 }}
      animate={{ x: visible ? 0 : -96 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="
        fixed top-0 left-0 h-full w-24
        bg-black/90 border-r border-red-700
        z-50 flex items-center justify-center
      "
    >
      <div className="flex flex-col items-center gap-10">
        {items.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="
              group relative
              flex flex-col items-center
              text-sm font-semibold uppercase
              text-red-500 hover:text-white
              transition-colors duration-200
            "
          >
            {/* Letters stacked top-down */}
            {item.split("").map((char, i) => (
              <span key={i} className="leading-none tracking-widest">
                {char}
              </span>
            ))}

            {/* Hover indicator */}
            <span
              className="
                absolute -left-3 top-0 bottom-0 w-0.5
                bg-red-600 scale-y-0
                group-hover:scale-y-100
                transition-transform origin-top
              "
            />
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
