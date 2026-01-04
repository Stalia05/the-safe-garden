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
function explodeStars(originX, originY, amount = 200) {
  const pageHeight = document.body.scrollHeight;
  const pageWidth = window.innerWidth;

  for (let i = 0; i < amount; i++) {
    const star = document.createElement("span");
    star.className = "star";

    const x = Math.random() * pageWidth;
    const y = Math.random() * pageHeight;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    starLayer.appendChild(star);
  }
}

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

  function animateCloud(cloud) {
  let y = 0;

  function rise() {
    y -= 2.2;
    cloud.style.transform = `translate(-50%, ${y}px)`;

    if (Math.abs(y) < document.body.scrollHeight) {
      requestAnimationFrame(rise);
    } else {
      const rect = cloud.getBoundingClientRect();
      cloud.remove();
      explodeStars(rect.left + rect.width / 2, rect.top);
    }
  }

  rise();
}
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
