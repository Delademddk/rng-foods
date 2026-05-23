import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import banner from "../../assets/banner.avif";

export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center relative flex items-center"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 section-padding max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-heading font-bold leading-tight"
        >
          Authentic Ghanaian
          <span className="text-accent block">Flavors</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg text-gray-300"
        >
          Experience the heart of Ghanaian chop-bar culture in Tesano. Delicious
          local meals, vibrant atmosphere, and unforgettable flavor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex gap-4"
        >
          <Link
            to="/menu"
            className="bg-accent text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
          >
            View Menu
          </Link>

          <a
            href="#contact"
            className="border border-white/20 px-8 py-4 rounded-full hover:bg-white/10 transition"
          >
            Visit Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
