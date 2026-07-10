import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ServerCrash } from "lucide-react";
import Footer from "../../components/common/Footer";
import Loader from "../../components/ui/Loader";
import CategoryTabs from "./components/RngCategoryTabs";
import MenuHero from "./components/RngMenuHero";
import MenuSection from "./components/RngMenuSection";
import { useMenuData } from "../menu/hooks/useMenuData";

export default function RngMenuPage() {
  const { menuSections, isLoading, isError, retry } = useMenuData();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hasSelectedCategory, setHasSelectedCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeId = selectedCategory || "all";

  const currentSection = useMemo(
    () => menuSections.find((s) => s.id === activeId) ?? menuSections[0],
    [menuSections, activeId],
  );

  // Helper function to filter items by search query
  const filterItemsBySearch = (items: any[], query: string) => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.tags?.some((tag: string) =>
          tag.toLowerCase().includes(lowerQuery),
        ),
    );
  };

  // Filter items based on search query
  const filteredSection = useMemo(() => {
    if (!currentSection) return undefined;
    if (!searchQuery.trim()) return currentSection;

    return {
      ...currentSection,
      items: filterItemsBySearch(currentSection.items, searchQuery),
    };
  }, [currentSection, searchQuery]);

  // When "all" is selected, render all sections with search filtering
  const allSectionsFiltered = useMemo(() => {
    if (activeId !== "all") return [];

    if (!searchQuery.trim()) {
      return menuSections;
    }

    return menuSections
      .map((section) => ({
        ...section,
        items: filterItemsBySearch(section.items, searchQuery),
      }))
      .filter((section) => section.items.length > 0);
  }, [activeId, menuSections, searchQuery]);

  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white">
      <MenuHero onSearchChange={setSearchQuery} />

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
              {activeId === "all"
                ? // Render all sections
                  allSectionsFiltered.map((section) => (
                    <MenuSection
                      key={section.id}
                      section={section}
                      animateOnMount={hasSelectedCategory}
                      itemsCount={
                        menuSections.find((s) => s.id === section.id)?.items
                          .length
                      }
                    />
                  ))
                : // Render single section
                  filteredSection && (
                    <MenuSection
                      key={filteredSection.id}
                      section={filteredSection}
                      animateOnMount={hasSelectedCategory}
                      itemsCount={currentSection?.items.length}
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
