import type { MenuItem, MenuTag } from '../features/menu/data/menuData'

export type RawMenuRow = {
  id: number | string
  name: string
  description: string
  price: number | string
  category: string
  image_url: string
  created_at?: string
  tags?: MenuTag[]
}

export function toMenuItem(row: RawMenuRow): MenuItem {
  const rawPrice = typeof row.price === 'number' ? row.price : Number(row.price)
  return {
    id: String(row.id),
    name: row.name,
    description: row.description,
    price: `GH₵ ${rawPrice}`,
    image: row.image_url ?? '',
    category: row.category,
    tags: Array.isArray(row.tags) ? row.tags : undefined,
  }
}

export function rawPriceFromMenuItem(price: string): string {
  return price.replace(/^GH₵\s*/u, '').trim()
}
