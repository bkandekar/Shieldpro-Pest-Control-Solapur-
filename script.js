/**
 * ShieldPro Pest Control Solapur - Interactive JavaScript
 * Tech: Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Mobile Navigation Menu Toggle
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Sticky Header Shadow on Scroll
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
  });

  /* --------------------------------------------------------------------------
     3. Active Navigation Link Highlighting on Scroll
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-list a[href*=${sectionId}]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. Instant Cost Estimator Calculator
     -------------------------------------------------------------------------- */
  const calcProperty = document.getElementById('calcProperty');
  const calcPest = document.getElementById('calcPest');
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcBookBtn = document.getElementById('calcBookBtn');

  // Base pricing matrix for Solapur market
  const basePrices = {
    '1bhk': 699,
    '2bhk': 899,
    '3bhk': 1199,
    'villa': 1799,
    'commercial': 1499
  };

  const pestMultipliers = {
    'cockroach': 1.0,
    'termite': 2.4,
    'bedbug': 1.8,
    'rodent': 1.2,
    'general': 1.1,
    'birdnetting': 1.5
  };

  function calculatePrice() {
    if (!calcProperty || !calcPest || !calcPriceDisplay) return;

    const propertyVal = calcProperty.value;
    const pestVal = calcPest.value;

    const base = basePrices[propertyVal] || 899;
    const mult = pestMultipliers[pestVal] || 1.0;

    const minPrice = Math.round(base * mult);
    const maxPrice = Math.round(minPrice * 1.35);

    calcPriceDisplay.textContent = `₹ ${minPrice.toLocaleString('en-IN')} – ₹ ${maxPrice.toLocaleString('en-IN')}`;
  }

  if (calcProperty && calcPest) {
    calcProperty.addEventListener('change', calculatePrice);
    calcPest.addEventListener('change', calculatePrice);
    calculatePrice(); // Initial trigger
  }

  if (calcBookBtn) {
    calcBookBtn.addEventListener('click', () => {
      openQuoteModal('Custom Cost Estimator Quote');
    });
  }

  /* --------------------------------------------------------------------------
     5. Quote Modal Triggering & Service Auto-Selection
     -------------------------------------------------------------------------- */
  const quoteModal = document.getElementById('quoteModal');
  const modalClose = document.getElementById('modalClose');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal');
  const bookServiceBtns = document.querySelectorAll('.book-service-btn');
  const modalServiceSelect = document.getElementById('modalService');

  function openQuoteModal(serviceName = null) {
    if (!quoteModal) return;

    if (serviceName && modalServiceSelect) {
      // Find matching option or set select
      for (let i = 0; i < modalServiceSelect.options.length; i++) {
        if (modalServiceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
            serviceName.toLowerCase().includes(modalServiceSelect.options[i].value.toLowerCase())) {
          modalServiceSelect.selectedIndex = i;
          break;
        }
      }
    }

    quoteModal.classList.add('active');
  }

  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', () => openQuoteModal());
  });

  bookServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const service = e.target.getAttribute('data-service');
      openQuoteModal(service);
    });
  });

  if (modalClose && quoteModal) {
    modalClose.addEventListener('click', () => {
      quoteModal.classList.remove('active');
    });

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. FAQ Accordion Toggle
     -------------------------------------------------------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all active faq items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     7. Gallery Lightbox Preview Modal
     -------------------------------------------------------------------------- */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImg = document.getElementById('galleryModalImg');
  const galleryClose = document.getElementById('galleryClose');

  if (galleryCards && galleryModal && galleryModalImg) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const fullSrc = card.getAttribute('data-full');
        const imgAlt = card.querySelector('img')?.getAttribute('alt') || 'Pest Control Project';
        galleryModalImg.setAttribute('src', fullSrc);
        galleryModalImg.setAttribute('alt', imgAlt);
        galleryModal.classList.add('active');
      });
    });

    if (galleryClose) {
      galleryClose.addEventListener('click', () => {
        galleryModal.classList.remove('active');
      });
    }

    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        galleryModal.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. Contact Form & Modal Form Validation Handling
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phoneNumber').value.trim();
      const location = document.getElementById('selectLocation').value;
      const service = document.getElementById('selectService').value;

      if (!name || !phone || !location || !service) {
        formStatus.textContent = '❌ Please complete all required fields.';
        formStatus.style.color = '#e11d48';
        return;
      }

      formStatus.innerHTML = '⏳ Submitting your request...';
      formStatus.style.color = '#2563eb';

      setTimeout(() => {
        formStatus.innerHTML = `✅ Thank you <strong>${name}</strong>! Your inspection request for <strong>${service}</strong> in <strong>${location}</strong> has been received. Our Solapur team will call you at <strong>${phone}</strong> shortly.`;
        formStatus.className = 'form-status success';
        contactForm.reset();
      }, 1000);
    });
  }

  const modalForm = document.getElementById('modalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();

      alert(`Thank you ${name}! We have received your booking for ${phone}. Our Solapur dispatch unit will reach out within 15 minutes.`);
      modalForm.reset();
      if (quoteModal) quoteModal.classList.remove('active');
    });
  }

});
