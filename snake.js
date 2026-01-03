/* ===============================
   SNAKE RÉTRO — SAFE GARDEN 🌿
   Style Nokia 3310
================================ */

document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("snakeGame");
  const scoreEl = document.getElementById("snakeScore");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  /* ===============================
     BLOQUER LE SCROLL (ordi + mobile)
  =============================== */
  window.addEventListener("keydown", e => {
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) {
      e.preventDefault();
    }
  }, { passive: false });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
  }, { passive: false });

  /* ===============================
     CANVAS RÉTRO
  =============================== */
  const tileSize = 20;

  function resizeCanvas() {
    const width = Math.min(window.innerWidth * 0.96, 520);
    const height = Math.min(window.innerHeight * 0.6, 360);

    canvas.width = Math.floor(width / tileSize) * tileSize;
    canvas.height = Math.floor(height / tileSize) * tileSize;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let tilesX = canvas.width / tileSize;
  let tilesY = canvas.height / tileSize;

  /* ===============================
     ÉTAT DU JEU
  =============================== */
  let snake;
  let food;
  let dx;
  let dy;
  let respirations = 0;

  function resetGame() {
    tilesX = canvas.width / tileSize;
    tilesY = canvas.height / tileSize;

    snake = [
      {
        x: Math.floor(tilesX / 2),
        y: Math.floor(tilesY / 2)
      }
    ];

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
    if (scoreEl) {
      scoreEl.textContent = `🌿 respirations : ${respirations}`;
    }
  }

  resetGame();

  /* ===============================
     DESSIN RÉTRO
  =============================== */
  function draw() {

    /* fond écran Nokia */
    ctx.fillStyle = "#e7f0ea";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* pomme (carrée) */
    ctx.fillStyle = "#6f9f88";
    ctx.fillRect(
      food.x * tileSize,
      food.y * tileSize,
      tileSize,
      tileSize
    );

    /* serpent (carré, brut) */
    ctx.fillStyle = "#2f5d46";
    snake.forEach(part => {
      ctx.fillRect(
        part.x * tileSize,
        part.y * tileSize,
        tileSize,
        tileSize
      );
    });

    /* déplacement */
    const head = {
      x: snake[0].x + dx,
      y: snake[0].y + dy
    };

    snake.unshift(head);

    /* manger */
    if (head.x === food.x && head.y === food.y) {
      respirations++;
      updateScore();
      food = randomFood();
    } else {
      snake.pop();
    }

    /* collision = reset */
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
     CONTRÔLES CLAVIER
  =============================== */
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
  });

  /* ===============================
     CONTRÔLES TACTILES
  =============================== */
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
  });

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
  });

  /* ===============================
     LANCEMENT
  =============================== */
  setInterval(draw, 150); // vitesse rétro
});

