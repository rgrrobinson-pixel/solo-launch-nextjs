import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface Itinerary {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: any
  duration?: number
  price?: number
  featured?: boolean
}

export default async function ItinerariesPage() {
  const itineraries = await client.fetch<Itinerary[]>(`
    *[_type == "itinerary"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      duration,
      price,
      featured
    }
  `)

  return (
    <div className="itineraries">
      <div className="container">
        <header className="itineraries__header">
          <h1>Our Itineraries & Tours</h1>
          <p>Discover carefully curated journeys and experiences</p>
        </header>

        <div className="itineraries__grid">
          {itineraries.map((itinerary) => (
            <Link
              key={itinerary._id}
              href={`/itineraries/${itinerary.slug.current}`}
              className="itinerary-card"
            >
              {itinerary.mainImage && (
                <div className="itinerary-card__image">
                  <Image
                    src={urlFor(itinerary.mainImage).width(600).height(400).url()}
                    alt={itinerary.title}
                    width={600}
                    height={400}
                  />
                </div>
              )}
              <div className="itinerary-card__content">
                <h2>{itinerary.title}</h2>
                {itinerary.excerpt && <p>{itinerary.excerpt}</p>}
                <div className="itinerary-card__meta">
                  {itinerary.duration && (
                    <span className="duration">{itinerary.duration} days</span>
                  )}
                  {itinerary.price && (
                    <span className="price">From ${itinerary.price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
