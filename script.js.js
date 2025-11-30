// script.js — объединённая логика (бургер, уведомления, кнопки, формы, карточки, галерея)
document.addEventListener('DOMContentLoaded', () => {

  /* ==================== BURGER MENU ==================== */
  const burgerCheckbox = document.getElementById("nav-toggle");
  const burgerLabel = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (burgerLabel && mobileMenu && burgerCheckbox) {
    burgerLabel.addEventListener("click", () => {
      if (burgerCheckbox.checked) {
        mobileMenu.style.display = "flex";
        mobileMenu.setAttribute('aria-hidden', 'false');
      } else {
        mobileMenu.style.display = "none";
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burgerCheckbox.checked = false;
      mobileMenu.style.display = 'none';
      mobileMenu.setAttribute('aria-hidden', 'true');
    }));
  }

  /* ==================== NOTIFICATIONS ==================== */
  document.querySelectorAll(".notify-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const list = btn.parentElement.querySelector(".notify-list");
      if (list) list.style.display = list.style.display === "block" ? "none" : "block";
    });
  });

  /* Close notify dropdown on outside click */
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.notify-list').forEach(list => {
      if (!list.parentElement.contains(e.target)) list.style.display = 'none';
    });
  });

  /* ==================== BUTTON PRESS EFFECT ==================== */
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mousedown", () => btn.classList.add("pressed"));
    btn.addEventListener("mouseup", () => btn.classList.remove("pressed"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("pressed"));
  });

  /* ==================== CARD BUTTON POPUP ==================== */
  function addCardAlerts(selector) {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const msg = document.createElement('div');
        msg.textContent = "Раздел скоро будет доступен.";
        Object.assign(msg.style, {
          position: 'fixed',
          left: '50%',
          top: '20%',
          transform: 'translateX(-50%)',
          background: '#111',
          border: '2px solid var(--red)',
          color: '#fff',
          padding: '12px 18px',
          zIndex: 9999,
          borderRadius: '10px'
        });
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 1600);
      });
    });
  }
  addCardAlerts(".card button");
  addCardAlerts(".glass-card button");
  addCardAlerts(".filter-card button");
  addCardAlerts(".glow-card button");

  /* ==================== CARD HOVER EFFECTS ==================== */
  document.querySelectorAll('.card').forEach(card => {
    // Border rays effect
    card.addEventListener('mouseenter', () => card.classList.add('rays'));
    card.addEventListener('mouseleave', () => card.classList.remove('rays'));

    // Optional squares movement inside card
    const squares = card.querySelectorAll('.squares span');
    card.addEventListener('mouseover', () => {
      squares.forEach(sp => {
        sp.style.transform = `translate(${(Math.random()*18-9).toFixed(1)}px, ${(Math.random()*18-9).toFixed(1)}px) rotate(${(Math.random()*40-20).toFixed(1)}deg)`;
      });
    });
    card.addEventListener('mouseout', () => {
      squares.forEach(sp => sp.style.transform = '');
    });
  });

  /* ==================== GALLERY ==================== */
  document.querySelectorAll(".gallery img, .grid-gallery img").forEach(img => {
    img.addEventListener("click", () => {
      const w = window.open("", "_blank");
      if (w) {
        w.document.write(`<img src="${img.src}" style="width:100%; display:block;">`);
        w.document.title = "Изображение — просмотр";
      }
    });
  });

  /* ==================== FORM SPARKLES & HANDLING ==================== */
  document.querySelectorAll("form").forEach(form => {
    // Decorative sparkles
    const glitter = document.createElement('div');
    glitter.className = 'form-glitter';
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('span');
      s.style.left = Math.random() * 90 + '%';
      s.style.top = Math.random() * 80 + '%';
      s.style.animationDelay = Math.random() * 2000 + 'ms';
      s.style.width = (6 + Math.random() * 8) + 'px';
      s.style.height = s.style.width;
      glitter.appendChild(s);
    }
    form.style.position = 'relative';
    form.appendChild(glitter);

    // Input focus movement
    form.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('focus', () => el.style.transform = 'translateY(-4px)');
      el.addEventListener('blur', () => el.style.transform = '');
    });

    // Fake submit
    form.addEventListener('submit', e => {
      e.preventDefault();
      const t = document.createElement('div');
      t.textContent = "Форма отправлена (демо). Спасибо!";
      Object.assign(t.style, {
        position: 'fixed',
        right: '16px',
        bottom: '18px',
        background: '#0b0b0b',
        color: 'white',
        border: '2px solid var(--red)',
        padding: '10px 14px',
        borderRadius: '10px',
        zIndex: 9999
      });
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 1800);
      form.reset();
    });
  });

});
