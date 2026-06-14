window.addEventListener('DOMContentLoaded', () => {
  const typewriterText = document.getElementById('typewriter-text');
  const textToType = 'Welcome to my Portfolio!';
  let charIndex = 0;

  function typeText() {
    if (!typewriterText) return;

    if (charIndex < textToType.length) {
      typewriterText.textContent += textToType[charIndex];
      charIndex++;
      setTimeout(typeText, 100);
    } else {
      setTimeout(() => {
        charIndex = 0;
        typewriterText.textContent = '';
        typeText();
      }, 2000);
    }
  }

  typeText();

  const hireMeButton = document.getElementById('hire-me-button');
  if (hireMeButton) {
    hireMeButton.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'Priyadharshini.S_Resume.pdf';
      link.download = 'Priyadharshini.S_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const revealItems = document.querySelectorAll(
    '.skill-pill, .project-card, .resume-item, .edu-item'
  );

  revealItems.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 6) * 90}ms`;
  });

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealItems.forEach((el) => {
      if (el.classList.contains('is-visible')) return;
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) el.classList.add('is-visible');
    });
  };

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('resize', revealOnScroll);

  // Also use IntersectionObserver when available (more reliable + efficient)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    revealItems.forEach((el) => observer.observe(el));
  }

  revealOnScroll();
});
