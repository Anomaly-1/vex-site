import { motion } from "framer-motion";
import TeamCard from "./TeamCard";
import ScrollIndicator from "./ScrollIndicator";

const team = [
  {
    name: "Kyle Ren",
    role: "Lead Builder",
    short: "Builds drivetrains and mechanisms.",
    long: "Specializes in CAD-driven iteration, prototyping, bot creation and design, and component integration. 7 yr. experience in VEX IQ & 1yr. experience in V5RC",
    image: "/leadbuilder.png",
  },
  {
    name: "Arjun Hariharan",
    role: "Lead Programmer",
    short: "Programs autonomous routines, sensor integration, and driver control.",
    long: "6+ yrs experience in programming and minor experience with electrical engineering.",
    image: "/programmer.png",
  },
  {
    name: "Jennifer Duma",
    role: "Documenter",
    short: "Assists with documentation and general team support.",
    long: "Maintains project records and assists with documentation. Assists with team coordination and support.",
    image: "/firstdocumenter.png",
  },
  {
    name: "Matthew Lee",
    role: "Lead Documenter and Build Assistant",
    short: "Tournament planning and analysis.",
    long: "Analyzes game elements, develops strategic plans, and coordinates team efforts.",
    image: "/leaddocumenter.png",
  },
  {
    name: "Div Nguyen",
    role: "Documenter",
    short: "Assists with documentation and general team support.",
    long: "Documents design decisions, maintains logs.",
    image: "/seconddocumenter.png",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-32 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-accent mb-12">Team</h2>

      <div className="relative">
        <motion.div
          id="team-carousel"
          className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="snap-center flex-shrink-0 w-80 md:w-96"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TeamCard client:visible {...member} sectionId="team" />
            </motion.div>
          ))}
        </motion.div>

        <ScrollIndicator client:load containerId="team-carousel" />
      </div>
    </section>
  );
}