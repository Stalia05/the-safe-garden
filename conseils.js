document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safe Garden – JS STABLE");

  /* ===============================
     🌱 PLANTE – CROISSANCE PROPRE
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
     ⭐ ÉTOILES – CHUTE & DÉPÔT
  =============================== */
  const starLayer = document.getElementById("starDustLayer");

  function createStar(x, y) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starLayer.appendChild(star);
  }

  function explodeStars(amount = 300) {
    const w = window.innerWidth;
    const h = document.body.scrollHeight;

    for (let i = 0; i < amount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      createStar(x, y);
    }
  }

  /* ===============================
     ☁️ NUAGE – MONTE & EXPLOSE
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  function animateCloud(cloud) {
    let y = 0;
    const limit = document.body.scrollHeight;

    function rise() {
      y -= 3;
      cloud.style.transform = `translate(-50%, ${y}px)`;

      if (Math.abs(y) < limit) {
        requestAnimationFrame(rise);
      } else {
        cloud.remove();
        explodeStars();
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

      const span = document.createElement("span");
      span.textContent = text;
      cloud.appendChild(span);

      cloudArea.appendChild(cloud);
      cloudInput.value = "";

      animateCloud(cloud);
    });
  }

  /* ===============================
     🧹 BALAI – NETTOYAGE TOTAL
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
      x += 18;
      broom.style.transform = `translateX(${x}px) rotate(${x / 28}deg)`;

      document.querySelectorAll(".star").forEach(star => {
        const rect = star.getBoundingClientRect();
        if (rect.left < x + 260 && rect.right > x) {
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
