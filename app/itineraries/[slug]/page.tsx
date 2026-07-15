import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { notFound } from 'next/navigation'

interface Day {
  dayNumber: number
  title: string
  description?: string
  activities?: string[]
}

interface Itinerary {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  description?: string
  mainImage?: any
  gallery?: any[]
  duration?: number
  price?: number
  included?: string[]
  excluded?: string[]
  days?: Day[]
  featured?: boolean
}

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const itineraries = await client.fetch<{ slug: { current: string } }[]>(`
    *[_type == "itinerary"] {
      slug
    }
  `)

  return itineraries.map((itinerary) => ({
    slug: itinerary.slug.current,
  }))
}

export default async function ItineraryPage({ params }: Props) {
  const itinerary = await client.fetch<Itinerary>(
    `
    *[_type == "itinerary" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      description,
      mainImage,
      gallery,
      duration,
      price,
      included,
      excluded,
      days,
      featured
    }
  `,
    { slug: params.slug }
  )

  if (!itinerary) {
    notFound()
  }

  return (
    <article className="itinerary-detail">
      {itinerary.mainImage && (
        <div className="itinerary-detail__hero">
          <Image
            src={urlFor(itinerary.mainImage).width(1200).height(600).url()}
            alt={itinerary.title}
            width={1200}
            height={600}
            priority
          />
        </div>
      )}

      <div className="container">
        <header className="itinerary-detail__header">
          <h1>{itinerary.title}</h1>
          {itinerary.excerpt && <p className="lead">{itinerary.excerpt}</p>}
          
          <div className="itinerary-detail__meta">
            {itinerary.duration && (
              <span className="duration">{itinerary.duration} days</span>
            )}
            {itinerary.price && (
              <span className="price">From ${itinerary.price}</span>
            )}
          </div>
        </header>

        {itinerary.description && (
          <div className="itinerary-detail__description">
            <p>{itinerary.description}</p>
          </div>
        )}

        {itinerary.days && itinerary.days.length > 0 && (
          <section className="itinerary-detail__days">
            <h2>Day by Day Itinerary</h2>
            <div className="days-list">
              {itinerary.days.map((day) => (
                <div key={day.dayNumber} className="day-item">
                  <div className="day-number">Day {day.dayNumber}</div>
                  <div className="day-content">
                    <h3>{day.title}</h3>
                    {day.description && <p>{day.description}</p>}
                    {day.activities && day.activities.length > 0 && (
                      <ul className="activities">
                        {day.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="itinerary-detail__inclusions">
          {itinerary.included && itinerary.included.length > 0 && (
            <div className="included">
              <h3>What's Included</h3>
              <ul>
                {itinerary.included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {itinerary.excluded && itinerary.excluded.length > 0 && (
            <div className="excluded">
              <h3>What's Not Included</h3>
              <ul>
                {itinerary.excluded.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {itinerary.gallery && itinerary.gallery.length > 0 && (
          <div className="itinerary-detail__gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {itinerary.gallery.map((image: any, index: number) => (
                <div key={index} className="gallery-item">
                  <Image
                    src={urlFor(image).width(400).height(300).url()}
                    alt={`${itinerary.title} - Image ${index + 1}`}
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
