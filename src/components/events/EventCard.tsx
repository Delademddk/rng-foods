import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import type { EventItem } from '../../data/eventsData'
import { Link } from 'react-router-dom'

type EventCardProps = {
  event: EventItem
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 34, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-accent/40 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-md">
          {event.category}
        </span>
      </div>

      <div className="p-6 md:p-7">
        <h3 className="font-heading text-3xl font-bold leading-tight text-white">
          {event.title}
        </h3>
        <p className="mt-4 min-h-[5.25rem] text-sm leading-7 text-gray-300">
          {event.description}
        </p>

        <div className="mt-6 grid gap-3 border-y border-white/10 py-5 text-sm text-gray-200 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <CalendarDays size={18} className="text-accent" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-accent" />
            <span>{event.time}</span>
          </div>
        </div>
        <Link to="/#contact">
          <button className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition duration-300 hover:bg-white">
            Visit
            <ArrowRight size={17} />
          </button>
        </Link>
      </div>
    </motion.article>
  )
}
