document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safe Garden – JS actif");

  /* ===============================
     🌸 RESPIRATION DES SECTIONS
  =============================== */
  document.querySelectorAll(".step").forEach(step => {
    step.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.01)" },
        { transform: "scale(1)" }
      ],
      { duration: 9000, iterations: Infinity }
    );
  });

  /* ===============================
     🐱 CHAT – CARESSE DOUCE (LISIBLE)
  =============================== */
  const chat = document.getElementById("chatImage");
  const bubble = document.getElementById("chatBubble");
  const purr = document.getElementById("purrSound");
  const meowStop = document.getElementById("meowStop");

  let lastX = 0, lastY = 0, lastTime = 0;
  let bubbleTimeout = null;

  function setBubble(text) {
    if (!bubble) return;
    bubble.textContent = text;
    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => {
      bubble.textContent = "Je suis là.";
    }, 2500); // ⬅️ plus lisible
  }

  function handlePet(x, y) {
    const now = Date.now();
    const dx = x - lastX;
    const dy = y - lastY;
    const dt = now - lastTime || 1;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    lastX = x;
    lastY = y;
    lastTime = now;

    if (purr && purr.paused) {
      purr.volume = 0.35;
      purr.play().catch(() => {});
    }

    if (speed < 0.2) {
      purr.volume = 0.45;
      setBubble("Voilà… doucement 🤍");
    } else if (speed < 0.45) {
      purr.volume = 0.3;
      setBubble("Pas trop fort…");
    } else {
      if (purr) purr.pause();
      if (meowStop) {
        meowStop.currentTime = 0;
        meowStop.play().catch(() => {});
      }
      setBubble("Si tu es dur·e avec toi-même, ça fait mal aussi…");
    }
  }

  if (chat) {
    chat.addEventListener("mousemove", e =>
      handlePet(e.clientX, e.clientY)
    );

    chat.addEventListener("touchmove", e => {
      const t = e.touches[0];
      handlePet(t.clientX, t.clientY);
    });

    chat.addEventListener("mouseleave", () => {
      if (purr) purr.pause();
    });

    chat.addEventListener("touchend", () => {
      if (purr) purr.pause();
    });
  }

  /* ===============================
     🌱 PLANTE AVEC POT (OK)
  =============================== */
  const plant = document.querySelector(".plant");
  const waterBtn = document.getElementById("waterBtn");
  const plantMessage = document.getElementById("plantMessage");

  let level = 0;
  let lastWater = 0;

  const plantTexts = [
    "La graine a juste besoin de temps.",
    "Quelque chose commence à pousser.",
    "Les feuilles prennent leur place.",
    "La plante fleurit 🌸"
  ];

  if (plant && waterBtn && plantMessage) {
    waterBtn.addEventListener("click", () => {
      const now = Date.now();
      if (now - lastWater < 1200) {
        plantMessage.textContent =
          "On n’arrose pas une plante en la pressant 🤍";
        return;
      }
      lastWater = now;

      if (level < 3) {
        level++;
        plant.className = `plant level-${level}`;
        plantMessage.textContent = plantTexts[level];
      }
    });
  }

  /* ===============================
     ⭐ ÉTOILES – TOMBENT & RESTENT
  =============================== */
  const starLayer = document.getElementById("starDustLayer");

  function createStar(x, y) {
    if (!starLayer) return;

    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    star.vy = 0.4 + Math.random() * 0.6;
    star.stopped = false;

    starLayer.appendChild(star);

    function fall() {
      if (star.stopped) return;

      const top = parseFloat(star.style.top);
      const ground = document.body.scrollHeight - 160;

      if (top < ground) {
        star.style.top = `${top + star.vy}px`;
        requestAnimationFrame(fall);
      } else {
        star.stopped = true; // ⭐ reste au sol
      }
    }

    fall();
    return star;
  }

  function spreadDust(amount) {
    for (let i = 0; i < amount; i++) {
      createStar(
        Math.random() * window.innerWidth,
        Math.random() * 80
      );
    }
  }

  /* ===============================
     ☁️ NUAGE – APPARAÎT DIRECT & MONTE HAUT
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  function animateCloud(cloud) {
    let y = 0;
    function rise() {
      y -= 1.6;
      cloud.style.transform = `translate(-50%, ${y}px)`;
      if (y > -420) {
        requestAnimationFrame(rise);
      } else {
        cloud.remove();
        spreadDust(80);
      }
    }
    rise();
  }

  if (cloudBtn && cloudInput && cloudArea) {
    cloudBtn.addEventListener("click", () => {
      const text = cloudInput.value.trim();
      if (!text) return;

      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.textContent = text;

      cloudArea.appendChild(cloud);
      cloudInput.value = "";

      animateCloud(cloud);
    });
  }

  /* ===============================
     🧹 BALAI – NETTOIE VRAIMENT
  =============================== */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");
  const sweepSound = new Audio("sweep.mp3");
  sweepSound.volume = 0.35;

  function cleanStars(broomX) {
    document.querySelectorAll(".star").forEach(star => {
      const rect = star.getBoundingClientRect();
      if (
        rect.left < broomX + 220 &&
        rect.right > broomX &&
        rect.bottom > window.innerHeight - 200
      ) {
        star.remove();
      }
    });
  }

  function autoSweep() {
    if (!broom) return;

    broom.style.display = "block";
    sweepSound.currentTime = 0;
    sweepSound.play().catch(() => {});

    let x = -240;

    function sweep() {
      x += 16;
      broom.style.transform = `translateX(${x}px) rotate(${x / 35}deg)`;
      cleanStars(x);

      if (x < window.innerWidth + 240) {
        requestAnimationFrame(sweep);
      } else {
        broom.style.display = "none";
      }
    }

    sweep();
  }

  if (sweepBtn) {
    sweepBtn.addEventListener("click", autoSweep);
  }
});
