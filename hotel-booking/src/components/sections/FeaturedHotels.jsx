import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { featuredHotels } from '../../data/data';
import SectionHeading from '../ui/SectionHeading';
import LazyImage from '../ui/LazyImage';

export default function FeaturedHotels() {
  return (
    <section id="hotels" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="Handpicked Stays"
            title="Featured Hotels & Resorts"
            subtitle="A collection of extraordinary properties, each chosen for its impeccable service, design and unforgettable settings."
          />
          <a href="#booking" className="btn-ghost shrink-0">
            View All <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredHotels.map((hotel, i) => (
            <motion.article
              key={hotel.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
              className="group card-hover relative overflow-hidden rounded-3xl border border-white/10 bg-navy-900/40 light:border-navy-900/10 light:bg-white"
            >
              <div className="relative h-64 overflow-hidden">
                <LazyImage
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-gold-400/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-950 backdrop-blur">
                  {hotel.tag}
                </span>
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-navy-950/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Star size={12} className="fill-gold-400 text-gold-400" />
                  {hotel.rating}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-white/55 light:text-navy-500">
                  <MapPin size={13} className="text-gold-400" />
                  {hotel.location}
                </div>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-white transition-colors group-hover:text-gold-300 light:text-navy-800">
                  {hotel.name}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {hotel.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/65 light:border-navy-900/10 light:text-navy-600"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 light:border-navy-900/10">
                  <div>
                    <span className="font-serif text-2xl font-semibold text-gold-300">
                      ${hotel.price}
                    </span>
                    <span className="text-xs text-white/50 light:text-navy-500"> / night</span>
                    <p className="text-[11px] text-white/40 light:text-navy-400">
                      {hotel.reviews.toLocaleString()} reviews
                    </p>
                  </div>
                  <a
                    href="#booking"
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-gold-400 hover:text-navy-950 light:bg-navy-900/5 light:text-navy-700"
                  >
                    Book Now <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
