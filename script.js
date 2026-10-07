// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');

  // Animate hamburger icon
  const spans = mobileMenuBtn.querySelectorAll('span');
  if (mobileMenu.classList.contains('hidden')) {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  } else {
    spans[0].style.transform = 'rotate(45deg) translateY(12px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
  }
});

// Close menu when a link is clicked
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ===== Navigation Active State =====
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-80px 0px 0px 0px',
};

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// ===== Scroll Animation for Elements =====
const fadeElements = document.querySelectorAll('.fade-in-up, .skill-card, .project-card');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      scrollObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
});

fadeElements.forEach(element => {
  scrollObserver.observe(element);
});

// ===== Project Filter =====
const filterButtons = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => {
      btn.classList.remove('border-brand-600', 'text-brand-600', 'bg-brand-50');
      btn.classList.add('border-gray-300', 'text-gray-600');
    });
    button.classList.remove('border-gray-300', 'text-gray-600');
    button.classList.add('border-brand-600', 'text-brand-600');

    const filterValue = button.getAttribute('data-filter');

    // Filter projects
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      if (filterValue === 'all' || cardCategory === filterValue) {
        card.classList.remove('hidden');
        card.classList.add('visible');
        card.style.display = 'block';
      } else {
        card.classList.remove('visible');
        card.classList.add('hidden');
        card.style.display = 'none';
      }
    });
  });
});

// ===== Smooth Scroll with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  // Trigger fade-in animations on load
  fadeElements.forEach((element, index) => {
    if (element.classList.contains('fade-in-up')) {
      element.style.opacity = '0';
      const delay = index * 0.1;
      setTimeout(() => {
        element.style.animation = `fadeInUp 0.8s ease-out ${delay}s forwards`;
        element.style.opacity = '1';
      }, 0);
    }
  });
});

// Log initialization
console.log('김모양 포트폴리오 웹사이트가 로드되었습니다 ✨');
