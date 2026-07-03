import { memo } from "react";
import { motion } from "framer-motion";
import type { MenuItem } from "../data/menuData";

const cardVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const cardTransition = { duration: 0.35, ease: "easeOut" } as const;
const imageHoverTransition = { duration: 0.7, ease: "easeOut" } as const;

const imageHover = { scale: 1.08 };

type MenuCardProps = {
  item: MenuItem;
};

function MenuCard({ item }: MenuCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={cardTransition}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:border-accent/50 hover:bg-white/[0.085]"
    >
      <div className="grid min-h-full sm:grid-cols-[minmax(180px,0.9fr)_1.1fr]">
        <div className="relative min-h-[230px] overflow-hidden sm:min-h-full">
          <motion.img
            src={item.image}
            alt={item.name}
            loading="lazy"
            whileHover={imageHover}
            transition={imageHoverTransition}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/25" />
        </div>

        <div className="flex min-h-[250px] flex-col justify-between p-6 md:p-7">
          <div>
            {item.tags && (
              <div className="mb-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h3 className="text-2xl font-heading font-bold leading-snug text-white md:text-3xl">
              {item.name}
            </h3>

            <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
              {item.description}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-xs uppercase tracking-[0.28em] text-gray-500">
              Price
            </span>
            <span className="text-2xl font-heading font-bold text-accent">
              {item.price}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(MenuCard);
