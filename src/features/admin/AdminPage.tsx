import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ServerCrash,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react'
import Loader from '../../components/ui/Loader'
import { supabase } from '../../lib/supabaseClient'
import { toMenuItem } from '../../lib/menuMapper'
import type { RawMenuRow } from '../../lib/menuMapper'
import type { MenuItem } from '../menu/data/menuData'
import AdminLogin from './components/AdminLogin'
import DeleteDialog from './components/DeleteDialog'
import EditItemDrawer from './components/EditItemDrawer'
import { useAdminAuth } from './hooks/useAdminAuth'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  localDishes: 'Local Dishes',
  continental: 'Continental',
  softDrinks: 'Soft Drinks',
  hardDrinks: 'Hard Drinks',
  extras: 'Extras',
}

const FILTER_TABS: { key: string | null; label: string }[] = [
  { key: null,           label: 'All' },
  { key: 'localDishes',  label: 'Local Dishes' },
  { key: 'continental',  label: 'Continental' },
  { key: 'softDrinks',   label: 'Soft Drinks' },
  { key: 'hardDrinks',   label: 'Hard Drinks' },
  { key: 'extras',       label: 'Extras' },
]

// ─── Root guard ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { isAuthed, login, logout } = useAdminAuth()
  return isAuthed
    ? <AdminDashboard onLogout={logout} />
    : <AdminLogin onLogin={login} />
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [items,      setItems]      = useState<MenuItem[]>([])
  const [isLoading,  setIsLoading]  = useState(true)
  const [isError,    setIsError]    = useState(false)

  // search + filter
  const [searchQuery,     setSearchQuery]     = useState('')
  const [activeCategory,  setActiveCategory]  = useState<string | null>(null)

  // drawer
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [createMode,  setCreateMode]  = useState(false)

  // delete
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null)
  const [isDeleting,   setIsDeleting]   = useState(false)
  const [deleteError,  setDeleteError]  = useState('')

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchItems = async () => {
    setIsLoading(true)
    setIsError(false)

    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('category')

    if (error || !data) {
      setIsError(true)
    } else {
      setItems((data as RawMenuRow[]).map(toMenuItem))
    }
    setIsLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  // ── Per-category counts (ignores text search, so badges stay stable) ───────
  const categoryCounts = useMemo(
    () =>
      items.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1
        return acc
      }, {}),
    [items],
  )

  // ── Combined filter: category tab + text query ─────────────────────────────
  const filtered = useMemo(() => {
    let result = items

    if (activeCategory !== null) {
      result = result.filter((i) => i.category === activeCategory)
    }

    const q = searchQuery.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          (CATEGORY_LABELS[i.category] ?? '').toLowerCase().includes(q),
      )
    }

    return result
  }, [items, searchQuery, activeCategory])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSave = (updated: MenuItem) => {
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
    setEditingItem(null)
  }

  const handleCreate = (created: MenuItem) => {
    setItems((prev) => [...prev, created])
    setCreateMode(false)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return
    setIsDeleting(true)
    setDeleteError('')

    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', deletingItem.id)

    if (error) {
      setDeleteError(error.message)
      setIsDeleting(false)
      return
    }

    setItems((prev) => prev.filter((i) => i.id !== deletingItem.id))
    setDeletingItem(null)
    setIsDeleting(false)
  }

  const closeDeleteDialog = () => {
    if (isDeleting) return
    setDeletingItem(null)
    setDeleteError('')
  }

  const openDrawer = editingItem !== null || createMode

  // ── Empty state copy ───────────────────────────────────────────────────────
  const hasFilters = searchQuery.trim() !== '' || activeCategory !== null
  const emptyMessage = (() => {
    if (!hasFilters) return 'No menu items found.'
    if (searchQuery && activeCategory)
      return `No "${searchQuery}" in ${CATEGORY_LABELS[activeCategory] ?? activeCategory}.`
    if (searchQuery) return `No results for "${searchQuery}".`
    return `No items in ${CATEGORY_LABELS[activeCategory!] ?? activeCategory}.`
  })()

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-dark text-white">

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <header className="glass sticky top-0 z-30 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <ShieldCheck className="h-5 w-5 text-accent" />
          <span className="font-heading text-lg font-bold text-white">Admin Dashboard</span>

          <div className="ml-auto flex items-center gap-3 max-sm:ml-0 max-sm:w-full">
            <button
              type="button"
              onClick={() => { setEditingItem(null); setCreateMode(true) }}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-accent/90 max-sm:flex-1 max-sm:px-3 max-sm:text-[10px]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add New Dish
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 transition hover:border-red-500/40 hover:text-red-400 max-sm:flex-1 max-sm:px-3 max-sm:text-[10px]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">

        {/* ── Page heading ──────────────────────────────────────────────────── */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">Menu Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              {isLoading
                ? 'Loading…'
                : `${items.length} total · ${filtered.length} shown`}
            </p>
          </div>

          <button
            type="button"
            onClick={fetchItems}
            disabled={isLoading}
            className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 transition hover:border-accent/40 hover:text-accent disabled:opacity-50 max-sm:w-full max-sm:justify-center"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* ── Search bar ────────────────────────────────────────────────────── */}
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, description or category…"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-11 text-sm text-white placeholder-gray-600 outline-none transition focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-600 transition hover:text-gray-400"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── Filter tabs ───────────────────────────────────────────────────── */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab.key
            const count =
              tab.key === null ? items.length : (categoryCounts[tab.key] ?? 0)

            return (
              <button
                key={tab.key ?? 'all'}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`relative flex-shrink-0 overflow-hidden rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-150 ${
                  isActive
                    ? 'border-accent/40 text-accent'
                    : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-400'
                }`}
              >
                {/* Sliding glassmorphic pill — Framer Motion shared layout */}
                {isActive && (
                  <motion.span
                    layoutId="tab-active-bg"
                    className="absolute inset-0 rounded-full bg-accent/[0.13] backdrop-blur-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {tab.label}
                  {!isLoading && (
                    <span
                      className={`rounded-full px-1.5 py-px text-[10px] font-bold leading-none ${
                        isActive
                          ? 'bg-accent/20 text-accent'
                          : 'bg-white/[0.06] text-gray-600'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Loading ───────────────────────────────────────────────────────── */}
        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader />
          </div>
        )}

        {/* ── Error ─────────────────────────────────────────────────────────── */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-4 text-center"
          >
            <ServerCrash className="h-14 w-14 text-accent opacity-60" />
            <div>
              <p className="font-heading text-xl font-bold text-white">
                Failed to load menu items
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Check your Supabase connection and try again.
              </p>
            </div>
            <button
              type="button"
              onClick={fetchItems}
              className="rounded-full border border-accent/50 bg-accent/10 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-accent transition hover:bg-accent hover:text-black"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* ── Table ─────────────────────────────────────────────────────────── */}
        {!isLoading && !isError && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden overflow-hidden rounded-2xl border border-white/10 md:block"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Image
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Name
                  </th>
                  <th className="hidden px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 md:table-cell">
                    Category
                  </th>
                  <th className="hidden px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 lg:table-cell">
                    Description
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Price
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ delay: i * 0.018, duration: 0.25 }}
                      className="group border-b border-white/[0.06] transition hover:bg-white/[0.035] last:border-0"
                    >
                      {/* Thumbnail */}
                      <td className="px-5 py-3.5">
                        <div className="h-12 w-12 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                              onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-700">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="px-5 py-3.5">
                        <span className="font-heading text-base font-semibold text-white">
                          {item.name}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="hidden px-5 py-3.5 md:table-cell">
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                          {CATEGORY_LABELS[item.category] ?? item.category}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="hidden max-w-[240px] px-5 py-3.5 lg:table-cell">
                        <p className="truncate text-xs leading-relaxed text-gray-500">
                          {item.description}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-3.5 text-right">
                        <span className="font-heading text-lg font-bold text-accent">
                          {item.price}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => { setCreateMode(false); setEditingItem(item) }}
                            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                          >
                            <Pencil className="h-3 w-3" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => { setDeleteError(''); setDeletingItem(item) }}
                            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-sm font-semibold text-gray-400">{emptyMessage}</p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setActiveCategory(null) }}
                    className="mt-3 text-xs text-accent underline underline-offset-2 hover:text-accent/80 transition"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}

        {!isLoading && !isError && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3 md:hidden"
          >
            <AnimatePresence initial={false}>
              {filtered.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: i * 0.018, duration: 0.25 }}
                  className="overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.045] p-3 shadow-lg shadow-black/20"
                >
                  <div className="flex gap-3">
                    <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-700">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-start justify-between gap-2">
                        <span className="max-w-full truncate rounded bg-accent/15 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-accent">
                          {CATEGORY_LABELS[item.category] ?? item.category}
                        </span>

                        <div className="flex flex-shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => { setCreateMode(false); setEditingItem(item) }}
                            className="text-accent transition hover:text-accent/80"
                            aria-label={`Edit ${item.name}`}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => { setDeleteError(''); setDeletingItem(item) }}
                            className="text-accent transition hover:text-red-400"
                            aria-label={`Delete ${item.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <h2 className="line-clamp-2 font-heading text-xl font-bold leading-tight text-white">
                        {item.name}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-xs leading-snug text-gray-300">
                        {item.description}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="font-heading text-base font-bold leading-none text-accent">
                          {item.price}
                        </span>
                        <span className="flex flex-shrink-0 items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Available
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-16 text-center">
                <p className="text-sm font-semibold text-gray-400">{emptyMessage}</p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setActiveCategory(null) }}
                    className="mt-3 text-xs text-accent underline underline-offset-2 transition hover:text-accent/80"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Side Drawer (Edit / Create) ────────────────────────────────────── */}
      <AnimatePresence>
        {openDrawer && (
          editingItem ? (
            <EditItemDrawer
              key={`edit-${editingItem.id}`}
              mode="edit"
              item={editingItem}
              onClose={() => setEditingItem(null)}
              onSave={handleSave}
            />
          ) : (
            <EditItemDrawer
              key="create"
              mode="create"
              onClose={() => setCreateMode(false)}
              onSave={handleCreate}
            />
          )
        )}
      </AnimatePresence>

      {/* ── Delete confirmation dialog ─────────────────────────────────────── */}
      <AnimatePresence>
        {deletingItem && (
          <DeleteDialog
            key={deletingItem.id}
            itemName={deletingItem.name}
            isDeleting={isDeleting}
            error={deleteError}
            onConfirm={handleDeleteConfirm}
            onCancel={closeDeleteDialog}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
