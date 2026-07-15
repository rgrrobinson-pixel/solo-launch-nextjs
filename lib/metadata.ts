import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
  twitterHandle?: string;
}

const defaultSEO = {
  siteName: 'Solo Launch',
  defaultTitle: 'Solo Launch - Next.js Template for Solopreneurs',
  defaultDescription: 'A production-ready Next.js template with Sanity CMS integration, perfect for solopreneurs launching their business.',
  defaultImage: '/og-image.png',
  twitterHandle: '@sololaunch',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://sololaunch.com',
};

/**
 * Generate metadata for a page with SEO best practices
 * @param config - SEO configuration object
 * @returns Metadata object for Next.js
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultSEO.defaultImage,
    url,
    type = 'website',
    siteName = defaultSEO.siteName,
    twitterHandle = defaultSEO.twitterHandle,
  } = config;

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const fullUrl = url ? `${defaultSEO.baseUrl}${url}` : defaultSEO.baseUrl;
  const fullImage = image.startsWith('http') ? image : `${defaultSEO.baseUrl}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(defaultSEO.baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultSEO.siteName,
    url: defaultSEO.baseUrl,
    logo: `${defaultSEO.baseUrl}/logo.png`,
    description: defaultSEO.defaultDescription,
    sameAs: [
      // Add your social media URLs here
      'https://twitter.com/sololaunch',
      'https://linkedin.com/company/sololaunch',
    ],
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${defaultSEO.baseUrl}${item.url}`,
    })),
  };
}
