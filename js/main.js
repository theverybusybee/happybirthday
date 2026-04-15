document.addEventListener('DOMContentLoaded', () => {
  initEnvelope();
  initMusicButton();
  initFloatingHearts();
  initBirthdayTypewriter();
  initAgeCounter();
  initHobbyIcons();
  initStars();
  initWishButton();
  initMoleculeCanvas();
  initPeelSticker();
  initGSAPAnimations();
  initDotNav();
  initFloatingCompliments();
});

/* ===== PEEL STICKER ===== */
function initPeelSticker() {
  const el = document.getElementById('peelSticker');
  if (!el || typeof Peel === 'undefined') return;

  let initialized = false;

  function createPeel() {
    if (initialized) return;
    initialized = true;

    var peel = new Peel('#peelSticker', {
      topShadow: true,
      topShadowBlur: 10,
      backReflection: true,
      backShadow: true
    });

    peel.setCorner(Peel.Corners.TOP_RIGHT);

    peel.handleDrag(function(evt, x, y) {
      peel.setPeelPosition(x, y);

      if (peel.getAmountClipped() > 0.85) {
        // Fully peel off, then lock
        peel.removeEvents();
        peel.setPeelPosition(-el.offsetWidth, -el.offsetHeight);
        el.style.cursor = 'default';
        el.style.pointerEvents = 'none';
      }
    });

    peel.setFadeThreshold(0.95);
  }

  // Lazy init: wait until section is in view
  const section = el.closest('.snap-section');
  const observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      createPeel();
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(section || el);
}

/* ===== GSAP + SCROLLTRIGGER SETUP ===== */
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const scroller = '.snap-container';

  ScrollTrigger.defaults({
    scroller: scroller
  });

  // Refresh ScrollTrigger after layout settles
  ScrollTrigger.refresh();

  initHeroAnimations();
  initWordsAnimations();
  initPhotoStoryAnimations();
  initHobbyAnimations();
  initAstronomyParallax();
  initLittleYouAnimations();
  initPeelAnimations();
  initFinaleAnimations();
  initSectionTransitions();

  // Re-refresh after all triggers are created
  setTimeout(() => ScrollTrigger.refresh(), 100);
}

/* ===== HERO ANIMATIONS ===== */
function initHeroAnimations() {
  const title = document.querySelector('.hero-title');
  if (title) {
    // Split title into individual characters for typewriter effect
    const text = title.textContent;
    title.innerHTML = '';
    title.style.opacity = '1';
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.classList.add('hero-char');
      title.appendChild(span);
    });

    gsap.to('.hero-char', {
      opacity: 1,
      duration: 0.06,
      stagger: 0.07,
      delay: 0.3,
      ease: 'none'
    });
  }

  // Subtitle, divider, message, scroll hint - fade + slide from below
  const heroElements = ['.hero-subtitle', '.hero-divider', '.hero-message', '.scroll-hint'];
  heroElements.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) {
      // Remove CSS animation classes
      el.classList.remove('fade-in', 'delay-1', 'delay-2', 'delay-3', 'delay-4');
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 + i * 0.3, ease: 'power2.out' }
      );
    }
  });
}

