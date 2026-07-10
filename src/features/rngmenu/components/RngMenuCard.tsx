import { memo } from "react";
import { motion } from "framer-motion";
import type { MenuItem } from "../../menu/data/menuData";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const;

type MenuCardProps = {
  item: MenuItem;
};

function RngMenuCard({ item }: MenuCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group flex flex-col h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-white/20 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-white/5 to-black/20 aspect-video">
        <motion.img
          src={item.image}
          alt={item.name}
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Tags Overlay */}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
            {item.tags.slice(0, 2).map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-full bg-accent/90 text-black px-2.5 py-1 text-xs font-bold uppercase tracking-[0.15em]"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4 md:p-5">
        {/* Title and Description */}
        <div className="flex-grow">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-heading font-bold text-white leading-tight line-clamp-2"
          >
            {item.name}
          </motion.h3>

          {item.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-2 text-xs md:text-sm text-gray-400 leading-6 line-clamp-2"
            >
              {item.description}
            </motion.p>
          )}
        </div>

        {/* Price Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold">
            Price
          </span>
          <span className="text-lg md:text-xl font-heading font-bold text-accent">
            {item.price}
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default memo(RngMenuCard);
