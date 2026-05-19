import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import FloatingCallButton from './components/common/FloatingCallButton'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <AnimatedRoutes />
      <FloatingCallButton />
    </BrowserRouter>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageShell>
              <Home />
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
      </Routes>
    </AnimatePresence>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return null
}
