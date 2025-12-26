import { motion } from "framer-motion";

export default function IterationCard({ name, description, image, index = 0 }) {
  return (
    <motion.div
      className="border border-red-700 p-8 rounded-xl bg-black/70 shadow-[0_0_15px_rgba(255,0,0,0.3)] cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {image && (
        <div className="h-128 mb-6 overflow-hidden rounded-lg">
          <motion.img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <motion.h3
        className="text-2xl font-semibold mb-2 text-red-500"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        {name}
      </motion.h3>
      {description}
    </motion.div>
  );
}
