// Sanity image type
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

// Site Settings
export interface SiteSettings {
  _id: string;
  siteName: string;
  siteTagline?: string;
  logo?: SanityImage;
  primaryColor?: string;
  contactEmail?: string;
  metaDescription?: string;
}

// Hero Section
export interface Hero {
  _id: string;
  heading: string;
  subheading?: string;
  backgroundImage?: SanityImage;
  ctaLabel?: string;
  ctaLink?: string;
}

// About Section
export interface About {
  _id: string;
  heading: string;
  body?: unknown[];
  image?: SanityImage;
  imageAlt?: string;
}

// Destination
export interface Destination {
  _id: string;
  name: string;
  slug?: { current: string };
  description?: string;
  image?: SanityImage;
  duration?: string;
  price?: number;
}

// Destinations Gallery
export interface DestinationsGallery {
  _id: string;
  title: string;
  subtitle?: string;
  destinations?: Destination[];
  layout?: 'grid' | 'carousel';
}

// FAQ Item
export interface FaqItem {
  _id: string;
  question: string;
  answer: unknown[];
  category?: string;
  order?: number;
}

// Itinerary Day
export interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities?: unknown[];
}

// Itinerary
export interface Itinerary {
  _id: string;
  title: string;
  days?: ItineraryDay[];
  duration?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
}

// Page
export interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  metaTitle?: string;
  metaDescription?: string;
}
