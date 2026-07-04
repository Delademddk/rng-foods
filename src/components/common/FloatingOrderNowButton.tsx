import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WHATSAPP_CATALOG_URL =
  import.meta.env.VITE_WHATSAPP_CATALOG_URL?.trim() ||
  `https://wa.me/c/${import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || ""}`;

export default function FloatingOrderNowButton() {
  return (
    <motion.a
      href={WHATSAPP_CATALOG_URL || "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order from R&G Foods on WhatsApp"
      className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-[9999] flex h-16 min-h-16 items-center justify-center rounded-full border border-[#25D366]/55 bg-[linear-gradient(135deg,#0f2d1f_0%,#148f3d_48%,#25D366_100%)] px-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.42),0_0_28px_rgba(37,211,102,0.24)] outline-none transition-all duration-300 hover:border-[#25D366] hover:shadow-[0_22px_55px_rgba(0,0,0,0.48),0_0_36px_rgba(37,211,102,0.34)] focus-visible:ring-4 focus-visible:ring-[#25D366]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-dark sm:bottom-6 sm:right-6 sm:h-14 sm:px-6"
      initial={{ opacity: 0, scale: 0.82, y: 18 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -5, 0],
      }}
      transition={{
        opacity: { duration: 0.4, ease: "easeOut" },
        scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        y: {
          delay: 0.5,
          duration: 3.6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.7,
        },
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-[#25D366]/45 bg-[#25D366]/15"
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.16, 1.02],
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.6,
        }}
      />

      <span className="absolute inset-[3px] rounded-full border border-white/12 bg-white/[0.07] backdrop-blur-sm" />

      <span className="relative z-10 flex items-center gap-2">
        <FaWhatsapp className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
          Order Now
        </span>
      </span>

      <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-full border border-white/10 bg-dark/90 px-4 py-2 text-sm font-semibold text-soft opacity-0 shadow-2xl shadow-black/35 backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        Order on WhatsApp
      </span>
    </motion.a>
  );
}
