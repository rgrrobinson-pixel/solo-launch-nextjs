import Image from 'next/image';
import { SiteSettings } from '@/lib/types';

interface LogoProps {
  settings: SiteSettings;
}

export default function Logo({ settings }: LogoProps) {
  if (settings.logoUrl) {
    return (
      <Image
        src={settings.logoUrl}
        alt={settings.siteName ?? 'Logo'}
        width={140}
        height={40}
        className="h-10 w-auto object-contain"
        priority
      />
    );
  }

  return (
    <span className="text-xl font-bold tracking-tight text-brand-700">
      {settings.siteName ?? 'Solo Launch'}
    </span>
  );
}
