/* ===============================
   🔒 BLOQUER SCROLL CLAVIER
================================ */
window.addEventListener("keydown", e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
    e.preventDefault();
  }
});

/* ===============================
   🐍 SNAKE SAFE GARDEN
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("snakeGame");
  const scoreEl = document.getElementById("snakeScore");
  if (!canvas || !scoreEl) return;

  const ctx = canvas.getContext("2d");

  const tileSize = 20;
  const speed = 130;

  let tilesX, tilesY;
  let snake, food, dx, dy;
  let respirations = 0;

  /* ===============================
     📐 RESIZE CANVAS
  ================================ */
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.floor(rect.width / tileSize) * tileSize;
    canvas.height = Math.floor(rect.height / tileSize) * tileSize;

    tilesX = canvas.width / tileSize;
    tilesY = canvas.height / tileSize;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  /* ===============================
     RESET DOUX
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
     DRAW
  ================================ */
  function draw() {
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

    /* serpent */
    snake.forEach((part, i) => {
      const t = i / snake.length;
      ctx.fillStyle = `rgb(${90 + t * 30}, ${140 + t * 30}, ${115 + t * 20})`;
      ctx.fillRect(
        part.x * tileSize,
        part.y * tileSize,
        tileSize - 2,
        tileSize - 2
      );
    });

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = randomFood();
      respirations++;
      updateScore();
      navigator.vibrate?.(20);
    } else {
      snake.pop();
    }

    if (
      head.x < 0 || head.y < 0 ||
      head.x >= tilesX || head.y >= tilesY ||
      snake.slice(1).some(p => p.x === head.x && p.y === head.y)
    ) {
      resetGame();
    }
  }

  /* ===============================
     CONTROLES CLAVIER
  ================================ */
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
  });

  /* ===============================
     CONTROLES TOUCH
  ================================ */
  let startX = 0, startY = 0;

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

  setInterval(draw, speed);
});
