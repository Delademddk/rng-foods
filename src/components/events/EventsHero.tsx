import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import heroImage from '../../../assets/friendship.jpg'

export default function EventsHero() {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 520], [0, 120])

  return (
    <section className="relative flex min-h-[82vh] items-center overflow-hidden pt-24">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 scale-110">
        <img
          src={heroImage}
          alt="Guests celebrating at R&G Foods"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(193,139,71,0.26),transparent_34%),linear-gradient(90deg,rgba(17,17,17,0.9),rgba(17,17,17,0.32)_52%,rgba(17,17,17,0.78))]" />

      <div className="section-padding relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-accent backdrop-blur-md"
        >
          <CalendarDays size={16} />
          Gather At R&G
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.9, ease: 'easeOut' }}
          className="max-w-5xl font-heading text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Events at R&G Foods
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.8, ease: 'easeOut' }}
          className="mt-7 max-w-2xl text-base leading-8 text-gray-200 md:text-xl"
        >
          Celebrate unforgettable moments with food, culture, music, and a
          community-centered restaurant atmosphere.
        </motion.p>
      </div>
    </section>
  )
}
