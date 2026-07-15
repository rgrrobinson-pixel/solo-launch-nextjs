import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface Destination {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  mainImage?: any
  featured?: boolean
}

export default async function DestinationsPage() {
  const destinations = await client.fetch<Destination[]>(`
    *[_type == "destination"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      mainImage,
      featured
    }
  `)

  return (
    <div className="destinations">
      <div className="container">
        <header className="destinations__header">
          <h1>Explore Our Destinations</h1>
          <p>Discover the beautiful places you can visit with us</p>
        </header>

        <div className="destinations__grid">
          {destinations.map((destination) => (
            <Link
              key={destination._id}
              href={`/destinations/${destination.slug.current}`}
              className="destination-card"
            >
              {destination.mainImage && (
                <div className="destination-card__image">
                  <Image
                    src={urlFor(destination.mainImage).width(600).height(400).url()}
                    alt={destination.name}
                    width={600}
                    height={400}
                  />
                </div>
              )}
              <div className="destination-card__content">
                <h2>{destination.name}</h2>
                {destination.description && (
                  <p>{destination.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
