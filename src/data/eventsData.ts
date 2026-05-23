import buffetImage from '../../assets/buffet.jpg'
import friendshipImage from '../../assets/friendship.jpg'
import jollofPosterImage from '../../assets/jollof-poster.jpg'
import plentyRiceImage from '../../assets/plenty-rice.jpg'
import rizoImage from '../../assets/rizo.jpg'
import waakyeImage from '../../assets/waakye.webp'

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
    title: 'Friday Live Band Night',
    image: friendshipImage,
    description:
      'Ease into the weekend with live music, chilled drinks, and authentic meals made for shared tables.',
    date: 'Every Friday',
    time: '7:00 PM',
    category: 'Entertainment',
  },
  {
    id: 2,
    title: 'Sunday Family Buffet',
    image: buffetImage,
    description:
      'A generous Sunday spread of local favorites, continental dishes, and warm hospitality for the whole family.',
    date: 'Every Sunday',
    time: '1:00 PM',
    category: 'Family Dining',
  },
  {
    id: 3,
    title: 'Jollof & Grill Evening',
    image: jollofPosterImage,
    description:
      'Smoky jollof, grilled proteins, pepper sauces, and a relaxed evening built around bold Ghanaian flavor.',
    date: 'Last Saturday',
    time: '6:30 PM',
    category: 'Food Special',
  },
  {
    id: 4,
    title: 'Private Celebration Tables',
    image: rizoImage,
    description:
      'Reserve a polished space for birthdays, team dinners, intimate celebrations, and memorable gatherings.',
    date: 'By Reservation',
    time: 'Flexible',
    category: 'Private Events',
  },
  {
    id: 5,
    title: 'Lunch Bowl Specials',
    image: waakyeImage,
    description:
      'Midday comfort plates served fast, fresh, and full of flavor for workers, students, and neighborhood guests.',
    date: 'Weekdays',
    time: '12:00 PM',
    category: 'Lunch',
  },
  {
    id: 6,
    title: 'Community Food Table',
    image: plentyRiceImage,
    description:
      'A lively monthly gathering celebrating food, culture, conversation, and the people who make R&G feel alive.',
    date: 'Monthly',
    time: '4:00 PM',
    category: 'Community',
  },
]
