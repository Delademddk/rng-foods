import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import type { Testimonial } from '../data/testimonials'

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative min-h-[25rem] w-[min(85vw,360px)] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl lg:w-[420px] md:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(193,139,71,0.2),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_42%)] opacity-80 transition duration-500 group-hover:opacity-100" />
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent/10 blur-3xl transition duration-500 group-hover:bg-accent/20" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8 flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-accent/40 bg-accent/15 p-1 shadow-lg shadow-black/30">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-white">
                {testimonial.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                {testimonial.role}
              </p>
            </div>
          </div>

          <Quote className="hidden text-accent/70 sm:block" size={34} />
        </div>

        <div className="mb-7 flex gap-1 text-accent">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={index} size={18} fill="currentColor" />
          ))}
        </div>

        <p className="text-lg leading-8 text-gray-200 md:text-xl">
          "{testimonial.review}"
        </p>
      </div>
    </motion.article>
  )
}

const doubled = [...testimonials, ...testimonials]

export default function Testimonials() {
  return (
    <section className="section-padding overflow-hidden bg-[linear-gradient(180deg,#111111_0%,#1a120d_48%,#111111_100%)]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-accent">
              Testimonials
            </p>
            <h2 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
              What Our Guests Say
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-300 md:text-base">
            Stories from guests who return for the flavor, the warmth, and the
            unmistakable R&G feeling.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed marquee track — breaks out of the section's px padding */}
      <div className="-mx-6 md:-mx-12 lg:-mx-20">
        <div className="group">
          <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused] md:gap-7">
            {doubled.map((testimonial, i) => (
              <TestimonialCard key={`${testimonial.id}-${i}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
