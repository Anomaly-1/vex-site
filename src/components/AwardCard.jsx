import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";

export default function AwardCard({ award, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="
        relative p-6 rounded-xl
        bg-black/80 border border-red-700
        hover:shadow-[0_0_30px_rgba(255,0,0,0.35)]
        transition-all
      "
    >
      <div className="flex items-center gap-4 mb-3">
        <Award className="text-red-500 drop-shadow-[0_0_6px_rgba(255,60,60,0.8)]" />

        <div>
          <h3 className="
            text-lg font-bold text-red-500
            hover:text-red-400
            hover:drop-shadow-[0_0_6px_rgba(255,80,80,0.9)]
            transition
          ">
            {award.title}
          </h3>
          <p className="text-xs text-gray-400">{award.event} : {award.year}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm hover:text-gray-200 transition">
        {award.description}
      </p>
    </motion.div>
  );
}
