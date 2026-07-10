import { memo } from "react";
import { motion } from "framer-motion";
import MenuCard from "./RngMenuCard";
import type { MenuSectionData } from "../../menu/data/menuData";

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
  itemsCount?: number;
};

function RngMenuSection({
  section,
  animateOnMount = true,
  itemsCount,
}: MenuSectionProps) {
  return (
    <motion.section
      id={section.id}
      initial={animateOnMount ? "hidden" : "visible"}
      animate="visible"
      variants={sectionVariants}
      className="scroll-mt-36 py-16 first:pt-0 lg:py-20"
    >
      <motion.div
        variants={sectionHeadingVariants}
        className="mb-12 flex items-end justify-between"
      >
        <div className="flex-1">
          <motion.p
            className="text-xs uppercase tracking-[0.5em] text-accent font-semibold mb-3"
            variants={sectionHeadingVariants}
          >
            Menu Selection
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight"
            variants={sectionHeadingVariants}
          >
            {section.title}
          </motion.h2>
        </div>

        {itemsCount && (
          <motion.div className="text-right" variants={sectionHeadingVariants}>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">
              Items
            </span>
            <p className="text-2xl md:text-3xl font-heading font-bold text-accent mt-1">
              {section.items.length}
            </p>
          </motion.div>
        )}
      </motion.div>

      {section.subtitle && (
        <motion.p
          className="max-w-3xl text-sm md:text-base leading-7 text-gray-400 mb-12"
          variants={sectionHeadingVariants}
        >
          {section.subtitle}
        </motion.p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {section.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {section.items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            No items found matching your search.
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}
export default memo(RngMenuSection);
