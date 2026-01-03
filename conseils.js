document.addEventListener("DOMContentLoaded", () => {

  /* 🌸 RESPIRATION DOUCE DES SECTIONS */
  const steps = document.querySelectorAll(".step");

  steps.forEach(step => {
    step.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.01)" },
        { transform: "scale(1)" }
      ],
      {
        duration: 9000,
        iterations: Infinity
      }
    );
  });

  /* ===============================
     🌱 PLANTE VIVANTE
  =============================== */
  const plant = document.querySelector(".plant");
  const waterBtn = document.getElementById("waterBtn");
  const plantMessage = document.getElementById("plantMessage");

  let level = 0;
  let lastWater = 0;

  const messages = {
    0: "La graine a juste besoin de temps.",
    1: "Quelque chose commence à pousser.",
    2: "Les feuilles prennent leur place.",
    3: "La plante fleurit 🌸"
  };

  if (waterBtn && plant) {
    waterBtn.addEventListener("click", () => {
      const now = Date.now();

      /* ⏳ anti-spam doux */
      if (now - lastWater < 1200) {
        plantMessage.textContent =
          "On n’arrose pas une plante en la pressant 🤍";
        return;
      }

      lastWater = now;

      /* 🌿 croissance */
      if (level < 3) {
        level++;
        plant.className = `plant level-${level}`;
        plantMessage.textContent = messages[level];
      } else {
        plantMessage.textContent =
          "La plante est en fleurs. Tu peux juste l’observer.";
      }
    });
  }

  /* ===============================
     ☁️ NUAGE – DÉPOSER
  =============================== */
  const cloudBtn = document.getElementById("cloudBtn");
  const cloudInput = document.getElementById("cloudInput");
  const cloudArea = document.querySelector(".cloud-area");

  if (cloudBtn && cloudInput && cloudArea) {
    cloudBtn.addEventListener("click", () => {
      const text = cloudInput.value.trim();
      if (!text) return;

      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.textContent = text;

      cloudArea.appendChild(cloud);
      cloudInput.value = "";

      setTimeout(() => {
        cloud.remove();
      }, 8000);
    });
  }

});
