import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import GalleryGrid from './components/GalleryGrid'
import GalleryHero from './components/GalleryHero'
import { galleryData } from './data/galleryData'

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