/* ===== WARM WORDS (POSTCARDS) ANIMATIONS ===== */
function initWordsAnimations() {
  // Section title
  gsap.fromTo('#words .section-title',
    { opacity: 0, y: -40 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: {
        trigger: '#words',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Postcards — stagger entrance
  gsap.fromTo('.postcard',
    { opacity: 0, y: 50, rotateX: -15 },
    {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '#words .words-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Touch support: tap to flip on mobile
  document.querySelectorAll('.postcard').forEach(function(card) {
    card.addEventListener('click', function() {
      if (window.matchMedia('(hover: none)').matches) {
        card.classList.toggle('flipped');
      }
    });
  });

  // Hobby photo flip cards — touch support
  document.querySelectorAll('.hobby-flip-card').forEach(function(card) {
    card.addEventListener('click', function() {
      if (window.matchMedia('(hover: none)').matches) {
        card.classList.toggle('flipped');
      }
    });
  });
}

/* ===== LITTLE YOU ANIMATIONS ===== */
function initLittleYouAnimations() {
  const section = document.getElementById('littleYou');
  if (!section) return;

  const title = section.querySelector('.little-you-title');
  const closing = section.querySelector('.little-you-closing');

  if (title) {
    gsap.fromTo(title,
      { opacity: 0, y: 15 },
      {
        opacity: 1, y: 0,
        duration: 0.8, delay: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' }
      }
    );
  }

  if (closing) {
    gsap.fromTo(closing,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1, delay: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' }
      }
    );
  }
}

/* ===== PEEL STICKER ANIMATIONS ===== */
function initPeelAnimations() {
  const section = document.querySelector('.peel-section');
  if (!section) return;

  gsap.fromTo(section.querySelector('.section-title'),
    { opacity: 0, y: -30 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' }
    }
  );

  gsap.fromTo(section.querySelector('.peel-hint'),
    { opacity: 0 },
    {
      opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' }
    }
  );

  gsap.fromTo(section.querySelector('.peel-wrapper'),
    { opacity: 0, scale: 0.6 },
    {
      opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: 'elastic.out(1, 0.6)',
      scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' }
    }
  );
}

/* ===== PHOTO STORY ANIMATIONS ===== */
function initPhotoStoryAnimations() {
  const stories = document.querySelectorAll('.photo-story');

  stories.forEach((section) => {
    const photo = section.querySelector('.stagger-photo');
    const text = section.querySelector('.stagger-text');

    if (photo) {
      // Determine final rotation from tilt class
      let finalRotation = 0;
      if (photo.classList.contains('tilt-left')) finalRotation = -3;
      else if (photo.classList.contains('tilt-right')) finalRotation = 3;
      else if (photo.classList.contains('tilt-left-sm')) finalRotation = -1.5;
      else if (photo.classList.contains('tilt-right-sm')) finalRotation = 2;

      // Photo slams onto the board from above with rotation and bounce
      gsap.fromTo(photo,
        { opacity: 0, y: -200, rotation: finalRotation + (Math.random() * 20 - 10), scale: 1.1 },
        {
          opacity: 1, y: 0, rotation: finalRotation, scale: 1,
          duration: 0.8,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (text) {
      // Determine slide direction based on row layout
      const row = section.querySelector('.story-row');
      const isReverse = row && row.classList.contains('reverse');
      const xFrom = isReverse ? -60 : 60;

      gsap.fromTo(text,
        { opacity: 0, x: xFrom },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
}

/* ===== ASTRONOMY PARALLAX ===== */
function initAstronomyParallax() {
  const bg = document.querySelector('.astronomy-bg');
  if (!bg) return;

  gsap.fromTo(bg,
    { yPercent: -8 },
    {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: bg.closest('.hobby-astronomy'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
}

/* ===== HOBBY SECTION ANIMATIONS ===== */
function initHobbyAnimations() {
  const hobbySections = document.querySelectorAll('.hobby-section');

  hobbySections.forEach((section) => {
    const title = section.querySelector('.section-title');
    const content = section.querySelector('.hobby-content');
    const quote = section.querySelector('.hobby-quote');

    if (title) {
      // Title with glow effect
      gsap.fromTo(title,
        { opacity: 0, y: -20, textShadow: '0 0 0px transparent' },
        {
          opacity: 1, y: 0,
          textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (quote) {
      // Quote slides from left with border growing
      gsap.fromTo(quote,
        { opacity: 0, x: -60, borderLeftWidth: '0px' },
        {
          opacity: 1, x: 0, borderLeftWidth: '3px',
          duration: 0.9,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (content) {
      // Content paragraphs fade + slide from below
      const paragraphs = content.querySelectorAll('p');
      gsap.fromTo(paragraphs,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: quote ? 0.5 : 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
}

/* ===== FINALE ANIMATIONS ===== */
function initFinaleAnimations() {
  const finale = document.getElementById('finale');
  if (!finale) return;

  const cake = finale.querySelector('.cake');
  const title = finale.querySelector('.finale-title');
  const text = finale.querySelector('.finale-text');
  const wishBtn = finale.querySelector('.wish-btn');

  if (cake) {
    gsap.fromTo(cake,
      { opacity: 0, scale: 0 },
      {
        opacity: 1, scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: finale,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  if (wishBtn) {
    gsap.fromTo(wishBtn,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: finale,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  if (title) {
    gsap.fromTo(title,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: finale,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  if (text) {
    gsap.fromTo(text,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        delay: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: finale,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}

/* ===== SECTION CROSS-FADE TRANSITIONS ===== */
function initSectionTransitions() {
  const sections = document.querySelectorAll('.snap-section');

  sections.forEach((section) => {
    // Get the direct content children (not background elements)
    const content = section.querySelector('.container, .hero-content, .finale-content');
    if (!content) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'top top',
      onEnter: () => {
        gsap.to(content, { opacity: 1, duration: 0.4, ease: 'power1.inOut' });
      }
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'bottom bottom',
      end: 'bottom top',
      onLeave: () => {
        gsap.to(content, { opacity: 0, duration: 0.3, ease: 'power1.inOut' });
      },
      onEnterBack: () => {
        gsap.to(content, { opacity: 1, duration: 0.4, ease: 'power1.inOut' });
      }
    });
  });
}

/* ===== FLOATING HEARTS ===== */
function initFloatingHearts() {
  const container = document.querySelector('.hearts-bg');
  const hearts = ['\u2764', '\u2665', '\u2661', '\u2726', '\u2727'];

  function createHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 16 + 12) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 18000);
  }

  // Initial batch
  for (let i = 0; i < 8; i++) {
    setTimeout(createHeart, i * 400);
  }

  // Continuous
  setInterval(createHeart, 2000);
}

/* ===== HOBBY FLOATING ICONS ===== */
function initHobbyIcons() {
  document.querySelectorAll('.hobby-floating').forEach((container) => {
    const icons = container.dataset.icons.split(',');
    const isChemistry = container.closest('.hobby-chemistry') !== null;
    const isMusic = container.closest('.hobby-music') !== null;
    let interval = null;

    // Chemistry & Music: free-floating icons drifting across the whole section
    if (isChemistry) {
      initChemistryFloaters(container, icons);
      return;
    }

    if (isMusic) {
      initMusicFloaters(container, icons);
      return;
    }

    var isFalling = container.classList.contains('hobby-falling');
    if (isFalling) {
      initFallingIcons(container, icons);
      return;
    }

    function createIcon() {
      const el = document.createElement('span');
      el.classList.add('hobby-icon');
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.bottom = '-30px';
      el.style.fontSize = (Math.random() * 18 + 14) + 'px';
      el.style.animationDuration = (Math.random() * 5 + 5) + 's';
      el.style.animationDelay = (Math.random() * 1.5) + 's';
      container.appendChild(el);
      setTimeout(() => el.remove(), 12000);
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!interval) {
          for (let i = 0; i < 6; i++) {
            setTimeout(createIcon, i * 300);
          }
          interval = setInterval(createIcon, 2500);
        }
      } else {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    }, { threshold: 0.1 });

    observer.observe(container.parentElement);
  });
}

/* ===== CHEMISTRY FREE-FLOATING ICONS ===== */
function initChemistryFloaters(container, icons) {
  const floaters = [];
  let animFrame = null;
  let isVisible = false;

  function spawnFloater() {
    const el = document.createElement('span');
    el.classList.add('hobby-icon');
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.position = 'absolute';
    el.style.fontSize = (Math.random() * 22 + 16) + 'px';
    el.style.opacity = '0.15';
    container.appendChild(el);

    const rect = container.getBoundingClientRect();
    const floater = {
      el,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.3,
    };
    floaters.push(floater);
    return floater;
  }

  // Spawn initial batch
  for (let i = 0; i < 15; i++) {
    spawnFloater();
  }

  function animate() {
    if (!isVisible) return;
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    floaters.forEach((f) => {
      f.x += f.vx;
      f.y += f.vy;
      f.rotation += f.rotSpeed;

      // Bounce off edges
      if (f.x < 0 || f.x > w) f.vx *= -1;
      if (f.y < 0 || f.y > h) f.vy *= -1;
      f.x = Math.max(0, Math.min(w, f.x));
      f.y = Math.max(0, Math.min(h, f.y));

      f.el.style.left = f.x + 'px';
      f.el.style.top = f.y + 'px';
      f.el.style.transform = 'rotate(' + f.rotation + 'deg)';
    });

    animFrame = requestAnimationFrame(animate);
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible = true;
      animate();
    } else {
      isVisible = false;
      if (animFrame) cancelAnimationFrame(animFrame);
    }
  }, { threshold: 0.1 });

  observer.observe(container.parentElement);
}

/* ===== AGE COUNTER ===== */
function initAgeCounter() {
  var el = document.getElementById('ageNumber');
  if (!el) return;

  var target = 26;
  var duration = 1800; // ms
  var started = false;

  function animateCount() {
    if (started) return;
    started = true;
    var start = performance.now();

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Start after envelope opens (1.8s delay) + small buffer
  var overlay = document.getElementById('envelopeOverlay');
  if (overlay && overlay.style.display !== 'none') {
    overlay.addEventListener('click', function() {
      setTimeout(animateCount, 2200);
    });
  } else {
    animateCount();
  }
}

/* ===== BIRTHDAY TYPEWRITER (languages section) ===== */
function initBirthdayTypewriter() {
  var container = document.getElementById('birthdayTypewriter');
  if (!container) return;

  var phrases = [
    'Happy Birthday!',
    'Alles Gute zum Geburtstag!',
    'Срећан рођендан!',
    'Joyeux anniversaire!',
    'З Днём Нараджэння!',
    'Feliz cumpleaños!',
    'お誕生日おめでとう!',
    'С Днём Рождения!',
    'Buon compleanno!',
    'Herzlichen Glückwunsch!'
  ];

  var span = document.createElement('span');
  span.classList.add('tw-text');
  container.appendChild(span);

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var isVisible = false;
  var timeout = null;

  function type() {
    if (!isVisible) return;

    var current = phrases[phraseIndex];

    if (!isDeleting) {
      span.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        // Pause before deleting
        timeout = setTimeout(function() {
          isDeleting = true;
          type();
        }, 1800);
        return;
      }
      timeout = setTimeout(type, 70);
    } else {
      span.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeout = setTimeout(type, 400);
        return;
      }
      timeout = setTimeout(type, 40);
    }
  }

  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      isVisible = true;
      if (timeout) clearTimeout(timeout);
      type();
    } else {
      isVisible = false;
      if (timeout) clearTimeout(timeout);
    }
  }, { threshold: 0.3 });

  observer.observe(container.closest('.snap-section'));
}

/* ===== FALLING ICONS (languages — owl post style) ===== */
function initFallingIcons(container, icons) {
  var floaters = [];
  var animFrame = null;
  var isVisible = false;

  function spawnFloater() {
    var el = document.createElement('span');
    el.classList.add('hobby-icon');
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.position = 'absolute';
    el.style.fontSize = (Math.random() * 20 + 16) + 'px';
    el.style.opacity = '0.2';
    container.appendChild(el);

    var rect = container.getBoundingClientRect();
    var floater = {
      el: el,
      x: Math.random() * rect.width,
      y: -30 - Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: 0.8 + Math.random() * 1.2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.015 + Math.random() * 0.02,
    };
    floaters.push(floater);
  }

  for (var i = 0; i < 20; i++) {
    spawnFloater();
  }

  function animate() {
    if (!isVisible) return;
    var h = container.offsetHeight;
    var w = container.offsetWidth;

    floaters.forEach(function(f) {
      f.sway += f.swaySpeed;
      f.x += f.vx + Math.sin(f.sway) * 0.4;
      f.y += f.vy;
      f.rotation += f.rotSpeed;

      if (f.y > h + 30) {
        f.y = -30;
        f.x = Math.random() * w;
      }
      if (f.x < -20) f.x = w + 10;
      if (f.x > w + 20) f.x = -10;

      f.el.style.left = f.x + 'px';
      f.el.style.top = f.y + 'px';
      f.el.style.transform = 'rotate(' + f.rotation + 'deg)';
    });

    animFrame = requestAnimationFrame(animate);
  }

  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      isVisible = true;
      animate();
    } else {
      isVisible = false;
      if (animFrame) cancelAnimationFrame(animFrame);
    }
  }, { threshold: 0.1 });

  observer.observe(container.parentElement);
}

/* ===== MUSIC FREE-FLOATING NOTES ===== */
function initMusicFloaters(container, icons) {
  const floaters = [];
  let animFrame = null;
  let isVisible = false;

  function spawnFloater() {
    const el = document.createElement('span');
    el.classList.add('hobby-icon');
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.position = 'absolute';
    el.style.fontSize = (Math.random() * 24 + 14) + 'px';
    el.style.opacity = '0.18';
    container.appendChild(el);

    const rect = container.getBoundingClientRect();
    const floater = {
      el,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: -Math.random() * 0.8 - 0.3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.5,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
    };
    floaters.push(floater);
    return floater;
  }

  for (let i = 0; i < 25; i++) {
    spawnFloater();
  }

  function animate() {
    if (!isVisible) return;
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    floaters.forEach(function(f) {
      f.sway += f.swaySpeed;
      f.x += f.vx + Math.sin(f.sway) * 0.3;
      f.y += f.vy;
      f.rotation += f.rotSpeed;

      // Wrap around edges
      if (f.y < -30) f.y = h + 20;
      if (f.x < -20) f.x = w + 10;
      if (f.x > w + 20) f.x = -10;

      f.el.style.left = f.x + 'px';
      f.el.style.top = f.y + 'px';
      f.el.style.transform = 'rotate(' + f.rotation + 'deg)';
    });

    animFrame = requestAnimationFrame(animate);
  }

  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      isVisible = true;
      animate();
    } else {
      isVisible = false;
      if (animFrame) cancelAnimationFrame(animFrame);
    }
  }, { threshold: 0.1 });

  observer.observe(container.parentElement);
}

/* ===== TWINKLING STARS (astronomy section) ===== */
function initStars() {
  const starsBg = document.querySelector('.stars-bg');
  if (!starsBg) return;

  const count = 120;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const isBright = Math.random() > 0.85;
    star.classList.add('star');
    if (isBright) star.classList.add('star--bright');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    star.style.animationDelay = (Math.random() * 4) + 's';
    starsBg.appendChild(star);
  }
}

/* ===== WISH BUTTON (blow out candles) ===== */
function initWishButton() {
  const btn = document.getElementById('wishBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    btn.disabled = true;

    const flames = document.querySelectorAll('.cake .flame');
    const smokes = document.querySelectorAll('.cake .smoke');

    // Extinguish flames one by one with stagger
    flames.forEach((flame, i) => {
      setTimeout(() => {
        flame.classList.add('out');
        // Trigger smoke
        if (smokes[i]) {
          smokes[i].classList.add('rising');
        }
      }, i * 150);
    });

    // After all candles are out, fire confetti
    const totalDelay = flames.length * 150 + 600;
    setTimeout(() => {
      fireConfetti();
      btn.textContent = 'Wish made! \uD83C\uDF89';
    }, totalDelay);
  });
}

function fireConfetti() {
  const colors = ['#d4a574', '#e8a0b8', '#c4724e', '#4aaa78', '#c4956a', '#f0d9c4'];
  const defaults = { colors, disableForReducedMotion: true };

  confetti({ ...defaults, particleCount: 60, spread: 80, origin: { y: 0.7 } });

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 40, spread: 60, origin: { x: 0.2, y: 0.6 }, angle: 60 });
  }, 300);

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 40, spread: 60, origin: { x: 0.8, y: 0.6 }, angle: 120 });
  }, 600);

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 80, spread: 100, origin: { y: 0.6 } });
  }, 1000);
}

