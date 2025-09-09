// Small helpers
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const navBtn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('show');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
});
