document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safe Garden – JS final actif");

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
      { duration: 10000, iterations: Infinity }
    );
  });

  /* ===============================
     🐱 CHAT – CARESSE APAISÉE
  =============================== */
  const chat = document.getElementById("chatImage");
  const bubble = document.getElementById("chatBubble");
  const purr = document.getElementById("purrSound");
  const meowStop = document.getElementById("meowStop");

  let lastX = 0, lastY = 0, lastTime = 0;
  let bubbleTimeout = null;

  function showBubble(text, delay = 2600) {
    if (!bubble) return;
    bubble.textContent = text;
    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => {
      bubble.textContent = "Je suis là.";
    }, delay);
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
      purr.volume = 0.25;
      purr.play().catch(() => {});
    }

    if (speed < 0.25) {
      purr.volume = 0.45;
      showBubble("Voilà… doucement 🤍");
    } else if (speed < 0.6) {
      purr.volume = 0.3;
      showBubble("Un peu plus lentement…");
    } else {
      if (purr) purr.pause();
      if (meowStop) {
        meowStop.currentTime = 0;
        meowStop.play().catch(() => {});
      }
      showBubble("Trop vite… comme avec toi-même.", 3400);
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
     🌱 PLANTE
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
      if (now - lastWater < 1400) {
        plantMessage.textContent =
          "On n’arrose pas une plante en la pressant 🤍";
        return;
      }
      lastWater = now;

      if (level < 3) {
        level++;
        plant.className = `plant level-${level}`;
        plantMessage.textContent = plantTexts[level];
      } else {
        plantMessage.textContent =
          "Elle est là. Tu peux juste la regarder.";
      }
    });
  }

  /* ===============================
     ☁️ NUAGE → POUSSIÈRE
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");
  const starLayer = document.getElementById("starDustLayer");

  function createStar(x, y) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starLayer.appendChild(star);
    return star;
  }

  function spreadDust(amount) {
    for (let i = 0; i < amount; i++) {
      createStar(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
    }
  }

  function animateCloud(cloud) {
    let y = 0;
    function rise() {
      y -= 2.2; // monte PLUS HAUT
      cloud.style.transform = `translate(-50%, ${y}px)`;
      if (y > -420) {
        requestAnimationFrame(rise);
      } else {
        cloud.remove();
        spreadDust(120); // salit vraiment la page
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
     🧹 BALAI – NETTOYAGE RÉEL
  =============================== */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");
  const sweepSound = new Audio("sweep.mp3");
  sweepSound.volume = 0.35;

  function cleanStars(broomX) {
    document.querySelectorAll(".star").forEach(star => {
      const rect = star.getBoundingClientRect();
      if (
        rect.left < broomX + 180 &&
        rect.right > broomX &&
        rect.bottom > window.innerHeight - 320
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

    let x = -260;

    function sweep() {
      x += 10;
      broom.style.transform = `translateX(${x}px) rotate(${x / 30}deg)`;
      cleanStars(x);

      if (x < window.innerWidth + 260) {
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
