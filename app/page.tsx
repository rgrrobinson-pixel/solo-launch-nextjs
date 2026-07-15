import { getSiteContent, computeAggregateRating } from '@/lib/getContent';
import { buildJsonLd } from '@/lib/jsonLd';
import { resolveImageUrl } from '@/lib/resolveImage';
import { Stars } from '@/components/Stars';
import { AboutBody } from '@/components/AboutBody';
import { PortableText } from '@portabletext/react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

// Force dynamic so Sanity edits appear immediately without redeploy
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function whatsappHref(num?: string) {
  if (!num) return undefined;
  const digits = num.replace(/[^0-9]/g, '');
  return digits ? `https://wa.me/${digits}` : undefined;
}

export default async function HomePage() {
  const { content, usingSampleContent } = await getSiteContent();
  const {
    settings,
    hero,
    about,
    services,
    faqs,
    reviews,
    gallery,
    destinationsGallery,
    tourPackages,
  } = content;

  const { count, average } = computeAggregateRating(reviews);
  const waHref = whatsappHref(settings.whatsappNumber);

  const heroImageUrl = hero.heroImage
    ? resolveImageUrl(hero.heroImage, 1600)
    : null;

  const jsonLd = buildJsonLd({ settings, hero, about, reviews, count, average, siteUrl: SITE_URL });

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sample content banner */}
      {usingSampleContent && (
        <div className="sample-banner">
          <strong>Demo mode:</strong> Connect your Sanity project to replace this sample content.
        </div>
      )}

      {/* ── HERO ── */}
      <section
        id="hero"
        className="hero"
        style={heroImageUrl ? { backgroundImage: `url(${heroImageUrl})` } : undefined}
      >
        <div className="hero__overlay" />
        <div className="container hero__inner">
          <h1 className="hero__heading">{hero.headline ?? settings.businessName}</h1>
          {hero.subheadline && (
            <p className="hero__sub">{hero.subheadline}</p>
          )}
          <div className="hero__ctas">
            {hero.ctaLabel && hero.ctaHref && (
              <a href={hero.ctaHref} className="btn btn--primary">
                {hero.ctaLabel}
              </a>
            )}
            {waHref && (
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
                WhatsApp Us
              </a>
            )}
          </div>
          {count > 0 && (
            <div className="hero__rating">
              <Stars rating={average} />
              <span>{average.toFixed(1)} ({count} reviews)</span>
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT ── */}
      {about && (
        <section id="about">
          <AboutBody section={about} />
        </section>
      )}

      {/* ── SERVICES / PACKAGES ── */}
      {services && services.length > 0 && (
        <section id="packages" className="section">
          <div className="container">
            <h2 className="section__heading">{settings.servicesHeading ?? 'Our Tours'}</h2>
            <div className="cards">
              {services.map((s: any) => (
                <div key={s._id} className="card">
                  {s.image && (
                    <img
                      src={resolveImageUrl(s.image, 600) ?? ''}
                      alt={s.title}
                      className="card__img"
                    />
                  )}
                  <div className="card__body">
                    <h3 className="card__title">{s.title}</h3>
                    {s.description && (
                      <div className="card__text">
                        <PortableText value={s.description} />
                      </div>
                    )}
                    {s.price && (
                      <p className="card__price">{s.price}</p>
                    )}
                    {waHref && (
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
                        Enquire
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DESTINATIONS GALLERY ── */}
      {destinationsGallery?.photos && destinationsGallery.photos.length > 0 && (
        <section id="destinations" className="section section--alt">
          <div className="container">
            <h2 className="section__heading">
              {destinationsGallery.heading ?? 'Destinations'}
            </h2>
            <div className="gallery">
              {destinationsGallery.photos.map((p: any) => {
                const url = resolveImageUrl(p, 800);
                return url ? (
                  <figure key={p._key} className="gallery__item">
                    <img src={url} alt={p.caption ?? ''} className="gallery__img" />
                    {p.caption && <figcaption>{p.caption}</figcaption>}
                  </figure>
                ) : null;
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── REVIEWS ── */}
      {reviews && reviews.length > 0 && (
        <section id="reviews" className="section">
          <div className="container">
            <h2 className="section__heading">What Our Guests Say</h2>
            {count > 0 && (
              <p className="reviews__aggregate">
                <Stars rating={average} /> {average.toFixed(1)} average from {count} reviews
              </p>
            )}
            <div className="reviews">
              {reviews.map((r: any) => (
                <div key={r._id} className="review">
                  <Stars rating={r.rating ?? 5} />
                  <blockquote className="review__text">{r.body}</blockquote>
                  <cite className="review__author">
                    {r.author}{r.location ? `, ${r.location}` : ''}
                  </cite>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faqs && faqs.length > 0 && (
        <section id="faq" className="section section--alt">
          <div className="container">
            <h2 className="section__heading">Frequently Asked Questions</h2>
            <dl className="faqs">
              {faqs.map((f: any) => (
                <div key={f._id} className="faq">
                  <dt className="faq__q">{f.question}</dt>
                  <dd className="faq__a">
                    {f.answer && <PortableText value={f.answer} />}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="section">
        <div className="container contact">
          <h2 className="section__heading">Get in Touch</h2>
          <p>
            Ready to start planning? Reach out and we&apos;ll get back to you quickly.
          </p>
          <div className="contact__actions">
            {waHref && (
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                WhatsApp
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="btn btn--secondary">
                Email Us
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
