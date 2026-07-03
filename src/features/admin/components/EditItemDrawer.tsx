import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ImageIcon, Loader2, Plus, Save, X } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'
import { toMenuItem, rawPriceFromMenuItem } from '../../../lib/menuMapper'
import type { RawMenuRow } from '../../../lib/menuMapper'
import type { MenuItem, MenuCategoryKey } from '../../menu/data/menuData'

const CATEGORY_OPTIONS: { value: MenuCategoryKey; label: string }[] = [
  { value: 'localDishes', label: 'Local Dishes' },
  { value: 'continental', label: 'Continental' },
  { value: 'softDrinks', label: 'Soft Drinks' },
  { value: 'hardDrinks', label: 'Hard Drinks' },
  { value: 'extras',      label: 'Extras' },
]

type Props =
  | { mode: 'edit'; item: MenuItem; onClose: () => void; onSave: (updated: MenuItem) => void }
  | { mode: 'create'; onClose: () => void; onSave: (created: MenuItem) => void }

export default function EditItemDrawer(props: Props) {
  const isEdit = props.mode === 'edit'
  const existingItem = isEdit ? props.item : null

  const [form, setForm] = useState({
    name: existingItem?.name ?? '',
    price: existingItem ? rawPriceFromMenuItem(existingItem.price) : '',
    description: existingItem?.description ?? '',
    category: (existingItem?.category ?? 'localDishes') as MenuCategoryKey,
    image: existingItem?.image ?? '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const uploadImage = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('File must be an image (PNG, JPG, WEBP, etc.)')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be smaller than 5 MB')
        return
      }

      setIsUploading(true)
      setUploadDone(false)
      setError('')

      const ext = file.name.split('.').pop() ?? 'jpg'
      const prefix = existingItem?.id ?? `new-${Date.now()}`
      const path = `menu/${prefix}-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(path, file, { upsert: true })

      if (uploadError) {
        setError('Upload failed: ' + uploadError.message)
        setIsUploading(false)
        return
      }

      const { data } = supabase.storage.from('menu-images').getPublicUrl(path)
      set('image', data.publicUrl)
      setIsUploading(false)
      setUploadDone(true)
      setTimeout(() => setUploadDone(false), 3000)
    },
    [existingItem?.id],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) uploadImage(file)
    },
    [uploadImage],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadImage(file)
    e.target.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    const payload = {
      name: form.name,
      price: Number(form.price) || 0,
      description: form.description,
      category: form.category,
      image_url: form.image,
    }

    if (isEdit && existingItem) {
      const { error: err, data } = await supabase
        .from('menu_items')
        .update(payload)
        .eq('id', existingItem.id)
        .select()
        .single()

      if (err || !data) {
        setError(err?.message ?? 'Update failed. Please try again.')
        setIsSaving(false)
        return
      }
      props.onSave(toMenuItem(data as RawMenuRow))
    } else {
      const { error: err, data } = await supabase
        .from('menu_items')
        .insert(payload)
        .select()
        .single()

      if (err || !data) {
        setError(err?.message ?? 'Insert failed. Please try again.')
        setIsSaving(false)
        return
      }
      props.onSave(toMenuItem(data as RawMenuRow))
    }
  }

  const headingLabel = isEdit ? 'Editing Item' : 'New Dish'
  const headingName = isEdit ? existingItem!.name : 'Add to Menu'
  const submitLabel = isEdit ? 'Save Changes' : 'Add to Menu'
  const submitIcon = isEdit ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={props.onClose}
        className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
      />

      {/* Side Drawer */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[480px] flex-col border-l border-white/10 bg-[#13100d] shadow-[-24px_0_80px_rgba(0,0,0,0.5)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 px-7 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {headingLabel}
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold leading-tight text-white">
              {headingName}
            </h2>
          </div>
          <button
            type="button"
            onClick={props.onClose}
            className="ml-4 mt-1 rounded-full border border-white/10 p-2 text-gray-500 transition hover:border-white/25 hover:text-white"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-6 overflow-y-auto px-7 py-7">

            {/* ── Image Dropzone ── */}
            <div>
              <label className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Item Image
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`group relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200 ${
                  dragOver
                    ? 'scale-[1.01] border-accent bg-accent/10'
                    : 'border-white/15 hover:border-accent/40 hover:bg-white/[0.04]'
                }`}
              >
                {form.image ? (
                  <div className="relative h-52">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-gray-700" />
                  </div>
                )}

                <div
                  className={`${
                    form.image ? 'absolute inset-x-0 bottom-0' : ''
                  } flex flex-col items-center py-4`}
                >
                  <AnimatePresence mode="wait">
                    {isUploading ? (
                      <motion.div
                        key="uploading"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 text-accent"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm font-medium">Uploading…</span>
                      </motion.div>
                    ) : uploadDone ? (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-emerald-400"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Uploaded successfully</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <p className="text-xs text-gray-400">
                          Drag & drop or{' '}
                          <label className="cursor-pointer text-accent underline underline-offset-2 hover:text-accent/80">
                            browse
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleFileInput}
                            />
                          </label>
                        </p>
                        <p className="mt-0.5 text-xs text-gray-600">PNG · JPG · WEBP · max 5 MB</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── Name ── */}
            <div>
              <label className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Item name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-accent/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-accent/25"
              />
            </div>

            {/* ── Category ── */}
            <div>
              <label className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Category
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#1c1610] px-4 py-3 text-sm text-white outline-none transition focus:border-accent/60 focus:ring-1 focus:ring-accent/25"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Price ── */}
            <div>
              <label className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Price
              </label>
              <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] focus-within:border-accent/60 focus-within:ring-1 focus-within:ring-accent/25 transition">
                <span className="flex items-center border-r border-white/10 bg-white/[0.04] px-4 text-xs font-semibold tracking-widest text-accent">
                  GH₵
                </span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                  placeholder="0"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-600 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* ── Description ── */}
            <div>
              <label className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Describe the dish…"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-accent/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-accent/25"
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-white/10 px-7 py-5">
            <button
              type="button"
              onClick={props.onClose}
              className="flex-1 rounded-full border border-white/10 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 transition hover:border-white/25 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-accent py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : submitIcon}
              {isSaving ? 'Saving…' : submitLabel}
            </button>
          </div>
        </form>
      </motion.aside>
    </>
  )
}
