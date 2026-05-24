import { motion, useScroll, useTransform } from 'framer-motion'

export default function MenuHero() {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 120])

  return (
    <section className="relative min-h-[78vh] overflow-hidden flex items-center pt-24">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1800&auto=format&fit=crop')] bg-cover bg-center scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-dark" />

      <div className="relative z-10 section-padding max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-sm uppercase tracking-[0.45em] text-accent"
        >
          R&G Restaurant Selection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-4xl text-5xl font-heading font-bold leading-tight md:text-7xl lg:text-8xl"
        >
          Our Menu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-7 max-w-2xl text-base leading-8 text-gray-300 md:text-xl"
        >
          A warm, generous spread of Ghanaian classics, continental favorites,
          chilled drinks, and bar pours served with the spirit of Tesano.
        </motion.p>
      </div>
    </section>
  )
}
