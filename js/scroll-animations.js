/**
 * Scroll-triggered reveal animations using IntersectionObserver.
 * Elements with [data-animate] fade/slide in when scrolled into view.
 */
export function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // If this is a stagger container, also reveal children
        if (entry.target.hasAttribute('data-animate-stagger')) {
          const children = entry.target.children;
          for (let i = 0; i < children.length; i++) {
            children[i].classList.add('is-visible');
          }
        }

        // One-time animation: stop observing
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}
