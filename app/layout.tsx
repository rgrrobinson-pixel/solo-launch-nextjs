import type { Metadata } from 'next';
import './globals.css';
import { getSiteContent } from '@/lib/getContent';
import { resolveImageUrl } from '@/lib/resolveImage';
import ChatWidget from '@/components/ChatWidget';
import { SiteChrome } from '@/components/SiteChrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.com';

/**
 * Metadata is driven by the CMS content (siteSettings + hero), with a safe
 * fallback when no Sanity project is configured yet.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSiteContent();
  const { settings, hero, about } = content;

  const title = settings.tagline
    ? `${settings.businessName} — ${settings.tagline}`
    : settings.businessName;

  const description =
    hero.subheadline ||
    settings.tagline ||
    `${settings.businessName} ${
      settings.areaServed ? `in ${settings.areaServed}` : ''
    }.`;

  const ogSource = hero.heroImage || about?.portrait || settings.logo;
  const ogImage = ogSource ? resolveImageUrl(ogSource, 1200) : null;
  const images = ogImage ? [{ url: ogImage, width: 1200, alt: title }] : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: SITE_URL,
      siteName: settings.businessName,
      images,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { content } = await getSiteContent();
  const { settings, hero } = content;

  return (
    <html lang="en">
      <body>
        <SiteChrome
          businessName={settings.businessName}
          areaServed={settings.areaServed}
          logo={settings.logo}
          whatsappNumber={settings.whatsappNumber}
        >
          {children}
        </SiteChrome>
        {settings.whatsappNumber && (
          <ChatWidget whatsappNumber={settings.whatsappNumber} />
        )}
      </body>
    </html>
  );
}
