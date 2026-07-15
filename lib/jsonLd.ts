import type { SiteSettings, Page } from './types';

export function generateWebsiteJsonLd(siteSettings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSettings.siteName,
    description: siteSettings.metaDescription ?? siteSettings.siteTagline,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  };
}

export function generateOrganizationJsonLd(siteSettings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings.siteName,
    email: siteSettings.contactEmail,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  };
}

export function generatePageJsonLd(page: Page, siteSettings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.metaTitle ?? page.title,
    description: page.metaDescription ?? siteSettings.metaDescription,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/${page.slug.current}`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteSettings.siteName,
    },
  };
}

export function generateFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
