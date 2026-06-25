// Central content for the Aurelia luxury hotel experience.
// Images are served from Unsplash (https) with format/width params for fast,
// optimized delivery and are lazy-loaded in the UI.

const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const stats = [
  { label: 'Luxury Properties', value: 480, suffix: '+' },
  { label: 'Happy Guests', value: 1.2, suffix: 'M', decimals: 1 },
  { label: 'Destinations', value: 92, suffix: '' },
  { label: 'Guest Rating', value: 4.9, suffix: '/5', decimals: 1 },
];

export const featuredHotels = [
  {
    id: 'azure-maldives',
    name: 'Azure Overwater Resort',
    location: 'Malé Atoll, Maldives',
    price: 1280,
    rating: 4.9,
    reviews: 2140,
    image: img('1582719478250-c89cae4dc85b'),
    tag: 'Editor’s Choice',
    amenities: ['Private Pool', 'Spa', 'Ocean View', 'Butler'],
  },
  {
    id: 'alpine-zermatt',
    name: 'Alpine Crystal Chalet',
    location: 'Zermatt, Switzerland',
    price: 940,
    rating: 4.8,
    reviews: 1675,
    image: img('1610641818989-c2051b5e2cfd'),
    tag: 'Mountain Retreat',
    amenities: ['Ski-in/out', 'Fireplace', 'Sauna', 'Fine Dining'],
  },
  {
    id: 'santorini-aegean',
    name: 'Aegean Cliff Villas',
    location: 'Oia, Santorini',
    price: 1120,
    rating: 5.0,
    reviews: 3010,
    image: img('1571003123894-1f0594d2b5d9'),
    tag: 'Sunset View',
    amenities: ['Infinity Pool', 'Caldera View', 'Jacuzzi', 'Wine Cellar'],
  },
  {
    id: 'dubai-marina',
    name: 'Marina Sky Palace',
    location: 'Downtown, Dubai',
    price: 1650,
    rating: 4.9,
    reviews: 2480,
    image: img('1512453979798-5ea266f8880c'),
    tag: 'Urban Luxury',
    amenities: ['Sky Pool', 'Helipad', 'Michelin Dining', 'Spa'],
  },
  {
    id: 'bali-ubud',
    name: 'Ubud Jungle Sanctuary',
    location: 'Ubud, Bali',
    price: 720,
    rating: 4.8,
    reviews: 1920,
    image: img('1537953773345-d172ccf13cf1'),
    tag: 'Wellness Escape',
    amenities: ['Yoga Pavilion', 'Spa', 'River View', 'Organic Dining'],
  },
  {
    id: 'kyoto-garden',
    name: 'Kyoto Garden Ryokan',
    location: 'Higashiyama, Kyoto',
    price: 860,
    rating: 4.9,
    reviews: 1340,
    image: img('1528360983277-13d401cdc186'),
    tag: 'Heritage Stay',
    amenities: ['Onsen', 'Tea House', 'Zen Garden', 'Kaiseki'],
  },
];

export const experiences = [
  {
    title: 'Serenity Spa & Wellness',
    text: 'Award-winning therapists, hydrotherapy circuits and signature rituals crafted to restore body and mind.',
    icon: 'Sparkles',
    image: img('1540555700478-4be289fbecef', 700),
  },
  {
    title: 'Infinity Swimming Pools',
    text: 'Temperature-controlled infinity edges that melt into the horizon, day beds and poolside mixology.',
    icon: 'Waves',
    image: img('1571896349842-33c89424de2d', 700),
  },
  {
    title: 'Fine Dining & Gastronomy',
    text: 'Michelin-starred chefs, curated tasting menus and rare vintages in candle-lit private settings.',
    icon: 'UtensilsCrossed',
    image: img('1517248135467-4c7edcad34c4', 700),
  },
  {
    title: 'Conference & Events',
    text: 'State-of-the-art venues with dedicated concierge teams for galas, summits and intimate celebrations.',
    icon: 'Presentation',
    image: img('1505373877841-8d25f7d46678', 700),
  },
];

export const destinations = [
  { city: 'Maldives', properties: 38, x: 71, y: 60, image: img('1573843981267-be1999ff37cd', 600) },
  { city: 'Santorini', properties: 24, x: 54, y: 42, image: img('1570077188670-e3a8d69ac5ff', 600) },
  { city: 'Dubai', properties: 41, x: 62, y: 47, image: img('1512453979798-5ea266f8880c', 600) },
  { city: 'Bali', properties: 33, x: 78, y: 63, image: img('1537996194471-e657df975ab4', 600) },
  { city: 'Switzerland', properties: 29, x: 51, y: 35, image: img('1530122037265-a5f1f91d3b99', 600) },
  { city: 'Kyoto', properties: 19, x: 84, y: 44, image: img('1493976040374-85c8e12f0c0e', 600) },
];

