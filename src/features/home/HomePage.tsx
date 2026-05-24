import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import About from './components/About'
import Contact from './components/Contact'
import Dishes from './components/Dishes'
import Experience from './components/Experience'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'

export default function HomePage() {
  return (
    <main className="bg-dark text-white overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Dishes />
      <Experience />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
