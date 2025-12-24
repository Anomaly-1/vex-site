import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="py-32 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl font-bold text-red-500 mb-6">
        Contact
      </h2>
      <p className="text-gray-400 contact-text">
        versyn1137b on Instagram &bull; Sponsor inquiries welcome
      </p>
    </motion.section>
  );
}