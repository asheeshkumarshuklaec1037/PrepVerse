import { useEffect } from 'react';

/**
 * Custom hook providing automatic IntersectionObserver scroll reveal
 * matching Django template's base.css lines 240-259 & dashboard.html lines 2130-2145
 */
export const useScrollReveal = (dependency?: any) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      // Check if element is already within viewport height when component mounts
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('in');
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [dependency]);
};
