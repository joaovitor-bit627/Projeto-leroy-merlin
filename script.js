const photos = document.querySelectorAll('.photo');
const section = document.querySelector('.sticky-section');
const gallery = document.querySelector('.gallery');

// Detectar se é mobile
const isMobile = () => window.innerWidth <= 720;

// --- Desktop: efeito controlado pelo scroll ---
// Scroll handler (desktop + mobile)
window.addEventListener('scroll', () => {
  if (!section) return;

  const start = section.offsetTop;
  const end = start + section.offsetHeight - window.innerHeight;
  const scroll = window.scrollY;

  // se estiver fora da área, não atualizar
  if (scroll < start || scroll > end) return;

  const progress = (scroll - start) / (end - start);
  const index = Math.min(photos.length - 1, Math.floor(progress * photos.length));

  photos.forEach((photo, i) => photo.classList.toggle('active', i === index));
});

// Funções para configurar layout mobile que permite scroll-driven photos
function applyMobileLayout() {
  if (!isMobile() || !section) return;
  // dar à seção uma altura proporcional ao número de fotos (N * 100vh)
  section.style.height = `${photos.length * window.innerHeight}px`;

  const stickyEl = document.querySelector('.sticky');
  if (stickyEl) {
    stickyEl.style.position = 'sticky';
    stickyEl.style.top = '0';
    stickyEl.style.height = '100vh';
  }
  if (gallery) gallery.style.height = `${window.innerHeight}px`;
}

function removeMobileLayout() {
  if (!section) return;
  section.style.height = '';
  const stickyEl = document.querySelector('.sticky');
  if (stickyEl) {
    stickyEl.style.position = '';
    stickyEl.style.top = '';
    stickyEl.style.height = '';
  }
  if (gallery) gallery.style.height = '';
}

// Aplicar no load
if (isMobile()) applyMobileLayout();

// Garantir que a primeira foto esteja visível por padrão
if (photos.length) {
  photos.forEach(p => p.classList.remove('active'));
  photos[0].classList.add('active');
}

// Manter reload no resize para simplificar mudanças entre layouts
window.addEventListener('resize', () => {
  if (isMobile()) applyMobileLayout(); else removeMobileLayout();
});

// --- Botão voltar ao topo (observer) ---
const backIntro = document.getElementById('backIntro');
const introSection = document.getElementById('intro');

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      backIntro.classList.add('hidden');
    } else {
      backIntro.classList.remove('hidden');
    }
  },
  { threshold: 0.4 }
);

observer.observe(introSection);
