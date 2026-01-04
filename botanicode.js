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
const retryBtn = document.querySelector(".retry-btn");

// 🌱 État du jeu
let secretCode = [];
let currentAttempt = 0;
let currentPosition = 0;
let selectedSymbol = null;

/* ===============================
   INITIALISATION
================================ */
function initGame() {
  secretCode = generateSecretCode();
  currentAttempt = 0;
  currentPosition = 0;
  selectedSymbol = null;

  // Nettoyage du plateau
  document.querySelectorAll(".slot").forEach(slot => {
    slot.textContent = "";
    slot.className = "slot";
  });

  document.querySelectorAll(".feedback-dot").forEach(dot => {
    dot.className = "feedback-dot";
  });

  endMessage.style.display = "none";

  enableCurrentRow();
}

initGame();

/* ===============================
   GÉNÉRATION DU CODE
================================ */
function generateSecretCode() {
  const code = [];
  for (let i = 0; i < CODE_LENGTH; i++) {
    const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    code.push(randomSymbol);
  }
  return code;
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
    selectedSymbol = symbol;
    document.querySelectorAll(".symbol").forEach(s => s.classList.remove("selected"));
    el.classList.add("selected");
  });

  palette.appendChild(el);
});

document.querySelector(".botanicode-board").appendChild(palette);

/* ===============================
   INTERACTION AVEC LE PLATEAU
================================ */
attemptRows.forEach((row, rowIndex) => {
  const slots = row.querySelectorAll(".slot");

  slots.forEach((slot, slotIndex) => {
    slot.addEventListener("click", () => {
      if (rowIndex !== currentAttempt || !selectedSymbol) return;

      slot.textContent = selectedSymbol;
      slot.dataset.symbol = selectedSymbol;

      currentPosition = slotIndex + 1;

      if (isRowComplete(row)) {
        validateRow(row);
      }
    });
  });
});

/* ===============================
   VALIDATION
================================ */
function isRowComplete(row) {
  return [...row.querySelectorAll(".slot")].every(slot => slot.dataset.symbol);
}

function validateRow(row) {
  const guess = [...row.querySelectorAll(".slot")].map(s => s.dataset.symbol);
  const feedback = getFeedback(guess);
  displayFeedback(row, feedback);

  if (feedback.correct === CODE_LENGTH) {
    revealSecret(true);
    return;
  }

  currentAttempt++;

  if (currentAttempt >= MAX_ATTEMPTS) {
    revealSecret(false);
    return;
  }

  enableCurrentRow();
}

/* ===============================
   FEEDBACK
================================ */
function getFeedback(guess) {
  let correct = 0;
  let present = 0;

  const codeCopy = [...secretCode];
  const guessCopy = [...guess];

  // 🟢 Bien placé
  for (let i = 0; i < CODE_LENGTH; i++) {
    if (guessCopy[i] === codeCopy[i]) {
      correct++;
      codeCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // 🟡 Présent mal placé
  guessCopy.forEach(symbol => {
    if (symbol && codeCopy.includes(symbol)) {
      present++;
      codeCopy[codeCopy.indexOf(symbol)] = null;
    }
  });

  return { correct, present };
}

function displayFeedback(row, feedback) {
  const dots = row.querySelectorAll(".feedback-dot");
  let index = 0;

  for (let i = 0; i < feedback.correct; i++) {
    dots[index++].classList.add("correct");
  }
  for (let i = 0; i < feedback.present; i++) {
    dots[index++].classList.add("present");
  }
  while (index < dots.length) {
    dots[index++].classList.add("absent");
  }
}

/* ===============================
   FIN DE PARTIE
================================ */
function revealSecret(victory) {
  const secretSlots = document.querySelectorAll(".secret-code .slot");

  secretSlots.forEach((slot, i) => {
    slot.textContent = secretCode[i];
    slot.classList.remove("hidden");
  });

  if (!victory) {
    endMessage.style.display = "block";
  }
}

/* ===============================
   GESTION DES LIGNES
================================ */
function enableCurrentRow() {
  attemptRows.forEach((row, index) => {
    row.style.opacity = index === currentAttempt ? "1" : "0.4";
    row.style.pointerEvents = index === currentAttempt ? "auto" : "none";
  });
}

/* ===============================
   RESSAYER
================================ */
retryBtn.addEventListener("click", () => {
  initGame();
});
