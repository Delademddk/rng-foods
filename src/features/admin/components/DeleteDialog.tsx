import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Trash2 } from 'lucide-react'

type Props = {
  itemName: string
  isDeleting: boolean
  error?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteDialog({ itemName, isDeleting, error, onConfirm, onCancel }: Props) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={isDeleting ? undefined : onCancel}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 12 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#161210] p-7 shadow-2xl"
        >
          {/* Icon */}
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/10">
            <Trash2 className="h-5 w-5 text-red-400" />
          </div>

          <h3 className="font-heading text-xl font-bold text-white">Delete Item</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-gray-400">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-white">"{itemName}"</span>? This
            action cannot be undone.
          </p>

          {/* Error feedback */}
          <AnimatePresence>
            {error && (
              <motion.p
                key="del-err"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 rounded-full border border-white/10 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 transition hover:border-white/25 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-red-500/90 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              {isDeleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