export const travelStats = [
  { label: 'Avg. nights booked', value: 5.4, suffix: '' },
  { label: 'Returning guests', value: 78, suffix: '%' },
  { label: 'Countries served', value: 92, suffix: '' },
];

export const rooms = [
  {
    id: 'presidential',
    name: 'Presidential Suite',
    price: 2400,
    size: '180 m²',
    guests: 4,
    beds: '2 King Beds',
    description:
      'The pinnacle of indulgence — a private terrace, marble bathroom, dedicated butler and panoramic skyline views.',
    gallery: [
      img('1611892440504-42a792e24d32', 1000),
      img('1582719508461-905c673771fd', 1000),
      img('1631049307264-da0ec9d70304', 1000),
    ],
    amenities: ['Private Terrace', 'Butler Service', 'Jacuzzi', 'Smart Home'],
  },
  {
    id: 'ocean-villa',
    name: 'Ocean Pool Villa',
    price: 1680,
    size: '140 m²',
    guests: 3,
    beds: '1 King Bed',
    description:
      'Step from your bedroom into a private infinity pool that spills toward the sea, framed by floor-to-ceiling glass.',
    gallery: [
      img('1602002418082-a4443e081dd1', 1000),
      img('1566073771259-6a8506099945', 1000),
      img('1564013799919-ab600027ffc6', 1000),
    ],
    amenities: ['Private Pool', 'Ocean View', 'Outdoor Shower', 'Sun Deck'],
  },
  {
    id: 'garden-deluxe',
    name: 'Garden Deluxe Room',
    price: 880,
    size: '65 m²',
    guests: 2,
    beds: '1 Queen Bed',
    description:
      'A serene sanctuary wrapped in tropical greenery, with a rain shower, reading nook and private balcony.',
    gallery: [
      img('1618773928121-c32242e63f39', 1000),
      img('1590490360182-c33d57733427', 1000),
      img('1551882547-ff40c63fe5fa', 1000),
    ],
    amenities: ['Garden View', 'Rain Shower', 'Balcony', 'Nespresso'],
  },
];

export const reviews = [
  {
    name: 'Isabella Moreau',
    place: 'Stayed in Santorini',
    rating: 5,
    text: 'Beyond five stars. Every detail was anticipated before we even asked. The sunset suite was pure poetry.',
    avatar: img('1494790108377-be9c29b29330', 200),
  },
  {
    name: 'James Whitfield',
    place: 'Stayed in Maldives',
    rating: 5,
    text: 'The overwater villa and private butler made our honeymoon unforgettable. We are already planning our return.',
    avatar: img('1507003211169-0a1dd7228f2d', 200),
  },
  {
    name: 'Amara Okafor',
    place: 'Stayed in Dubai',
    rating: 5,
    text: 'Flawless service from check-in to check-out. The spa rituals and rooftop dining were absolutely world-class.',
    avatar: img('1438761681033-6461ffad8d80', 200),
  },
  {
    name: 'Lucas Bianchi',
    place: 'Stayed in Bali',
    rating: 5,
    text: 'A sanctuary of calm. Waking up to the jungle and a private pool felt like a dream I never wanted to leave.',
    avatar: img('1500648767791-00dcc994a43e', 200),
  },
  {
    name: 'Sophia Lindqvist',
    place: 'Stayed in Zermatt',
    rating: 5,
    text: 'Ski-in, ski-out perfection. Warm fires, impeccable dining and the most attentive staff we have ever met.',
    avatar: img('1534528741775-53994a69daeb', 200),
  },
];

export const amenities = [
  { name: 'Fitness Center', icon: 'Dumbbell', text: '24/7 state-of-the-art gym & personal trainers' },
  { name: 'Free Wi-Fi', icon: 'Wifi', text: 'Ultra-fast fibre throughout every property' },
  { name: 'Airport Transfer', icon: 'Plane', text: 'Chauffeured luxury cars on arrival & departure' },
  { name: 'Restaurant', icon: 'UtensilsCrossed', text: 'Award-winning chefs & 24-hour in-room dining' },
  { name: 'Swimming Pool', icon: 'Waves', text: 'Infinity & heated indoor pools at every resort' },
  { name: 'Concierge', icon: 'BellRing', text: 'Dedicated 24-hour personal concierge service' },
];

export const offers = [
  {
    title: 'Suite Escape — 35% Off',
    text: 'Three nights or more in any signature suite, including daily spa credit and champagne on arrival.',
    image: img('1445019980597-93fa8acb246c', 800),
    badge: 'Limited',
  },
  {
    title: 'Honeymoon Collection',
    text: 'Complimentary villa upgrade, private dinner on the beach and a couples spa ritual.',
    image: img('1566073771259-6a8506099945', 800),
    badge: 'Romance',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Hotels', href: '#hotels' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Offers', href: '#offers' },
];

export { img };
