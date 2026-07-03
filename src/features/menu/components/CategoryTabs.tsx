import { memo } from "react";
import { motion } from "framer-motion";
import type { MenuCategoryKey, MenuSectionData } from "../data/menuData";

type CategoryTabsProps = {
  sections: MenuSectionData[];
  selectedId: MenuCategoryKey;
  onSelect: (id: MenuCategoryKey) => void;
};

function CategoryTabs({ sections, selectedId, onSelect }: CategoryTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
      className="sticky top-[73px] z-40 border-y border-white/10 bg-dark/85 px-4 py-4 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto">
        {sections.map((section) => {
          const isActive = section.id === selectedId;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(section.id)}
              aria-pressed={isActive}
              className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                isActive
                  ? "border-accent bg-accent text-black"
                  : "border-white/10 bg-white/[0.06] text-gray-200 hover:border-accent/70 hover:bg-accent hover:text-black"
              }`}
            >
              {section.title}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default memo(CategoryTabs);
