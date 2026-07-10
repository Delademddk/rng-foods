import { memo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";

type RngMenuHeroProps = {
  onSearchChange?: (query: string) => void;
};

function RngMenuHero({ onSearchChange }: RngMenuHeroProps) {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 120]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  return (
    <section className="relative min-h-[70vh] overflow-hidden flex items-center pt-20 pb-12">
      <motion.div
        style={{ y: backgroundY }}
        className="menu-background absolute inset-0 scale-110 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-dark/80" />

      <div className="relative z-10 section-padding w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-accent font-semibold">
            R&G Kitchen · Est. Accra
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight mb-6"
        >
          R&G Menu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-gray-300 mb-10"
        >
          An authentic taste of Ghanaian cuisine—from smoky grilled tilapia and
          rice to weekly favorites like Waakye and Banku & Okro. Served with the
          warmth of home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-lg"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3 px-5 py-4 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300 focus-within:bg-white/[0.15] focus-within:border-accent/40">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search dishes... (e.g. Tilapia, Waakye)"
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none text-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(RngMenuHero);
