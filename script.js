const photos = document.querySelectorAll(".photo");
const section = document.querySelector(".sticky-section");

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();
  const scrollProgress =
    (window.innerHeight - rect.top) /
    (rect.height - window.innerHeight);

  const progress = Math.min(Math.max(scrollProgress, 0), 1);

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
