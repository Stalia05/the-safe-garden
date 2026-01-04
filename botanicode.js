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
const board = document.querySelector(".botanicode-board");

// 🌱 État du jeu
let secretCode = [];
let currentAttempt = 0;
let selectedSymbol = null;

/* ===============================
   INITIALISATION
================================ */
function initGame() {
  secretCode = generateSecretCode();
  currentAttempt = 0;
  selectedSymbol = null;

  // Reset slots des essais
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

  // Clic sur une case
  slots.forEach(slot => {
    slot.addEventListener("click", () => {
      if (rowIndex !== currentAttempt || !selectedSymbol) return;

      slot.textContent = selectedSymbol;
      slot.dataset.symbol = selectedSymbol;
    });
  });

  // Bouton Valider
  validateBtn.addEventListener("click", () => {
    if (rowIndex !== currentAttempt) return;

    const guess = [...slots].map(s => s.dataset.symbol);
    if (guess.includes("")) return; // ligne incomplète

    const feedback = getFeedback(guess);
    displayFeedback(row, feedback);

    if (feedback.correct === CODE_LENGTH) {
      revealSecret();
      return;
    }

    currentAttempt++;

    if (currentAttempt >= MAX_ATTEMPTS) {
      revealSecret();
      endMessage.style.display = "block";
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

function displayFeedback(row, { correct, present }) {
  const dots = row.querySelectorAll(".feedback-dot");
  let index = 0;

  for (; index < correct; index++) dots[index].classList.add("correct");
  for (; index < correct + present; index++) dots[index].classList.add("present");
  for (; index < dots.length; index++) dots[index].classList.add("absent");
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
retryBtn.addEventListener("click", initGame);
