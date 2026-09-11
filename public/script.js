/* ==========================================================================
   DSG GEARBOX DOCTOR - MASTER JQUERY & VANILLA JS ENGINE
   Interactive Systems:
   1. Mouse-Reactive Ambient Particle / Glow Physics
   2. Glassmorphism Sticky Navbar & Elevation
   3. Mobile Navigation Slide-Out Drawer & Backdrop
   4. Live Numerical Trust Metric Counters
   5. Dual Infinite Marquee Touch & Hover Handlers
   6. Interactive FAQ Accordion with Auto-Close
   7. High-Converting Booking Funnel & On-Screen Confirmation
   8. Video & Diagnostic Interactive Modal Controller
   9. Blog Category Filter System
   10. Live Instagram Simulated Hearts & Likes
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. MOUSE-REACTIVE AMBIENT BACKGROUND (Desktop Glow & Canvas Mesh)
     ------------------------------------------------------------------------ */
  const glowFollower = document.getElementById('ambientGlowFollower');
  const canvas = document.getElementById('ambientCanvas');

  if (glowFollower) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth physics damping interpolation loop
    function animateGlow() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      glowFollower.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);
  }

  // Subtle Automotive Gear Particle Mesh Canvas
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(width > 768 ? 40 : 20, 50);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.3 ? 'rgba(229, 9, 20, 0.4)' : 'rgba(229, 9, 20, 0.3)',
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.1 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderParticles);
    }
    requestAnimationFrame(renderParticles);
  }

  /* ------------------------------------------------------------------------
     2. FIXED GLASSMORPHISM NAVBAR ELEVATION ON SCROLL
     ------------------------------------------------------------------------ */
  const header = document.querySelector('.site-header');
  function checkHeaderScroll() {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', checkHeaderScroll, { passive: true });
  checkHeaderScroll();

  /* ------------------------------------------------------------------------
     3. JQUERY MOBILE SLIDE-OUT DRAWER MENU & BACKDROP
     ------------------------------------------------------------------------ */
  if (window.jQuery) {
    const $ = window.jQuery;

    const $mobileToggle = $('#mobileToggle');
    const $mobileDrawer = $('#mobileDrawer');
    const $drawerBackdrop = $('#drawerBackdrop');
    const $mobileSubmenuToggles = $('.mobile-has-submenu > a');

    function openDrawer() {
      $mobileDrawer.addClass('open');
      $drawerBackdrop.addClass('active');
      $mobileToggle.addClass('active').attr('aria-expanded', 'true');
      $('body').css('overflow', 'hidden');
    }

    function closeDrawer() {
      $mobileDrawer.removeClass('open');
      $drawerBackdrop.removeClass('active');
      $mobileToggle.removeClass('active').attr('aria-expanded', 'false');
      $('body').css('overflow', '');
    }

    $mobileToggle.on('click', function (e) {
      e.preventDefault();
      if ($mobileDrawer.hasClass('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    $drawerBackdrop.on('click', closeDrawer);
    $('.mobile-drawer-close').on('click', closeDrawer);

    // Escape Key Closes Drawer & Modals
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrawer();
        closeModal();
      }
    });

    // Submenu Toggle inside Mobile Drawer
    $mobileSubmenuToggles.on('click', function (e) {
      e.preventDefault();
      const $submenu = $(this).siblings('.mobile-submenu');
      $submenu.slideToggle(200);
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
    });

    /* ------------------------------------------------------------------------
       4. DYNAMIC TRUST METRICS: ANIMATED LIVE COUNTERS (INTERSECTION OBSERVER)
       ------------------------------------------------------------------------ */
    let countersAnimated = false;
    const $metricsSection = $('#trustMetrics');

    function animateCounters() {
      if (countersAnimated || !$metricsSection.length) return;

      const rect = $metricsSection[0].getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        countersAnimated = true;

        $('.metric-number').each(function () {
          const $this = $(this);
          const target = parseInt($this.attr('data-target'), 10);
          const duration = 2000;
          const startTime = performance.now();

          function updateNumber(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            $this.text(current.toLocaleString());

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              $this.text(target.toLocaleString());
            }
          }
          requestAnimationFrame(updateNumber);
        });
      }
    }

    $(window).on('scroll', animateCounters);
    animateCounters(); // Initial check

    /* ------------------------------------------------------------------------
       5. INTERACTIVE FAQ ACCORDION (.slideToggle() + Chevron Rotation)
       ------------------------------------------------------------------------ */
    $('.faq-header').on('click', function () {
      const $item = $(this).closest('.faq-item');
      const $body = $item.find('.faq-body');

      if ($item.hasClass('active')) {
        $body.slideUp(250);
        $item.removeClass('active');
        $(this).attr('aria-expanded', 'false');
      } else {
        // Auto-close siblings
        $('.faq-item.active').removeClass('active').find('.faq-body').slideUp(250);
        $('.faq-header').attr('aria-expanded', 'false');

        // Open current
        $body.slideDown(250);
        $item.addClass('active');
        $(this).attr('aria-expanded', 'true');
      }
    });

    /* ------------------------------------------------------------------------
       7. AUDIENCE TOGGLE (Retail Customer vs Trade Garage)
       ------------------------------------------------------------------------ */
    $('input[name="clientType"]').on('change', function () {
      $('.audience-card-label').removeClass('selected');
      $(this).closest('.audience-card-label').addClass('selected');

      const val = $(this).val();
      if (val === 'trade') {
        $('#tradeDiscountNote').slideDown(200);
      } else {
        $('#tradeDiscountNote').slideUp(200);
      }
    });

    /* ------------------------------------------------------------------------
       8. LEAD GENERATION CONVERSION FORM SUBMIT (No Page Reload)
       ------------------------------------------------------------------------ */
    $('#bookingFunnelForm').on('submit', function (e) {
      e.preventDefault();

      const $form = $(this);
      const $submitBtn = $form.find('button[type="submit"]');
      const $successCard = $('#bookingSuccessCard');

      // Simple visual validation
      const name = $('#bookingName').val();
      const phone = $('#bookingPhone').val();

      if (!name || !phone) {
        alert('Please fill in your name and contact phone number.');
        return;
      }

      $submitBtn.prop('disabled', true).html('<i class="fas fa-circle-notch fa-spin"></i> Processing Request...');

      setTimeout(function () {
        $form.slideUp(300, function () {
          $successCard.fadeIn(300);
        });
      }, 1000);
    });

    // Reset Form & Book Another
    $('#bookAnotherBtn').on('click', function () {
      const $form = $('#bookingFunnelForm');
      const $successCard = $('#bookingSuccessCard');
      $form[0].reset();
      $form.find('button[type="submit"]').prop('disabled', false).html('Confirm Diagnostics Booking <i class="fas fa-arrow-right"></i>');
      $successCard.hide();
      $form.slideDown(300);
    });

    /* ------------------------------------------------------------------------
       9. VIDEO / DIAGNOSTIC TOUR MODAL CONTROLLER
       ------------------------------------------------------------------------ */
    const $modalOverlay = $('#videoTourModal');

    function openModal() {
      $modalOverlay.addClass('open');
      $('body').css('overflow', 'hidden');
    }

    function closeModal() {
      $modalOverlay.removeClass('open');
      $('body').css('overflow', '');
    }

    $('.trigger-video-modal').on('click', function (e) {
      e.preventDefault();
      openModal();
    });

    $('.modal-close-btn, .modal-close-action').on('click', closeModal);

    $modalOverlay.on('click', function (e) {
      if ($(e.target).is($modalOverlay)) {
        closeModal();
      }
    });

    /* ------------------------------------------------------------------------
       10. BLOG CATEGORY FILTER (blog.html)
       ------------------------------------------------------------------------ */
    $('.blog-filter-bar .filter-chip').on('click', function () {
      $('.filter-chip').removeClass('active');
      $(this).addClass('active');

      const filter = $(this).attr('data-filter');
      const $cards = $('.blog-card');

      if (filter === 'all') {
        $cards.fadeIn(300);
      } else {
        $cards.each(function () {
          if ($(this).attr('data-category') === filter) {
            $(this).fadeIn(300);
          } else {
            $(this).fadeOut(200);
          }
        });
      }
    });

    /* ------------------------------------------------------------------------
       11. SIMULATED INSTAGRAM FEED LIKES & INTERACTION
       ------------------------------------------------------------------------ */
    $('.insta-stat.like-btn').on('click', function (e) {
      e.stopPropagation();
      const $btn = $(this);
      const $count = $btn.find('.like-count');
      let currentLikes = parseInt($count.text().replace(',', ''), 10);

      if (!$btn.hasClass('liked')) {
        $btn.addClass('liked').css('color', '#ff2e3b');
        $btn.find('i').removeClass('far fa-heart').addClass('fas fa-heart');
        $count.text((currentLikes + 1).toLocaleString());
      } else {
        $btn.removeClass('liked').css('color', '');
        $btn.find('i').removeClass('fas fa-heart').addClass('far fa-heart');
        $count.text((currentLikes - 1).toLocaleString());
      }
    });
  }

  /* ------------------------------------------------------------------------
     12. ACTIVE NAV LINK HIGHLIGHTING
     ------------------------------------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
