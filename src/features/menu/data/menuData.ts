import Redred from '../../../../assets/images/food/red_red.jpeg'
import Omotuo from '../../../../assets/images/food/omotuo.jpeg'
import Ampesie from '../../../../assets/images/food/ampesi.jpeg'
import Tuozaafi from '../../../../assets/images/food/tuozaafi.jpeg'
import Konkonte from '../../../../assets/images/food/konkonte.jpeg'
import Spaghetti from '../../../../assets/images/food/spaghetti.jpeg'
import Yamchips from '../../../../assets/images/food/yamchips.jpeg'
import Anguamu from '../../../../assets/images/food/anguamo.jpeg'

export type MenuCategoryKey =
  | 'localDishes'
  | 'continental'
  | 'softDrinks'
  | 'hardDrinks'

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

export const menuData: Record<MenuCategoryKey, MenuItem[]> = {
  localDishes: [
    {
      id: 'fufu-light-soup',
      name: 'Fufu & Light Soup',
      description:
        'Hand-pounded fufu served with aromatic light soup, tender meat, and garden-fresh herbs.',
      price: 'GH₵ 65',
      image:
        'https://africanchopbetter.com/wp-content/uploads/sites/110/2024/04/fufu-and-chicken2.jpg',
      category: 'localDishes',
      tags: ['Popular'],
    },
    {
      id: 'banku-tilapia',
      name: 'Banku & Grilled Tilapia',
      description:
        'Char-grilled tilapia with banku, shito, hot pepper, and crisp local vegetables.',
      price: 'GH₵ 80',
      image:
        'https://africanchopbetter.com/wp-content/uploads/sites/110/2024/04/banku-2.jpg',
      category: 'localDishes',
      tags: ['Spicy', 'Chef Special'],
    },
    {
      id: 'waakye-special',
      name: 'Waakye Special',
      description:
        'Rice and beans with gari, spaghetti, egg, stew, shito, and your choice of protein.',
      price: 'GH₵ 55',
      image:
        'https://africanchopbetter.com/wp-content/uploads/sites/110/2024/04/Ghanian-Waakye-ox-1.webp',
      category: 'localDishes',
      tags: ['Popular'],
    },
    {
      id: 'fried-goat',
      name: 'Red Red',
      description:
        'Smoky Ghanaian fried rice with spicy goat, fried plantain, and a bright house salad.',
      price: 'GH₵ 70',
      image:
        Redred,
      category: 'localDishes',
      tags: ['Spicy'],
    },
        {
      id: 'omotuo-groundnut-soup',
      name: 'Omotuo & Groundnut Soup',
      description:
        'Smoky Ghanaian fried rice with spicy goat, fried plantain, and a bright house salad.',
      price: 'GH₵ 40',
      image:
        Omotuo,
      category: 'localDishes',
      tags: ['Spicy'],
    },

      {
      id: 'ampesie',
      name: 'Ampesie',
      description:
        'Smoky Ghanaian fried rice with spicy goat, fried plantain, and a bright house salad.',
      price: 'GH₵ 40',
      image:
        Ampesie,
      category: 'localDishes',
      tags: ['Spicy'],
    },
{
      id: 'Tuo-zaafi',
      name: 'Tuo-zaafi',
      description:
        'Smoky Ghanaian fried rice with spicy goat, fried plantain, and a bright house salad.',
      price: 'GH₵ 60',
      image:
        Tuozaafi,
      category: 'localDishes',
      tags: ['Spicy'],
    },
    {
      id: 'konkonte',
      name: 'Konkonte',
      description:
        'Smoky Ghanaian fried rice with spicy goat, fried plantain, and a bright house salad.',
      price: 'GH₵ 60',
      image:
        Konkonte,
      category: 'localDishes',
      tags: ['Spicy'],
    },
    {
      id: 'anguamu',
      name: 'Anguamu',
      description:
        'Smoky Ghanaian fried rice with spicy goat, fried plantain, and a bright house salad.',
      price: 'GH₵ 60',
      image:
        Anguamu,
      category: 'localDishes',
      tags: ['Spicy'],
    },
  ],
  continental: [
    {
      id: 'grilled-chicken-chips',
      name: 'Grilled Chicken & Chips',
      description:
        'Herb-marinated chicken served with golden fries, coleslaw, and pepper sauce.',
      price: 'GH₵ 75',
      image:
        'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1200&auto=format&fit=crop',
      category: 'continental',
      tags: ['Popular'],
    },
    {
      id: 'beef-stir-fry',
      name: 'Beef Stir Fry',
      description:
        'Tender beef strips tossed with vegetables, ginger, garlic, and steamed rice.',
      price: 'GH₵ 85',
      image:
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
      category: 'continental',
      tags: ['Chef Special'],
    },
    {
      id: 'club-sandwich',
      name: 'R&G Club Sandwich',
      description:
        'Layered chicken, egg, tomato, lettuce, and house dressing with crispy fries.',
      price: 'GH₵ 60',
      image:
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1200&auto=format&fit=crop',
      category: 'continental',
    },
    {
      id: 'spaghetti',
      name: 'R&G Spaghetti',
      description:
        'Layered chicken, egg, tomato, lettuce, and house dressing with crispy fries.',
      price: 'GH₵ 60',
      image:
        Spaghetti,
      category: 'continental',
    },
    {
      id: 'yamchips',
      name: 'R&G Yam Chips',
      description:
        'Crispy yam chips served with a side of your choice.',
      price: 'GH₵ 40',
      image:
        Yamchips,
      category: 'continental',
    },
  ],
  softDrinks: [
    {
      id: 'sobolo',
      name: 'Chilled Sobolo',
      description:
        'Hibiscus, ginger, pineapple, and warm spices poured over ice.',
      price: 'GH₵ 18',
      image:
        'data:image/jpeg;base64,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',
      category: 'softDrinks',
      tags: ['Fresh'],
    },
    {
      id: 'fresh-pineapple-juice',
      name: 'Fresh Pineapple Juice',
      description:
        'Pressed pineapple juice with a clean tropical finish and no fuss.',
      price: 'GH₵ 22',
      image:
        'https://d24.dmghana.com/assets/images/foodimages/compressed_pineapple%20and%20ginger.jpg',
      category: 'softDrinks',
      tags: ['Fresh'],
    },
    {
      id: 'malt',
      name: 'Coca Cola Drink',
      description:
        'A chilled classic Coca Cola drink served crisp and refreshing.',
      price: 'GH₵ 15',
      image:
        'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop',
      category: 'softDrinks',
    },
  ],
  hardDrinks: [
    {
      id: 'palm-wine',
      name: 'Palm Wine',
      description:
        'Traditional palm wine served chilled with a lightly sweet local character.',
      price: 'GH₵ 35',
      image:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop',
      category: 'hardDrinks',
      tags: ['Popular'],
    },
    {
      id: 'house-cocktail',
      name: 'Golden Coast Cocktail',
      description:
        'A smooth house cocktail with citrus, tropical fruit, and a warm spirit base.',
      price: 'GH₵ 48',
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1200&auto=format&fit=crop',
      category: 'hardDrinks',
      tags: ['Chef Special'],
    },
    {
      id: 'whisky-pour',
      name: 'Premium Whisky Pour',
      description:
        'A neat or iced pour from the bar selection, served with quiet confidence.',
      price: 'GH₵ 55',
      image:
        'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1200&auto=format&fit=crop',
      category: 'hardDrinks',
    },
  ],
}

export const menuSections: MenuSectionData[] = [
  {
    id: 'localDishes',
    title: 'Local Dishes',
    subtitle:
      'Deeply Ghanaian plates built around soup, fire, spice, grains, and slow comfort.',
    items: menuData.localDishes,
  },
  {
    id: 'continental',
    title: 'Continental',
    subtitle:
      'Familiar restaurant favorites prepared with the same generous Bush Canteen spirit.',
    items: menuData.continental,
  },
  {
    id: 'softDrinks',
    title: 'Soft Drinks',
    subtitle:
      'Cold, refreshing pours for warm Accra afternoons and lingering dinner tables.',
    items: menuData.softDrinks,
  },
  {
    id: 'hardDrinks',
    title: 'Hard Drinks',
    subtitle:
      'Bar selections and spirited house pours for slow evenings and good company.',
    items: menuData.hardDrinks,
  },
]
