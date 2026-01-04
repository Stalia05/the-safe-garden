document.addEventListener("DOMContentLoaded", () => {

  /* =================================================
     🐱 CHAT – CARESSE (DESKTOP + MOBILE)
  ================================================= */
  const chat = document.getElementById("chatImage");
  const bubble = document.getElementById("chatBubble");
  const purr = document.getElementById("purrSound");
  const meow = document.getElementById("meowStop");

  let lastX = 0, lastY = 0, lastTime = 0;

  function showBubble(text) {
    if (!bubble) return;
    bubble.textContent = text;
    clearTimeout(bubble._t);
    bubble._t = setTimeout(() => {
      bubble.textContent = "Je suis là.";
    }, 2200);
  }

  function pet(x, y) {
    const now = Date.now();
    const dx = x - lastX;
    const dy = y - lastY;
    const dt = now - lastTime || 1;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    lastX = x;
    lastY = y;
    lastTime = now;

    if (purr && purr.paused) {
      purr.volume = 0.3;
      purr.play().catch(() => {});
    }

    if (speed < 0.25) {
      purr.volume = 0.45;
      showBubble("Voilà… doucement 🤍");
    } else if (speed < 0.6) {
      purr.volume = 0.3;
      showBubble("Pas trop fort…");
    } else {
      purr?.pause();
      meow?.play().catch(() => {});
      showBubble("Si tu es dur·e avec toi-même, ça fait mal aussi…");
    }
  }

  if (chat) {
    chat.addEventListener("mousemove", e => pet(e.clientX, e.clientY));
    chat.addEventListener("touchmove", e => {
      const t = e.touches[0];
      pet(t.clientX, t.clientY);
    }, { passive: true });

    chat.addEventListener("mouseleave", () => purr?.pause());
    chat.addEventListener("touchend", () => purr?.pause());
  }

  /* =================================================
     🌱 PLANTE – CROISSANCE
  ================================================= */
  const plant = document.querySelector(".plant");
  const waterBtn = document.getElementById("waterBtn");
  const plantMessage = document.getElementById("plantMessage");

  let level = 0;
  let lastWater = 0;

  const plantTexts = [
    "La graine a juste besoin de temps.",
    "Quelque chose commence à pousser.",
    "Les feuilles prennent leur place.",
    "La plante est en fleurs 🌸"
  ];

  waterBtn?.addEventListener("click", () => {
    const now = Date.now();
    if (now - lastWater < 1200) return;
    lastWater = now;

    if (level < 3) {
      level++;
      plant.className = `plant level-${level}`;
      plantMessage.textContent = plantTexts[level];
    }
  });

  /* =================================================
     ⭐ ÉTOILES – IMMÉDIATES & FLUIDES
  ================================================= */
  const starLayer = document.getElementById("starDustLayer");

  function createStar(x, y) {
    if (!starLayer) return;

    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starLayer.appendChild(star);

    const fall = Math.random() * 120 + 60;

    star.animate(
      [
        { transform: "translate3d(0,0,0)", opacity: 0 },
        { transform: `translate3d(0,${fall}px,0)`, opacity: 1 }
      ],
      { duration: 1000, easing: "ease-out", fill: "forwards" }
    );
  }

  function explodeStars() {
    const isMobile = window.innerWidth < 768;
    const amount = isMobile ? 220 : 600;
    const w = window.innerWidth;
    const h = document.body.scrollHeight;

    for (let i = 0; i < amount; i++) {
      createStar(Math.random() * w, Math.random() * h);
    }
  }

  /* =================================================
     ☁️ NUAGE – TEXTE VISIBLE + EXPLOSION
  ================================================= */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  cloudBtn?.addEventListener("click", () => {
    const text = cloudInput.value.trim();
    if (!text || !cloudArea) return;

    const cloud = document.createElement("div");
    cloud.className = "cloud";

    const content = document.createElement("div");
    content.className = "cloud-content";
    content.textContent = text;

    cloud.appendChild(content);
    cloudArea.appendChild(cloud);
    cloudInput.value = "";

    let y = 0;

    function rise() {
      y -= 3;
      cloud.style.transform = `translate3d(-50%, ${y}px, 0)`;

      if (Math.abs(y) < window.innerHeight + 120) {
        requestAnimationFrame(rise);
      } else {
        cloud.remove();
        explodeStars();
      }
    }

    requestAnimationFrame(rise);
  });

  /* =================================================
     🧹 BALAI – DESKTOP + MOBILE (STABLE)
  ================================================= */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");

  let sweeping = false;

  function startSweep() {
    if (!broom || sweeping) return;
    sweeping = true;

    broom.style.display = "block";
    broom.style.willChange = "transform";

    let x = -320;

    function sweep() {
      x += 16;
      broom.style.transform =
        `translate3d(${x}px, 0, 0) rotate(${x / 28}deg)`;

      document.querySelectorAll(".star").forEach(star => {
        const r = star.getBoundingClientRect();
        if (r.left < x + 260 && r.right > x) {
          star.remove();
        }
      });

      if (x < window.innerWidth + 320) {
        requestAnimationFrame(sweep);
      } else {
        broom.style.display = "none";
        sweeping = false;
      }
    }

    requestAnimationFrame(sweep);
  }

  /* desktop */
  sweepBtn?.addEventListener("click", startSweep);

  /* mobile */
  sweepBtn?.addEventListener("touchstart", e => {
    e.preventDefault();
    startSweep();
  }, { passive: false });

  sweepBtn?.addEventListener("touchend", e => {
    e.preventDefault();
  });

});
