
// script.js - timer + heart effects
(function(){
  const startDate = new Date("2025-03-10T00:00:00");

  function updateTimer(){
    const now = new Date();
    let diffMs = now - startDate;
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalDays = Math.floor(totalSeconds / 86400);

    // years and months decomposition (approx using averages)
    const years = Math.floor(totalDays / 365.25);
    let daysAfterYears = totalDays - Math.floor(years * 365.25);
    const months = Math.floor(daysAfterYears / 30.4375);
    let daysAfterMonths = daysAfterYears - Math.floor(months * 30.4375);

    const weeks = Math.floor(daysAfterMonths / 7);
    const days = daysAfterMonths % 7;

    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('weeks').textContent = weeks;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
  }

  setInterval(updateTimer, 1000);
  updateTimer();

  // floating hearts background (a few soft ones)
  function spawnSoftHeart(){
    const h = document.createElement('div');
    h.className = 'flying-heart';
    h.textContent = ['💖','💗','💕'][Math.floor(Math.random()*3)];
    const startX = Math.random() * window.innerWidth * 0.9 + 20;
    h.style.left = startX + 'px';
    h.style.top = (window.innerHeight + 20) + 'px';
    h.style.opacity = (0.2 + Math.random()*0.6);
    h.style.fontSize = (18 + Math.random()*30) + 'px';
    document.body.appendChild(h);
    setTimeout(()=> h.remove(), 1900);
  }

  setInterval(spawnSoftHeart, 900);

  // button explosion hearts
  window.explodeHearts = function(event){
    for(let i=0;i<8;i++){
      const el = document.createElement('div');
      el.className = 'flying-heart';
      el.textContent = ['💖','💘','❤️'][Math.floor(Math.random()*3)];
      el.style.left = (event.clientX + (Math.random()*80 -40)) + 'px';
      el.style.top = (event.clientY + (Math.random()*40 -20)) + 'px';
      el.style.fontSize = (18 + Math.random()*26) + 'px';
      document.body.appendChild(el);
      setTimeout(()=> el.remove(), 1800);
    }
  };

/* ===== Carousel JS: prev/next, autoplay e swipe ===== */
(function(){
  const track = document.querySelector('.carousel-track');
  if (!track) return; // nada a fazer se não existir

  const slides = Array.from(track.children);
  let index = 0;
  const total = slides.length;
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');

  function goTo(idx) {
    if (idx < 0) idx = total - 1;
    if (idx >= total) idx = 0;
    index = idx;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // botões
  if (btnPrev) btnPrev.addEventListener('click', () => goTo(index - 1));
  if (btnNext) btnNext.addEventListener('click', () => goTo(index + 1));

  // autoplay
  let autoplayInterval = setInterval(() => goTo(index + 1), 3500);
  // pausa ao passar o mouse / tocar
  const viewport = document.querySelector('.carousel-viewport');
  viewport.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  viewport.addEventListener('mouseleave', () => autoplayInterval = setInterval(() => goTo(index + 1), 3500));
  viewport.addEventListener('touchstart', () => clearInterval(autoplayInterval));
  viewport.addEventListener('touchend', () => autoplayInterval = setInterval(() => goTo(index + 1), 3500));

  // swipe simples (touch)
  let startX = 0;
  viewport.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  viewport.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goTo(index + 1); else goTo(index - 1);
    }
  });

  // garantia: recalcula width em resize (não necessário aqui, usamos %)
  window.addEventListener('resize', () => goTo(index));

  // inicia
  goTo(0);

})();





})();
