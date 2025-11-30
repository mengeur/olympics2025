// script.js — объединённая логика (бургер, уведомления, кнопки, форма-анимации)
document.addEventListener('DOMContentLoaded', () => {
  /* BURGER MENU (works with checkbox) */
  const burgerCheckbox = document.getElementById("nav-toggle");
  const burgerLabel = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (burgerLabel && mobileMenu && burgerCheckbox) {
    burgerLabel.addEventListener("click", () => {
      // toggle display for accessibility
      if (burgerCheckbox.checked) {
        mobileMenu.style.display = "flex";
        mobileMenu.setAttribute('aria-hidden', 'false');
      } else {
        mobileMenu.style.display = "none";
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });

    // close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burgerCheckbox.checked = false;
      mobileMenu.style.display = 'none';
      mobileMenu.setAttribute('aria-hidden', 'true');
    }));
  }

  /* NOTIFICATIONS */
  document.querySelectorAll(".notify-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const list = btn.parentElement.querySelector(".notify-list");
      if (list) list.style.display = list.style.display === "block" ? "none" : "block";
    });
  });

  /* BUTTON PRESS EFFECT */
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mousedown", () => btn.classList.add("pressed"));
    btn.addEventListener("mouseup", () => btn.classList.remove("pressed"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("pressed"));
  });

  /* CARD BUTTONS popup */
  document.querySelectorAll(".card button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // graceful modal-like alert (non-blocking)
      const msg = document.createElement('div');
      msg.textContent = "Раздел скоро будет доступен.";
      msg.style.position = 'fixed';
      msg.style.left = '50%';
      msg.style.top = '20%';
      msg.style.transform = 'translateX(-50%)';
      msg.style.background = '#111';
      msg.style.border = '2px solid var(--red)';
      msg.style.color = '#fff';
      msg.style.padding = '12px 18px';
      msg.style.zIndex = 9999;
      msg.style.borderRadius = '10px';
      document.body.appendChild(msg);
      setTimeout(()=> msg.remove(), 1600);
    });
  });

  /* GALLERY: open image in new tab */
  document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
      const w = window.open("", "_blank");
      if (w) {
        w.document.write(`<img src="${img.src}" style="width:100%; display:block;">`);
        w.document.title = "Изображение — просмотр";
      }
    });
  });

  /* FORM sparkles randomization (Practice 7.3) */
  const form = document.querySelector("form");
  if (form){
    // create decorative random small squares
    const glitter = document.createElement('div');
    glitter.className = 'form-glitter';
    for (let i=0;i<8;i++){
      const s = document.createElement('span');
      s.style.left = Math.random()*90 + '%';
      s.style.top = Math.random()*80 + '%';
      s.style.animationDelay = Math.random()*2000 + 'ms';
      s.style.width = (6 + Math.random()*8) + 'px';
      s.style.height = s.style.width;
      glitter.appendChild(s);
    }
    form.style.position = 'relative';
    form.appendChild(glitter);

    // When focusing inputs, apply subtle movement via CSS variables
    form.querySelectorAll('input, textarea, select').forEach((el) => {
      el.addEventListener('focus', () => {
        el.style.transform = 'translateY(-4px)';
      });
      el.addEventListener('blur', () => el.style.transform = '');
    });

    // On submit fake handling to prevent page reload
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // show simple success toast
      const t = document.createElement('div');
      t.textContent = "Форма отправлена (демо). Спасибо!";
      t.style.position = 'fixed';
      t.style.right = '16px';
      t.style.bottom = '18px';
      t.style.background = '#0b0b0b';
      t.style.color = 'white';
      t.style.border = '2px solid var(--red)';
      t.style.padding = '10px 14px';
      t.style.borderRadius = '10px';
      t.style.zIndex = 9999;
      document.body.appendChild(t);
      setTimeout(()=> t.remove(), 1800);
      form.reset();
    });
  }

  /* Card rays: add class for selected cards to show border rays (Practice 7.5) */
  document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('mouseenter', () => c.classList.add('rays'));
    c.addEventListener('mouseleave', () => c.classList.remove('rays'));
  });

  /* Make squares in cards move to random positions on hover (extra spice) */
  document.querySelectorAll('.card').forEach(card => {
    const spans = card.querySelectorAll('.squares span');
    card.addEventListener('mouseover', () => {
      spans.forEach((sp,i)=> {
        sp.style.transform = `translate(${(Math.random()*18-9).toFixed(1)}px, ${(Math.random()*18-9).toFixed(1)}px) rotate(${(Math.random()*40-20).toFixed(1)}deg)`;
      });
    });
    card.addEventListener('mouseout', () => {
      spans.forEach(sp=> sp.style.transform = '');
    });
  });

  /* Accessibility: close notify dropdown on outside click */
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.notify-list').forEach(list => {
      if (!list.parentElement.contains(e.target)) list.style.display = 'none';
    });
  });
});
