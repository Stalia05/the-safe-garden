document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safe Garden – JS corrigé");

  /* ===============================
     🌱 PLANTE – CROISSANCE RÉELLE
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
        plant.classList.remove("level-0", "level-1", "level-2", "level-3");
        plant.classList.add(`level-${level}`);
        plantMessage.textContent = plantTexts[level];
      }
    });
  }

  /* ===============================
     ⭐ ÉTOILES – TOMBE + SE POSENT
  =============================== */
  const starLayer = document.getElementById("starDustLayer");

  function dropStar(x) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `-20px`;
    starLayer.appendChild(star);

    let y = -20;
    const stopY = window.innerHeight - 40 - Math.random() * 120;

    function fall() {
      y += 3;
      star.style.top = `${y}px`;

      if (y < stopY) {
        requestAnimationFrame(fall);
      }
    }
    fall();
  }

  function rainStars(amount, originX = null) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        const x = originX !== null
          ? originX + (Math.random() * 240 - 120)
          : Math.random() * window.innerWidth;
        dropStar(x);
      }, i * 15);
    }
  }

  /* ===============================
     ☁️ NUAGE – MONTE + EXPLOSE
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  function explodeCloud(cloud) {
    const rect = cloud.getBoundingClientRect();

    cloud.animate(
      [
        { transform: "translate(-50%, 0) scale(1)" },
        { transform: "translate(-50%, -10px) scale(1.15)" },
        { transform: "translate(-50%, -20px) scale(0.8)" }
      ],
      { duration: 500, easing: "ease-out" }
    );

    rainStars(120, rect.left + rect.width / 2);

    setTimeout(() => cloud.remove(), 450);
  }

  function animateCloud(cloud) {
    let y = 0;
    const max = -window.innerHeight - 80;

    function rise() {
      y -= 2;
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
      cloud.textContent = text; // 🔴 LE MOT EST BIEN LÀ
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
      x += 16;
      broom.style.transform = `translateX(${x}px) rotate(${x / 30}deg)`;

      document.querySelectorAll(".star").forEach(star => {
        const rect = star.getBoundingClientRect();
        if (
          rect.left < x + 240 &&
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
