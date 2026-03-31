/* eslint-disable */
'use strict';

// ================================
// PAGE NAVIGATION (SPA-Style)
// ================================

const pages    = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');
const header   = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

function showPage(pageId) {
  // Hide all pages
  pages.forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
  }

  // Update nav active state
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile menu
  navLinksContainer.classList.remove('open');
  hamburger.classList.remove('open');

  // Trigger skill bar animation if on skills page
  if (pageId === 'skills') {
    animateProgressBars();
  }
}

// Handle all [data-page] link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-page]');
  if (link) {
    e.preventDefault();
    const targetPage = link.dataset.page;
    if (targetPage) showPage(targetPage);
  }
});

// Inline anchor links from hero buttons
document.getElementById('contactNavBtn').addEventListener('click', (e) => {
  e.preventDefault();
  showPage('contact');
});
document.getElementById('aboutNavBtn').addEventListener('click', (e) => {
  e.preventDefault();
  showPage('about');
});

// ================================
// HAMBURGER MENU
// ================================

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (
    !navLinksContainer.contains(e.target) &&
    !hamburger.contains(e.target) &&
    navLinksContainer.classList.contains('open')
  ) {
    navLinksContainer.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// ================================
// HEADER SCROLL SHADOW
// ================================

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ================================
// TYPING EFFECT (Home Hero)
// ================================

const typingEl = document.getElementById('typing');
const texts = [
  'Frontend Developer',
  'UI / UX Enthusiast',
  'Future Tech Leader',
  'Open to Collaboration',
];

let textIdx = 0, charIdx = 0, deleting = false;

function typeEffect() {
  const current = texts[textIdx];

  if (deleting) {
    charIdx--;
  } else {
    charIdx++;
  }

  typingEl.textContent = current.slice(0, charIdx);

  let delay = deleting ? 45 : 95;

  if (!deleting && charIdx === current.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    textIdx = (textIdx + 1) % texts.length;
    delay = 300;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

// ================================
// SKILL PROGRESS BARS
// ================================

function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar');
  // Reset first
  bars.forEach(bar => { bar.style.width = '0'; });
  // Animate with a slight delay
  setTimeout(() => {
    bars.forEach(bar => {
      const target = bar.getAttribute('data-width');
      bar.style.width = target;
    });
  }, 150);
}

// ================================
// CONTACT FORM
// ================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate send (replace with actual API call if needed)
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      formSuccess.classList.add('visible');
      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        formSuccess.classList.remove('visible');
      }, 4000);
    }, 1200);
  });
}

// ================================
// FOOTER QUICK LINKS (duplicate for footer)
// ================================
// Already handled by the global [data-page] delegation above.

// ================================
// SMOOTH PAGE ENTRY ANIMATION
// ================================

// Observe added class 'active' and trigger content fade-in
const pageObserver = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    if (m.type === 'attributes' && m.attributeName === 'class') {
      const el = m.target;
      if (el.classList.contains('active')) {
        el.style.animation = 'pageFadeIn 0.4s ease forwards';
      }
    }
  });
});

pages.forEach(p => pageObserver.observe(p, { attributes: true }));

// Inject keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pageFadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ================================
// INIT: Show home page on load
// ================================

showPage('home');