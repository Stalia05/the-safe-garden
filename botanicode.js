document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIG
  ================================ */
  const SYMBOLS = ["🌼", "🌸", "🌻", "🌱", "🍃", "🍀", "🍄", "🪨"];
  const CODE_LENGTH = 5;
  const MAX_ATTEMPTS = 10;

  /* ===============================
     DOM
  ================================ */
  const board = document.querySelector(".botanicode-board");
  const attemptRows = document.querySelectorAll(".attempt-row");
  const secretSlots = document.querySelectorAll(".secret-code .slot");
  const endMessage = document.querySelector(".end-message");
  const winMessage = document.querySelector(".win-message");
  const retryBtns = document.querySelectorAll(".retry-btn");

  /* ===============================
     ÉTAT
  ================================ */
  let secretCode = [];
  let currentAttempt = 0;
  let gameOver = false;

  /* ===============================
     INIT
  ================================ */
  function initGame() {
    secretCode = generateSecretCode();
    currentAttempt = 0;
    gameOver = false;

    attemptRows.forEach((row, index) => {
      row.style.opacity = "1"; // ❌ plus de transparence
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
    if (winMessage) winMessage.style.display = "none";
  }

  /* ===============================
     CODE SECRET
  ================================ */
  function generateSecretCode() {
    return Array.from({ length: CODE_LENGTH }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
  }

  /* ===============================
     PALETTE (PLACEMENT AUTO)
  ================================ */
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
      const emptySlot = [...slots].find(s => !s.dataset.symbol);

      if (!emptySlot) return;

      emptySlot.textContent = symbol;
      emptySlot.dataset.symbol = symbol;
    });

    palette.appendChild(btn);
  });

  board.appendChild(palette);

  /* ===============================
     VALIDATION
  ================================ */
  attemptRows.forEach((row, rowIndex) => {
    const validateBtn = row.querySelector(".validate-btn");

    validateBtn.addEventListener("click", () => {
      if (gameOver) return;
      if (rowIndex !== currentAttempt) return;

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
      }
    });
  });

  /* ===============================
     FEEDBACK
  ================================ */
  function getFeedback(guess) {
    let correct = 0;
    let present = 0;

    const codeCopy = [...secretCode];
    const guessCopy = [...guess];

    for (let i = 0; i < CODE_LENGTH; i++) {
      if (guessCopy[i] === codeCopy[i]) {
        correct++;
        codeCopy[i] = null;
        guessCopy[i] = null;
      }
    }

    guessCopy.forEach(symbol => {
      if (symbol && codeCopy.includes(symbol)) {
        present++;
        codeCopy[codeCopy.indexOf(symbol)] = null;
      }
    });

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
     FIN
  ================================ */
  function endGame(victory) {
    gameOver = true;

    secretSlots.forEach((slot, i) => {
      slot.textContent = secretCode[i];
      slot.classList.remove("hidden");
    });

    if (victory && winMessage) {
      winMessage.style.display = "block";
    } else {
      endMessage.style.display = "block";
    }
  }

  retryBtns.forEach(btn => btn.addEventListener("click", initGame));

  initGame();
});
