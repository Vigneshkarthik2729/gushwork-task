


(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (!hamburger || !mobileNav) return;

  function toggle() {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  hamburger.addEventListener('click', toggle);

  hamburger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
})();



(function initCarousel() {

  
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop',
      alt: 'Workers laying HDPE pipes on construction site'
    },
    {
      src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&auto=format&fit=crop',
      alt: 'HDPE pipe coils stored in warehouse'
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop',
      alt: 'Industrial pipeline installation overhead view'
    },
  ];

  
  const mainImg    = document.getElementById('mainImg');
  const mainWrap   = document.getElementById('mainImgWrap');
  const thumbsRow  = document.getElementById('thumbsRow');
  const prevBtn    = document.getElementById('prevBtn');
  const nextBtn    = document.getElementById('nextBtn');

  if (!mainImg || !thumbsRow || !prevBtn || !nextBtn) return;

  let current  = 0;
  let autoplay = null;

  
  mainImg.style.transition = 'opacity 0.25s ease, transform 0.3s ease';

  
  // images.forEach(function (imgData, i) {
  //   const thumb = document.createElement('div');
  //   thumb.className    = 'hero__thumb' + (i === 0 ? ' active' : '');
  //   thumb.setAttribute('role', 'listitem');
  //   thumb.setAttribute('tabindex', '0');
  //   thumb.setAttribute('aria-label', 'View product image ' + (i + 1));

  //   const img    = document.createElement('img');
  //   img.src      = imgData.src;
  //   img.alt      = imgData.alt;
  //   img.loading  = 'lazy';

  //   thumb.appendChild(img);

  //   thumb.addEventListener('click', function () { goTo(i); });

  //   thumb.addEventListener('keydown', function (e) {
  //     if (e.key === 'Enter' || e.key === ' ') {
  //       e.preventDefault();
  //       goTo(i);
  //     }
  //   });

  //   thumbsRow.appendChild(thumb);
  // });

  
  function goTo(index) {
    current = (index + images.length) % images.length;

    
    mainImg.style.opacity   = '0';
    mainImg.style.transform = 'scale(1.03)';

    setTimeout(function () {
      mainImg.src = images[current].src;
      mainImg.alt = images[current].alt;

      
      mainImg.style.opacity   = '1';
      mainImg.style.transform = 'scale(1)';
    }, 180);

    
    document.querySelectorAll('.hero__thumb').forEach(function (thumb, i) {
      thumb.classList.toggle('active', i === current);
    });
  }

  
  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  
  function startAutoplay() {
    autoplay = setInterval(function () { goTo(current + 1); }, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
    autoplay = null;
  }

  startAutoplay();

  
  mainWrap.addEventListener('mouseenter', stopAutoplay);
  mainWrap.addEventListener('mouseleave', startAutoplay);

  
  mainWrap.addEventListener('touchstart', stopAutoplay, { passive: true });
  mainWrap.addEventListener('touchend',   startAutoplay, { passive: true });

  
  document.addEventListener('keydown', function (e) {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  
  let touchStartX = 0;

  mainWrap.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  mainWrap.addEventListener('touchend', function (e) {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

})();



(function () {
  'use strict';

  
  
  var rows = document.querySelectorAll('.specs-table__row');

  rows.forEach(function (row) {

    row.addEventListener('focus', function () {
      row.style.background = 'rgba(59, 114, 255, 0.10)';
    });

    row.addEventListener('blur', function () {
      row.style.background = '';
    });

  });

})();



(function () {
  'use strict';

  
  var faqList = document.getElementById('faqList');
  if (!faqList) return;

  var questions = faqList.querySelectorAll('.faq__question');

  
  var firstAnswer = document.getElementById('faq-answer-1');
  if (firstAnswer) {
    firstAnswer.classList.add('open');
  }

  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';
      var answerId   = btn.getAttribute('aria-controls');
      var answer     = document.getElementById(answerId);

      
      questions.forEach(function (otherBtn) {
        var otherId     = otherBtn.getAttribute('aria-controls');
        var otherAnswer = document.getElementById(otherId);

        otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAnswer) {
          otherAnswer.classList.remove('open');
        }
      });

      
      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) {
          answer.classList.add('open');
        }
      }
    });

    
    btn.addEventListener('keydown', function (e) {
      var items = Array.from(questions);
      var idx   = items.indexOf(btn);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var next = items[idx + 1];
        if (next) next.focus();
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = items[idx - 1];
        if (prev) prev.focus();
      }

      if (e.key === 'Home') {
        e.preventDefault();
        items[0].focus();
      }

      if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1].focus();
      }
    });
  });


  
  var catalogueBtn   = document.getElementById('catalogueBtn');
  var catalogueInput = document.getElementById('catalogueEmail');

  if (catalogueBtn && catalogueInput) {

    catalogueBtn.addEventListener('click', function () {
      var email = catalogueInput.value.trim();

      
      if (!email || !isValidEmail(email)) {
        catalogueInput.focus();
        catalogueInput.style.borderColor = '#E53E3E';
        catalogueInput.style.boxShadow   = '0 0 0 3px rgba(229,62,62,0.15)';

        setTimeout(function () {
          catalogueInput.style.borderColor = '';
          catalogueInput.style.boxShadow   = '';
        }, 2000);

        return;
      }

      
      var originalText = catalogueBtn.textContent;
      catalogueBtn.textContent = 'Sent!';
      catalogueBtn.disabled    = true;
      catalogueInput.value     = '';

      

      setTimeout(function () {
        catalogueBtn.textContent = originalText;
        catalogueBtn.disabled    = false;
      }, 3000);
    });

    
    catalogueInput.addEventListener('input', function () {
      catalogueInput.style.borderColor = '';
      catalogueInput.style.boxShadow   = '';
    });

    
    catalogueInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        catalogueBtn.click();
      }
    });
  }


  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

})();



