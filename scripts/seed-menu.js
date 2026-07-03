/**
 * Seed script — populates the Supabase `menu_items` table with the original
 * R&G Restaurant menu data recovered from git commit 2bfa2a1.
 *
 * Usage:
 *   node scripts/seed-menu.js
 *
 * Table schema (as found):
 *   id          serial / bigint  (auto-assigned — we do not supply it)
 *   name        text
 *   description text
 *   price       numeric          (stored as plain number, e.g. 65)
 *   category    text
 *   image_url   text
 *   created_at  timestamptz
 *
 * The app formats price as "GH₵ <value>" at display time.
 *
 * Local image paths (e.g. /assets/images/food/red_red.jpeg) are served by
 * Vite's dev server from the project root.  For production, move the
 * top-level `assets/` folder inside `public/` so Vite includes them in the
 * build output.
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xfzlxplsvvpyrsapwvwy.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmemx4cGxzdnZweXJzYXB3dnd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NjcxMzksImV4cCI6MjA5ODA0MzEzOX0.uEBozjSjQiTLyZizsg3tuiqueGCOPcsNGDoo8QPQgzQ'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ---------------------------------------------------------------------------
// Original menu data — all 20 items across 4 categories.
// `price` is stored as a plain number; the app prepends "GH₵ " at render.
// `image_url`: external items use their original URL; local items use the
//  /assets/images/food/<file> path served by Vite's dev server.
// ---------------------------------------------------------------------------

const menuItems = [
  // ── Local Dishes ──────────────────────────────────────────────────────────
  {
    name: 'Fufu & Light Soup',
    description:
      'Hand-pounded fufu served with aromatic light soup, tender meat, and garden-fresh herbs.',
    price: 65,
    image_url:
      'https://africanchopbetter.com/wp-content/uploads/sites/110/2024/04/fufu-and-chicken2.jpg',
    category: 'localDishes',
  },
  {
    name: 'Banku & Grilled Tilapia',
    description:
      'Char-grilled tilapia with banku, shito, hot pepper, and crisp local vegetables.',
    price: 80,
    image_url:
      'https://africanchopbetter.com/wp-content/uploads/sites/110/2024/04/banku-2.jpg',
    category: 'localDishes',
  },
  {
    name: 'Waakye Special',
    description:
      'Rice and beans with gari, spaghetti, egg, stew, shito, and your choice of protein.',
    price: 55,
    image_url:
      'https://africanchopbetter.com/wp-content/uploads/sites/110/2024/04/Ghanian-Waakye-ox-1.webp',
    category: 'localDishes',
  },
  {
    name: 'Red Red',
    description:
      'Black-eyed peas stewed in palm oil with fried ripe plantain — a classic Ghanaian favourite.',
    price: 70,
    image_url: '/assets/images/food/red_red.jpeg',
    category: 'localDishes',
  },
  {
    name: 'Omotuo & Groundnut Soup',
    description:
      'Soft rice balls served in a rich, slow-cooked groundnut soup with your choice of protein.',
    price: 40,
    image_url: '/assets/images/food/omotuo.jpeg',
    category: 'localDishes',
  },
  {
    name: 'Ampesie',
    description:
      'Boiled yam or plantain served with garden egg stew or kontomire, a true Ghanaian comfort.',
    price: 40,
    image_url: '/assets/images/food/ampesi.jpeg',
    category: 'localDishes',
  },
  {
    name: 'Tuo-zaafi',
    description:
      'Northern Ghanaian staple of fermented corn dough served with ayoyo or other soups.',
    price: 60,
    image_url: '/assets/images/food/tuozaafi.jpeg',
    category: 'localDishes',
  },
  {
    name: 'Konkonte',
    description:
      'Dried cassava dough served with a rich palm nut or groundnut soup.',
    price: 60,
    image_url: '/assets/images/food/konkonte.jpeg',
    category: 'localDishes',
  },
  {
    name: 'Anguamu',
    description:
      'Corn dough served with okra stew — a simple and hearty Ghanaian classic.',
    price: 60,
    image_url: '/assets/images/food/anguamo.jpeg',
    category: 'localDishes',
  },

  // ── Continental ───────────────────────────────────────────────────────────
  {
    name: 'Grilled Chicken & Chips',
    description:
      'Herb-marinated chicken served with golden fries, coleslaw, and pepper sauce.',
    price: 75,
    image_url:
      'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1200&auto=format&fit=crop',
    category: 'continental',
  },
  {
    name: 'Beef Stir Fry',
    description:
      'Tender beef strips tossed with vegetables, ginger, garlic, and steamed rice.',
    price: 85,
    image_url:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
    category: 'continental',
  },
  {
    name: 'R&G Club Sandwich',
    description:
      'Layered chicken, egg, tomato, lettuce, and house dressing with crispy fries.',
    price: 60,
    image_url:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1200&auto=format&fit=crop',
    category: 'continental',
  },
  {
    name: 'R&G Spaghetti',
    description:
      'House spaghetti in a rich tomato-based sauce served with chicken or beef.',
    price: 60,
    image_url: '/assets/images/food/spaghetti.jpeg',
    category: 'continental',
  },
  {
    name: 'R&G Yam Chips',
    description: 'Crispy yam chips served with a side of your choice.',
    price: 40,
    image_url: '/assets/images/food/yamchips.jpeg',
    category: 'continental',
  },

  // ── Soft Drinks ───────────────────────────────────────────────────────────
  {
    name: 'Chilled Sobolo',
    description:
      'Hibiscus, ginger, pineapple, and warm spices poured over ice.',
    price: 18,
    image_url:
      'https://d24.dmghana.com/assets/images/foodimages/compressed_pineapple%20and%20ginger.jpg',
    category: 'softDrinks',
  },
  {
    name: 'Fresh Pineapple Juice',
    description:
      'Pressed pineapple juice with a clean tropical finish and no fuss.',
    price: 22,
    image_url:
      'https://d24.dmghana.com/assets/images/foodimages/compressed_pineapple%20and%20ginger.jpg',
    category: 'softDrinks',
  },
  {
    name: 'Coca Cola Drink',
    description: 'A chilled classic Coca Cola drink served crisp and refreshing.',
    price: 15,
    image_url:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop',
    category: 'softDrinks',
  },

  // ── Hard Drinks ───────────────────────────────────────────────────────────
  {
    name: 'Palm Wine',
    description:
      'Traditional palm wine served chilled with a lightly sweet local character.',
    price: 35,
    image_url:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop',
    category: 'hardDrinks',
  },
  {
    name: 'Golden Coast Cocktail',
    description:
      'A smooth house cocktail with citrus, tropical fruit, and a warm spirit base.',
    price: 48,
    image_url:
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1200&auto=format&fit=crop',
    category: 'hardDrinks',
  },
  {
    name: 'Premium Whisky Pour',
    description:
      'A neat or iced pour from the bar selection, served with quiet confidence.',
    price: 55,
    image_url:
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1200&auto=format&fit=crop',
    category: 'hardDrinks',
  },
]

// ---------------------------------------------------------------------------
// Wipe any existing sample/test data, then insert the real menu
// ---------------------------------------------------------------------------

console.log('Clearing existing rows from menu_items…')
const { error: deleteError } = await supabase
  .from('menu_items')
  .delete()
  .neq('id', 0) // matches every row

if (deleteError) {
  console.error('❌  Delete failed:', deleteError.message)
  console.error(
    '   Hint: the anon key may need DELETE permission on menu_items.\n' +
    '   Add a policy in Supabase → Table Editor → menu_items → RLS Policies.',
  )
  process.exit(1)
}
console.log('   Cleared.\n')

console.log(`Inserting ${menuItems.length} menu items…`)
const { error: insertError, data } = await supabase
  .from('menu_items')
  .insert(menuItems)
  .select('id, name')

if (insertError) {
  console.error('❌  Insert failed:', insertError.message)
  console.error(
    '   Hint: ensure the anon key has INSERT permission on menu_items.',
  )
  process.exit(1)
}

console.log('✅  Inserted:')
for (const row of data ?? []) {
  console.log(`   • [${row.id}] ${row.name}`)
}
console.log(`\nDone — ${(data ?? []).length} rows written.`)
