import { createClient } from 'next-sanity';
import type { SiteSettings, Hero, About, DestinationsGallery, FaqItem, Itinerary } from './types';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      _id,
      siteName,
      siteTagline,
      logo,
      primaryColor,
      contactEmail,
      metaDescription
    }`
  );
}

export async function getHero(): Promise<Hero | null> {
  return client.fetch(
    `*[_type == "hero"][0]{
      _id,
      heading,
      subheading,
      backgroundImage,
      ctaLabel,
      ctaLink
    }`
  );
}

export async function getAbout(): Promise<About | null> {
  return client.fetch(
    `*[_type == "about"][0]{
      _id,
      heading,
      body,
      image,
      imageAlt
    }`
  );
}

export async function getDestinationsGallery(): Promise<DestinationsGallery | null> {
  return client.fetch(
    `*[_type == "destinationsGallery"][0]{
      _id,
      title,
      subtitle,
      layout,
      destinations[]->{
        _id,
        name,
        slug,
        description,
        image,
        duration,
        price
      }
    }`
  );
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return client.fetch(
    `*[_type == "faqItem"] | order(order asc){
      _id,
      question,
      answer,
      category,
      order
    }`
  );
}

export async function getItinerary(): Promise<Itinerary | null> {
  return client.fetch(
    `*[_type == "itinerary"][0]{
      _id,
      title,
      days,
      duration,
      difficulty
    }`
  );
}
