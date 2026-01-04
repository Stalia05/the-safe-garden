document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIG
  =============================== */
  const SYMBOLS = ["🌼", "🌸", "🌻", "🌱", "🍀", "🍄"];
  const CODE_LENGTH = 5;
  const MAX_ATTEMPTS = 10;

  /* ===============================
     DOM
  =============================== */
  const board = document.querySelector(".botanicode-board");
  const attemptRows = document.querySelectorAll(".attempt-row");
  const secretSlots = document.querySelectorAll(".secret-code .slot");
  const endMessage = document.querySelector(".end-message");
  const retryBtns = document.querySelectorAll(".retry-btn");

  /* ===============================
     ÉTAT
  =============================== */
  let secretCode = [];
  let currentAttempt = 0;
  let gameOver = false;

  /* ===============================
     BOUTON EFFACER (UNIQUE)
  =============================== */
  const eraseBtn = document.createElement("button");
  eraseBtn.className = "erase-btn";
  eraseBtn.textContent = "⬅ Effacer";
  eraseBtn.style.display = "none";
  board.appendChild(eraseBtn);

  eraseBtn.addEventListener("click", () => {
    if (gameOver) return;

    const row = attemptRows[currentAttempt];
    if (!row) return;

    const slots = row.querySelectorAll(".slots .slot");
    const filled = [...slots].filter(s => s.dataset.symbol);

    if (!filled.length) return;

    const last = filled[filled.length - 1];
    last.textContent = "";
    last.dataset.symbol = "";
  });

  /* ===============================
     INITIALISATION
  =============================== */
  function initGame() {
    secretCode = generateSecretCode();
    currentAttempt = 0;
    gameOver = false;

    attemptRows.forEach(row => {
      row.style.opacity = "1";

      row.querySelectorAll(".slot").forEach(slot => {
        slot.textContent = "";
        slot.dataset.symbol = "";
      });

      row.querySelectorAll(".feedback-dot").forEach(dot => {
        dot.className = "feedback-dot";
      });
    });

    secretSlots.forEach(slot => {
      slot.textContent = "";
      slot.classList.add("hidden");
    });

    endMessage.style.display = "none";
    moveEraseButton();
  }

  /* ===============================
     CODE SECRET
  =============================== */
  function generateSecretCode() {
    return Array.from({ length: CODE_LENGTH }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
  }

  /* ===============================
     PALETTE DE SYMBOLES
  =============================== */
  const palette = document.createElement("div");
  palette.className = "symbol-palette";

  SYMBOLS.forEach(symbol => {
    const btn = document.createElement("div");
    btn.className = "symbol";
    btn.textContent = symbol;

    btn.addEventListener("click", () => {
      if (gameOver) return;

      const row = attemptRows[currentAttempt];
      if (!row) return;

      const slots = row.querySelectorAll(".slots .slot");
      const empty = [...slots].find(s => !s.dataset.symbol);

      if (!empty) return;

      empty.textContent = symbol;
      empty.dataset.symbol = symbol;

      moveEraseButton();
    });

    palette.appendChild(btn);
  });

  board.appendChild(palette);

  /* ===============================
     VALIDATION DES ESSAIS
  =============================== */
  attemptRows.forEach((row, rowIndex) => {
    const validateBtn = row.querySelector(".validate-btn");

    validateBtn.addEventListener("click", () => {
      if (gameOver || rowIndex !== currentAttempt) return;

      const slots = row.querySelectorAll(".slots .slot");
      const guess = [...slots].map(s => s.dataset.symbol);

      if (guess.includes("")) return;

      const feedback = getFeedback(guess);
      displayFeedback(row, feedback);

      if (feedback.correct === CODE_LENGTH) {
        endGame(true);
        return;
      }

      currentAttempt++;

      if (currentAttempt >= MAX_ATTEMPTS) {
        endGame(false);
        return;
      }

      moveEraseButton();
    });
  });

  /* ===============================
     FEEDBACK (LOGIQUE MASTER MIND CORRIGÉE)
  =============================== */
  function getFeedback(guess) {
    let correct = 0;
    let present = 0;

    const secretCopy = [...secretCode];
    const guessCopy = [...guess];

    // 1️⃣ BIEN PLACÉS
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        correct++;
        secretCopy[i] = null;
        guessCopy[i] = null;
      }
    }

    // 2️⃣ MAL PLACÉS
    for (let i = 0; i < CODE_LENGTH; i++) {
      const symbol = guessCopy[i];
      if (!symbol) continue;

      const index = secretCopy.indexOf(symbol);
      if (index !== -1) {
        present++;
        secretCopy[index] = null;
      }
    }

    return { correct, present };
  }

  function displayFeedback(row, { correct, present }) {
    const dots = row.querySelectorAll(".feedback-dot");
    let i = 0;

    for (; i < correct; i++) dots[i].classList.add("correct");
    for (; i < correct + present; i++) dots[i].classList.add("present");
    for (; i < dots.length; i++) dots[i].classList.add("absent");
  }

  /* ===============================
     POSITION DU BOUTON EFFACER
  =============================== */
  function moveEraseButton() {
    if (gameOver || currentAttempt >= MAX_ATTEMPTS) {
      eraseBtn.style.display = "none";
      return;
    }

    const row = attemptRows[currentAttempt];
    if (!row) return;

    row.appendChild(eraseBtn);
    eraseBtn.style.display = "inline-block";
  }

  /* ===============================
     FIN DE PARTIE
  =============================== */
  function endGame(victory) {
    gameOver = true;
    eraseBtn.style.display = "none";

    secretSlots.forEach((slot, i) => {
      slot.textContent = secretCode[i];
      slot.classList.remove("hidden");
    });

    endMessage.style.display = "block";
  }

  retryBtns.forEach(btn => btn.addEventListener("click", initGame));

  initGame();
});
