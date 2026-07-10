import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AdminPage from '../features/admin/AdminPage'
import EventsPage from '../features/events/EventsPage'
import GalleryPage from '../features/gallery/GalleryPage'
import HomePage from '../features/home/HomePage'
import MenuPage from '../features/menu/MenuPage'
import RngMenuPage from '../features/rngmenu/RngMenuPage'

export default function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <AnimatedRoutes />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageShell>
              <HomePage />
            </PageShell>
          }
        />
        <Route
          path="/menu"
          element={
            <PageShell>
              <MenuPage />
            </PageShell>
          }
        />
        <Route
          path="/rngmenu"
          element={
            <PageShell>
              <RngMenuPage />
            </PageShell>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageShell>
              <GalleryPage />
            </PageShell>
          }
        />
        <Route
          path="/events"
          element={
            <PageShell>
              <EventsPage />
            </PageShell>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function ScrollManager() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const scrollToHash = (hash: string) => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (location.hash) {
        // Wait one tick for the DOM to settle on initial load
        const t = setTimeout(() => scrollToHash(location.hash), 100);
        return () => clearTimeout(t);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    if (location.hash) {
      // Try immediately (same-page hash navigation)
      if (!scrollToHash(location.hash)) {
        // Cross-page: AnimatePresence mode="wait" delays mounting the new page
        // until the exit animation (~450 ms) finishes, so retry after it completes.
        const t = setTimeout(() => scrollToHash(location.hash), 600);
        return () => clearTimeout(t);
      }
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}
