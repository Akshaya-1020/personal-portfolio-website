// script.js - Black Gold Purple Theme | Advanced Animations & Interactions
// Mission Control Hero Edition + StartupBridge Project + Clickable Certificates

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollProgress();
  initMissionParticles();
  initNameShuffle();
  initMagneticButtons();
  initTimelineObserver();
  initSkillFilter();
  initProjectFilter();
  initProject3DTiltAndModal();
  initCertViewer();
  initContactForm();
  initScrollSpy();
  initScrollToTop();
  initThemeToggle();
  initProjectParticles();
  initGlowTrail();
  initScrollReveal();
  initMissionParallax();
  initStatCardsHover();
  initCertificateClick();
  initProjectGitHubLinks();
});

// ==================== 1. PREMIUM CURSOR WITH GLOW ====================
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if (!dot || !outline) return;
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  const hoverElements = document.querySelectorAll('a, button, .skill-card-3d, .project-modal-btn, .resume-btn, .filter-btn, .project-filter-btn, .view-cert, .nav-link, .cta-mission, .stat-card, .cert-flip');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
  });

  if (window.matchMedia('(max-width: 768px)').matches) {
    dot.style.display = 'none';
    outline.style.display = 'none';
  }
}

// ==================== 2. GLOW TRAIL THAT FOLLOWS CURSOR ====================
function initGlowTrail() {
  const trail = document.querySelector('.cursor-glow-trail');
  if (!trail) return;
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trail.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });
}

