/**
 * SVG stroke-draw animations and bar chart fill animations,
 * both triggered by IntersectionObserver on scroll.
 */
export function initSvgAnimations() {
  initStrokeDraws();
  initBarCharts();
  initOilFires();
}

function initStrokeDraws() {
  const paths = document.querySelectorAll('.svg-draw');

  if (!paths.length) return;

  // Compute and set actual path lengths
  paths.forEach(path => {
    try {
      const length = path.getTotalLength();
      path.style.setProperty('--path-length', length);
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    } catch (e) {
      // Fallback for non-path SVG elements
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  });

  paths.forEach(path => observer.observe(path));
}

function initBarCharts() {
  const bars = document.querySelectorAll('.bar-chart__fill[data-width]');

  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.dataset.width;
        entry.target.style.width = targetWidth;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  bars.forEach(bar => observer.observe(bar));
}

function initOilFires() {
  const fires = document.querySelectorAll('.oil-fire');

  if (!fires.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  });

  fires.forEach(fire => observer.observe(fire));
}
