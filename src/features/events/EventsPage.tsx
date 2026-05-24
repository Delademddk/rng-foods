import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import EventsGrid from './components/EventsGrid'
import EventsHero from './components/EventsHero'
import { eventsData } from './data/eventsData'

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
