import bankuImage from '../../../../assets/images/food/banku.jpg'
import buffetImage from '../../../../assets/images/food/buffet.jpg'
import jollofImage from '../../../../assets/images/food/jollof.jpg'
import loadRiceImage from '../../../../assets/images/food/load-rice.jpg'
import oilRiceImage from '../../../../assets/images/food/oil-rice.jpg'
import plentyRiceImage from '../../../../assets/images/food/plenty-rice.jpg'
import friendshipImage from '../../../../public/friendship.jpg'
import rizoImage from '../../../../assets/images/gallery/restaurant-lounge.jpg'

export type GalleryItem = {
  id: number
  image: string
  title: string
  description: string
}

export const galleryData: GalleryItem[] = [
  {
    id: 1,
    image: buffetImage,
    title: 'Chef Curated Buffet',
    description: 'Generous spreads made for shared tables and slow moments.',
  },
  {
    id: 2,
    image: jollofImage,
    title: 'Smoky Jollof Plates',
    description: 'Warm grains, deep spice, and a signature R&G finish.',
  },
  {
    id: 3,
    image: bankuImage,
    title: 'Local Classics',
    description: 'Ghanaian comfort served with freshness and quiet polish.',
  },
  {
    id: 4,
    image: friendshipImage,
    title: 'Tableside Memories',
    description: 'Food, laughter, and the easy joy of good company.',
  },
  {
    id: 5,
    image: plentyRiceImage,
    title: 'Abundant Servings',
    description: 'Hearty portions crafted for appetite, flavor, and warmth.',
  },
  {
    id: 6,
    image: oilRiceImage,
    title: 'Golden Comfort',
    description: 'Earthy rice dishes layered with house aromatics.',
  },
  {
    id: 7,
    image: loadRiceImage,
    title: 'Fresh From The Kitchen',
    description: 'Daily preparations served hot, vibrant, and full of life.',
  },
  {
    id: 8,
    image: rizoImage,
    title: 'Modern Restaurant Energy',
    description: 'A warm setting for lunch breaks, evenings, and celebrations.',
  },
]
