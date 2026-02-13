const photos = document.querySelectorAll(".photo");
const section = document.querySelector(".sticky-section");
const gallery = document.querySelector('.gallery');
const sticky = document.querySelector('.sticky');
const header = document.querySelector('.sticky .header');
const text = document.querySelector('.sticky .text');
const MOBILE_SCROLL_DELAY_RATIO = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateActivePhoto() {
  if (!section || photos.length === 0) return;

  const rect = section.getBoundingClientRect();
  const sectionStartY = window.scrollY + rect.top;
  const sectionHeight = section.offsetHeight || rect.height;
  const end = Math.max(sectionHeight - window.innerHeight, 1);
  const current = clamp(window.scrollY - sectionStartY, 0, end);
  let progress = current / end;

  if (window.innerWidth <= 720 && gallery) {
    const stickyStyles = sticky ? window.getComputedStyle(sticky) : null;
    const stickyTop = stickyStyles
      ? parseFloat(stickyStyles.top || '0') || 0
      : 0;
    const extraDelay = Math.round(window.innerHeight * MOBILE_SCROLL_DELAY_RATIO);
    const startOffset = Math.max(-stickyTop, 0) + extraDelay;
    const mobileRange = Math.max(end - startOffset, 1);
    const mobileCurrent = clamp(current - startOffset, 0, mobileRange);
    progress = mobileCurrent / mobileRange;
  }

  const index = Math.min(photos.length - 1, Math.floor(progress * photos.length));

  photos.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function setupSectionHeight() {
  if (!section || photos.length === 0) return;

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
    // Start pinning when gallery reaches the center of the viewport.
    const galleryCenterInSticky = gallery.offsetTop + galleryH / 2;
    const desiredTop = Math.round(window.innerHeight / 2 - galleryCenterInSticky);
    const minTop = -Math.round(window.innerHeight * 0.45);
    const mobileTop = clamp(desiredTop, minTop, 0);
    sticky.style.top = `${mobileTop}px`;
    sticky.style.height = 'auto';

    const extraDelay = Math.round(window.innerHeight * MOBILE_SCROLL_DELAY_RATIO);
    const startOffset = Math.max(-mobileTop, 0) + extraDelay;
    section.style.height = `${photos.length * window.innerHeight + startOffset}px`;
  } else {
    section.style.height = `${photos.length * window.innerHeight}px`;
    if (sticky) {
      sticky.style.top = '0';
      sticky.style.height = '100vh';
    }
  }

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
