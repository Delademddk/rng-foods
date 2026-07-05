import { memo } from "react";
import { motion } from "framer-motion";
import MenuCard from "./MenuCard";
import type { MenuSectionData } from "../data/menuData";

const sectionVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
} as const;

const sectionHeadingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type MenuSectionProps = {
  section: MenuSectionData;
  animateOnMount?: boolean;
};

function MenuSection({ section, animateOnMount = true }: MenuSectionProps) {
  return (
    <motion.section
      id={section.id}
      initial={animateOnMount ? "hidden" : "visible"}
      animate="visible"
      variants={sectionVariants}
      className="scroll-mt-36 border-t border-white/10 py-20 first:border-t-0"
    >
      <motion.div
        variants={sectionHeadingVariants}
        className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1fr] lg:items-end"
      >
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-accent">
            Menu Category
          </p>
          <h2 className="text-4xl font-heading font-bold md:text-5xl">
            {section.title}
          </h2>
        </div>

        <p className="max-w-2xl text-base leading-8 text-gray-400 lg:justify-self-end">
          {section.subtitle}
        </p>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-2">
        {section.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
export default memo(MenuSection);
