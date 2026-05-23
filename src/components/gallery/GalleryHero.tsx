import { motion, useScroll, useTransform } from 'framer-motion'
import { Camera } from 'lucide-react'
import heroImage from '../../../assets/banner.avif'

export default function GalleryHero() {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 520], [0, 120])

  return (
    <section className="relative flex min-h-[82vh] items-center overflow-hidden pt-24">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 scale-110 bg-cover bg-center"
      >
        <img
          src={heroImage}
          alt="R&G Foods restaurant table"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(193,139,71,0.24),transparent_34%),linear-gradient(90deg,rgba(17,17,17,0.88),rgba(17,17,17,0.28)_48%,rgba(17,17,17,0.78))]" />

      <div className="section-padding relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-accent backdrop-blur-md"
        >
          <Camera size={16} />
          R&G Visual Story
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.9, ease: 'easeOut' }}
          className="max-w-4xl font-heading text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Moments & Flavors
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.8, ease: 'easeOut' }}
          className="mt-7 max-w-2xl text-base leading-8 text-gray-200 md:text-xl"
        >
          Experience R&G Foods through our food, atmosphere, and unforgettable
          moments shared around the table.
        </motion.p>
      </div>
    </section>
  )
}
