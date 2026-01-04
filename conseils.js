document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safe Garden – JS complet chargé");

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
     🐱 CHAT – CARESSE DOUCE & LISIBLE
  =============================== */
  const chat = document.getElementById("chatImage");
  const bubble = document.getElementById("chatBubble");
  const purr = document.getElementById("purrSound");
  const meowStop = document.getElementById("meowStop");

  let lastX = null, lastY = null, lastT = null;
  let audioUnlocked = false;

  let currentMessage = "";
  let lastMessageTime = 0;
  const MESSAGE_DELAY = 1400;

  function unlockAudio() {
    if (audioUnlocked || !purr) return;
    audioUnlocked = true;
    purr.volume = 0;
    purr.play().then(() => purr.pause()).catch(() => {});
  }

  function setBubble(text) {
    const now = Date.now();
    if (text === currentMessage) return;
    if (now - lastMessageTime < MESSAGE_DELAY) return;

    currentMessage = text;
    lastMessageTime = now;
    bubble.textContent = text;
  }

  function reactToPet(speed) {
    if (!bubble || !purr) return;

    if (speed < 0.25) {
      purr.volume = 0.45;
      setBubble("Voilà… doucement 🤍");
    } 
    else if (speed < 0.6) {
      purr.volume = 0.3;
      setBubble("Pas trop fort…");
    } 
    else {
      purr.pause();
      if (meowStop) {
        meowStop.currentTime = 0;
        meowStop.play().catch(() => {});
      }
      setBubble("Si tu es dur·e avec toi-même, ça fait mal aussi…");
      return;
    }

    if (purr.paused) purr.play().catch(() => {});
  }

  function handlePet(x, y) {
    unlockAudio();
    const now = performance.now();

    if (lastX === null) {
      lastX = x; lastY = y; lastT = now;
      return;
    }

    const dx = x - lastX;
    const dy = y - lastY;
    const dt = now - lastT || 1;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    lastX = x; lastY = y; lastT = now;
    reactToPet(speed);
  }

  function stopPet() {
    if (purr) purr.pause();
    setBubble("Je suis là.");
    lastX = lastY = lastT = null;
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
     🌱 PLANTE VIVANTE (FIABLE)
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
     ⭐ POUSSIÈRE D’ÉTOILES (VISIBLE)
  =============================== */
  const starLayer = document.getElementById("starDustLayer");
  let dustLevel = Number(localStorage.getItem("dustLevel")) || 0;

  function saveDust() {
    localStorage.setItem("dustLevel", dustLevel);
  }

  function createStar(x, y) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starLayer.appendChild(star);

    setTimeout(() => star.remove(), 4500);
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

  if (dustLevel > 0) {
    spreadDust(40 + dustLevel * 20);
  }

  /* ===============================
     ☁️ NUAGE – APPARITION IMMÉDIATE
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  function animateCloud(cloud) {
    let y = 0;

    function rise() {
      y += 1.6;
      cloud.style.transform = `translate(-50%, -${y}px)`;

      if (y < window.innerHeight + 200) {
        requestAnimationFrame(rise);
      } else {
        cloud.remove();
        dustLevel++;
        saveDust();
        spreadDust(100 + dustLevel * 30);
      }
    }

    rise();
  }

  if (cloudBtn && cloudInput && cloudArea) {
    cloudBtn.addEventListener("click", () => {
      const text = cloudInput.value.trim();
      if (!text) return;

      // ☁️ création instantanée
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.textContent = text;
      cloudArea.appendChild(cloud);

      cloudInput.value = "";

      // animation lancée juste après apparition
      requestAnimationFrame(() => animateCloud(cloud));
    });
  }

  /* ===============================
     🧹 BALAI – NETTOYAGE GLOBAL
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
      navigator.vibrate([30, 20, 30]);
    }

    broom.animate(
      [
        { transform: "translateX(-160%) rotate(-12deg)" },
        { transform: "translateX(120%) rotate(8deg)" }
      ],
      { duration: 2400, easing: "ease-in-out" }
    );

    setTimeout(() => {
      document.querySelectorAll(".star").forEach(s => s.remove());
      dustLevel = 0;
      saveDust();
      broom.style.display = "none";
    }, 2300);
  }

  if (sweepBtn) {
    sweepBtn.addEventListener("click", autoSweep);
  }
});