// ==================== 3. SCROLL PROGRESS BAR ====================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ==================== 4. MISSION PARTICLES ====================
function initMissionParticles() {
  const canvas = document.getElementById('missionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let stars = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function getThemeColors() {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    return {
      purple: isLight ? '#7A3CFF' : '#9B4DFF',
      purpleGlow: isLight ? 'rgba(122, 60, 255, 0.3)' : 'rgba(155, 77, 255, 0.4)',
      gold: '#D4AF37',
      bgStart: isLight ? '#f0ece4' : '#05030A',
      bgEnd: isLight ? '#f8f6ff' : '#0a0715'
    };
  }

  function createParticles() {
    particles = [];
    const count = Math.min(100, Math.floor(width * height / 8000));
    for (let i = 0; i < count; i++) {
      const isGold = Math.random() > 0.6;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        isGold: isGold,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function createStars() {
    stars = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2,
        alpha: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01
      });
    }
  }

  function drawBackground() {
    const colors = getThemeColors();
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colors.bgStart);
    gradient.addColorStop(0.5, colors.bgEnd);
    gradient.addColorStop(1, colors.bgStart);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function drawStars() {
    const time = Date.now() * 0.001;
    stars.forEach(s => {
      const twinkle = s.alpha + Math.sin(time * s.speed + s.twinkle) * 0.15;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, twinkle)})`;
      ctx.fill();
    });
  }

  function drawParticles() {
    const time = Date.now() * 0.002;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      const pulseAlpha = p.alpha + Math.sin(time + p.pulse) * 0.1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isGold ? `rgba(212, 175, 55, ${Math.min(pulseAlpha + 0.1, 0.5)})` : `rgba(155, 77, 255, ${Math.min(pulseAlpha, 0.4)})`;
      ctx.fill();
    });
  }

  function animate() {
    if (!ctx) return;
    drawBackground();
    drawStars();
    drawParticles();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
    createStars();
  });

  resize();
  createParticles();
  createStars();
  animate();
}

// ==================== 5. NAME SHUFFLE ANIMATION ====================
function initNameShuffle() {
  const nameElement = document.querySelector('.name-mission');
  if (!nameElement) return;
  const original = 'AKSHAYA';
  
  function shuffleString(str) {
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }
  
  function animateShuffle(el, final, iterations = 14, speed = 55) {
    let count = 0;
    const interval = setInterval(() => {
      el.textContent = shuffleString(final);
      count++;
      if (count >= iterations) {
        clearInterval(interval);
        el.textContent = final;
      }
    }, speed);
  }
  
  setTimeout(() => animateShuffle(nameElement, original, 15, 55), 300);
  
  setInterval(() => {
    animateShuffle(nameElement, original, 12, 55);
  }, 10000);
}

// ==================== 6. MAGNETIC BUTTONS ====================
function initMagneticButtons() {
  const btns = document.querySelectorAll('.magnetic-btn, .cta-mission, .cta-primary, .cta-secondary, .about-contact-btn, .about-projects-btn, .submit-btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

// ==================== 7. MISSION PARALLAX ====================
function initMissionParallax() {
  const panel = document.querySelector('.mission-control-panel');
  const globe = document.querySelector('.hologram-globe');
  const rings = document.querySelectorAll('.globe-ring');
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    
    if (panel && window.innerWidth > 900) {
      panel.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    }
    
    if (globe) {
      globe.style.transform = `translateY(${y * 2}px) rotateY(${x * 3}deg)`;
    }
    
    rings.forEach((ring, index) => {
      const speed = (index + 1) * 2;
      ring.style.transform = `rotate(${x * speed}deg)`;
    });
  });
}

// ==================== 8. STAT CARDS HOVER ====================
function initStatCardsHover() {
  const cards = document.querySelectorAll('.stat-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
      card.style.borderColor = 'var(--gold-premium)';
      card.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.borderColor = '';
      card.style.boxShadow = '';
    });
  });
}

// ==================== 9. TIMELINE SCROLL OBSERVER ====================
function initTimelineObserver() {
  const timelineWrapper = document.querySelector('.timeline-wrapper');
  if (!timelineWrapper) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timelineWrapper.classList.add('in-view');
      }
    });
  }, { threshold: 0.3 });
  observer.observe(timelineWrapper);
}

// ==================== 10. SKILLS FILTER ====================
function initSkillFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card-3d');
  if (!filterBtns.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInScale 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==================== 11. PROJECT FILTER ====================
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-3d-card');
  if (!filterBtns.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-proj-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-proj-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'projectFadeUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==================== 12. PROJECTS 3D TILT + MODAL WITH GITHUB LINKS ====================
function initProject3DTiltAndModal() {
  const cards = document.querySelectorAll('.project-3d-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const modal = document.getElementById('projectModal');
  const modalBody = modal?.querySelector('.modal-body');
  const closeModal = document.querySelector('.close-modal');
  const previewBtns = document.querySelectorAll('.project-modal-btn');
  
  const projectData = {
    ai: { 
      title: '🤖 AI Chat Application', 
      desc: 'An intelligent chatbot application with AI-powered responses and interactive conversational experience. Features natural language processing and real-time chat capabilities.', 
      tech: 'JavaScript • AI API • Frontend', 
      features: ['Natural Language Processing', 'Real-time Responses', 'Conversational Memory']
    },
    expense: { 
      title: '💰 Expense Tracker', 
      desc: 'A full-stack expense management platform with analytics dashboard, financial tracking, and visualization tools for personal finance management.', 
      tech: 'React • Node.js • Database', 
      features: ['Analytics Dashboard', 'Financial Tracking', 'Data Visualization']
    },
    ocean: { 
      title: '🌊 Ocean Hazard Detection System', 
      desc: 'IoT based monitoring solution that detects environmental risks using real-time data processing and cloud analytics for early warning systems.', 
      tech: 'Python • IoT • Cloud', 
      features: ['Real-time Monitoring', 'Cloud Analytics', 'Early Warning System']
    },
    portfolio: { 
      title: '🎨 Developer Portfolio', 
      desc: 'Interactive developer portfolio featuring stunning animations, responsive design, and modern UI/UX practices with premium glassmorphism effects.', 
      tech: 'HTML • CSS • JavaScript', 
      features: ['Responsive Design', 'Glassmorphism UI', 'Custom Animations']
    },
    startupbridge: { 
      title: '🚀 StartupBridge', 
      desc: 'StartupBridge is a ServiceNow-based career platform that connects students with startup companies for internships and job opportunities. The system enables company registration, opportunity posting, student applications, and application tracking through automated workflows. It aims to bridge the gap between talented students and growing startups while providing a simple and efficient hiring process.', 
      tech: 'ServiceNow • Flow Designer • Workflows • Role-Based Access Control • Tables & Forms', 
      features: [
        'Student Registration',
        'Startup/Company Registration',
        'Internship & Job Posting',
        'Application Tracking',
        'Skill-Based Opportunity Matching (Future Enhancement)'
      ]
    }
  };
  
  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectKey = btn.getAttribute('data-project');
      const githubLink = btn.getAttribute('data-github') || '#';
      const data = projectData[projectKey];
      
      if (modal && data) {
        let featuresHTML = '';
        if (data.features && data.features.length) {
          featuresHTML = `
            <div style="background: rgba(212,175,55,0.08); padding: 14px; border-radius: 16px; margin: 14px 0; border: 1px solid rgba(212,175,55,0.15);">
              <strong style="color: var(--gold-premium); font-family: var(--font-cosmic, Orbitron, monospace); font-size: 0.75rem; letter-spacing: 1px;">✦ KEY FEATURES</strong>
              <ul style="list-style: none; padding: 10px 0 0 0; margin: 0;">
                ${data.features.map(f => `<li style="padding: 5px 0; color: var(--text-secondary); font-size: 0.85rem; display: flex; align-items: center; gap: 10px;"><i class="fas fa-check-circle" style="color: var(--gold-premium); font-size: 0.7rem;"></i>${f}</li>`).join('')}
              </ul>
            </div>
          `;
        }
        
        const isStartupBridge = projectKey === 'startupbridge';
        const techBg = isStartupBridge ? 'rgba(155,77,255,0.15)' : 'rgba(212,175,55,0.1)';
        const techBorder = isStartupBridge ? 'rgba(155,77,255,0.3)' : 'rgba(212,175,55,0.2)';
        
        modalBody.innerHTML = `
          <h2 style="color: var(--gold-premium); margin-bottom: 1rem; font-family: var(--font-cosmic, Orbitron, monospace); font-size: 1.5rem;">${data.title}</h2>
          <p style="margin-bottom: 1rem; line-height: 1.8; color: var(--text-secondary);">${data.desc}</p>
          <div style="background: ${techBg}; padding: 14px; border-radius: 16px; margin: 1rem 0; border: 1px solid ${techBorder};">
            <strong style="color: var(--neon-purple-glow); font-family: var(--font-cosmic, Orbitron, monospace); font-size: 0.7rem; letter-spacing: 1px;">🛠 TECH STACK</strong>
            <p style="margin-top: 6px; color: var(--text-primary); font-weight: 500;">${data.tech}</p>
          </div>
          ${featuresHTML}
          <a href="${githubLink}" target="_blank" style="background: linear-gradient(135deg, var(--neon-purple), var(--gold-premium)); padding: 12px 28px; border-radius: 60px; text-decoration: none; color: black; font-weight: bold; display: inline-flex; align-items: center; gap: 10px; margin-top: 16px; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(155,77,255,0.3);">📂 View on GitHub <i class="fab fa-github"></i></a>
        `;
        modal.style.display = 'flex';
      }
    });
  });
  
  if (closeModal) closeModal.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

// ==================== 13. CERTIFICATIONS VIEWER ====================
function initCertViewer() {
  const viewBtns = document.querySelectorAll('.open-cert-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const link = btn.getAttribute('data-link');
      if (link && link !== '#') {
        window.open(link, '_blank');
      } else {
        showNotification('Certificate link coming soon!', 'info');
      }
    });
  });
}

// ==================== 14. CERTIFICATE CLICK HANDLER ====================
function initCertificateClick() {
  const certCards = document.querySelectorAll('.cert-flip');
  
  certCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't trigger if clicking on a button inside the card
      if (e.target.closest('.open-cert-btn') || e.target.closest('.view-cert')) {
        return;
      }
      
      const link = this.getAttribute('data-cert-link');
      if (link && link !== '#') {
        window.open(link, '_blank');
      } else {
        showNotification('Certificate link coming soon!', 'info');
      }
    });
  });
}

// ==================== 15. PROJECT GITHUB LINKS ====================
function initProjectGitHubLinks() {
  // This function ensures the GitHub links work from the modal
  // The actual handling is in initProject3DTiltAndModal
  console.log('GitHub links initialized for projects');
}

// ==================== 16. CONTACT FORM ====================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const feedbackDiv = document.getElementById('formFeedback');
    
    if (!name || !email || !message) {
      feedbackDiv.innerHTML = '<span style="color: #f5c542;">❌ All fields required for the ritual</span>';
      setTimeout(() => feedbackDiv.innerHTML = '', 3000);
      return;
    }
    
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Summoning...</span><i class="fas fa-spinner fa-pulse"></i>';
    submitBtn.disabled = true;
    
    try {
      const res = await emailjs.send('service_npmhd7x', 'template_qcd5vx5', {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'akshayab200706@gmail.com'
      });
      if (res.status === 200) {
        feedbackDiv.innerHTML = '<span style="color: #D4AF37;">✨ Message delivered! Gold response incoming ✨</span>';
        form.reset();
        submitBtn.innerHTML = '<span>✓ Sent!</span><i class="fas fa-crown"></i>';
        setTimeout(() => { submitBtn.innerHTML = originalHTML; submitBtn.disabled = false; feedbackDiv.innerHTML = ''; }, 2500);
        triggerGoldConfetti();
      } else throw new Error();
    } catch (err) {
      feedbackDiv.innerHTML = '<span style="color: #ff6b6b;">⚠️ Raven lost? Email me directly: akshayab200706@gmail.com</span>';
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
    }
  });
}

function triggerGoldConfetti() {
  const colors = ['#D4AF37', '#9b4dff', '#f5c542', '#b77cff', '#00ff88'];
  for (let i = 0; i < 80; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.width = Math.random() * 10 + 4 + 'px';
    conf.style.height = Math.random() * 10 + 4 + 'px';
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    conf.style.left = Math.random() * window.innerWidth + 'px';
    conf.style.top = '-20px';
    conf.style.pointerEvents = 'none';
    conf.style.zIndex = '10000';
    conf.style.opacity = '0.9';
    document.body.appendChild(conf);
    const animation = conf.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: 1500 + Math.random() * 1000, easing: 'cubic-bezier(0.2, 0.9, 0.4, 1)' });
    animation.onfinish = () => conf.remove();
  }
}

// ==================== 17. SCROLL SPY ====================
function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const headerOffset = 100;
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ==================== 18. SCROLL TO TOP ====================
function initScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== 19. THEME TOGGLE ====================
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light') {
    document.body.setAttribute('data-theme', 'light');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.setAttribute('data-theme', 'dark');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  toggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
    toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
}

// ==================== 20. PROJECTS PARTICLE BACKGROUND ====================
function initProjectParticles() {
  const canvas = document.getElementById('projectParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];
  
  function resizeCanvas() {
    const container = canvas.parentElement;
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  function createParticles() {
    particles = [];
    const count = Math.min(60, Math.floor(width * height / 10000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.2,
        isGold: Math.random() > 0.7
      });
    }
  }
  
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isGold ? `rgba(212, 175, 55, ${p.alpha + 0.1})` : `rgba(155, 77, 255, ${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });
  resizeCanvas();
  createParticles();
  draw();
}

// ==================== 21. SCROLL REVEAL ANIMATIONS ====================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.about-grid, .skills-grid, .projects-grid, .certs-grid, .timeline-wrapper');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => {
    if (el.classList && !el.classList.contains('timeline-wrapper')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      revealObserver.observe(el);
    }
  });
}

// ==================== NOTIFICATION HELPER ====================
function showNotification(msg, type = 'info') {
  const old = document.querySelector('.custom-notification');
  if (old) old.remove();
  const n = document.createElement('div');
  n.className = `custom-notification notification-${type}`;
  n.innerHTML = `<i class="fas ${type === 'gold' ? 'fa-crown' : 'fa-info-circle'}"></i><span>${msg}</span>`;
  n.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, var(--neon-purple), var(--gold-premium));
    color: black;
    padding: 12px 24px;
    border-radius: 60px;
    font-weight: bold;
    z-index: 10000;
    display: flex;
    gap: 12px;
    align-items: center;
    box-shadow: 0 0 20px var(--gold-premium);
    animation: slideUpFade 0.3s ease;
  `;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

// ==================== PRELOADER REMOVAL ====================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});