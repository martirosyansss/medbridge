/* MedBridge — page behaviour
   - sticky header state on scroll
   - mobile menu toggle
   - reveal-on-scroll via IntersectionObserver
   - specialty grid (render + filter + search)
   - FAQ accordion
   - apply form validation + Formspree submission
   - active-section nav link highlight
*/

(() => {
  'use strict';

  // ----------------------- specialty data -----------------------
  // Categories: surgical, cardio, neuro, womens, diagnostic, other
  const SPECIALTIES = [
    { name: 'Maxillofacial Surgery',     cats: ['surgical'],        procs: ['Rhinoplasty', 'Osteosynthesis of facial bone fractures', 'Removal of maxillofacial cysts and tumours'] },
    { name: 'Plastic & Microsurgery',    cats: ['surgical'],        procs: ['Blepharoplasty', 'Liposuction & abdominoplasty', 'Face and neck lifting'] },
    { name: 'General Surgery',           cats: ['surgical'],        procs: ['Laparoscopic cholecystectomy', 'Appendectomy', 'Hernia repair'] },
    { name: 'Laparoscopic Surgery',      cats: ['surgical'],        procs: ['Gallbladder surgery', 'Laparoscopic hernia procedures', 'Intestinal laparoscopic surgery'] },
    { name: 'Vascular Surgery',          cats: ['surgical', 'cardio'], procs: ['Varicose vein surgery', 'Carotid endarterectomy', 'Peripheral arterial surgery'] },
    { name: 'Cardiac Surgery',           cats: ['cardio', 'surgical'], procs: ['Coronary artery bypass grafting (CABG)', 'Valve replacement surgery', 'Aortic surgery'] },
    { name: 'Interventional Cardiology', cats: ['cardio'],          procs: ['Coronary angiography', 'Coronary artery stenting', 'Angioplasty'] },
    { name: 'Cardiology & Arrhythmology',cats: ['cardio'],          procs: ['Pacemaker implantation', 'Radiofrequency ablation', 'Holter monitoring & arrhythmia diagnostics'] },
    { name: 'Neurosurgery',              cats: ['neuro', 'surgical'], procs: ['Brain tumour removal', 'Spinal disc surgery', 'Craniotomies'] },
    { name: 'Vascular Neurosurgery',     cats: ['neuro', 'surgical'], procs: ['Aneurysm clipping', 'Endovascular interventions', 'Surgery for vascular malformations'] },
    { name: 'Traumatology & Orthopedics',cats: ['surgical'],        procs: ['Hip replacement', 'Knee arthroscopy', 'Fracture osteosynthesis'] },
    { name: 'Urology',                   cats: ['surgical'],        procs: ['TURP procedures', 'Laser stone fragmentation', 'Endoscopic urinary tract surgery'] },
    { name: 'Coloproctology',            cats: ['surgical'],        procs: ['Hemorrhoidectomy', 'Rectal fistula surgery', 'Intestinal tumour resections'] },
    { name: 'Endocrine Surgery',         cats: ['surgical'],        procs: ['Thyroidectomy', 'Thyroid nodule removal', 'Parathyroidectomy'] },
    { name: 'ENT Surgery',               cats: ['surgical'],        procs: ['Septoplasty', 'Endoscopic FESS surgery', 'Tonsillectomy'] },
    { name: 'Ophthalmology',             cats: ['surgical'],        procs: ['Cataract surgery', 'Laser vision correction', 'Vitreoretinal surgery'] },
    { name: 'Gynecology & Oncogynecology',cats:['womens', 'surgical'], procs: ['Hysterectomy', 'Laparoscopic ovarian surgery', 'Oncogynecological procedures'] },
    { name: 'Obstetrics',                cats: ['womens'],          procs: ['Cesarean section', 'Natural childbirth observation', 'Surgery for complicated pregnancies'] },
    { name: 'Oncology',                  cats: ['other'],           procs: ['Tumour removal surgery', 'Chemotherapy procedures', 'Biopsies & port-system procedures'] },
    { name: 'Thoracic Surgery',          cats: ['surgical'],        procs: ['Lung surgery', 'Thoracoscopic interventions', 'Mediastinal tumour resections'] },
    { name: 'Reproductive Medicine',     cats: ['womens'],          procs: ['IVF / ICSI', 'Embryo transfer', 'Follicular puncture'] },
    { name: 'Cosmetic Medicine',         cats: ['other'],           procs: ['Botox & fillers', 'Laser rejuvenation', 'Facial contouring'] },
    { name: 'Hemodialysis',              cats: ['other'],           procs: ['Hemodialysis', 'Vascular access procedures', 'Chronic kidney disease monitoring'] },
    { name: 'Diagnostic Department',     cats: ['diagnostic'],      procs: ['MRI / CT imaging', 'Endoscopy', 'Ultrasound & functional diagnostics'] },
  ];

  const CATEGORY_LABEL = {
    surgical: 'Surgical',
    cardio: 'Cardiac & Vascular',
    neuro: 'Neuro',
    womens: "Women's Health",
    diagnostic: 'Diagnostic',
    other: 'Clinical',
  };

  // ----------------------- DOM ready -----------------------
  document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initStickyHeader();
    initMobileMenu();
    initReveal();
    renderSpecialties();
    populateSpecialtySelect();
    initSpecialtyFilters();
    initFaq();
    initApplyForm();
    initActiveNav();
  });

  // ----------------------- year -----------------------
  function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ----------------------- sticky header -----------------------
  function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    let ticking = false;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    };
    update();
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  // ----------------------- mobile menu -----------------------
  function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    const iconBurger = document.getElementById('icon-burger');
    const iconClose = document.getElementById('icon-close');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
      iconBurger && iconBurger.classList.toggle('hidden', open);
      iconClose && iconClose.classList.toggle('hidden', !open);
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setOpen(false); });
  }

  // ----------------------- reveal -----------------------
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
  }

  // ----------------------- specialty render -----------------------
  function renderSpecialties() {
    const grid = document.getElementById('specialty-grid');
    if (!grid) return;
    const frag = document.createDocumentFragment();

    SPECIALTIES.forEach((s, i) => {
      const card = document.createElement('article');
      card.className = 'spec-card reveal';
      card.dataset.cats = s.cats.join(' ');
      card.dataset.name = s.name.toLowerCase();

      const num = document.createElement('p');
      num.className = 'spec-num';
      num.textContent = String(i + 1).padStart(2, '0');

      const title = document.createElement('h3');
      title.className = 'spec-title';
      title.textContent = s.name;

      const procs = document.createElement('ul');
      procs.className = 'spec-procs';
      s.procs.forEach((p) => {
        const li = document.createElement('li');
        li.textContent = p;
        procs.appendChild(li);
      });

      const tag = document.createElement('span');
      tag.className = 'spec-tag';
      tag.textContent = CATEGORY_LABEL[s.cats[0]] || 'Clinical';

      card.append(num, title, procs, tag);
      frag.appendChild(card);
    });

    grid.appendChild(frag);

    // Re-observe newly added reveal targets
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      grid.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
    }
  }

  // ----------------------- specialty select (form) -----------------------
  function populateSpecialtySelect() {
    const sel = document.getElementById('f-specialty');
    if (!sel) return;
    SPECIALTIES.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name;
      sel.appendChild(opt);
    });
    const any = document.createElement('option');
    any.value = 'Open to suggestions';
    any.textContent = 'Open to suggestions';
    sel.appendChild(any);
  }

  // ----------------------- specialty filter + search -----------------------
  function initSpecialtyFilters() {
    const chips = document.querySelectorAll('.chip[data-filter]');
    const search = document.getElementById('specialty-search');
    const empty = document.getElementById('specialty-empty');
    const grid = document.getElementById('specialty-grid');
    if (!grid) return;

    let activeFilter = 'all';
    let query = '';

    const apply = () => {
      let visible = 0;
      grid.querySelectorAll('.spec-card').forEach((card) => {
        const cats = (card.dataset.cats || '').split(' ');
        const name = card.dataset.name || '';
        const matchesFilter = activeFilter === 'all' || cats.includes(activeFilter);
        const matchesQuery = !query || name.includes(query);
        const show = matchesFilter && matchesQuery;
        card.hidden = !show;
        if (show) visible++;
      });
      if (empty) empty.classList.toggle('hidden', visible !== 0);
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('chip-active'));
        chip.classList.add('chip-active');
        activeFilter = chip.dataset.filter || 'all';
        apply();
      });
    });

    if (search) {
      search.addEventListener('input', (e) => {
        query = (e.target.value || '').trim().toLowerCase();
        apply();
      });
    }
  }

  // ----------------------- FAQ -----------------------
  function initFaq() {
    const triggers = document.querySelectorAll('.faq-trigger');
    triggers.forEach((t) => {
      t.addEventListener('click', () => {
        const open = t.getAttribute('aria-expanded') === 'true';
        // close others
        triggers.forEach((o) => o.setAttribute('aria-expanded', 'false'));
        if (!open) t.setAttribute('aria-expanded', 'true');
      });
    });
  }

  // ----------------------- apply form -----------------------
  function initApplyForm() {
    const form = document.getElementById('apply-form');
    if (!form) return;
    const errBox = document.getElementById('form-error');
    const okBox = document.getElementById('form-success');

    const showError = (msg) => {
      if (!errBox) return;
      errBox.textContent = msg;
      errBox.classList.remove('hidden');
    };
    const clearError = () => { errBox && errBox.classList.add('hidden'); };

    const setInvalid = (el, invalid) => {
      el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearError();

      // honeypot
      const hp = form.querySelector('input[name="_gotcha"]');
      if (hp && hp.value) return; // silently drop

      // required-field validation
      const required = Array.from(form.querySelectorAll('[required]'));
      let firstInvalid = null;
      required.forEach((el) => {
        const valid = el.checkValidity();
        setInvalid(el, !valid);
        if (!valid && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        showError('Please fill in the highlighted fields before submitting.');
        firstInvalid.focus({ preventScroll: false });
        return;
      }

      // email sanity check
      const email = form.querySelector('#f-email');
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
        setInvalid(email, true);
        showError('Please enter a valid email address.');
        email.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending…';
      }

      const action = form.getAttribute('action') || '';
      const usingPlaceholder = !action || action.includes('REPLACE_ME');

      try {
        if (usingPlaceholder) {
          // No real endpoint yet — simulate success so the UI is testable.
          // Replace the form's `action` with your Formspree endpoint to go live.
          await new Promise((r) => setTimeout(r, 600));
        } else {
          const data = new FormData(form);
          const res = await fetch(action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          });
          if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(text || 'Form service returned an error.');
          }
        }

        form.querySelectorAll('input, select, textarea, button').forEach((el) => {
          if (el.type !== 'submit') el.value = '';
          el.disabled = true;
        });
        if (okBox) {
          okBox.classList.remove('hidden');
          okBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        }
        showError("Sorry — we couldn't submit your application. Please try again, or email hello@medbridge.am.");
        console.error(err);
      }
    });

    // Clear invalid state on input
    form.querySelectorAll('input, select, textarea').forEach((el) => {
      el.addEventListener('input', () => setInvalid(el, false));
      el.addEventListener('change', () => setInvalid(el, false));
    });
  }

  // ----------------------- active section nav -----------------------
  function initActiveNav() {
    const links = document.querySelectorAll('.nav-link[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const sectionMap = new Map();
    links.forEach((a) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) sectionMap.set(target, a);
    });

    if (!sectionMap.size) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const link = sectionMap.get(e.target);
        if (!link) return;
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sectionMap.forEach((_, section) => io.observe(section));
  }
})();
