import liveBandImage from '../../../../assets/images/gallery/liveBand.jpeg'
import corporateImage from '../../../../assets/images/gallery/corporate.jpeg'
import attiekeChicksImage from '../../../../assets/images/gallery/attiekeChicks.jpg'
import friendshipImage from '../../../../public/friendship.jpg'
import dineINImage from '../../../../assets/images/gallery/dineIN.jpeg'

export type EventItem = {
  id: number
  title: string
  image: string
  description: string
  date: string
  time: string
  category: string
}

export const eventsData: EventItem[] = [
  {
    id: 1,
    title: 'Attieke Chics',
    image: attiekeChicksImage,
    description:
      'Midday comfort plates served fast, fresh, and full of flavor for workers, students and neighborhood guests.',
    date: 'Weekdays',
    time: '12:00 PM',
    category: 'Food',
  },
  {
    id: 2,
    title: 'Chopbar Vibes',
    image: friendshipImage,
    description:
      'Ease into the weekend with live music, chilled drinks, and authentic meals made for shared tables.',
    date: 'Every Friday',
    time: '7:00 PM',
    category: 'Food Special',
  },
  {
    id: 3,
    title: 'Live Band Night',
    image: liveBandImage,
    description:
      'Smoky jollof, grilled proteins, pepper sauces, and a relaxed evening built around bold Ghanaian flavor.',
    date: 'Last Saturday',
    time: '6:30 PM',
    category: 'Entertainment',
  },
  {
    id: 4,
    title: 'Dine-in and Take Out',
    image: dineINImage,
    description:
      'Reserve a polished space for birthdays, team dinners, intimate celebrations, and memorable gatherings.',
    date: 'By Reservation',
    time: 'Flexible',
    category: 'Casuals',
  },
  
  {
    id: 5,
    title: 'Corporate',
    image: corporateImage,
    description:
      'A lively monthly gathering celebrating food, culture, conversation and the people who make R&G feel alive.',
    date: 'Monthly',
    time: '4:00 PM',
    category: 'Private Events',
  },
]
