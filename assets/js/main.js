/* Logvinenko Atelier — progressive enhancement only.
   The page is fully usable with JavaScript disabled. */
(function () {
  'use strict';

  /* Footer year */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Shadow under the sticky header once the page scrolls */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Reveal sections as they enter the viewport */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* FAQ: keep one answer open at a time */
  var faq = document.querySelectorAll('.faq details');
  faq.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faq.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  /* Waitlist form: honeypot + inline feedback.
     Point action= at Formspree, Tally, Buttondown or your own endpoint. */
  var form = document.querySelector('[data-waitlist]');
  if (form) {
    var status = form.querySelector('.form__status');
    form.addEventListener('submit', function (event) {
      var honeypot = form.querySelector('.hp input');
      if (honeypot && honeypot.value) { event.preventDefault(); return; }

      var action = form.getAttribute('action') || '';
      if (action.indexOf('[') === 0 || action === '') {
        event.preventDefault();
        if (status) status.textContent = 'Form endpoint is not configured yet — set action= in index.html.';
        return;
      }

      if (status) status.textContent = 'Sending…';
    });
  }
})();
