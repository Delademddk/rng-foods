import logoImage from "../../../assets/images/branding/logo.jpg";

export type Testimonial = {
  id: number;
  name: string;
  image: string;
  role: string;
  rating: number;
  review: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kwame Mensah",
    image: logoImage,
    role: "Food Enthusiast",
    rating: 5,
    review:
      "Amazing authentic food and an atmosphere that feels warm from the moment you walk in. R&G has become my reliable place for proper local meals.",
  },
  {
    id: 2,
    name: "Akosua Addai",
    image: logoImage,
    role: "Returning Customer",
    rating: 5,
    review:
      "The portions are generous, the flavors are rich, and the service is always welcoming. It feels like a restaurant made for real gatherings.",
  },
  {
    id: 3,
    name: "Nana Boateng",
    image: logoImage,
    role: "Local Food Lover",
    rating: 5,
    review:
      "Their Ghanaian dishes have that deep homemade taste with restaurant polish. I always recommend R&G when friends ask where to eat in Tesano.",
  },
  {
    id: 4,
    name: "Efua Quartey",
    image: logoImage,
    role: "Family Guest",
    rating: 5,
    review:
      "We came for a family lunch and stayed longer than planned. The food, music, and easy hospitality made the whole afternoon memorable.",
  },
  {
    id: 5,
    name: "Yaw Owusu",
    image: logoImage,
    role: "Weekend Regular",
    rating: 5,
    review:
      "R&G gets the balance right: flavorful food, fair prices, cold drinks, and a setting that works for both quick meals and slow evenings.",
  },
];
