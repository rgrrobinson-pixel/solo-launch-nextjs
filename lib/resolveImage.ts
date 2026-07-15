import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';
import type { SanityImage } from './types';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function resolveImage(image: SanityImage | undefined | null) {
  if (!image?.asset) return null;
  return builder.image(image);
}

export function getImageUrl(
  image: SanityImage | undefined | null,
  options?: { width?: number; height?: number; quality?: number }
): string | null {
  const resolved = resolveImage(image);
  if (!resolved) return null;

  let url = resolved;

  if (options?.width) url = url.width(options.width);
  if (options?.height) url = url.height(options.height);
  if (options?.quality) url = url.quality(options.quality);

  return url.url();
}

export function getImageDimensions(image: SanityImage | undefined | null) {
  if (!image?.asset?._ref) return { width: 0, height: 0 };

  const [, , dimensions] = image.asset._ref.split('-');
  const [width, height] = dimensions?.split('x').map(Number) ?? [0, 0];

  return { width, height };
}
