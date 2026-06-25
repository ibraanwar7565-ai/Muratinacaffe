import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';
import { offers } from '../../data/data';
import SectionHeading from '../ui/SectionHeading';
import LazyImage from '../ui/LazyImage';

function useCountdown(targetMs) {
  const [left, setLeft] = useState(targetMs - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(targetMs - Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const clamp = Math.max(left, 0);
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp / 3600000) % 24),
    minutes: Math.floor((clamp / 60000) % 60),
    seconds: Math.floor((clamp / 1000) % 60),
  };
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy-950/60 font-serif text-3xl font-semibold text-gold-300 backdrop-blur sm:h-20 sm:w-20 sm:text-4xl">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-widest text-white/60">{label}</span>
    </div>
  );
}

export default function SpecialOffers() {
  // Countdown to 7 days from first render.
  const [target] = useState(() => Date.now() + 7 * 86400000 + 13 * 3600000);
  const t = useCountdown(target);

  return (
    <section id="offers" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Limited-Time Deals"
          title="Exclusive Special Offers"
          subtitle="Seasonal escapes and curated packages — reserved for a limited time only."
        />

        {/* Countdown banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 overflow-hidden rounded-3xl border border-gold-400/20"
        >
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-900/60" />
          <div className="relative flex flex-col items-center gap-8 p-10 text-center sm:p-14 lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-md">
              <span className="eyebrow justify-center text-gold-400 lg:justify-start">
                <Clock size={14} /> Flash Sale Ends In
              </span>
              <h3 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
                Save up to <span className="gold-text">40%</span>
              </h3>
              <p className="mt-3 text-white/70">
                On luxury suites & villas across all signature destinations. Book before the timer runs out.
              </p>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <TimeBox value={t.days} label="Days" />
              <TimeBox value={t.hours} label="Hours" />
              <TimeBox value={t.minutes} label="Mins" />
              <TimeBox value={t.seconds} label="Secs" />
            </div>
          </div>
        </motion.div>

        {/* Promotional banners */}
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative h-72 overflow-hidden rounded-3xl"
            >
              <LazyImage
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 h-full w-full"
                imgClassName="transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <span className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-950">
                <Tag size={11} /> {offer.badge}
              </span>
              <div className="absolute bottom-0 p-7">
                <h3 className="font-serif text-3xl font-semibold text-white">{offer.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-white/70">{offer.text}</p>
                <a href="#booking" className="btn-gold mt-5">
                  Claim Offer
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
