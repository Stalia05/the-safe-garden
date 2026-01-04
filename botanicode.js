/* ===============================
   BOTANICODE – LOGIQUE DU JEU
================================ */

// 🌸 Symboles disponibles
const SYMBOLS = ["🌼", "🌸", "🌻", "🌱", "🍃", "🍀", "🍄", "🪨"];

// ⚙️ Configuration
const CODE_LENGTH = 5;
const MAX_ATTEMPTS = 10;

// 🌿 Éléments DOM
const attemptRows = document.querySelectorAll(".attempt-row");
const endMessage = document.querySelector(".end-message");
const winMessage = document.querySelector(".win-message");
const retryBtns = document.querySelectorAll(".retry-btn");
const board = document.querySelector(".botanicode-board");

// 🌱 État du jeu
let secretCode = [];
let currentAttempt = 0;
let selectedSymbol = null;
let gameOver = false;

/* ===============================
   INITIALISATION
================================ */
function initGame() {
  secretCode = generateSecretCode();
  currentAttempt = 0;
  selectedSymbol = null;
  gameOver = false;

  // Reset essais
  attemptRows.forEach((row, index) => {
    row.style.opacity = index === 0 ? "1" : "0.3";
    row.style.pointerEvents = index === 0 ? "auto" : "none";

    row.querySelectorAll(".slot").forEach(slot => {
      slot.textContent = "";
      slot.dataset.symbol = "";
    });

    row.querySelectorAll(".feedback-dot").forEach(dot => {
      dot.className = "feedback-dot";
    });
  });

  // Reset code secret
  document.querySelectorAll(".secret-code .slot").forEach(slot => {
    slot.textContent = "";
    slot.classList.add("hidden");
  });

  endMessage.style.display = "none";
  winMessage.style.display = "none";
}

initGame();

/* ===============================
   GÉNÉRATION DU CODE
================================ */
function generateSecretCode() {
  return Array.from({ length: CODE_LENGTH }, () =>
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  );
}

/* ===============================
   PALETTE DE SYMBOLES
================================ */
const palette = document.createElement("div");
palette.className = "symbol-palette";

SYMBOLS.forEach(symbol => {
  const el = document.createElement("div");
  el.className = "symbol";
  el.textContent = symbol;

  el.addEventListener("click", () => {
    if (gameOver) return;
    selectedSymbol = symbol;
    document.querySelectorAll(".symbol").forEach(s => s.classList.remove("selected"));
    el.classList.add("selected");
  });

  palette.appendChild(el);
});

board.appendChild(palette);

/* ===============================
   INTERACTION AVEC LES CASES
================================ */
attemptRows.forEach((row, rowIndex) => {
  const slots = row.querySelectorAll(".slots .slot");
  const validateBtn = row.querySelector(".validate-btn");

  // clic gauche → poser / remplacer
  slots.forEach(slot => {
    slot.addEventListener("click", () => {
      if (gameOver || rowIndex !== currentAttempt || !selectedSymbol) return;
      slot.textContent = selectedSymbol;
      slot.dataset.symbol = selectedSymbol;
    });

    // clic droit → effacer
    slot.addEventListener("contextmenu", e => {
      e.preventDefault();
      if (gameOver || rowIndex !== currentAttempt) return;
      slot.textContent = "";
      slot.dataset.symbol = "";
    });
  });

  // Bouton Valider
  validateBtn.addEventListener("click", () => {
    if (gameOver || rowIndex !== currentAttempt) return;

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

    enableNextRow();
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
   GESTION DES LIGNES
================================ */
function enableNextRow() {
  attemptRows.forEach((row, index) => {
    row.style.opacity = index === currentAttempt ? "1" : "0.3";
    row.style.pointerEvents = index === currentAttempt ? "auto" : "none";
  });
}

/* ===============================
   FIN DE PARTIE
================================ */
function endGame(victory) {
  gameOver = true;
  revealSecret();

  attemptRows.forEach(row => row.style.pointerEvents = "none");

  if (victory) {
    winMessage.style.display = "block";
  } else {
    endMessage.style.display = "block";
  }
}

function revealSecret() {
  const secretSlots = document.querySelectorAll(".secret-code .slot");
  secretSlots.forEach((slot, i) => {
    slot.textContent = secretCode[i];
    slot.classList.remove("hidden");
  });
}

/* ===============================
   RESSAYER
================================ */
retryBtns.forEach(btn => btn.addEventListener("click", initGame));
