const photos = document.querySelectorAll(".photo");
const section = document.querySelector(".sticky-section");

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();

  const start = 0;
  const end = rect.height - window.innerHeight;

  const current = Math.min(
    Math.max(-rect.top, start),
    end
  );

  const progress = current / end;

  const index = Math.min(
    photos.length - 1,
    Math.floor(progress * photos.length)
  );

  photos.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
});




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
