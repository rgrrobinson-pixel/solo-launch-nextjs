import Image from 'next/image';
import { urlForImage } from '@/lib/image';

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  image?: any;
  rating?: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export default function Testimonials({ 
  testimonials, 
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it"
}: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-neutral-600">{subtitle}</p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial._id}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating! 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-neutral-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              )}

              {/* Content */}
              <blockquote className="text-neutral-700 mb-6">
                <p className="leading-relaxed">{testimonial.content}</p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {testimonial.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={urlForImage(testimonial.image).url()}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  {(testimonial.role || testimonial.company) && (
                    <div className="text-sm text-neutral-600">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ', '}
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
