import Link from 'next/link';
import { SiteSettings } from '@/lib/types';
import Logo from './Logo';
import ChatWidget from './ChatWidget';

interface SiteChromeProps {
  settings: SiteSettings;
  children: React.ReactNode;
}

export default function SiteChrome({ settings, children }: SiteChromeProps) {
  const nav = settings.navigation ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" aria-label="Home">
            <Logo settings={settings} />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {settings.ctaLabel && settings.ctaHref && (
            <Link
              href={settings.ctaHref}
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
            >
              {settings.ctaLabel}
            </Link>
          )}
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          {settings.footerLinks && (
            <nav className="flex gap-4">
              {settings.footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </footer>

      {/* Floating chat widget */}
      {settings.chatEnabled && <ChatWidget settings={settings} />}
    </div>
  );
}
