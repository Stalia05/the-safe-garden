document.addEventListener("DOMContentLoaded", () => {

  /* 🌱 PLANTE */
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

  /* ⭐ ÉTOILES */
  const starLayer = document.getElementById("starDustLayer");

  function createStar(x, y) {
    const s = document.createElement("span");
    s.className = "star";
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    starLayer.appendChild(s);

    let fall = Math.random() * 120 + 80;
    s.animate(
      [{ transform: "translateY(0)" }, { transform: `translateY(${fall}px)` }],
      { duration: 2500, easing: "ease-out", fill: "forwards" }
    );
  }

  function explodeStars(cx, cy) {
    const w = window.innerWidth;
    const h = document.body.scrollHeight;

    for (let i = 0; i < 700; i++) {
      setTimeout(() => {
        createStar(
          Math.random() * w,
          Math.random() * h
        );
      }, i * 3);
    }
  }

  /* ☁️ NUAGE */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  cloudBtn?.addEventListener("click", () => {
    const text = cloudInput.value.trim();
    if (!text) return;

    const cloud = document.createElement("div");
    cloud.className = "cloud";
    cloud.textContent = text;
    cloudArea.appendChild(cloud);
    cloudInput.value = "";

    let y = 0;
    function rise() {
      y -= 3;
      cloud.style.transform = `translate(-50%, ${y}px)`;
      if (Math.abs(y) < window.innerHeight + 200) {
        requestAnimationFrame(rise);
      } else {
        const r = cloud.getBoundingClientRect();
        cloud.remove();
        explodeStars(r.left + r.width / 2, r.top);
      }
    }
    rise();
  });

  /* 🧹 BALAI */
  const broom = document.getElementById("broom");
  const sweepBtn = document.getElementById("sweepBtn");

  sweepBtn?.addEventListener("click", () => {
    broom.style.display = "block";
    let x = -300;

    function sweep() {
      x += 20;
      broom.style.transform = `translateX(${x}px) rotate(${x / 30}deg)`;
      document.querySelectorAll(".star").forEach(s => {
        const r = s.getBoundingClientRect();
        if (r.left < x + 260 && r.right > x) s.remove();
      });

      if (x < window.innerWidth + 300) {
        requestAnimationFrame(sweep);
      } else {
        broom.style.display = "none";
      }
    }
    sweep();
  });

});
