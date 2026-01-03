document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ACTIVER MODE JEU (ANTI SCROLL)
  ================================ */
  document.body.classList.add("snake-active");

  /* ===============================
     CANVAS SETUP
  ================================ */
  const canvas = document.getElementById("snakeGame");
  if (!canvas) {
    console.error("❌ Canvas introuvable");
    return;
  }

  const ctx = canvas.getContext("2d");

  const tileSize = 20;
  const tiles = canvas.width / tileSize;

  /* ===============================
     ÉTAT DU JEU
  ================================ */
  let snake = [{ x: 10, y: 10 }];
  let food = randomFood();
  let dx = 0;
  let dy = 0;

  /* ===============================
     BLOQUER SCROLL CLAVIER
  ================================ */
  window.addEventListener("keydown", e => {
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  }, { passive: false });

  /* ===============================
     UTILITAIRES
  ================================ */
  function randomFood() {
    return {
      x: Math.floor(Math.random() * tiles),
      y: Math.floor(Math.random() * tiles)
    };
  }

  function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    food = randomFood();
  }

  /* ===============================
     DRAW
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
      6,
      0,
      Math.PI * 2
    );
    ctx.fill();

    /* serpent */
    ctx.fillStyle = "#6f8b77";
    snake.forEach(part => {
      ctx.fillRect(
        part.x * tileSize,
        part.y * tileSize,
        tileSize - 2,
        tileSize - 2
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
     TOUCH (MOBILE 📱)
  ================================ */
  let touchStartX = 0;
  let touchStartY = 0;

  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: false });

  canvas.addEventListener("touchend", e => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const dxTouch = touch.clientX - touchStartX;
    const dyTouch = touch.clientY - touchStartY;

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
  }, { passive: false });

  /* ===============================
     LANCEMENT
  ================================ */
  setInterval(draw, 150); // vitesse douce 🌿
});
