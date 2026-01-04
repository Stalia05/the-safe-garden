document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safe Garden JS chargé");

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
     🐱 CHAT – CARESSE NATURELLE
  =============================== */
  const chat = document.getElementById("chatImage");
  const bubble = document.getElementById("chatBubble");
  const purr = document.getElementById("purrSound");
  const meowStop = document.getElementById("meowStop");

  let lastX = null;
  let lastY = null;
  let lastTime = null;
  let audioUnlocked = false;

  function unlockAudio() {
    if (audioUnlocked || !purr) return;
    audioUnlocked = true;
    purr.volume = 0;
    purr.play().then(() => purr.pause()).catch(() => {});
  }

  function petReaction(speed) {
    if (!bubble || !purr) return;

    if (speed < 0.25) {
      purr.volume = 0.45;
      bubble.textContent = "Voilà… doucement 🤍";
    } else if (speed < 0.6) {
      purr.volume = 0.3;
      bubble.textContent = "Pas trop fort…";
    } else {
      purr.pause();
      if (meowStop) {
        meowStop.currentTime = 0;
        meowStop.play().catch(() => {});
      }
      bubble.textContent =
        "Si tu es dur·e avec toi-même, ça fait mal aussi…";
      return;
    }

    if (purr.paused) {
      purr.play().catch(() => {});
    }
  }

  function handlePet(x, y) {
    unlockAudio();

    const now = performance.now();

    if (lastX === null) {
      lastX = x;
      lastY = y;
      lastTime = now;
      return;
    }

    const dx = x - lastX;
    const dy = y - lastY;
    const dt = now - lastTime || 1;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    lastX = x;
    lastY = y;
    lastTime = now;

    petReaction(speed);
  }

  function stopPet() {
    if (purr) purr.pause();
    if (bubble) bubble.textContent = "Je suis là.";
    lastX = lastY = lastTime = null;
  }

  if (chat) {
    chat.addEventListener("mousemove", e =>
      handlePet(e.clientX, e.clientY)
    );

    chat.addEventListener("touchmove", e => {
      const t = e.touches[0];
      handlePet(t.clientX, t.clientY);
    });

    chat.addEventListener("mouseleave", stopPet);
    chat.addEventListener("touchend", stopPet);
  }

  /* ===============================
     🌱 PLANTE VIVANTE (FIXÉE)
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
    plant.classList.add("level-0");

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
      } else {
        plantMessage.textContent =
          "La plante est en fleurs. Tu peux juste l’observer.";
      }
    });
  }

  /* ===============================
     ☁️ NUAGE → ÉTOILES VISIBLES
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");
  const starLayer = document.getElementById("starDustLayer");

  let dustLevel = 0;
  let autoSweepTimeout = null;

  function createStar(x, y) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starLayer.appendChild(star);
    setTimeout(() => star.remove(), 3500);
  }

  function spreadDust(amount) {
    const w = window.innerWidth;
    const h = document.body.scrollHeight;

    for (let i = 0; i < amount; i++) {
      createStar(
        Math.random() * w,
        Math.random() * h
      );
    }
  }

  function animateCloud(cloud) {
    let y = 0;

    function rise() {
      y += 1.4;
      cloud.style.transform = `translate(-50%, -${y}px)`;

      if (y < window.innerHeight + 200) {
        requestAnimationFrame(rise);
      } else {
        cloud.remove();
        dustLevel++;
        spreadDust(80 + dustLevel * 30);

        if (autoSweepTimeout) clearTimeout(autoSweepTimeout);
        autoSweepTimeout = setTimeout(autoSweep, 6000);
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
     🧹 BALAI – OPTION C (PROPRE)
  =============================== */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");
  const sweepSound = new Audio("sweep.mp3");
  sweepSound.volume = 0.35;

  function autoSweep() {
    if (!broom) return;

    broom.style.display = "block";

    sweepSound.currentTime = 0;
    sweepSound.play().catch(() => {});

    if (navigator.vibrate) {
      navigator.vibrate([25, 20, 25]);
    }

    broom.animate(
      [
        { transform: "translateX(-160%) rotate(-10deg)" },
        { transform: "translateX(120%) rotate(8deg)" }
      ],
      { duration: 2400, easing: "ease-in-out" }
    );

    setTimeout(() => {
      document.querySelectorAll(".star").forEach(s => s.remove());
      dustLevel = 0;
      broom.style.display = "none";
    }, 2300);
  }

  if (sweepBtn) {
    sweepBtn.addEventListener("click", autoSweep);
  }
});
