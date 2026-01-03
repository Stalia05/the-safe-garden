/* ===============================
   BLOQUER LE SCROLL PENDANT LE JEU
================================ */
window.addEventListener(
  "keydown",
  e => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
      e.preventDefault();
    }
  },
  { passive: false }
);

document.addEventListener(
  "touchmove",
  e => {
    e.preventDefault();
  },
  { passive: false }
);

/* ===============================
   SNAKE NOKIA 3310 🌿
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("snakeGame");
  const scoreEl = document.getElementById("snakeScore");
  if (!canvas || !scoreEl) return;

  const ctx = canvas.getContext("2d");

  /* ===============================
     CANVAS RESPONSIVE RECTANGLE
  ================================ */
  const tileSize = 20;

  function resizeCanvas() {
    const width = Math.min(window.innerWidth * 0.96, 560);
    const height = Math.min(window.innerHeight * 0.55, 360);

    canvas.width = Math.floor(width / tileSize) * tileSize;
    canvas.height = Math.floor(height / tileSize) * tileSize;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let tilesX, tilesY;
  let snake, food, dx, dy;
  let respirations = 0;

  /* ===============================
     INIT / RESET
  ================================ */
  function resetGame() {
    tilesX = canvas.width / tileSize;
    tilesY = canvas.height / tileSize;

    snake = [
      {
        x: Math.floor(tilesX / 2),
        y: Math.floor(tilesY / 2)
      }
    ];

    dx = 1; // démarre doucement
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
     DRAW
  ================================ */
  function draw() {
    /* fond */
    ctx.fillStyle = "#e7f0ea";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* 🍎 POMME ROUGE */
    const cx = food.x * tileSize + tileSize / 2;
    const cy = food.y * tileSize + tileSize / 2;

    // corps pomme
    ctx.fillStyle = "#d84c4c";
    ctx.beginPath();
    ctx.arc(cx, cy, tileSize / 2.2, 0, Math.PI * 2);
    ctx.fill();

    // tige verte
    ctx.strokeStyle = "#4b7a60";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy - tileSize / 2.2);
    ctx.lineTo(cx, cy - tileSize / 1.3);
    ctx.stroke();

    /* 🟩 SERPENT CARRÉ NOKIA */
    ctx.fillStyle = "#6f9f88";
    snake.forEach(part => {
      ctx.fillRect(
        part.x * tileSize,
        part.y * tileSize,
        tileSize,
        tileSize
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

      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    } else {
      snake.pop();
    }

    /* collision = reset zen */
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
     CLAVIER (ORDI)
  ================================ */
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) {
      dx = 0; dy = -1;
    }
    if (e.key === "ArrowDown" && dy === 0) {
      dx = 0; dy = 1;
    }
    if (e.key === "ArrowLeft" && dx === 0) {
      dx = -1; dy = 0;
    }
    if (e.key === "ArrowRight" && dx === 0) {
      dx = 1; dy = 0;
    }
  });

  /* ===============================
     TOUCH (MOBILE)
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
     LANCEMENT
  ================================ */
  setInterval(draw, 140); // vitesse douce 🌿
});