(function () {
  'use strict';

  var track    = document.getElementById('appTrack');
  var prevBtn  = document.getElementById('prevSlide');
  var nextBtn  = document.getElementById('nextSlide');

  if (!track || !prevBtn || !nextBtn) return;

  var cards        = Array.from(track.querySelectorAll('.app-card'));
  var totalCards   = cards.length;
  var currentIndex = 1;   

  
  function getVisible() {
    var w = window.innerWidth;
    if (w <= 360) return 1;
    if (w <= 600) return 2;
    if (w <= 800) return 2;
    if (w <= 1080) return 3;
    return 4;
  }

  
  function getCardStep() {
    if (!cards[0]) return 0;
    var style   = window.getComputedStyle(track);
    var gap     = parseFloat(style.gap) || 20;
    var rect    = cards[0].getBoundingClientRect();
    return rect.width + gap;
  }

  
  function applyTransform() {
    var step = getCardStep();
    track.style.transform = 'translateX(-' + (currentIndex * step) + 'px)';
  }

  
  function updateActive() {
    cards.forEach(function (card, i) {
      card.classList.toggle('app-card--active', i === currentIndex);
    });
  }

  
  function updateButtons() {
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= totalCards - getVisible();
  }

  
  function goTo(index) {
    var maxIndex = totalCards - getVisible();
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    applyTransform();
    updateActive();
    updateButtons();
  }

  
  prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

  
  cards.forEach(function (card, i) {
    card.addEventListener('click', function () {
      goTo(i);
    });
  });

  
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      goTo(currentIndex);
    }, 80);
  });

  
  var touchStartX = 0;
  var touchStartY = 0;

  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;

    
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) {
        goTo(currentIndex + 1);
      } else {
        goTo(currentIndex - 1);
      }
    }
  }, { passive: true });

  
  document.addEventListener('keydown', function (e) {
    var active = document.activeElement;
    if (active === prevBtn || active === nextBtn) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1); }
    }
  });

  
  goTo(currentIndex);

})();



