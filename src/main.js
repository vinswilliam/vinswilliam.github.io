import './style.css';

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typewriterElement = document.querySelector('.typewriter');

// Configuration
const typewriterTexts = [
  'Software Engineer',
  'Mobile App Developer',
  'Full Stack Developer',
  'Creative Problem Solver',
  'Tech Enthusiast'
];

let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Navbar Functionality
function initNavbar() {
  // Only initialize navbar functionality if elements exist (mobile)
  if (!hamburger || !navMenu) return;
  
  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Navbar scroll effect (only on mobile where navbar is visible)
  if (navbar && window.innerWidth <= 768) {
    const handleScroll = debounce(() => {
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      }
    }, 10);

    window.addEventListener('scroll', handleScroll);
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // No offset needed since navbar is hidden on desktop
        const offsetTop = window.innerWidth <= 768 ? targetSection.offsetTop - 70 : targetSection.offsetTop;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Typewriter Effect
function typeWriter() {
  const currentText = typewriterTexts[typewriterIndex];
  
  if (!isDeleting) {
    // Typing
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentText.length) {
      // Pause before deleting
      setTimeout(() => {
        isDeleting = true;
        typeWriter();
      }, 2000);
      return;
    }
    
    setTimeout(typeWriter, 100);
  } else {
    // Deleting
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
      setTimeout(typeWriter, 500);
      return;
    }
    
    setTimeout(typeWriter, 50);
  }
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  const sections = document.querySelectorAll('section');
  const cards = document.querySelectorAll('.experience-item');
  
  sections.forEach(section => observer.observe(section));
  cards.forEach(card => observer.observe(card));
}






// Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Styles for notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 2rem',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    backgroundColor: type === 'success' ? '#00ff00' : type === 'error' ? '#ff0040' : '#00ffff'
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Parallax Effect for Hero
function initParallax() {
  const heroShapes = document.querySelectorAll('.geometric-shape');
  
  const handleParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    heroShapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.2;
      shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  }, 10);
  
  window.addEventListener('scroll', handleParallax);
}

// Cursor Trail Effect (Optional Enhancement)
function initCursorTrail() {
  if (window.innerWidth < 768) return; // Skip on mobile
  
  const trail = [];
  const trailLength = 8;
  
  // Create trail elements
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    Object.assign(dot.style, {
      position: 'fixed',
      width: '4px',
      height: '4px',
      backgroundColor: '#00ffff',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '9999',
      opacity: (trailLength - i) / trailLength,
      transition: 'opacity 0.2s ease'
    });
    document.body.appendChild(dot);
    trail.push(dot);
  }
  
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function updateTrail() {
    for (let i = trail.length - 1; i > 0; i--) {
      trail[i].style.left = trail[i - 1].style.left;
      trail[i].style.top = trail[i - 1].style.top;
    }
    
    trail[0].style.left = mouseX + 'px';
    trail[0].style.top = mouseY + 'px';
    
    requestAnimationFrame(updateTrail);
  }
  
  updateTrail();
}

// Performance Monitoring
function initPerformanceMonitoring() {
  // Monitor FPS for smooth animations
  let lastTime = performance.now();
  let frameCount = 0;
  
  function checkFPS() {
    const currentTime = performance.now();
    frameCount++;
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      
      // If FPS is too low, disable some animations
      if (fps < 30) {
        document.body.classList.add('low-performance');
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(checkFPS);
  }
  
  checkFPS();
}

// Theme Toggle (Future Enhancement)
function initThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '🌓';
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  
  Object.assign(themeToggle.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '2px solid var(--primary-color)',
    background: 'var(--bg-secondary)',
    color: 'var(--primary-color)',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: '1000',
    transition: 'all 0.3s ease'
  });
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '🌓';
  });
  
  document.body.appendChild(themeToggle);
}

// Initialize all functionality
function init() {
  // Core functionality
  initNavbar();
  initSmoothScrolling();
  initScrollAnimations();
  initParallax();
  
  // Start typewriter effect
  if (typewriterElement) {
    setTimeout(typeWriter, 1000);
  }
  
  // Performance and enhancement features
  initPerformanceMonitoring();
  
  // Optional enhancements
  if (window.innerWidth > 768) {
    initCursorTrail();
  }
  
  // Future feature
  // initThemeToggle();
  
  console.log('🚀 Web Portfolio initialized successfully! (Docker dev mode working!)');
}

// Start when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
