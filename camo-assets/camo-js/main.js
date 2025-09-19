document.addEventListener('DOMContentLoaded', () => {
  const BREAKPOINT = 1010;
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('primary-nav'); // has class nav-links
  const scrim     = document.getElementById('drawer-scrim');

  if (!hamburger || !drawer || !scrim) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    scrim.hidden = false;
    document.body.classList.add('menu-open');
    // focus first link
    const first = drawer.querySelector('a, button');
    if (first) first.focus({preventScroll:true});
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    scrim.hidden = true;
    document.body.classList.remove('menu-open');
    hamburger.focus({preventScroll:true});
  };

  const isOpen = () => drawer.classList.contains('active');

  // toggle
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen() ? closeDrawer() : openDrawer();
  });

  // scrim click closes
  scrim.addEventListener('click', closeDrawer);

  // click outside drawer closes
  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (!drawer.contains(e.target) && e.target !== hamburger) closeDrawer();
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeDrawer();
  });

  // close when a nav link is clicked (nice on mobile)
  drawer.addEventListener('click', (e) => {
    const t = e.target;
    if (t.matches('a') && isOpen()) closeDrawer();
  });

  // reset on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > BREAKPOINT && isOpen()) closeDrawer();
  });

  // Services dropdown inside drawer (tap to open)
  const servicesDropdown = document.getElementById('services-dropdown');
  if (servicesDropdown) {
    const trigger = servicesDropdown.querySelector('.services-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        servicesDropdown.classList.toggle('open');
        trigger.setAttribute('aria-expanded', servicesDropdown.classList.contains('open'));
      });
      // optional: close submenu when clicking elsewhere inside drawer
      drawer.addEventListener('click', (e) => {
        if (!servicesDropdown.contains(e.target) && servicesDropdown.classList.contains('open')) {
          servicesDropdown.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.getElementById('services-dropdown');
  const trigger  = dropdown.querySelector('.services-trigger');

  if (dropdown && trigger) {
    // toggle open/close on click
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', dropdown.classList.contains('open'));
    });

    // close when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // optional: close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  }
  });