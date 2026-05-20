import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import GalleryGrid from '../components/gallery/GalleryGrid'
import GalleryHero from '../components/gallery/GalleryHero'
import { galleryData } from '../data/galleryData'

export default function GalleryPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white">
      <Navbar />
      <GalleryHero />
      <GalleryGrid items={galleryData} />
      <Footer />
    </main>
  )
}
