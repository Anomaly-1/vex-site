import {motion} from "framer-motion";

export default function HeroSection() {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center text-center px-6"
            >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {/* Title */}
                <motion.h1
                className="text-6xl md:text-7xl font-black mb-6 text-red-600"
                style={{ WebkitTextStroke: "0px" }}
                whileHover={{
                    color: "#000",                // fill black
                    WebkitTextStroke: "2px #ff4d4d", // red outline
                    transition: { duration: 0.3 },
                }}
                >
                VEX TEAM 1137B
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                className="max-w-xl mx-auto text-gray-400 text-lg"
                whileHover={{
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.87)",
                    transition: { duration: 0.3 },
                }}
                >
                Competitive robotics. Consistent iteration. Constant Teamwork.
                </motion.p>
            </motion.div>
            </section>

    )
}