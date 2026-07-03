export type MenuCategoryKey = string

export type MenuTag = 'Popular' | 'Spicy' | 'Chef Special' | 'Fresh'

export type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: MenuCategoryKey
  tags?: MenuTag[]
}

export type MenuSectionData = {
  id: MenuCategoryKey
  title: string
  subtitle: string
  items: MenuItem[]
}
