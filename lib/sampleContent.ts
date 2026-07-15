/**
 * Sample content for Solo Launch template
 * Used for development and demo purposes
 * Replace with real Sanity content in production
 */

import type { SiteSettings, Hero, About, Destination, DestinationsGallery, FaqItem } from './types';

export const sampleSiteSettings: SiteSettings = {
  _id: 'siteSettings',
  siteName: 'Solo Launch',
  siteTagline: 'Your Business, Launched.',
  primaryColor: '#0070f3',
  contactEmail: 'hello@example.com',
  metaDescription: 'A beautiful Next.js + Sanity CMS website template for your business.',
};

export const sampleHero: Hero = {
  _id: 'hero',
  heading: 'Welcome to Solo Launch',
  subheading: 'A powerful, flexible website template built with Next.js and Sanity CMS.',
  ctaLabel: 'Get Started',
  ctaLink: '/contact',
};

export const sampleAbout: About = {
  _id: 'about',
  heading: 'About Us',
  imageAlt: 'About our company',
};

export const sampleDestinations: Destination[] = [
  {
    _id: 'dest-1',
    name: 'Sample Destination 1',
    slug: { current: 'sample-destination-1' },
    description: 'A beautiful sample destination for your template.',
    duration: '7 days',
    price: 1999,
  },
  {
    _id: 'dest-2',
    name: 'Sample Destination 2',
    slug: { current: 'sample-destination-2' },
    description: 'Another stunning sample destination.',
    duration: '5 days',
    price: 1499,
  },
];

export const sampleFaqs: FaqItem[] = [
  {
    _id: 'faq-1',
    question: 'How do I get started?',
    answer: [{ _type: 'block', children: [{ text: 'Contact us to get started.' }] }],
    order: 1,
  },
  {
    _id: 'faq-2',
    question: 'What is included?',
    answer: [{ _type: 'block', children: [{ text: 'Everything you need to launch.' }] }],
    order: 2,
  },
];
