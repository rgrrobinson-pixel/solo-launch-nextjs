import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { resolveImage } from '@/lib/resolveImage';
import { AboutSection } from '@/lib/types';

interface AboutBodyProps {
  section: AboutSection;
}

export default function AboutBody({ section }: AboutBodyProps) {
  const imgSrc = section.image ? resolveImage(section.image) : null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            {section.eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">
                {section.eyebrow}
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {section.heading}
            </h2>
            {section.body && (
              <div className="prose prose-lg text-gray-600 max-w-none">
                <PortableText value={section.body} />
              </div>
            )}
            {section.ctaLabel && section.ctaHref && (
              <a
                href={section.ctaHref}
                className="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
              >
                {section.ctaLabel}
              </a>
            )}
          </div>

          {/* Image */}
          {imgSrc && (
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={imgSrc}
                alt={section.heading ?? 'About'}
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
