import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ServerCrash } from "lucide-react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import Loader from "../../components/ui/Loader";
import CategoryTabs from "./components/CategoryTabs";
import MenuHero from "./components/MenuHero";
import MenuSection from "./components/MenuSection";
import { useMenuData } from "./hooks/useMenuData";

export default function MenuPage() {
  const { menuSections, isLoading, isError, retry } = useMenuData();
  const [selectedCategory, setSelectedCategory] = useState("localDishes");
  const [hasSelectedCategory, setHasSelectedCategory] = useState(false);

  const activeId =
    selectedCategory ||
    menuSections.find((section) => section.id === "localDishes")?.id ||
    menuSections[0]?.id ||
    "";

  const currentSection = useMemo(
    () => menuSections.find((s) => s.id === activeId) ?? menuSections[0],
    [menuSections, activeId],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white">
      <Navbar />
      <MenuHero />

      {isLoading && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader />
        </div>
      )}

      {isError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[40vh] flex-col items-center justify-center gap-5 text-center px-4"
        >
          <ServerCrash className="h-14 w-14 text-accent opacity-75" />
          <div>
            <p className="font-heading text-xl font-bold text-white">
              Menu unavailable
            </p>
            <p className="mt-2 text-sm text-gray-400">
              We couldn&apos;t load the menu. Please check your connection and
              try again.
            </p>
          </div>
          <button
            type="button"
            onClick={retry}
            className="rounded-full border border-accent/50 bg-accent/10 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-accent transition hover:bg-accent hover:text-black"
          >
            Retry
          </button>
        </motion.div>
      )}

      {!isLoading && !isError && menuSections.length > 0 && (
        <>
          <CategoryTabs
            sections={menuSections}
            selectedId={activeId}
            onSelect={(id) => {
              setHasSelectedCategory(true);
              setSelectedCategory(id);
            }}
          />

          <div className="section-padding bg-[linear-gradient(180deg,#111111_0%,#17110d_48%,#111111_100%)]">
            <div className="mx-auto max-w-7xl">
              {currentSection && (
                <MenuSection
                  key={currentSection.id}
                  section={currentSection}
                  animateOnMount={hasSelectedCategory}
                />
              )}
            </div>
          </div>
        </>
      )}

      <Footer />
    </main>
  );
}