(function () {
  'use strict';

  
  var steps = [
    {
      label   : 'Raw Material',
      title   : 'High-Grade Raw Material Selection',
      desc    : 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.',
      bullets : ['PE100 grade material', 'Optimal molecular weight distribution'],
      images  : [
        { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop', alt: 'Raw material for HDPE pipes' },
        { src: 'https://images.unsplash.com/photo-1581094480808-93c5e83f4a0c?w=700&auto=format&fit=crop', alt: 'PE100 material selection' }
      ]
    },
    {
      label   : 'Extrusion',
      title   : 'Precision Extrusion Process',
      desc    : 'Molten PE100 compound is extruded through a precision die to form the pipe profile with exact wall thickness and diameter specifications.',
      bullets : ['Single-screw extruder technology', 'Temperature-controlled barrel zones'],
      images  : [
        { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=700&auto=format&fit=crop', alt: 'Pipe extrusion process' }
      ]
    },
    {
      label   : 'Cooling',
      title   : 'Controlled Cooling & Calibration',
      desc    : 'Freshly extruded pipes pass through a water-cooled calibration sleeve that locks in the final dimensions and surface finish.',
      bullets : ['Water-bath cooling system', 'Calibrated sizing sleeve'],
      images  : [
        { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop', alt: 'Pipe cooling process' }
      ]
    },
    {
      label   : 'Sizing',
      title   : 'Vacuum Sizing & Diameter Control',
      desc    : 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.',
      bullets : ['Vacuum-assisted outer diameter control', 'Real-time wall thickness monitoring'],
      images  : [
        { src: 'https://images.unsplash.com/photo-1565117879800-1b56f51ddfe3?w=700&auto=format&fit=crop', alt: 'Pipe sizing station' }
      ]
    },
    {
      label   : 'Quality Control',
      title   : 'In-Line Quality Assurance',
      desc    : 'Automated ultrasonic and laser measurement systems continuously verify dimensional compliance and detect any surface irregularities.',
      bullets : ['Ultrasonic wall thickness gauging', 'Laser diameter measurement'],
      images  : [
        { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&crop=entropy', alt: 'Quality control inspection' }
      ]
    },
    {
      label   : 'Marking',
      title   : 'Permanent Identification Marking',
      desc    : 'Each pipe receives permanent ink-jet markings showing the manufacturer, material grade, dimension, pressure rating, and production date.',
      bullets : ['ISO-compliant marking standard', 'Traceable batch identification'],
      images  : [
        { src: 'https://images.unsplash.com/photo-1581094480808-93c5e83f4a0c?w=700&auto=format&fit=crop&crop=left', alt: 'Pipe marking process' }
      ]
    },
    {
      label   : 'Cutting',
      title   : 'Precision Length Cutting',
      desc    : 'Automated cut-off saws produce clean, burr-free ends at exact specified lengths. Coil winding is available for smaller-diameter pipes.',
      bullets : ['Servo-controlled cut-off saw', 'Coil winding for small diameters'],
      images  : [
        { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=700&auto=format&fit=crop&crop=right', alt: 'Pipe cutting station' }
      ]
    },
    {
      label   : 'Packaging',
      title   : 'Safe & Efficient Packaging',
      desc    : 'Finished pipes are bundled, strapped, and labelled for safe handling and transport. End caps protect the pipe bore during shipping.',
      bullets : ['Polyester strap bundling', 'UV-stabilized end caps'],
      images  : [
        { src: 'https://images.unsplash.com/photo-1565117879800-1b56f51ddfe3?w=700&auto=format&fit=crop&crop=right', alt: 'HDPE pipe packaging' }
      ]
    }
  ];

  var TOTAL = steps.length;

  
  var tabsEl       = document.getElementById('processTabs');
  var stepLabelEl  = document.getElementById('processStepLabel');
  var titleEl      = document.getElementById('processText') && document.querySelector('.process__step-title');
  var descEl       = document.querySelector('.process__step-desc');
  var bulletsEl    = document.getElementById('processBullets');
  var imgEl        = document.getElementById('processImg');
  var imgPrevBtn   = document.getElementById('processImgPrev');
  var imgNextBtn   = document.getElementById('processImgNext');
  var prevStepBtn  = document.getElementById('processPrevStep');
  var nextStepBtn  = document.getElementById('processNextStep');

  if (!tabsEl || !imgEl) return;

  var tabs          = Array.from(tabsEl.querySelectorAll('.process__tab'));
  var currentStep   = 0;
  var currentImg    = 0;

  
  function renderStep(stepIdx) {
    var step = steps[stepIdx];

    
    tabs.forEach(function (tab, i) {
      tab.classList.toggle('process__tab--active', i === stepIdx);
      tab.setAttribute('aria-selected', i === stepIdx ? 'true' : 'false');
    });

    
    if (stepLabelEl) {
      stepLabelEl.textContent = 'Step ' + (stepIdx + 1) + '/' + TOTAL + ': ' + step.label;
    }

    
    if (titleEl) titleEl.textContent = step.title;
    if (descEl)  descEl.textContent  = step.desc;

    
    if (bulletsEl) {
      bulletsEl.innerHTML = '';
      step.bullets.forEach(function (b) {
        var li = document.createElement('li');
        li.textContent = b;
        bulletsEl.appendChild(li);
      });
    }

    
    if (prevStepBtn) prevStepBtn.disabled = stepIdx === 0;
    if (nextStepBtn) nextStepBtn.disabled = stepIdx === TOTAL - 1;

    
    currentImg = 0;
    renderImage(stepIdx, 0);
  }

  
  function renderImage(stepIdx, imgIdx) {
    var step = steps[stepIdx];
    var img  = step.images[imgIdx] || step.images[0];

    imgEl.classList.add('fade');

    setTimeout(function () {
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      imgEl.classList.remove('fade');
    }, 200);

    
    if (imgPrevBtn) imgPrevBtn.style.display = step.images.length > 1 ? '' : 'none';
    if (imgNextBtn) imgNextBtn.style.display = step.images.length > 1 ? '' : 'none';
  }

  
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var idx = parseInt(tab.getAttribute('data-step'), 10);
      currentStep = idx;
      renderStep(currentStep);
    });
  });

  
  if (imgPrevBtn) {
    imgPrevBtn.addEventListener('click', function () {
      var imgs = steps[currentStep].images;
      currentImg = (currentImg - 1 + imgs.length) % imgs.length;
      renderImage(currentStep, currentImg);
    });
  }

  if (imgNextBtn) {
    imgNextBtn.addEventListener('click', function () {
      var imgs = steps[currentStep].images;
      currentImg = (currentImg + 1) % imgs.length;
      renderImage(currentStep, currentImg);
    });
  }

  
  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', function () {
      if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
      }
    });
  }

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', function () {
      if (currentStep < TOTAL - 1) {
        currentStep++;
        renderStep(currentStep);
      }
    });
  }

  
  tabsEl.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      currentStep = Math.min(currentStep + 1, TOTAL - 1);
      renderStep(currentStep);
      tabs[currentStep].focus();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      currentStep = Math.max(currentStep - 1, 0);
      renderStep(currentStep);
      tabs[currentStep].focus();
    }
  });

  
  renderStep(0);

})();



