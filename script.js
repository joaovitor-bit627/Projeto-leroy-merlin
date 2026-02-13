const photos = document.querySelectorAll(".photo");
const section = document.querySelector(".sticky-section");
const gallery = document.querySelector('.gallery');

function updateActivePhoto() {
  if (!section || photos.length === 0) return;
  const rect = section.getBoundingClientRect();
  const end = Math.max(rect.height - window.innerHeight, 1);
  const current = Math.min(Math.max(-rect.top, 0), end);
  const progress = current / end;
  const index = Math.min(photos.length - 1, Math.floor(progress * photos.length));

  photos.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function setupSectionHeight() {
  if (!section || photos.length === 0) return;

  section.style.height = `${photos.length * window.innerHeight}px`;

  const stickyEl = document.querySelector('.sticky');
  if (stickyEl) stickyEl.style.height = window.innerWidth <= 720 ? 'auto' : '100vh';

  if (gallery) {
    const ratio = window.innerWidth <= 720 ? 0.48 : 0.6;
    gallery.style.height = `${Math.round(window.innerHeight * ratio)}px`;
  }

  updateActivePhoto();
}

// run on load and resize
window.addEventListener('load', setupSectionHeight);
window.addEventListener('resize', setupSectionHeight);
window.addEventListener("scroll", updateActivePhoto);




const backIntro = document.getElementById("backIntro");
const introSection = document.getElementById("intro");

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      backIntro.classList.add("hidden");
    } else {
      backIntro.classList.remove("hidden");
    }
  },
  { threshold: 0.4 }
);

observer.observe(introSection);


