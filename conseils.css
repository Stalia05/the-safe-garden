// micro animation douce des sections (respiration)
const flowers = document.querySelectorAll('.step');

flowers.forEach(step => {
  step.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.01)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 8000,
      iterations: Infinity
    }
  );
});
const stem = document.getElementById("plantStem");
const leaves = document.querySelectorAll(".leaf");
const waterBtn = document.getElementById("waterBtn");
const plantMessage = document.getElementById("plantMessage");

let height = 40;
let lastClick = 0;

waterBtn.addEventListener("click", () => {
  const now = Date.now();

  // clic trop rapide → message
  if (now - lastClick < 1200) {
    plantMessage.textContent =
      "Ce n’est pas en forçant les choses que ça ira plus vite.";
    return;
  }

  lastClick = now;

  if (height >= 90) return;

  height += 6;
  stem.style.height = height + "px";

  // les feuilles grandissent avec la plante
  leaves.forEach(leaf => {
    leaf.style.top = height / 2 + "px";
    leaf.style.transform = leaf.classList.contains("left")
      ? "rotate(-20deg) scale(1)"
      : "rotate(20deg) scale(1)";
  }); plantMessage.textContent = "Tu peux prendre ton temps.";
});
const cloudBtn = document.getElementById("cloudBtn");
const cloudInput = document.getElementById("cloudInput");
const cloudArea = document.querySelector(".cloud-area");

cloudBtn.addEventListener("click", () => {
  const text = cloudInput.value.trim();
  if (!text) return;

  const cloud = document.createElement("div");
  cloud.classList.add("cloud");
  cloud.textContent = text;
  cloudArea.appendChild(cloud);
  cloudInput.value = "";

  // ✨ libérer la poudre d’étoiles
  const sparkleInterval = setInterval(() => {
    createStar(cloud);
  }, 120);

  // arrêter les étoiles + supprimer le nuage
  setTimeout(() => {
    clearInterval(sparkleInterval);
    cloud.remove();
  }, 8000);
});

function createStar(cloud) {
  const star = document.createElement("div");
  star.classList.add("star");

  const rect = cloud.getBoundingClientRect();

  star.style.left = rect.left + Math.random() * rect.width + "px";
  star.style.top = rect.top + rect.height * 0.6 + "px";

  document.body.appendChild(star);

  setTimeout(() => star.remove(), 2500);
}
