import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import CategoryTabs from './components/CategoryTabs'
import MenuHero from './components/MenuHero'
import MenuSection from './components/MenuSection'
import { menuSections } from './data/menuData'

export default function MenuPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white">
      <Navbar />
      <MenuHero />
      <CategoryTabs sections={menuSections} />

      <div className="section-padding bg-[linear-gradient(180deg,#111111_0%,#17110d_48%,#111111_100%)]">
        <div className="mx-auto max-w-7xl">
          {menuSections.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
