import { Star } from 'lucide-react';

export default function StarRating({ rating = 5, size = 14, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(rating)
              ? 'fill-gold-400 text-gold-400'
              : 'fill-transparent text-white/25'
          }
        />
      ))}
    </div>
  );
}
