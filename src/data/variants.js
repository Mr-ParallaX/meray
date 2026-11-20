export const VARIANTS = [
  {
    id: "blue",
    name: "Blue",
    hex: "#3FA8D6",
    bgHex: "#3FA8D6",
    image: "https://iili.io/fnepb2a.png"
  },
  {
    id: "red",
    name: "Red",
    hex: "#E54C43",
    bgHex: "#E54C43",
    image: "https://iili.io/fnepmYJ.png"
  },
  {
    id: "purple",
    name: "Purple",
    hex: "#9B59B6",
    bgHex: "#9B59B6",
    image: "https://iili.io/fneppkv.png"
  },
  {
    id: "orange",
    name: "Yellow",
    hex: "#F5A623",
    bgHex: "#F5A623",
    image: "https://iili.io/fnepypR.png"
  }
];

export const HERO_DETAIL_IMAGE = "https://iili.io/fnkHW7a.png";

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2564&auto=format&fit=crop"
];

export const STORY_BG_IMAGE = "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop";

export const TESTIMONIAL_AVATAR = "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2574&auto=format&fit=crop";

export const PRELOAD_IMAGES = [
  ...VARIANTS.map(v => v.image),
  HERO_DETAIL_IMAGE,
  ...GALLERY_IMAGES,
  STORY_BG_IMAGE,
  TESTIMONIAL_AVATAR
];
