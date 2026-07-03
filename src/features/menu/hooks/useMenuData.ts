import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { toMenuItem } from '../../../lib/menuMapper'
import type { MenuSectionData } from '../data/menuData'

const CATEGORY_META: Record<string, { title: string; subtitle: string }> = {
  localDishes: {
    title: 'Local Dishes',
    subtitle: 'Deeply Ghanaian plates built around soup, fire, spice, grains, and slow comfort.',
  },
  continental: {
    title: 'Continental',
    subtitle: 'Familiar restaurant favorites prepared with the same generous R&G spirit.',
  },
  softDrinks: {
    title: 'Soft Drinks',
    subtitle: 'Cold, refreshing pours for warm Accra afternoons and lingering dinner tables.',
  },
  hardDrinks: {
    title: 'Hard Drinks',
    subtitle: 'Bar selections and spirited house pours for slow evenings and good company.',
  },
  extras: {
    title: 'Extras',
    subtitle: 'Condiments, add-ons, and little sides that make every plate complete.',
  },
}

function groupIntoSections(rows: Record<string, unknown>[]): MenuSectionData[] {
  const grouped = new Map<string, ReturnType<typeof toMenuItem>[]>()

  for (const row of rows) {
    const category = row.category as string
    if (!grouped.has(category)) grouped.set(category, [])
    grouped.get(category)!.push(toMenuItem(row as Parameters<typeof toMenuItem>[0]))
  }

  return Array.from(grouped.entries()).map(([category, items]) => {
    const meta = CATEGORY_META[category] ?? {
      title: category.replace(/([A-Z])/g, ' $1').trim(),
      subtitle: '',
    }
    return { id: category, ...meta, items }
  })
}

export function useMenuData() {
  const [menuSections, setMenuSections] = useState<MenuSectionData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [fetchKey, setFetchKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setIsError(false)

      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category')

      if (cancelled) return

      if (error || !data) {
        setIsError(true)
        setIsLoading(false)
        return
      }

      setMenuSections(groupIntoSections(data))
      setIsLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [fetchKey])

  const retry = () => setFetchKey((k) => k + 1)

  return { menuSections, isLoading, isError, retry }
}
