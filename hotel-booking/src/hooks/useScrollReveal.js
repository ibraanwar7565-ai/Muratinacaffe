import { useEffect } from 'react';

/**
 * Lightweight scroll-reveal — adds `.in-view` to any element with the
 * `.reveal` or `.img-reveal` class once it enters the viewport.
 * An AOS-style effect without an extra dependency.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .img-reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
