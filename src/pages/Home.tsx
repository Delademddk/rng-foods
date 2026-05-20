import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Dishes from '../components/Dishes'
import Experience from '../components/Experience'
import Gallery from '../components/Gallery'
import Testimonials from '../components/home/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
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
