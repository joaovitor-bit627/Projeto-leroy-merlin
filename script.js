const photos = document.querySelectorAll(".photo");
const section = document.querySelector(".sticky-section");
const gallery = document.querySelector('.gallery');
const sticky = document.querySelector('.sticky');
const header = document.querySelector('.sticky .header');
const text = document.querySelector('.sticky .text');

function updateActivePhoto() {
  if (!section || photos.length === 0) return;

  const rect = section.getBoundingClientRect();
  const end = Math.max(rect.height - window.innerHeight, 1);
  let current = Math.min(Math.max(-rect.top, 0), end);
  let progress = current / end;

  if (window.innerWidth <= 720) {
    const stickyStyles = sticky ? window.getComputedStyle(sticky) : null;
    const rowGap = stickyStyles
      ? parseFloat(stickyStyles.rowGap || stickyStyles.gap || '0') || 0
      : 0;
    const startOffset =
      (header?.offsetHeight || 0) +
      (text?.offsetHeight || 0) +
      rowGap * 2;
    const extraDelay = Math.round(window.innerHeight * 3);
    const delayedStart = startOffset + extraDelay;
    const mobileEnd = Math.max(end - delayedStart, 1);

    current = Math.max(current - delayedStart, 0);
    progress = Math.min(current / mobileEnd, 1);
  }

  const index = Math.min(photos.length - 1, Math.floor(progress * photos.length));

  photos.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function setupSectionHeight() {
  if (!section || photos.length === 0) return;

  let mobileOffset = 0;

  if (window.innerWidth <= 720 && gallery && sticky) {
    const stickyStyles = window.getComputedStyle(sticky);
    const padTop = parseFloat(stickyStyles.paddingTop || '0') || 0;
    const padBottom = parseFloat(stickyStyles.paddingBottom || '0') || 0;
    const rowGap =
      parseFloat(stickyStyles.rowGap || stickyStyles.gap || '0') || 0;
    const headerH = header?.offsetHeight || 0;
    const textH = text?.offsetHeight || 0;
    const available =
      window.innerHeight - padTop - padBottom - headerH - textH - rowGap * 2;
    const target = Math.round(window.innerHeight * 0.4);
    const galleryH = Math.max(140, Math.min(target, Math.floor(available)));

    gallery.style.height = `${galleryH}px`;
    const extraDelay = Math.round(window.innerHeight * 3);
    mobileOffset = headerH + textH + rowGap * 2 + extraDelay;
  }

  if (window.innerWidth <= 720) {
    section.style.height = `${photos.length * window.innerHeight + mobileOffset}px`;
  } else {
    section.style.height = `${photos.length * window.innerHeight}px`;
  }

  if (sticky) sticky.style.height = window.innerWidth <= 720 ? 'auto' : '100vh';

  if (gallery && window.innerWidth > 720) {
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


