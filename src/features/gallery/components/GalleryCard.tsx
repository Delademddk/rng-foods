import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { GalleryItem } from '../data/galleryData'

type GalleryCardProps = {
  item: GalleryItem
  index: number
}

export default function GalleryCard({ item, index }: GalleryCardProps) {
  const isFeatured = index === 0 || index === 5

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 34, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className={`group relative isolate min-h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 ${
        isFeatured ? 'lg:col-span-2' : ''
      }`}
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10 transition duration-500 group-hover:from-black/95 group-hover:via-black/55" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(193,139,71,0.22),transparent_42%)] opacity-70 transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full min-h-[24rem] flex-col justify-between p-6 md:p-8">
        <div className="flex justify-end">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/25 text-accent backdrop-blur-md transition duration-300 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-black">
            <ArrowUpRight size={19} />
          </span>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-accent">
            0{item.id}
          </p>
          <h3 className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-gray-200 md:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
