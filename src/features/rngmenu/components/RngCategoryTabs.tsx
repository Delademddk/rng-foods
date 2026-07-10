import { memo } from "react";
import { motion } from "framer-motion";
import type {
  MenuCategoryKey,
  MenuSectionData,
} from "../../menu/data/menuData";

type CategoryTabsProps = {
  sections: MenuSectionData[];
  selectedId: MenuCategoryKey;
  onSelect: (id: MenuCategoryKey) => void;
};

function RngCategoryTabs({
  sections,
  selectedId,
  onSelect,
}: CategoryTabsProps) {
  // Create "All" tab
  const allTab = { id: "all", title: "All" };
  const tabs = [allTab, ...sections.map((s) => ({ id: s.id, title: s.title }))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
      className="sticky top-[73px] z-40 border-b border-white/8 bg-dark/95 px-4 py-5 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = tab.id === selectedId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelect(tab.id as MenuCategoryKey)}
              aria-pressed={isActive}
              className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                isActive
                  ? "bg-accent text-black shadow-lg shadow-accent/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", damping: 25, stiffness: 120 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative">{tab.title}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default memo(RngCategoryTabs);
