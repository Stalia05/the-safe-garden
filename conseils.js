document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     🌱 PLANTE – COHÉRENTE AVEC CSS
  =============================== */
  const plant = document.querySelector(".plant");
  const waterBtn = document.getElementById("waterBtn");
  const plantMessage = document.getElementById("plantMessage");

  let level = 0;
  let lastWater = 0;

  const texts = [
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
      plantMessage.textContent = texts[level];
    }
  });

  /* ===============================
     ⭐ ÉTOILES – TOMBE + SE POSENT
  =============================== */
  const starLayer = document.getElementById("starDustLayer");

  function createStar(x, y) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starLayer.appendChild(star);

    const fall = Math.random() * 160 + 120;

    star.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: `translateY(${fall}px)`, opacity: 1 }
      ],
      {
        duration: 3000,
        easing: "ease-out",
        fill: "forwards"
      }
    );
  }

  function explodeStars(originX, originY, amount = 900) {
    const pageWidth = window.innerWidth;
    const pageHeight = document.body.scrollHeight;

    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        createStar(
          Math.random() * pageWidth,
          Math.random() * pageHeight
        );
      }, i * 2);
    }
  }

  /* ===============================
     ☁️ NUAGE – MONTE + EXPLOSE
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  cloudBtn?.addEventListener("click", () => {
    const text = cloudInput.value.trim();
    if (!text) return;

    const cloud = document.createElement("div");
    cloud.className = "cloud";
    cloud.innerHTML = `<span>${text}</span>`; // 🔑 TEXTE AU-DESSUS
    cloudArea.appendChild(cloud);
    cloudInput.value = "";

    let y = 0;
    const limit = document.body.scrollHeight + 300;

    function rise() {
      y -= 3;
      cloud.style.transform = `translate(-50%, ${y}px)`;

      if (Math.abs(y) < limit) {
        requestAnimationFrame(rise);
      } else {
        const rect = cloud.getBoundingClientRect();
        cloud.classList.add("exploding");

        setTimeout(() => {
          cloud.remove();
          explodeStars(
            rect.left + rect.width / 2,
            rect.top
          );
        }, 400);
      }
    }

    rise();
  });

  /* ===============================
     🧹 BALAI – NETTOYAGE TOTAL
  =============================== */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");

  sweepBtn?.addEventListener("click", () => {
    broom.style.display = "block";
    let x = -320;

    function sweep() {
      x += 22;
      broom.style.transform = `translateX(${x}px) rotate(${x / 28}deg)`;

      document.querySelectorAll(".star").forEach(star => {
        const rect = star.getBoundingClientRect();
        if (
          rect.left < x + 280 &&
          rect.right > x
        ) {
          star.remove();
        }
      });

      if (x < window.innerWidth + 320) {
        requestAnimationFrame(sweep);
      } else {
        broom.style.display = "none";
      }
    }

    sweep();
  });

});
