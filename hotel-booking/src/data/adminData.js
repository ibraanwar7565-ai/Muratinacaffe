// Demo data powering the Aurelia hotel management dashboard.

export const adminKpis = [
  { key: 'revenue', label: 'Total Revenue', value: '$284,920', change: 12.4 },
  { key: 'bookings', label: 'Bookings', value: '1,482', change: 8.1 },
  { key: 'occupancy', label: 'Occupancy', value: '87%', change: 3.6 },
  { key: 'rating', label: 'Guest Rating', value: '4.9', change: 1.2 },
];

export const revenueSeries = [
  { label: 'Jan', value: 18200 },
  { label: 'Feb', value: 21000 },
  { label: 'Mar', value: 19800 },
  { label: 'Apr', value: 24500 },
  { label: 'May', value: 28100 },
  { label: 'Jun', value: 26400 },
  { label: 'Jul', value: 31800 },
  { label: 'Aug', value: 33200 },
  { label: 'Sep', value: 29900 },
  { label: 'Oct', value: 34800 },
  { label: 'Nov', value: 38100 },
  { label: 'Dec', value: 42600 },
];

export const occupancySeries = [
  { label: 'Presidential Suites', value: 92 },
  { label: 'Ocean Pool Villas', value: 88 },
  { label: 'Garden Deluxe', value: 76 },
  { label: 'Standard Rooms', value: 64 },
];

export const recentBookings = [
  { id: 1, guest: 'Isabella Moreau', room: 'Presidential Suite', nights: 4, amount: 9600, status: 'Confirmed' },
  { id: 2, guest: 'James Whitfield', room: 'Ocean Pool Villa', nights: 6, amount: 10080, status: 'Confirmed' },
  { id: 3, guest: 'Amara Okafor', room: 'Garden Deluxe', nights: 3, amount: 2640, status: 'Pending' },
  { id: 4, guest: 'Lucas Bianchi', room: 'Ocean Pool Villa', nights: 5, amount: 8400, status: 'Confirmed' },
  { id: 5, guest: 'Sophia Lindqvist', room: 'Presidential Suite', nights: 2, amount: 4800, status: 'Cancelled' },
  { id: 6, guest: 'Noah Castellano', room: 'Garden Deluxe', nights: 7, amount: 6160, status: 'Pending' },
];

export const roomInventory = [
  { type: 'Presidential Suites', total: 12, booked: 11 },
  { type: 'Ocean Pool Villas', total: 28, booked: 24 },
  { type: 'Garden Deluxe Rooms', total: 60, booked: 46 },
  { type: 'Standard Rooms', total: 120, booked: 77 },
];
