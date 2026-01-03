/* ===============================
   BLOQUER LE SCROLL (CLAVIER + MOBILE)
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
   JEU SNAKE
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("snakeGame");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  /* ===============================
     ADAPTATION RESPONSIVE
  ================================ */
  function resizeCanvas() {
    const size = Math.min(
      window.innerWidth * 0.92,
      420
    );
    canvas.width = size;
    canvas.height = size;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const tileSize = 20;
  let tiles = Math.floor(canvas.width / tileSize);

  /* ===============================
     ÉTAT DU JEU
  ================================ */
  let snake;
  let food;
  let dx;
  let dy;

  function resetGame() {
    tiles = Math.floor(canvas.width / tileSize);
    snake = [{ x: Math.floor(tiles / 2), y: Math.floor(tiles / 2) }];
    dx = 0;
    dy = 0;
    food = randomFood();
  }

  function randomFood() {
    return {
      x: Math.floor(Math.random() * tiles),
      y: Math.floor(Math.random() * tiles)
    };
  }

  resetGame();

  /* ===============================
     DESSIN
  ================================ */
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

    /* serpent */
    ctx.fillStyle = "#6f8b77";
    snake.forEach((part, index) => {
      ctx.fillRect(
        part.x * tileSize,
        part.y * tileSize,
        tileSize - 2,
        tileSize - 2
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
    } else {
      snake.pop();
    }

    /* collision → reset doux */
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= tiles ||
      head.y >= tiles ||
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
  let touchStartX = 0;
  let touchStartY = 0;

  canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });

  canvas.addEventListener("touchend", e => {
    const t = e.changedTouches[0];
    const dxTouch = t.clientX - touchStartX;
    const dyTouch = t.clientY - touchStartY;

    if (Math.abs(dxTouch) > Math.abs(dyTouch)) {
      if (dxTouch > 0 && dx === 0) {
        dx = 1; dy = 0;
      } else if (dxTouch < 0 && dx === 0) {
        dx = -1; dy = 0;
      }
    } else {
      if (dyTouch > 0 && dy === 0) {
        dx = 0; dy = 1;
      } else if (dyTouch < 0 && dy === 0) {
        dx = 0; dy = -1;
      }
    }
  }, { passive: true });

  /* ===============================
     LANCEMENT
  ================================ */
  setInterval(draw, 140); // vitesse douce 🌿
});
