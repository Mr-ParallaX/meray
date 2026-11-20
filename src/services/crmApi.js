// ============================================================================
// MERAY Hair Salon — CRM Data Access Layer
// LocalStorage backed mock API with 200ms fake network delay
// ============================================================================

import {
  INITIAL_BOOKINGS,
  INITIAL_CUSTOMERS,
  INITIAL_SERVICES,
  INITIAL_STYLES,
  INITIAL_GALLERY,
  INITIAL_BEFORE_AFTER,
  INITIAL_OFFERS,
  INITIAL_REVIEWS,
  INITIAL_STYLISTS,
  INITIAL_SETTINGS
} from '../data/mockCrm';

const STORAGE_KEYS = {
  BOOKINGS: 'meray_crm_bookings',
  CUSTOMERS: 'meray_crm_customers',
  SERVICES: 'meray_crm_services',
  STYLES: 'meray_crm_styles',
  GALLERY: 'meray_crm_gallery',
  BEFORE_AFTER: 'meray_crm_before_after',
  OFFERS: 'meray_crm_offers',
  REVIEWS: 'meray_crm_reviews',
  STYLISTS: 'meray_crm_stylists',
  SETTINGS: 'meray_crm_settings'
};

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

function getStored(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function setStored(key, value) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// ----------------------------------------------------------------------------
// BOOKINGS
// ----------------------------------------------------------------------------
export async function getBookings() {
  await delay();
  return getStored(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
}

export async function createBooking(bookingData) {
  await delay();
  const bookings = getStored(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  const newBooking = {
    ...bookingData,
    id: 'bk-' + Date.now(),
    ref: 'MRY-' + Math.floor(1000 + Math.random() * 9000),
    status: bookingData.status || 'pending'
  };
  const updated = [newBooking, ...bookings];
  setStored(STORAGE_KEYS.BOOKINGS, updated);
  return newBooking;
}

export async function updateBookingStatus(id, newStatus) {
  await delay();
  const bookings = getStored(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
  setStored(STORAGE_KEYS.BOOKINGS, updated);
  return updated.find((b) => b.id === id);
}

export async function rescheduleBooking(id, newDate, newTime) {
  await delay();
  const bookings = getStored(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  const updated = bookings.map((b) => (b.id === id ? { ...b, date: newDate, time: newTime } : b));
  setStored(STORAGE_KEYS.BOOKINGS, updated);
  return updated.find((b) => b.id === id);
}

export async function deleteBooking(id) {
  await delay();
  const bookings = getStored(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  const updated = bookings.filter((b) => b.id !== id);
  setStored(STORAGE_KEYS.BOOKINGS, updated);
  return true;
}

// ----------------------------------------------------------------------------
// CUSTOMERS
// ----------------------------------------------------------------------------
export async function getCustomers() {
  await delay();
  return getStored(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
}

export async function updateCustomerNotes(id, notes) {
  await delay();
  const customers = getStored(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  const updated = customers.map((c) => (c.id === id ? { ...c, notes } : c));
  setStored(STORAGE_KEYS.CUSTOMERS, updated);
  return updated.find((c) => c.id === id);
}

// ----------------------------------------------------------------------------
// SERVICES
// ----------------------------------------------------------------------------
export async function getServices() {
  await delay();
  return getStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export async function saveService(serviceData) {
  await delay();
  const services = getStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  let updated;
  if (serviceData.id) {
    updated = services.map((s) => (s.id === serviceData.id ? { ...s, ...serviceData } : s));
  } else {
    const newService = {
      ...serviceData,
      id: 'srv-' + Date.now(),
      order: services.length + 1,
      active: true
    };
    updated = [...services, newService];
  }
  setStored(STORAGE_KEYS.SERVICES, updated);
  return updated;
}

export async function deleteService(id) {
  await delay();
  const services = getStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  const updated = services.filter((s) => s.id !== id);
  setStored(STORAGE_KEYS.SERVICES, updated);
  return true;
}

export async function reorderServices(newOrderList) {
  await delay();
  setStored(STORAGE_KEYS.SERVICES, newOrderList);
  return newOrderList;
}

// ----------------------------------------------------------------------------
// STYLES / LOOKBOOK
// ----------------------------------------------------------------------------
export async function getStyles() {
  await delay();
  return getStored(STORAGE_KEYS.STYLES, INITIAL_STYLES);
}

export async function saveStyle(styleData) {
  await delay();
  const styles = getStored(STORAGE_KEYS.STYLES, INITIAL_STYLES);
  let updated;
  if (styleData.id) {
    updated = styles.map((s) => (s.id === styleData.id ? { ...s, ...styleData } : s));
  } else {
    const newStyle = {
      ...styleData,
      id: 'sty-' + Date.now(),
      active: true
    };
    updated = [newStyle, ...styles];
  }
  setStored(STORAGE_KEYS.STYLES, updated);
  return updated;
}

export async function deleteStyle(id) {
  await delay();
  const styles = getStored(STORAGE_KEYS.STYLES, INITIAL_STYLES);
  const updated = styles.filter((s) => s.id !== id);
  setStored(STORAGE_KEYS.STYLES, updated);
  return true;
}

// ----------------------------------------------------------------------------
// GALLERY & BEFORE/AFTER
// ----------------------------------------------------------------------------
export async function getGallery() {
  await delay();
  return getStored(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
}

export async function saveGalleryItem(item) {
  await delay();
  const gallery = getStored(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  const newItem = {
    ...item,
    id: 'gal-' + Date.now()
  };
  const updated = [newItem, ...gallery];
  setStored(STORAGE_KEYS.GALLERY, updated);
  return updated;
}

export async function deleteGalleryItem(id) {
  await delay();
  const gallery = getStored(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  const updated = gallery.filter((g) => g.id !== id);
  setStored(STORAGE_KEYS.GALLERY, updated);
  return true;
}

export async function getBeforeAfter() {
  await delay();
  return getStored(STORAGE_KEYS.BEFORE_AFTER, INITIAL_BEFORE_AFTER);
}

export async function saveBeforeAfter(item) {
  await delay();
  const list = getStored(STORAGE_KEYS.BEFORE_AFTER, INITIAL_BEFORE_AFTER);
  let updated;
  if (item.id) {
    updated = list.map((ba) => (ba.id === item.id ? { ...ba, ...item } : ba));
  } else {
    updated = [{ ...item, id: 'ba-' + Date.now() }, ...list];
  }
  setStored(STORAGE_KEYS.BEFORE_AFTER, updated);
  return updated;
}

// ----------------------------------------------------------------------------
// OFFERS
// ----------------------------------------------------------------------------
export async function getOffers() {
  await delay();
  return getStored(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
}

export async function saveOffer(offerData) {
  await delay();
  const offers = getStored(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  let updated;
  if (offerData.id) {
    updated = offers.map((o) => (o.id === offerData.id ? { ...o, ...offerData } : o));
  } else {
    const newOffer = { ...offerData, id: 'off-' + Date.now(), active: true };
    updated = [newOffer, ...offers];
  }
  setStored(STORAGE_KEYS.OFFERS, updated);
  return updated;
}

export async function deleteOffer(id) {
  await delay();
  const offers = getStored(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  const updated = offers.filter((o) => o.id !== id);
  setStored(STORAGE_KEYS.OFFERS, updated);
  return true;
}

// ----------------------------------------------------------------------------
// REVIEWS
// ----------------------------------------------------------------------------
export async function getReviews() {
  await delay();
  return getStored(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
}

export async function updateReviewStatus(id, newStatus) {
  await delay();
  const reviews = getStored(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  const updated = reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
  setStored(STORAGE_KEYS.REVIEWS, updated);
  return updated;
}

export async function deleteReview(id) {
  await delay();
  const reviews = getStored(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  const updated = reviews.filter((r) => r.id !== id);
  setStored(STORAGE_KEYS.REVIEWS, updated);
  return true;
}

// ----------------------------------------------------------------------------
// STYLISTS
// ----------------------------------------------------------------------------
export async function getStylists() {
  await delay();
  return getStored(STORAGE_KEYS.STYLISTS, INITIAL_STYLISTS);
}

export async function saveStylist(stylistData) {
  await delay();
  const stylists = getStored(STORAGE_KEYS.STYLISTS, INITIAL_STYLISTS);
  let updated;
  if (stylistData.id) {
    updated = stylists.map((s) => (s.id === stylistData.id ? { ...s, ...stylistData } : s));
  } else {
    const newStylist = { ...stylistData, id: 'stylist-' + Date.now(), active: true };
    updated = [...stylists, newStylist];
  }
  setStored(STORAGE_KEYS.STYLISTS, updated);
  return updated;
}

// ----------------------------------------------------------------------------
// SETTINGS
// ----------------------------------------------------------------------------
export async function getSettings() {
  await delay();
  return getStored(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
}

export async function saveSettings(newSettings) {
  await delay();
  const current = getStored(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  const merged = { ...current, ...newSettings };
  setStored(STORAGE_KEYS.SETTINGS, merged);

  // Trigger custom window event so website components update live without reload
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('meray_settings_updated', { detail: merged }));
  }
  return merged;
}

// ----------------------------------------------------------------------------
// RESET DEMO DATA
// ----------------------------------------------------------------------------
export async function resetDemoData() {
  await delay(300);
  setStored(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  setStored(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  setStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  setStored(STORAGE_KEYS.STYLES, INITIAL_STYLES);
  setStored(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  setStored(STORAGE_KEYS.BEFORE_AFTER, INITIAL_BEFORE_AFTER);
  setStored(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  setStored(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  setStored(STORAGE_KEYS.STYLISTS, INITIAL_STYLISTS);
  setStored(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('meray_settings_updated', { detail: INITIAL_SETTINGS }));
  }
  return true;
}

// ----------------------------------------------------------------------------
// SIMULATE NEW BOOKING (for live notification demonstration)
// ----------------------------------------------------------------------------
export async function simulateNewBooking() {
  await delay(150);
  const randomAudiences = ['men', 'women', 'girl', 'boy'];
  const aud = randomAudiences[Math.floor(Math.random() * randomAudiences.length)];
  const num = Math.floor(100 + Math.random() * 900);

  const sampleNames = {
    men: `Sample Client ${num} (Alex M.)`,
    women: `Sample Client ${num} (Rachel S.)`,
    girl: `Sample Client ${num} (Lily B.)`,
    boy: `Sample Client ${num} (Mason K.)`
  };

  const sampleServices = {
    men: 'Signature Skin Fade',
    women: 'Dimensional Balayage & Gloss',
    girl: 'Princess Curls & French Braid',
    boy: 'Boys Textured Crop'
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const simulated = {
    id: 'bk-' + Date.now(),
    ref: 'MRY-' + Math.floor(1000 + Math.random() * 9000),
    clientName: sampleNames[aud],
    phone: `(847) 555-0${Math.floor(100 + Math.random() * 900)}`,
    audience: aud,
    service: sampleServices[aud],
    style: 'Modern Signature Look',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: todayStr,
    time: '02:00 PM',
    price: aud === 'women' ? 165 : 35,
    status: 'pending',
    notes: 'Simulated online booking via Meray Website'
  };

  const bookings = getStored(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  const updated = [simulated, ...bookings];
  setStored(STORAGE_KEYS.BOOKINGS, updated);

  // Dispatch global event for live sound & badge updates
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('meray_new_booking', { detail: simulated }));
  }

  return simulated;
}
