document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safe Garden – JS final magique");

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
  let bubbleTimeout;

  function setBubble(text) {
    if (!bubble) return;
    bubble.textContent = text;
    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => {
      bubble.textContent = "Je suis là.";
    }, 2200);
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
      if (meowStop) {
        meowStop.currentTime = 0;
        meowStop.play().catch(() => {});
      }
      setBubble("Si tu es dur·e avec toi-même, ça fait mal aussi…");
    }
  }

  if (chat) {
    chat.addEventListener("mousemove", e => handlePet(e.clientX, e.clientY));
    chat.addEventListener("touchmove", e => {
      const t = e.touches[0];
      handlePet(t.clientX, t.clientY);
    });
    chat.addEventListener("mouseleave", () => purr && purr.pause());
    chat.addEventListener("touchend", () => purr && purr.pause());
  }

  /* ===============================
     🌱 PLANTE – CYCLE COMPLET
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
    "La plante est en fleurs 🌸"
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
     ⭐ ÉTOILES – TOMBE & SE POSENT
  =============================== */
  const starLayer = document.getElementById("starDustLayer");

  function createStar(x, y) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starLayer.appendChild(star);
  }

  function rainStars(amount, originX = null) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < amount; i++) {
      const x = originX !== null
        ? originX + (Math.random() * 200 - 100)
        : Math.random() * w;

      let y = -20;

      const fall = () => {
        y += 3 + Math.random() * 2;
        if (y < h + 40) {
          createStar(x, y);
        }
      };

      setTimeout(fall, i * 12);
    }
  }

  /* ===============================
     ☁️ NUAGE – MONTE & EXPLOSE
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  function explodeCloud(cloud) {
    cloud.animate(
      [
        { transform: "translate(-50%, -20px) scale(1)" },
        { transform: "translate(-50%, -20px) scale(1.15)" },
        { transform: "translate(-50%, -20px) scale(0.8)" }
      ],
      { duration: 600, easing: "ease-out" }
    );

    const rect = cloud.getBoundingClientRect();
    rainStars(140, rect.left + rect.width / 2);

    setTimeout(() => cloud.remove(), 500);
  }

  function animateCloud(cloud) {
    let y = 0;
    const max = -window.innerHeight - 100;

    function rise() {
      y -= 2.2;
      cloud.style.transform = `translate(-50%, ${y}px)`;

      if (y > max) {
        requestAnimationFrame(rise);
      } else {
        explodeCloud(cloud);
      }
    }
    rise();
  }

  if (cloudBtn) {
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
     🧹 BALAI – EFFACE POUR DE VRAI
  =============================== */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");
  const sweepSound = new Audio("sweep.mp3");
  sweepSound.volume = 0.35;

  function autoSweep() {
    broom.style.display = "block";
    sweepSound.currentTime = 0;
    sweepSound.play().catch(() => {});

    let x = -300;

    function sweep() {
      x += 16;
      broom.style.transform = `translateX(${x}px) rotate(${x / 35}deg)`;

      document.querySelectorAll(".star").forEach(star => {
        const rect = star.getBoundingClientRect();
        if (
          rect.left < x + 220 &&
          rect.right > x &&
          rect.top > window.innerHeight - 420
        ) {
          star.remove();
        }
      });

      if (x < window.innerWidth + 300) {
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
