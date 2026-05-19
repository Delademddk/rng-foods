import { Phone } from 'lucide-react'
import { motion } from 'framer-motion'

const PRIMARY_PHONE_NUMBER = '+233 54 352 6775'
const PRIMARY_TEL_LINK = 'tel:+233543526775'

export default function FloatingCallButton() {
  return (
    <motion.a
      href={PRIMARY_TEL_LINK}
      aria-label="Call Bush Canteen"
      title={`Call Bush Canteen at ${PRIMARY_PHONE_NUMBER}`}
      className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-[9999] flex h-16 min-h-16 w-16 min-w-16 items-center justify-center rounded-full border border-accent/55 bg-[linear-gradient(135deg,#1b120d_0%,#5B3A29_48%,#C18B47_100%)] text-white shadow-[0_18px_45px_rgba(0,0,0,0.42),0_0_28px_rgba(193,139,71,0.28)] outline-none transition-colors duration-300 hover:border-accent hover:shadow-[0_22px_55px_rgba(0,0,0,0.48),0_0_36px_rgba(193,139,71,0.38)] focus-visible:ring-4 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-dark sm:bottom-6 sm:right-6 sm:h-14 sm:min-h-14 sm:w-14 sm:min-w-14"
      initial={{ opacity: 0, scale: 0.82, y: 18 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -5, 0],
      }}
      transition={{
        opacity: { duration: 0.4, ease: 'easeOut' },
        scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        y: {
          delay: 0.5,
          duration: 3.6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 0.7,
        },
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-accent/45 bg-accent/15"
        animate={{
          opacity: [0, 0.2, 0],
          scale: [1, 1.22, 1.32],
        }}
        transition={{
          duration: 2.4,
          ease: 'easeOut',
          repeat: Infinity,
          repeatDelay: 2.8,
        }}
      />

      <span className="absolute inset-[3px] rounded-full border border-white/12 bg-white/[0.07] backdrop-blur-sm" />

      <Phone
        className="relative z-10 h-7 w-7 stroke-[2.2] text-soft drop-shadow sm:h-6 sm:w-6"
        aria-hidden="true"
      />

      <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-full border border-white/10 bg-dark/90 px-4 py-2 text-sm font-semibold text-soft opacity-0 shadow-2xl shadow-black/35 backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        Call R&G Foods
      </span>
    </motion.a>
  )
}
