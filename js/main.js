import { initScrollAnimations } from './scroll-animations.js';
import { initTimelineNav } from './timeline-nav.js';
import { initCounters } from './counters.js';
import { initSvgAnimations } from './svg-animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initTimelineNav();
  initCounters();
  initSvgAnimations();
});
