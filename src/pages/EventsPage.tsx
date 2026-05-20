import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import EventsGrid from '../components/events/EventsGrid'
import EventsHero from '../components/events/EventsHero'
import { eventsData } from '../data/eventsData'

export default function EventsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white">
      <Navbar />
      <EventsHero />
      <EventsGrid events={eventsData} />
      <Footer />
    </main>
  )
}
