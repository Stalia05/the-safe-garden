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
     🐱 CHAT – CARESSE DOUCE
  =============================== */
  const chat = document.getElementById("chatImage");
  const bubble = document.getElementById("chatBubble");
  const purr = document.getElementById("purrSound");
  const meowStop = document.getElementById("meowStop");

  let lastX = 0, lastY = 0, lastTime = 0;
  let bubbleTimeout = null;

  function setBubble(text) {
    bubble.textContent = text;
    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => {
      bubble.textContent = "Je suis là.";
    }, 1800);
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

    if (purr.paused) {
      purr.volume = 0.3;
      purr.play().catch(() => {});
    }

    if (speed < 0.25) {
      purr.volume = 0.45;
      setBubble("Voilà… doucement 🤍");
    } else if (speed < 0.6) {
      purr.volume = 0.3;
      setBubble("Pas trop fort…");
    } else {
      purr.pause();
      meowStop.currentTime = 0;
      meowStop.play().catch(() => {});
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
    chat.addEventListener("mouseleave", () => purr.pause());
    chat.addEventListener("touchend", () => purr.pause());
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

  if (plant && waterBtn) {
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
     ☁️ NUAGE → ÉTOILES
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
      y -= 1.5;
      cloud.style.transform = `translate(-50%, ${y}px)`;
      if (y > -220) {
        requestAnimationFrame(rise);
      } else {
        cloud.remove();
        spreadDust(90);
      }
    }
    rise();
  }

  if (cloudBtn) {
    cloudBtn.addEventListener("click", () => {
      if (!cloudInput.value.trim()) return;

      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.textContent = cloudInput.value;
      cloudArea.appendChild(cloud);
      cloudInput.value = "";

      animateCloud(cloud);
    });
  }

  /* ===============================
     🧹 BALAI QUI NETTOIE VRAIMENT
  =============================== */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");
  const sweepSound = new Audio("sweep.mp3");
  sweepSound.volume = 0.35;

  function sweepStep(x) {
    broom.style.transform = `translateX(${x}px) rotate(${x / 25}deg)`;

    document.querySelectorAll(".star").forEach(star => {
      const rect = star.getBoundingClientRect();
      if (
        rect.left < x + 160 &&
        rect.right > x &&
        rect.top > window.innerHeight - 260
      ) {
        star.remove();
      }
    });
  }

  function autoSweep() {
    broom.style.display = "block";
    sweepSound.currentTime = 0;
    sweepSound.play().catch(() => {});

    let x = -200;
    function sweep() {
      x += 14;
      sweepStep(x);
      if (x < window.innerWidth + 200) {
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
