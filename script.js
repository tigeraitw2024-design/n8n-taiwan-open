/* ===================================================
   n8n Taiwan Open Hackathon - Interactions
   =================================================== */

(function () {
  'use strict';

  // ---------- Nav scroll effect ----------
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // ---------- Mobile menu toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    });
  }


  // ---------- Active nav link on scroll ----------
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = Array.from(navLinks).map(function (link) {
    const id = link.getAttribute('href').replace('#', '');
    return { link: link, section: document.getElementById(id) };
  }).filter(function (item) { return item.section; });

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = null;

    sections.forEach(function (item) {
      if (item.section.offsetTop <= scrollPos) {
        current = item;
      }
    });

    navLinks.forEach(function (link) { link.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  // ---------- Countdown timer ----------
  // Target: 2026-06-05 10:00:00 Asia/Taipei (UTC+8)
  const targetDate = new Date('2026-06-05T10:00:00+08:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  if (daysEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('open');
      });

      // Open current (if was closed)
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });


  // ---------- Scroll reveal (for sections) ----------
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });


  // ---------- Stats counter animation ----------
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);

      el.textContent = current.toLocaleString() + (progress === 1 ? suffix : '');

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function (el) { statObserver.observe(el); });


  // ---------- Criteria bar animation ----------
  const criteriaItems = document.querySelectorAll('.criteria-item');

  const criteriaObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        criteriaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  criteriaItems.forEach(function (el) { criteriaObserver.observe(el); });


  // ---------- Smooth anchor scroll (with offset for fixed nav) ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 80;
      const offset = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    });
  });


  // ---------- Footer form (placeholder) ----------
  const footerForm = document.querySelector('.footer-form');
  if (footerForm) {
    footerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input');
      if (input && input.value) {
        alert('感謝訂閱！我們會在活動有更新時通知你。\n\n（這是示範功能，實際送出請接 Mailchimp / ConvertKit）');
        input.value = '';
      }
    });
  }


  // ====================================================
  //  REGISTRATION FORMS (Teacher + Student)
  // ====================================================

  // ⬇️ 部署 Apps Script Web App 後，把 URL 貼到這裡
  //    格式：https://script.google.com/macros/s/xxxxxxxxxx/exec
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfKUjF05Im6Lsum9-wbfQupUXCHP6cC3lBNoMqFz2lbbUDVZ6-DQovEOuP7r5YXlgZzQ/exec';

  const teacherFormModal = document.getElementById('teacherFormModal');
  const studentFormModal = document.getElementById('studentFormModal');

  function openFormModal(type) {
    const modal = type === 'teacher' ? teacherFormModal : studentFormModal;
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus first input
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 300);
  }

  function closeFormModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    // After close animation, reset form
    setTimeout(function () {
      const form = modal.querySelector('.reg-form');
      const success = modal.querySelector('.form-success');
      if (form) {
        form.reset();
        form.hidden = false;
        // Reset conditional sections
        modal.querySelectorAll('[data-show-when]').forEach(function (sec) {
          sec.hidden = true;
        });
        // Reset error
        const errorEl = form.querySelector('.form-error');
        if (errorEl) { errorEl.hidden = true; errorEl.textContent = ''; }
        // Reset submit button
        const btn = form.querySelector('.btn-submit');
        if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
      }
      if (success) success.hidden = true;
    }, 400);
  }

  // Bind triggers: every element with data-form-trigger opens the form
  document.querySelectorAll('[data-form-trigger]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const type = this.dataset.formTrigger;
      openFormModal(type);
    });
  });

  // Bind close buttons (all elements with class .form-close inside form modals)
  document.querySelectorAll('.form-modal').forEach(function (modal) {
    modal.querySelectorAll('.form-close').forEach(function (btn) {
      btn.addEventListener('click', function () { closeFormModal(modal); });
    });
    const overlay = modal.querySelector('.form-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', function () { closeFormModal(modal); });
    }
  });

  // ESC closes any open form modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.form-modal.open').forEach(function (m) {
        closeFormModal(m);
      });
    }
  });

  // ---------- Student form: conditional fields based on hasCode ----------
  const studentForm = document.getElementById('studentForm');
  if (studentForm) {
    studentForm.addEventListener('change', function (e) {
      if (e.target.name === 'hasCode') {
        const value = e.target.value; // 'yes' or 'no'
        // Show/hide sections based on data-show-when attr
        studentForm.querySelectorAll('[data-show-when]').forEach(function (sec) {
          const rule = sec.dataset.showWhen; // e.g., "hasCode:yes", "hasCode:no", "hasCode:any"
          const [key, target] = rule.split(':');
          if (key !== 'hasCode') return;
          if (target === 'any' || target === value) {
            sec.hidden = false;
          } else {
            sec.hidden = true;
          }
        });

        // Toggle required state on fields inside conditional sections
        studentForm.querySelectorAll('.form-section').forEach(function (sec) {
          const inputs = sec.querySelectorAll('input[name], select[name], textarea[name]');
          const isVisible = !sec.hidden;
          inputs.forEach(function (input) {
            if (input.name === 'hasCode') return;
            // Mark required only if field has a label with .req and section is visible
            const label = sec.querySelector('label[for="' + input.id + '"]');
            const hasReq = label && label.querySelector('.req');
            if (hasReq && isVisible) {
              input.setAttribute('required', '');
            } else {
              input.removeAttribute('required');
            }
          });
        });
      }
    });
  }

  // ---------- Form submission ----------
  function handleFormSubmit(form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formType = form.dataset.formType; // 'teacher' or 'student'
      const modal = form.closest('.form-modal');
      const errorEl = form.querySelector('.form-error');
      const successEl = modal.querySelector('.form-success');
      const submitBtn = form.querySelector('.btn-submit');

      // Reset error state
      errorEl.hidden = true;
      errorEl.textContent = '';

      // Validate all visible required fields
      const visibleRequired = Array.from(form.querySelectorAll('[required]')).filter(function (el) {
        const section = el.closest('.form-section, .form-toggle-group');
        return !section || !section.hidden;
      });

      for (const field of visibleRequired) {
        if (!field.value || (field.type === 'radio' && !form.querySelector('input[name="' + field.name + '"]:checked'))) {
          errorEl.textContent = '請填寫所有必填欄位';
          errorEl.hidden = false;
          field.focus();
          return;
        }
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          errorEl.textContent = 'Email 格式不正確，請檢查';
          errorEl.hidden = false;
          field.focus();
          return;
        }
      }

      // Collect form data into object
      const formData = new FormData(form);
      const payload = { formType: formType };
      formData.forEach(function (value, key) {
        payload[key] = value;
      });

      // For student form, determine actual form type based on hasCode
      if (formType === 'student') {
        payload.formType = payload.hasCode === 'yes' ? 'student-register' : 'student-interest';
      }

      // Set loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Check if Apps Script URL is set
      if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL') {
        // Development mode: simulate success after delay
        console.log('⚠️ Apps Script URL 未設定，模擬送出。收到的資料：', payload);
        setTimeout(function () {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          form.hidden = true;
          successEl.hidden = false;
        }, 1200);
        return;
      }

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // text/plain avoids CORS preflight
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.ok) {
          // Success
          form.hidden = true;
          successEl.hidden = false;
        } else {
          // Server-side error (e.g., invalid referral code)
          errorEl.textContent = result.message || '送出失敗，請稍後再試';
          errorEl.hidden = false;
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      } catch (err) {
        console.error('表單送出錯誤：', err);
        errorEl.textContent = '網路連線問題，請檢查網路後重試';
        errorEl.hidden = false;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  }

  document.querySelectorAll('.reg-form').forEach(function (form) {
    handleFormSubmit(form);
  });


  // ---------- Feature Card Modal ----------
  const modal = document.getElementById('featureModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalIcon = document.getElementById('modalIcon');
  const modalBody = document.getElementById('modalBody');
  const modalClose = modal ? modal.querySelector('.modal-close') : null;
  const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

  function openFeatureModal(card) {
    if (!modal || !card) return;

    const modalId = card.dataset.modal;
    const template = document.getElementById('modal-' + modalId);
    if (!template) return;

    const title = card.querySelector('.feature-title');
    const icon = card.querySelector('.feature-icon');

    if (title && modalTitle) modalTitle.textContent = title.textContent;
    if (icon && modalIcon) modalIcon.innerHTML = icon.innerHTML;
    if (modalBody) {
      modalBody.innerHTML = '';
      modalBody.appendChild(template.content.cloneNode(true));
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Re-render lucide icons that were just inserted
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeFeatureModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // Attach click handler to all feature cards (cards themselves are clickable)
  document.querySelectorAll('.feature-card[data-modal]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Don't intercept if clicking a nested link/button that isn't the "more" button
      openFeatureModal(card);
    });
    card.style.cursor = 'pointer';
  });

  // Close handlers
  if (modalClose) modalClose.addEventListener('click', closeFeatureModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeFeatureModal);

  // Escape key to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeFeatureModal();
    }
  });


  // ---------- Hero Workflow Node Cycling ----------
  // Each node randomly cycles through a pool of services
  // to visually express "n8n can connect to anything"
  const nodeServicePools = [
    // Node 0 — Trigger (top)
    [
      { title: 'Trigger',     sub: 'On schedule',    color: '#F0648C' },
      { title: 'Webhook',     sub: 'On HTTP POST',   color: '#8B5CF6' },
      { title: 'Form',        sub: 'On submit',      color: '#10B981' },
      { title: 'Chat',        sub: 'Message in',     color: '#0EA5E9' },
      { title: 'Email',       sub: 'New message',    color: '#EF4444' },
      { title: 'Schedule',    sub: 'Every 10 min',   color: '#F59E0B' }
    ],
    // Node 1 — Integration
    [
      { title: 'HTTP Req',    sub: 'Fetch data',     color: '#B8A1E3' },
      { title: 'Gmail',       sub: 'Send email',     color: '#EF4444' },
      { title: 'Slack',       sub: 'Post message',   color: '#4F46E5' },
      { title: 'Notion',      sub: 'Create page',    color: '#6B7280' },
      { title: 'Airtable',    sub: 'Add record',     color: '#F59E0B' },
      { title: 'GitHub',      sub: 'Create issue',   color: '#1F2937' },
      { title: 'Calendar',    sub: 'New event',      color: '#3B82F6' },
      { title: 'Stripe',      sub: 'New payment',    color: '#635BFF' }
    ],
    // Node 2 — AI
    [
      { title: 'AI Agent',    sub: 'OpenAI GPT',     color: '#10B981' },
      { title: 'Claude',      sub: 'Anthropic',      color: '#D97706' },
      { title: 'Gemini',      sub: 'Google AI',      color: '#4285F4' },
      { title: 'Ollama',      sub: 'Local LLM',      color: '#6366F1' },
      { title: 'Mistral',     sub: 'AI Chat',        color: '#FF7000' },
      { title: 'RAG Chain',   sub: 'Vector search',  color: '#EC4899' },
      { title: 'Vision AI',   sub: 'Image analyze',  color: '#14B8A6' }
    ],
    // Node 3 — Storage (left branch)
    [
      { title: 'Sheets',      sub: 'Append row',     color: '#0F9D58' },
      { title: 'Notion DB',   sub: 'Save page',      color: '#6B7280' },
      { title: 'Airtable',    sub: 'Add record',     color: '#F59E0B' },
      { title: 'MongoDB',     sub: 'Insert doc',     color: '#10B981' },
      { title: 'Postgres',    sub: 'Insert row',     color: '#336791' },
      { title: 'Supabase',    sub: 'Save record',    color: '#3ECF8E' },
      { title: 'S3',          sub: 'Upload file',    color: '#FF9900' }
    ],
    // Node 4 — Notification (right branch)
    [
      { title: 'Line Bot',    sub: 'Send notify',    color: '#00C300' },
      { title: 'Discord',     sub: 'Post channel',   color: '#5865F2' },
      { title: 'WhatsApp',    sub: 'Send message',   color: '#25D366' },
      { title: 'Slack',       sub: 'Notify team',    color: '#4F46E5' },
      { title: 'Telegram',    sub: 'Send alert',     color: '#0EA5E9' },
      { title: 'Teams',       sub: 'Post to chat',   color: '#7B83EB' },
      { title: 'Twilio',      sub: 'Send SMS',       color: '#F22F46' }
    ]
  ];

  function cycleHeroNode(nodeIndex) {
    const node = document.querySelector('.wf-node[data-node-index="' + nodeIndex + '"]');
    if (!node) return;

    const pool = nodeServicePools[nodeIndex];
    if (!pool || pool.length < 2) return;

    const currentIdx = parseInt(node.dataset.currentService || '0', 10);
    let nextIdx = Math.floor(Math.random() * pool.length);
    // avoid picking the same one twice in a row
    let guard = 0;
    while (nextIdx === currentIdx && guard < 5) {
      nextIdx = Math.floor(Math.random() * pool.length);
      guard++;
    }

    node.dataset.currentService = nextIdx;
    const service = pool[nextIdx];

    const titleEl = node.querySelector('.wf-node-title');
    const subEl = node.querySelector('.wf-node-sub');
    const dotEl = node.querySelector('.wf-node-dot');

    // Fade out text
    node.classList.add('changing');

    setTimeout(function () {
      if (titleEl) titleEl.textContent = service.title;
      if (subEl) subEl.textContent = service.sub;
      if (dotEl) dotEl.setAttribute('fill', service.color);
      node.classList.remove('changing');
      // Flash border briefly
      node.classList.add('flash');
      setTimeout(function () { node.classList.remove('flash'); }, 400);
    }, 250);
  }

  // Start cycling each node with staggered intervals
  // so they don't all change at the same moment
  function startNodeCycling() {
    const baseInterval = 2800;
    nodeServicePools.forEach(function (_, i) {
      // First change starts earlier for more life
      setTimeout(function () {
        cycleHeroNode(i);
      }, 2000 + i * 600);

      // Then keep cycling with unique intervals per node
      const interval = baseInterval + i * 450;
      setInterval(function () {
        cycleHeroNode(i);
      }, interval);
    });
  }

  // Only start if SVG is in view (avoid wasting CPU)
  const heroVisual = document.querySelector('.workflow-svg');
  if (heroVisual) {
    // Start after a delay so initial animation finishes
    setTimeout(startNodeCycling, 2500);
  }


})();
