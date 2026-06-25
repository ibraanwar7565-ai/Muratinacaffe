import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2 } from 'lucide-react';
import { destinations, travelStats } from '../../data/data';
import SectionHeading from '../ui/SectionHeading';
import LazyImage from '../ui/LazyImage';
import Counter from '../ui/Counter';

export default function Destinations() {
  const [active, setActive] = useState(destinations[0]);

  return (
    <section id="destinations" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Where Will You Wake Up?"
          title="Popular Destinations"
          subtitle="From sun-drenched islands to alpine peaks — explore the destinations our guests love most."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          {/* Interactive map */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 glass">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png"
              alt="World map of Aurelia destinations"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain opacity-20 invert light:invert-0 light:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 to-navy-950/40" />

            {destinations.map((d) => (
              <button
                key={d.city}
                onClick={() => setActive(d)}
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={d.city}
              >
                <span className="relative flex h-4 w-4">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                      active.city === d.city ? 'bg-gold-400' : 'bg-gold-400/40'
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white transition-transform ${
                      active.city === d.city ? 'scale-125 bg-gold-400' : 'bg-gold-500'
                    }`}
                  />
                </span>
                <span
                  className={`absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold transition-colors ${
                    active.city === d.city ? 'text-gold-300' : 'text-white/70'
                  }`}
                >
                  {d.city}
                </span>
              </button>
            ))}
          </div>

          {/* Active destination card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.city}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-navy-900/40 light:border-navy-900/10 light:bg-white"
            >
              <div className="h-56 overflow-hidden">
                <LazyImage src={active.image} alt={active.city} className="h-full w-full" />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-2 text-gold-400">
                  <MapPin size={16} />
                  <span className="text-xs font-semibold uppercase tracking-widest">Destination</span>
                </div>
                <h3 className="mt-2 font-serif text-3xl font-semibold text-white light:text-navy-800">
                  {active.city}
                </h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/60 light:text-navy-600">
                  <Building2 size={15} className="text-gold-400" />
                  {active.properties} luxury properties available
                </p>
                <a href="#booking" className="btn-gold mt-6 w-full">
                  Explore {active.city}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic travel statistics */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {travelStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl glass p-8 text-center"
            >
              <div className="font-serif text-5xl font-semibold gold-text">
                <Counter value={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
              </div>
              <p className="mt-2 text-sm uppercase tracking-widest text-white/55 light:text-navy-500">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
