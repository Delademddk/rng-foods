import { motion } from 'framer-motion'
import EventCard from './EventCard'
import type { EventItem } from '../../data/eventsData'

type EventsGridProps = {
  events: EventItem[]
}

export default function EventsGrid({ events }: EventsGridProps) {
  return (
    <section className="section-padding bg-[linear-gradient(180deg,#111111_0%,#17110d_48%,#111111_100%)]">
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
              Upcoming Experiences
            </p>
            <h2 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
              Gatherings made richer with food and atmosphere.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-300 md:text-base">
            From live music nights to family buffet spreads, every R&G event is
            shaped around generous plates and memorable company.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3"
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
