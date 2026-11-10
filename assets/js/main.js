  // Scroll progress bar
  const progressBar = document.getElementById('progressBar');
  function updateProgress(){
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const scrollHeight = (h.scrollHeight - h.clientHeight);
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  document.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  // Mobile menu toggle
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  function closeMenu(){
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
  }
  burgerBtn.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('open');
    menuOverlay.classList.toggle('open');
  });
  menuOverlay.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a:not(.mobile-accordion-toggle)').forEach(a => a.addEventListener('click', closeMenu));

  // Mobile Services accordion toggle
  const mobileServicesToggle = document.getElementById('mobileServicesToggle');
  const mobileServicesSubmenu = document.getElementById('mobileServicesSubmenu');
  mobileServicesToggle.addEventListener('click', (e)=>{
    e.preventDefault();
    mobileServicesSubmenu.classList.toggle('open');
    mobileServicesToggle.classList.toggle('mobile-accordion-toggle-open');
  });

  // Highlight target service card when navigated to via dropdown links
  function highlightTargetCard(){
    const hash = window.location.hash;
    if(hash && hash.startsWith('#service-')){
      const el = document.querySelector(hash);
      if(el){
        el.classList.remove('flash-highlight');
        void el.offsetWidth; // reflow to restart animation
        el.classList.add('flash-highlight');
      }
    }
  }
  document.querySelectorAll('a[href^="#service-"]').forEach(a=>{
    a.addEventListener('click', ()=>{ setTimeout(highlightTargetCard, 450); });
  });
  window.addEventListener('hashchange', highlightTargetCard);

  // Back to top button
  const toTopBtn = document.getElementById('toTopBtn');
  document.addEventListener('scroll', ()=>{
    if(window.scrollY > 500){ toTopBtn.classList.add('show'); }
    else { toTopBtn.classList.remove('show'); }
  }, {passive:true});
  toTopBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // Reveal on scroll (IntersectionObserver)
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));

  // Stagger delays for child items
  document.querySelectorAll('.reveal-stagger').forEach(group=>{
    const items = group.querySelectorAll('.stagger-item');
    items.forEach((item, i)=>{
      item.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  // Animated counters
  const counters = document.querySelectorAll('.counter');
  const counterIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 1200;
        const start = performance.now();
        function tick(now){
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          current = Math.floor(progress * target);
          el.textContent = prefix + current + suffix;
          if(progress < 1){ requestAnimationFrame(tick); }
          else { el.textContent = prefix + target + suffix; }
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      }
    });
  }, {threshold:0.5});
  counters.forEach(c => counterIO.observe(c));

  // Header shrink on scroll
  const header = document.querySelector('header');
  document.addEventListener('scroll', ()=>{
    if(window.scrollY > 40){ header.style.padding = '0'; }
  }, {passive:true});

/* =========================================================================
   CONTACT FORM — AJAX submission via FormSubmit.co
   Sends form data to mosharof719@gmail.com without leaving the page.
   ========================================================================= */
(function(){
  const form = document.getElementById('mahutContactForm');
  if(!form) return;

  // Build a status message element right after the form
  const statusBox = document.createElement('div');
  statusBox.id = 'formStatusMsg';
  statusBox.style.cssText = 'margin-top:16px;padding:14px 18px;border-radius:10px;font-size:.9rem;font-weight:600;display:none;';
  form.insertAdjacentElement('afterend', statusBox);

  function showStatus(message, isSuccess){
    statusBox.textContent = message;
    statusBox.style.display = 'block';
    statusBox.style.background = isSuccess ? '#e3f6ec' : '#fdecec';
    statusBox.style.color = isSuccess ? '#1c9a5b' : '#c0392b';
    statusBox.style.border = isSuccess ? '1px solid #bfe8cf' : '1px solid #f5c6c6';
    statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending…';

    const formData = new FormData(form);
    const recipient = 'mosharof719@gmail.com';

    fetch('https://formsubmit.co/ajax/' + recipient, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      showStatus('Thank you! Your consultation request has been sent successfully. Our team will reach out within 1–2 business days.', true);
      form.reset();
    })
    .catch(error => {
      showStatus('Something went wrong sending your request. Please try again, or email us directly at ' + recipient + '.', false);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
  });
})();
