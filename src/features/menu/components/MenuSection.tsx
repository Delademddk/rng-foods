import { motion } from 'framer-motion'
import MenuCard from './MenuCard'
import type { MenuSectionData } from '../data/menuData'

type MenuSectionProps = {
  section: MenuSectionData
}

export default function MenuSection({ section }: MenuSectionProps) {
  return (
    <motion.section
      id={section.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: 'easeOut',
            staggerChildren: 0.12,
          },
        },
      }}
      className="scroll-mt-36 border-t border-white/10 py-20 first:border-t-0"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0 },
        }}
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
  )
}
