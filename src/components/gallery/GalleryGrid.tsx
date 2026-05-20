import { motion } from 'framer-motion'
import GalleryCard from './GalleryCard'
import type { GalleryItem } from '../../data/galleryData'

type GalleryGridProps = {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <section className="section-padding bg-[linear-gradient(180deg,#111111_0%,#17110d_45%,#111111_100%)]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.38em] text-accent">
              Gallery Collection
            </p>
            <h2 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
              Food, ambience, and the moments between.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-300 md:text-base">
            A curated look at the meals, textures, and warm restaurant energy
            that shape the R&G Foods experience.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.11,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {items.map((item, index) => (
            <GalleryCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