(function () {
  'use strict';

  var track    = document.getElementById('testTrack');
  var dotsWrap = document.getElementById('testiDots');

  if (!track || !dotsWrap) return;

  var cards      = Array.from(track.querySelectorAll('.testi-card'));
  var total      = cards.length;
  var current    = 0;
  var autoTimer  = null;

  
  function getVisible() {
    var w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 800) return 2;
    if (w <= 1200) return 3;
    return 4;
  }

  
  function getStep() {
    if (!cards[0]) return 0;
    var gap  = parseFloat(window.getComputedStyle(track).gap) || 20;
    return cards[0].getBoundingClientRect().width + gap;
  }

  
  function maxIndex() {
    return Math.max(0, total - getVisible());
  }

  
  function applyTransform() {
    track.style.transform = 'translateX(-' + (current * getStep()) + 'px)';
  }

  
  function updateDots() {
    var dots = dotsWrap.querySelectorAll('.testi-dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  
  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    applyTransform();
    updateDots();
  }

  
  function buildDots() {
    dotsWrap.innerHTML = '';
    var count = maxIndex() + 1;
    for (var i = 0; i < count; i++) {
      (function (idx) {
        var btn = document.createElement('button');
        btn.className = 'testi-dot' + (idx === 0 ? ' active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
        btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        btn.addEventListener('click', function () {
          stopAuto();
          goTo(idx);
          startAuto();
        });
        dotsWrap.appendChild(btn);
      })(i);
    }
  }

  
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      var next = current + 1 > maxIndex() ? 0 : current + 1;
      goTo(next);
    }, 4500);
  }

  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  
  var touchX = 0;
  var touchY = 0;

  track.addEventListener('touchstart', function (e) {
    touchX = e.changedTouches[0].clientX;
    touchY = e.changedTouches[0].clientY;
    stopAuto();
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      goTo(dx < 0 ? current + 1 : current - 1);
    }
    startAuto();
  }, { passive: true });

  
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
  });

  
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      buildDots();
      goTo(current);
    }, 80);
  });

  
  buildDots();
  goTo(0);
  startAuto();

})();



