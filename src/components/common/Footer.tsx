import SocialLinks from "./SocialLinks";
import { memo } from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 text-center text-gray-400">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-5xl flex-col items-center"
      ></motion.div>
      <h3 className="text-2xl font-heading text-accent mb-4">R&G Restaurant</h3>

      <p>Authentic Ghanaian flavors in the heart of Tesano.</p>

      <div className="mt-6">
        <SocialLinks />
      </div>

      <p className="mt-6 text-sm">
        &copy; 2026 R&G Restaurant. All rights reserved.
      </p>
    </footer>
  );
}

export default memo(Footer);
