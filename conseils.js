document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     🌸 RESPIRATION DOUCE DES SECTIONS
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
     🐱 CHAT – CARESSE + SONS
  =============================== */
  const chat = document.getElementById("chatImage");
  const bubble = document.getElementById("chatBubble");
  const purr = document.getElementById("purrSound");
  const meowStop = document.getElementById("meowStop");

  let lastX = 0, lastY = 0, lastTime = 0;

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
      purr.volume = 0.25;
      purr.play().catch(() => {});
    }

    if (speed < 0.25) {
      purr.volume = 0.45;
      bubble.textContent = "Voilà… doucement 🤍";
    } else if (speed < 0.6) {
      purr.volume = 0.3;
      bubble.textContent = "Pas trop fort…";
    } else {
      purr.pause();
      meowStop.currentTime = 0;
      meowStop.play().catch(() => {});
      bubble.textContent = "Si tu es dur·e avec toi-même, ça fait mal aussi…";
    }
  }

  if (chat) {
    chat.addEventListener("mousemove", e => handlePet(e.clientX, e.clientY));
    chat.addEventListener("touchmove", e => {
      const t = e.touches[0];
      handlePet(t.clientX, t.clientY);
    });
    chat.addEventListener("mouseleave", () => {
      purr.pause();
      bubble.textContent = "Je suis là.";
    });
  }

  /* ===============================
     🌱 PLANTE VIVANTE
  =============================== */
  const plant = document.querySelector(".plant");
  const waterBtn = document.getElementById("waterBtn");
  const plantMessage = document.getElementById("plantMessage");

  let level = 0, lastWater = 0;
  const plantTexts = [
    "La graine a juste besoin de temps.",
    "Quelque chose commence à pousser.",
    "Les feuilles prennent leur place.",
    "La plante fleurit 🌸"
  ];

  if (waterBtn && plant) {
    waterBtn.addEventListener("click", () => {
      const now = Date.now();
      if (now - lastWater < 1200) {
        plantMessage.textContent = "On n’arrose pas une plante en la pressant 🤍";
        return;
      }
      lastWater = now;
      if (level < 3) {
        level++;
        plant.className = `plant level-${level}`;
        plantMessage.textContent = plantTexts[level];
      } else {
        plantMessage.textContent = "La plante est en fleurs. Tu peux juste l’observer.";
      }
    });
  }

  /* ===============================
     ☁️ NUAGE → POUSSIÈRE D’ÉTOILES
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");
  const starLayer = document.getElementById("starDustLayer");

  let dustLevel = 0;

  function createStar(x, y) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starLayer.appendChild(star);

    setTimeout(() => star.remove(), 4000);
  }

  function spreadDust(amount = 60) {
    const w = window.innerWidth;
    const h = document.body.scrollHeight;

    for (let i = 0; i < amount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      createStar(x, y);
    }
  }

  function animateCloud(cloud) {
    let y = cloud.getBoundingClientRect().bottom;

    function rise() {
      y -= 1.2;
      cloud.style.transform = `translate(-50%, ${y}px)`;

      if (y > -200) {
        requestAnimationFrame(rise);
      } else {
        cloud.remove();
        dustLevel++;
        spreadDust(50 + dustLevel * 20);
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
     🧹 BALAI – NETTOYAGE
  =============================== */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");

  if (sweepBtn && broom) {
    sweepBtn.addEventListener("click", () => {
      broom.style.display = "block";
      broom.animate(
        [
          { transform: "translateX(-120%) rotate(-10deg)" },
          { transform: "translateX(120%) rotate(10deg)" }
        ],
        { duration: 1800, easing: "ease-in-out" }
      );

      setTimeout(() => {
        document.querySelectorAll(".star").forEach(star => star.remove());
        dustLevel = 0;
        broom.style.display = "none";
      }, 1600);
    });
  }

});
