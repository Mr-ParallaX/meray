export const SITE_CONFIG = {
  name: "Meray Hair Salon",
  legalName: "Meray Hair Salon LLC",
  tagline: "Precision Grooming & Styling for Men, Women & Kids",
  address: {
    street: "1582 Busse Rd",
    city: "Mt Prospect",
    state: "IL",
    zip: "60056",
    country: "USA",
    full: "1582 Busse Rd, Mt Prospect, IL 60056, USA",
    mapUrl: "https://maps.google.com/maps?q=Meray%2C%201582%20Busse%20Rd%2C%20Mt%20Prospect%2C%20IL%2060056&z=16&output=embed"
  },
  phone: "(847) 258-3604", // TODO confirm with client
  email: "info@merayhairsalon.com", // TODO confirm with client
  socials: {
    instagram: "https://instagram.com/merayhairsalon",
    facebook: "https://facebook.com/merayhairsalon",
    youtube: "https://youtube.com/@merayhairsalon",
    tiktok: "https://tiktok.com/@merayhairsalon"
  },
  hours: [
    { day: "Monday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "4:00 PM" } // TODO confirm with client
  ],
  slotMinutes: 30,
  timezone: "America/Chicago"
};
