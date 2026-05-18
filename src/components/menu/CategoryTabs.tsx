import { motion } from 'framer-motion'
import type { MenuSectionData } from '../../data/menuData'

type CategoryTabsProps = {
  sections: MenuSectionData[]
}

export default function CategoryTabs({ sections }: CategoryTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
      className="sticky top-[73px] z-40 border-y border-white/10 bg-dark/85 px-4 py-4 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-200 transition hover:border-accent/70 hover:bg-accent hover:text-black"
          >
            {section.title}
          </a>
        ))}
      </div>
    </motion.div>
  )
}