(function () {
  'use strict';

  
  var learnBtns = document.querySelectorAll('.portfolio-card__btn');

  learnBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card  = btn.closest('.portfolio-card');
      var title = card ? card.querySelector('.portfolio-card__title') : null;
      var name  = title ? title.textContent.trim() : 'this product';

      
      console.log('Learn More clicked:', name);
    });
  });


  
  var expertBtn = document.getElementById('talkExpertBtn');

  if (expertBtn) {
    expertBtn.addEventListener('click', function () {
      
      console.log('Talk to an Expert clicked');
    });
  }


  
  var cards = document.querySelectorAll('.portfolio-card');

  if ('IntersectionObserver' in window && cards.length) {

    cards.forEach(function (card) {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    cards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.08) + 's';
      observer.observe(card);
    });
  }

})();



(function () {
  'use strict';

  var downloadBtns = document.querySelectorAll('.resources__download-btn');

  downloadBtns.forEach(function (btn) {

    btn.addEventListener('click', function () {
      if (btn.classList.contains('loading')) return;

      var fileName = btn.getAttribute('data-file') || 'document.pdf';
      var originalHTML = btn.innerHTML;

      
      btn.classList.add('loading');
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" style="animation:spin 1s linear infinite;width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="9" stroke-dasharray="28" stroke-dashoffset="8"/>' +
        '</svg> Downloading…';

      

      
      setTimeout(function () {
        btn.classList.remove('loading');
        btn.innerHTML = originalHTML;
      }, 1500);
    });

  });

})();



(function () {
  'use strict';

  var form       = document.getElementById('ctaForm');
  var submitBtn  = document.getElementById('ctaSubmit');

  if (!form || !submitBtn) return;

  var nameInput  = document.getElementById('ctaFullName');
  var emailInput = document.getElementById('ctaEmail');

  
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function setError(input, hasError) {
    if (!input) return;
    input.classList.toggle('error', hasError);
  }

  function clearError(input) {
    if (input) input.classList.remove('error');
  }

  
  [nameInput, emailInput].forEach(function (el) {
    if (el) {
      el.addEventListener('input', function () { clearError(el); });
    }
  });

  
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameVal  = nameInput  ? nameInput.value.trim()  : '';
    var emailVal = emailInput ? emailInput.value.trim() : '';

    var valid = true;

    if (!nameVal) {
      setError(nameInput, true);
      valid = false;
    }

    if (!emailVal || !isValidEmail(emailVal)) {
      setError(emailInput, true);
      valid = false;
    }

    if (!valid) {
      
      var firstError = form.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.style.animation = 'none';
        firstError.offsetHeight;   
        firstError.style.animation = 'shake 0.35s ease';
      }
      return;
    }

    
    var originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending…';

    

    setTimeout(function () {
      submitBtn.classList.remove('loading');
      submitBtn.textContent = '✓ Request Sent!';

      setTimeout(function () {
        submitBtn.textContent = originalText;
        form.reset();
      }, 3000);
    }, 1800);
  });

})();