/* ===== MOLECULE CANVAS (chemistry section) ===== */
function initMoleculeCanvas() {
  const canvas = document.querySelector('.molecule-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const section = canvas.closest('.hobby-chemistry');
  const ATOM_COUNT = 35;
  const CONNECT_DIST = 120;
  let atoms = [];
  let animId = null;
  let isVisible = false;

  function resize() {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function createAtoms() {
    atoms = [];
    for (let i = 0; i < ATOM_COUNT; i++) {
      atoms.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }
  }

  function draw() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const dx = atoms[i].x - atoms[j].x;
        const dy = atoms[i].y - atoms[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(atoms[i].x, atoms[i].y);
          ctx.lineTo(atoms[j].x, atoms[j].y);
          ctx.strokeStyle = `rgba(94, 192, 160, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw atoms
    for (const atom of atoms) {
      ctx.beginPath();
      ctx.arc(atom.x, atom.y, atom.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(94, 192, 160, 0.3)';
      ctx.fill();
    }

    // Update positions
    for (const atom of atoms) {
      atom.x += atom.vx;
      atom.y += atom.vy;

      if (atom.x < 0 || atom.x > canvas.width) atom.vx *= -1;
      if (atom.y < 0 || atom.y > canvas.height) atom.vy *= -1;
    }

    animId = requestAnimationFrame(draw);
  }

  // Only animate when visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible = true;
      resize();
      if (!animId) draw();
    } else {
      isVisible = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }
  }, { threshold: 0.05 });

  resize();
  createAtoms();
  observer.observe(section);

  window.addEventListener('resize', () => {
    resize();
    createAtoms();
  });
}

/* ===== ENVELOPE OVERLAY ===== */
function initEnvelope() {
  const overlay = document.getElementById('envelopeOverlay');
  const flap = document.getElementById('envelopeFlap');
  const letter = document.getElementById('envelopeLetter');

  if (!overlay || !flap || !letter) return;

  overlay.addEventListener('click', () => {
    // Open the flap
    flap.classList.add('open');

    // Letter rises up after flap opens
    setTimeout(() => {
      letter.classList.add('rise');
    }, 400);

    // Fade out the overlay
    setTimeout(() => {
      overlay.classList.add('fade-out');
    }, 1200);

    // Remove overlay and unlock scroll
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.classList.remove('no-scroll');
      // Refresh ScrollTrigger after overlay is removed and scroll is unlocked
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 1800);
  });
}

/* ===== MUSIC BUTTON ===== */
function initMusicButton() {
  const btn = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');

  if (!btn || !audio) return;

  audio.volume = 0.3;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.classList.add('playing');
      }).catch(() => {
        // Autoplay blocked — silently ignore
      });
    } else {
      audio.pause();
      btn.classList.remove('playing');
    }
  });

  // Detect dark sections to adjust button color
  const darkSections = document.querySelectorAll(
    '.snap-section:not(.photo-story)'
  );

  if (darkSections.length > 0) {
    const snapContainer = document.getElementById('snapContainer');

    // More reliable: check on scroll which section the button overlaps
    function updateMusicBtnTheme() {
      const btnRect = btn.getBoundingClientRect();
      const btnCenterY = btnRect.top + btnRect.height / 2;
      const btnCenterX = btnRect.left + btnRect.width / 2;
      let onDark = false;

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (btnCenterY >= rect.top && btnCenterY <= rect.bottom &&
            btnCenterX >= rect.left && btnCenterX <= rect.right) {
          onDark = true;
        }
      });

      btn.classList.toggle('on-dark', onDark);
    }

    if (snapContainer) {
      snapContainer.addEventListener('scroll', updateMusicBtnTheme, { passive: true });
    }
    window.addEventListener('scroll', updateMusicBtnTheme, { passive: true });
    updateMusicBtnTheme();
  }
}

/* ===== DOT NAVIGATION ===== */
function initDotNav() {
  const dots = document.querySelectorAll('.dot-nav .dot');
  const sections = document.querySelectorAll('.snap-section');
  const snapContainer = document.getElementById('snapContainer');
  const dotNav = document.querySelector('.dot-nav');

  if (!dots.length || !sections.length || !snapContainer || !dotNav) return;

  // Click handler — scroll to section
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(dot.dataset.index, 10);
      const target = sections[index];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Track active section on scroll
  function updateActiveDot() {
    const containerRect = snapContainer.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;
    let activeIndex = 0;

    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= centerY && rect.bottom > centerY) {
        activeIndex = i;
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });

    // Toggle on-dark class for dots over dark sections
    const activeSection = sections[activeIndex];
    // All sections are dark now except photo-story (cork board)
    const isLight = activeSection && activeSection.classList.contains('photo-story');
    const isDark = !isLight;
    dotNav.classList.toggle('on-dark', isDark);
  }

  snapContainer.addEventListener('scroll', updateActiveDot, { passive: true });
  updateActiveDot();
}

/* ===== FLOATING COMPLIMENTS ===== */
function initFloatingCompliments() {
  var compliments = [
    'You make the world brighter',
    'Your laugh is the best sound',
    'You are enough, always',
    'Proud of who you are',
    'You inspire me every day',
    'Your kindness is a superpower',
    'The world is lucky to have you',
    'You are stronger than you think',
    'Never stop being you',
    'You deserve all the good things',
    'Your passion is contagious',
    'You make everything better',
    'Your heart is pure gold',
    'You light up every room',
    'I believe in you, always'
  ];

  var icons = ['✦', '♡', '☆', '✿', '◇', '❋', '✧'];
  var layer = document.createElement('div');
  layer.className = 'compliment-layer';
  document.body.appendChild(layer);

  var bubbles = [];
  var usedCompliments = [];
  var animFrame = null;
  var MAX_BUBBLES = 5;
  var lastSectionIndex = -1;

  function pickCompliment() {
    if (usedCompliments.length >= compliments.length) {
      usedCompliments = [];
    }
    var available = compliments.filter(function(c) {
      return usedCompliments.indexOf(c) === -1;
    });
    var picked = available[Math.floor(Math.random() * available.length)];
    usedCompliments.push(picked);
    return picked;
  }

  function spawnBubble() {
    if (bubbles.length >= MAX_BUBBLES) return;

    var el = document.createElement('button');
    var sizes = ['sm', 'md', 'lg'];
    var size = sizes[Math.floor(Math.random() * sizes.length)];
    el.className = 'compliment-bubble compliment-' + size + ' compliment-inflate';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.setAttribute('aria-label', 'Click for a compliment');
    layer.appendChild(el);

    var tooltip = document.createElement('div');
    var colors = ['tooltip-rose', 'tooltip-lavender', 'tooltip-mint', 'tooltip-peach', 'tooltip-sky'];
    tooltip.className = 'compliment-tooltip ' + colors[Math.floor(Math.random() * colors.length)];
    tooltip.textContent = pickCompliment();
    el.appendChild(tooltip);

    var vw = window.innerWidth;
    var vh = window.innerHeight;

    // Spawn from random edges and corners
    var side = Math.floor(Math.random() * 4);
    var startX, startY;
    if (side === 0) { // left
      startX = -20;
      startY = 80 + Math.random() * (vh - 160);
    } else if (side === 1) { // right
      startX = vw + 20;
      startY = 80 + Math.random() * (vh - 160);
    } else if (side === 2) { // top
      startX = 60 + Math.random() * (vw - 120);
      startY = -20;
    } else { // bottom
      startX = 60 + Math.random() * (vw - 120);
      startY = vh + 20;
    }

    // Drift towards center-ish area
    var targetX = vw * 0.15 + Math.random() * vw * 0.7;
    var targetY = vh * 0.15 + Math.random() * vh * 0.7;
    var dx = targetX - startX;
    var dy = targetY - startY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    var bubble = {
      el: el,
      x: startX,
      y: startY,
      vx: (dx / dist) * (0.3 + Math.random() * 0.4),
      vy: (dy / dist) * (0.3 + Math.random() * 0.4),
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.012,
      open: false
    };

    el.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!bubble.open) {
        bubble.open = true;
        el.classList.add('open');
        // Freeze position so animation plays in place
        bubble.vx = 0;
        bubble.vy = 0;
        // Show tooltip for 4.5s, fade tooltip, then pop bubble
        setTimeout(function() {
          el.classList.add('tooltip-hiding');
          setTimeout(function() {
            // Remove from movement loop
            var idx = bubbles.indexOf(bubble);
            if (idx !== -1) bubbles.splice(idx, 1);
            // Capture current screen position
            var rect = el.getBoundingClientRect();
            // Reparent to body so no transform inheritance
            el.classList.remove('open', 'tooltip-hiding', 'compliment-inflate');
            el.style.position = 'fixed';
            el.style.left = rect.left + 'px';
            el.style.top = rect.top + 'px';
            el.style.transform = 'none';
            // Hide tooltip completely
            var tip = el.querySelector('.compliment-tooltip');
            if (tip) tip.style.display = 'none';
            // Force reflow before adding pop
            void el.offsetWidth;
            el.classList.add('pop');
            el.addEventListener('animationend', function() {
              el.remove();
            });
          }, 500);
        }, 4500);
      }
    });

    bubbles.push(bubble);
  }

  function animate() {
    var vw = window.innerWidth;

    for (var i = bubbles.length - 1; i >= 0; i--) {
      var b = bubbles[i];
      b.sway += b.swaySpeed;
      b.x += b.vx + Math.sin(b.sway) * 0.25;
      b.y += b.vy + Math.cos(b.sway) * 0.15;

      // Slow down over time
      b.vx *= 0.999;
      b.vy *= 0.999;

      // Bounce off sides
      if (b.x < 20) { b.x = 20; b.vx = Math.abs(b.vx); }
      if (b.x > vw - 20) { b.x = vw - 20; b.vx = -Math.abs(b.vx); }

      b.el.style.transform = 'translate(' + b.x + 'px,' + b.y + 'px)';
    }

    animFrame = requestAnimationFrame(animate);
  }

  // Listen for section changes via scroll
  function onSectionChange() {
    var snapContainer = document.getElementById('snapContainer');
    var sections = document.querySelectorAll('.snap-section');
    if (!snapContainer || !sections.length) return;

    snapContainer.addEventListener('scroll', function() {
      var containerRect = snapContainer.getBoundingClientRect();
      var centerY = containerRect.top + containerRect.height / 2;
      var currentIndex = 0;

      sections.forEach(function(section, i) {
        var rect = section.getBoundingClientRect();
        if (rect.top <= centerY && rect.bottom > centerY) {
          currentIndex = i;
        }
      });

      if (currentIndex !== lastSectionIndex) {
        lastSectionIndex = currentIndex;
        // Spawn a new bubble on section change
        spawnBubble();
      }
    }, { passive: true });
  }

  function start() {
    onSectionChange();
    animate();
  }

  var overlay = document.getElementById('envelopeOverlay');
  if (overlay && overlay.style.display !== 'none') {
    overlay.addEventListener('click', function() {
      setTimeout(start, 2500);
    });
  } else {
    start();
  }
}
