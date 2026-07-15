import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { notFound } from 'next/navigation'

interface Destination {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  content?: any[]
  mainImage?: any
  gallery?: any[]
  featured?: boolean
}

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const destinations = await client.fetch<{ slug: { current: string } }[]>(`
    *[_type == "destination"] {
      slug
    }
  `)

  return destinations.map((destination) => ({
    slug: destination.slug.current,
  }))
}

export default async function DestinationPage({ params }: Props) {
  const destination = await client.fetch<Destination>(
    `
    *[_type == "destination" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      content,
      mainImage,
      gallery,
      featured
    }
  `,
    { slug: params.slug }
  )

  if (!destination) {
    notFound()
  }

  return (
    <article className="destination-detail">
      {destination.mainImage && (
        <div className="destination-detail__hero">
          <Image
            src={urlFor(destination.mainImage).width(1200).height(600).url()}
            alt={destination.name}
            width={1200}
            height={600}
            priority
          />
        </div>
      )}

      <div className="container">
        <header className="destination-detail__header">
          <h1>{destination.name}</h1>
          {destination.description && <p className="lead">{destination.description}</p>}
        </header>

        {destination.content && (
          <div className="destination-detail__content">
            {/* Render content blocks from Sanity */}
            {/* You can use @portabletext/react here */}
          </div>
        )}

        {destination.gallery && destination.gallery.length > 0 && (
          <div className="destination-detail__gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {destination.gallery.map((image: any, index: number) => (
                <div key={index} className="gallery-item">
                  <Image
                    src={urlFor(image).width(400).height(300).url()}
                    alt={`${destination.name} - Image ${index + 1}`}
                    width={400}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
