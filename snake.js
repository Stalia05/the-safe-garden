/* ===============================
   🔒 BLOQUER SCROLL (CLAVIER + MOBILE)
================================ */
window.addEventListener("keydown", e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener("touchmove", e => {
  e.preventDefault();
}, { passive: false });

/* ===============================
   🐍 SNAKE SAFE GARDEN 🌿
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("snakeGame");
  const scoreEl = document.getElementById("snakeScore");

  if (!canvas || !scoreEl) {
    console.error("Canvas ou score introuvable");
    return;
  }

  const ctx = canvas.getContext("2d");

  /* ===============================
     🎨 PARAMÈTRES
  ================================ */
  const tileSize = 20;
  const speed = 140;

  let tilesX, tilesY;
  let snake, food, dx, dy;
  let respirations = 0;

  /* ===============================
     📐 CANVAS RESPONSIVE RECTANGULAIRE
  ================================ */
  function resizeCanvas() {
    const width = Math.min(window.innerWidth * 0.96, 720);
    const height = Math.min(window.innerHeight * 0.55, 380);

    canvas.width = Math.floor(width / tileSize) * tileSize;
    canvas.height = Math.floor(height / tileSize) * tileSize;

    tilesX = canvas.width / tileSize;
    tilesY = canvas.height / tileSize;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  /* ===============================
     🔄 RESET DOUX
  ================================ */
  function resetGame() {
    snake = [{
      x: Math.floor(tilesX / 2),
      y: Math.floor(tilesY / 2)
    }];

    dx = 1;
    dy = 0;

    respirations = 0;
    updateScore();
    food = randomFood();
  }

  function randomFood() {
    return {
      x: Math.floor(Math.random() * tilesX),
      y: Math.floor(Math.random() * tilesY)
    };
  }

  function updateScore() {
    scoreEl.textContent = `🌿 respirations : ${respirations}`;
  }

  resetGame();

  /* ===============================
     🎨 DESSINS
  ================================ */
  function drawRoundedRect(x, y, size, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + size, y, x + size, y + size, radius);
    ctx.arcTo(x + size, y + size, x, y + size, radius);
    ctx.arcTo(x, y + size, x, y, radius);
    ctx.arcTo(x, y, x + size, y, radius);
    ctx.closePath();
    ctx.fill();
  }

  function draw() {

    /* fond */
    ctx.fillStyle = "#e7f0ea";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* nourriture */
    ctx.fillStyle = "#c9a24d";
    ctx.beginPath();
    ctx.arc(
      food.x * tileSize + tileSize / 2,
      food.y * tileSize + tileSize / 2,
      tileSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();

    /* serpent (dégradé doux) */
    snake.forEach((part, index) => {
      const t = index / snake.length;
      ctx.fillStyle = `rgb(
        ${90 + t * 30},
        ${140 + t * 30},
        ${115 + t * 20}
      )`;

      drawRoundedRect(
        part.x * tileSize,
        part.y * tileSize,
        tileSize - 2,
        8
      );
    });

    /* mouvement */
    const head = {
      x: snake[0].x + dx,
      y: snake[0].y + dy
    };

    snake.unshift(head);

    /* manger */
    if (head.x === food.x && head.y === food.y) {
      food = randomFood();
      respirations++;
      updateScore();

      // 🫧 vibration douce
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    } else {
      snake.pop();
    }

    /* collision → reset zen */
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= tilesX ||
      head.y >= tilesY ||
      snake.slice(1).some(p => p.x === head.x && p.y === head.y)
    ) {
      resetGame();
    }
  }

  /* ===============================
     ⌨️ CLAVIER
  ================================ */
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
  });

  /* ===============================
     📱 TOUCH (MOBILE)
  ================================ */
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
  }, { passive: true });

  canvas.addEventListener("touchend", e => {
    const t = e.changedTouches[0];
    const dxT = t.clientX - startX;
    const dyT = t.clientY - startY;

    if (Math.abs(dxT) > Math.abs(dyT)) {
      if (dxT > 0 && dx === 0) { dx = 1; dy = 0; }
      if (dxT < 0 && dx === 0) { dx = -1; dy = 0; }
    } else {
      if (dyT > 0 && dy === 0) { dx = 0; dy = 1; }
      if (dyT < 0 && dy === 0) { dx = 0; dy = -1; }
    }
  }, { passive: true });

  /* ===============================
     🚀 LANCEMENT
  ================================ */
  setInterval(draw, speed);
});
