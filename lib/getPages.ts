import { createClient } from 'next-sanity';
import type { Page } from './types';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

export async function getPages(): Promise<Page[]> {
  return client.fetch(
    `*[_type == "page"] | order(_createdAt asc){
      _id,
      title,
      slug,
      metaTitle,
      metaDescription
    }`
  );
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      metaTitle,
      metaDescription
    }`,
    { slug }
  );
}

export async function getStaticPaths() {
  const pages = await getPages();
  return pages
    .filter((page) => page.slug?.current)
    .map((page) => ({ params: { slug: page.slug.current } }));
}