(function () {
  'use strict';

  
  var copyrightEl = document.querySelector('.footer__copyright');
  if (copyrightEl) {
    var currentYear = new Date().getFullYear();
    copyrightEl.innerHTML = copyrightEl.innerHTML.replace('2025', currentYear);
  }

  
  var socialBtns = document.querySelectorAll('.footer__social-btn');
  socialBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var label = btn.getAttribute('aria-label') || 'Social';
      
      console.log('Social click:', label);
    });
  });

  
  var footerLinks = document.querySelectorAll('.footer__col-list a[href^="#"]');
  footerLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  
  var quoteModal = document.getElementById('quoteModal');
  var modalCloseBtn = document.getElementById('modalCloseBtn');
  var quoteOverlay = document.getElementById('quoteOverlay');
  var quoteButtons = document.querySelectorAll('.btn-primary');
  var quoteForm = document.getElementById('quoteForm');

  function openQuoteModal() {
    if (!quoteModal) return;
    quoteModal.classList.add('open');
    quoteModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstInput = quoteModal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeQuoteModal() {
    if (!quoteModal) return;
    quoteModal.classList.remove('open');
    quoteModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  quoteButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openQuoteModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQuoteModal);
  if (quoteOverlay) quoteOverlay.addEventListener('click', closeQuoteModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('open')) {
      closeQuoteModal();
    }
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submit = quoteForm.querySelector('button[type="submit"]');
      if (submit) {
        submit.textContent = 'Submitting…';
        submit.disabled = true;
      }

      setTimeout(function () {
        if (submit) {
          submit.textContent = 'Request Sent!';
          submit.disabled = false;
        }
        quoteForm.reset();
        closeQuoteModal();
      }, 1200);
    });
  }

  /* ───────────────────────────────────────────────────────── */
  /* MODAL-2: Request Datasheet Modal */
  /* ───────────────────────────────────────────────────────── */

  var modal2 = document.getElementById('modal2');
  var modal2CloseBtn = document.getElementById('modal2CloseBtn');
  var modal2Overlay = document.getElementById('modal2Overlay');
  var modal2Form = document.getElementById('modal2Form');
  var downloadBtn = document.getElementById('downloadBtn');
  var quoteBtn = document.getElementById('quoteBtn');

  function openModal2() {
    if (!modal2) return;
    modal2.classList.add('open');
    modal2.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstInput = modal2.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal2() {
    if (!modal2) return;
    modal2.classList.remove('open');
    modal2.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* Attach click handlers to both buttons */
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal2();
    });
  }

  if (quoteBtn) {
    quoteBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal2();
    });
  }

  if (modal2CloseBtn) modal2CloseBtn.addEventListener('click', closeModal2);
  if (modal2Overlay) modal2Overlay.addEventListener('click', closeModal2);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal2 && modal2.classList.contains('open')) {
      closeModal2();
    }
  });

  if (modal2Form) {
    modal2Form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submit = modal2Form.querySelector('button[type="submit"]');
      if (submit) {
        submit.textContent = 'Downloading…';
        submit.disabled = true;
      }

      setTimeout(function () {
        if (submit) {
          submit.textContent = 'Download Started!';
          submit.disabled = false;
        }
        modal2Form.reset();
        closeModal2();
      }, 1200);
    });
  }

})();
