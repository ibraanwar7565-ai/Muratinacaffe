import { Quote } from 'lucide-react';
import { reviews } from '../../data/data';
import SectionHeading from '../ui/SectionHeading';
import StarRating from '../ui/StarRating';
import LazyImage from '../ui/LazyImage';

function ReviewCard({ r }) {
  return (
    <figure className="mx-3 flex w-[340px] shrink-0 flex-col rounded-3xl glass p-7 sm:w-[400px]">
      <Quote size={32} className="text-gold-400/50" />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/80 light:text-navy-700">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5 light:border-navy-900/10">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <LazyImage src={r.avatar} alt={r.name} className="h-full w-full" />
        </div>
        <div>
          <p className="font-semibold text-white light:text-navy-800">{r.name}</p>
          <p className="text-xs text-white/50 light:text-navy-500">{r.place}</p>
        </div>
        <div className="ml-auto">
          <StarRating rating={r.rating} />
        </div>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Guest Stories"
          title="Loved by Travellers Worldwide"
          subtitle="Real words from real guests who've experienced the Aurelia difference."
        />
      </div>

      <div className="group relative mt-14">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent light:from-[#f4f5fb]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent light:from-[#f4f5fb]" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
