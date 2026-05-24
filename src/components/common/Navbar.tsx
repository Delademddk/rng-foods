import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Menu", to: "/menu" },
  { label: "Gallery", to: "/gallery" },
  { label: "Events", to: "/events" },
  { label: "Visit", to: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { hash, pathname } = useLocation();

  const isActiveLink = (to: string) => {
    if (to === "/") {
      return pathname === "/" && !hash;
    }

    if (to.startsWith("/#")) {
      return pathname === "/" && hash === to.replace("/", "");
    }

    return pathname === to;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-2xl font-heading font-bold text-accent"
        >
          R&G Restaurant
        </Link>

        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
          {navLinks.map((link) => {
            const active = isActiveLink(link.to);

            return (
              <Link
                key={link.label}
                to={link.to}
                className={`relative transition hover:text-accent ${
                  active ? "text-accent" : "text-white"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute -bottom-2 left-0 h-px w-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-black/95"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`uppercase tracking-widest transition hover:text-accent ${
                isActiveLink(link.to) ? "text-accent" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
