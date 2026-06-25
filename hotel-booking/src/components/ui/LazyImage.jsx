import { useState } from 'react';

/**
 * Lazy-loaded image with a shimmer skeleton placeholder that fades the
 * image in once it has decoded. Native lazy-loading + async decoding.
 */
export default function LazyImage({ src, alt, className = '', imgClassName = '', ...rest }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="shimmer-bg animate-shimmer absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 ${
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md'
        } ${imgClassName}`}
        {...rest}
      />
    </div>
  );
}
