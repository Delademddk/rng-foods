import { useMemo, useState } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import CategoryTabs from "./components/CategoryTabs";
import MenuHero from "./components/MenuHero";
import MenuSection from "./components/MenuSection";
import { menuSections } from "./data/menuData";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState(menuSections[0].id);

  const currentSection = useMemo(
    () =>
      menuSections.find((section) => section.id === selectedCategory) ??
      menuSections[0],
    [selectedCategory],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white">
      <Navbar />
      <MenuHero />
      <CategoryTabs
        sections={menuSections}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="section-padding bg-[linear-gradient(180deg,#111111_0%,#17110d_48%,#111111_100%)]">
        <div className="mx-auto max-w-7xl">
          <MenuSection key={currentSection.id} section={currentSection} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
