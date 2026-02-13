/**
 * Timeline navigation — tracks active section and updates
 * both the desktop sidebar and mobile bottom bar.
 */
export function initTimelineNav() {
  const sections = document.querySelectorAll('.section[id]');
  const desktopLinks = document.querySelectorAll('.timeline-nav__link');
  const mobileDots = document.querySelectorAll('.timeline-mobile__dot');

  if (!sections.length) return;

  // Track which section is currently active
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        setActive(id);
      }
    });
  }, {
    root: null,
    rootMargin: '-30% 0px -30% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));

  function setActive(id) {
    // Desktop nav
    desktopLinks.forEach(link => {
      link.classList.toggle('is-active', link.dataset.section === id);
    });

    // Mobile nav
    mobileDots.forEach(dot => {
      dot.classList.toggle('is-active', dot.dataset.target === id);
    });
  }

  // Mobile dot click handlers
  mobileDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
