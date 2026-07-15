import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { AboutBody } from '@/components/AboutBody';
import type { About } from '@/lib/types';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our mission, vision, and the team behind our travel experiences.',
};

async function getAboutContent(): Promise<About | null> {
  try {
    const query = `*[_type == "about"][0]{
      _id,
      title,
      subtitle,
      description,
      image{
        asset->{
          _id,
          url
        },
        alt
      },
      sections[]{
        title,
        content
      }
    }`;
    
    const about = await client.fetch<About>(query);
    return about;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
}

export default async function AboutPage() {
  const about = await getAboutContent();

  if (!about) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="text-lg text-gray-600">
          Content is currently being updated. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <AboutBody about={about} />
    </div>
  );
}
