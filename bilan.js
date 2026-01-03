// ==================
// ÉLÉMENTS HTML
// ==================
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const backBtn = document.getElementById("backBtn");

// ==================
// QUESTIONS (20)
// ==================
const questions = [
  {
    text: "En ce moment, comment te sens-tu le plus souvent ?",
    answers: [
      { text: "Plutôt calme", tags: ["ancrage_fragile"] },
      { text: "Un peu fatigué·e", tags: ["fatigue_legere"] },
      { text: "Submergé·e", tags: ["fatigue_profonde", "anxiete"] },
      { text: "Je ne sais pas trop", tags: ["confusion"] }
    ]
  },
  {
    text: "Ton niveau d’énergie ces derniers jours est plutôt…",
    answers: [
      { text: "Stable", tags: ["ancrage_fragile"] },
      { text: " Assez bas", tags: ["fatigue_legere"] },
      { text: "Très bas", tags: ["fatigue_profonde"] },
      { text: "Imprévisible", tags: ["epuisement_emotionnel"] }
    ]
  },
  {
    text: "Tes pensées sont généralement…",
    answers: [
      { text: "Claires", tags: ["ancrage_fragile"] },
      { text: "Nombreuses", tags: ["anxiete"] },
      { text: "Envahissantes", tags: ["anxiete", "epuisement_emotionnel"] },
      { text: "Floues", tags: ["confusion"] }
    ]
  },
  {
    text: "Quand tu te réveilles le matin, tu te sens…",
    answers: [
      { text: "Reposé·e", tags: ["ancrage_fragile"] },
      { text: "Fatigué·e", tags: ["fatigue_legere"] },
      { text: "Déjà tendu·e", tags: ["anxiete"] },
      { text: "Sans énergie", tags: ["fatigue_profonde"] }
    ]
  },
  {
    text: "Ton sommeil est plutôt…",
    answers: [
      { text: "Réparateur", tags: ["ancrage_fragile"] },
      { text: "Irrégulier", tags: ["fatigue_legere"] },
      { text: "Difficile", tags: ["anxiete"] },
      { text: "Insuffisant", tags: ["fatigue_profonde"] }
    ]
  },
  {
    text: "Quand quelque chose te pèse, tu as tendance à…",
    answers: [
      { text: "En parler", tags: ["ancrage_fragile"] },
      { text: "Garder pour toi", tags: ["deconnexion"] },
      { text: "Minimiser", tags: ["auto_exigence"] },
      { text: "T’isoler", tags: ["epuisement_emotionnel"] }
    ]
  },
  {
    text: "Ton rapport à toi-même est plutôt…",
    answers: [
      { text: "Bienveillant", tags: ["ancrage_fragile"] },
      { text: "Exigeant", tags: ["auto_exigence"] },
      { text: "Dur", tags: ["auto_exigence", "fatigue_profonde"] },
      { text: "Flou", tags: ["confusion"] }
    ]
  },
  {
    text: "Quand tu ralentis, tu ressens surtout…",
    answers: [
      { text: "Du soulagement", tags: ["transition"] },
      { text: "De l’ennui", tags: ["deconnexion"] },
      { text: "De l’anxiété", tags: ["anxiete"] },
      { text: "De la paix", tags: ["ancrage_fragile"] }
    ]
  },
  {
    text: "Ces derniers temps, tu te sens plutôt…",
    answers: [
      { text: "Aligné·e", tags: ["ancrage_fragile"] },
      { text: "Perdu·e", tags: ["confusion"] },
      { text: "En transition", tags: ["transition"] },
      { text: "En survie", tags: ["epuisement_emotionnel"] }
    ]
  },
  {
    text: "Là, tout de suite, tu te sens…",
    answers: [
      { text: "Présent·e", tags: ["ancrage_fragile"] },
      { text: "Fatigué·e", tags: ["fatigue_profonde"] },
      { text: "Ému·e", tags: ["hypersensibilite"] },
      { text: "Soulagé·e d’être ici", tags: ["transition"] }
    ]
  }
];

// ==================
// BILANS
// ==================
const results = {
  fatigue_legere: `Tu ressens une fatigue discrète mais persistante.
Elle n’est pas spectaculaire, mais elle est réelle.
Tu continues d’avancer, parfois sans t’écouter autant que nécessaire.
Ton corps et ton esprit ne demandent pas l’arrêt, mais un réajustement.
Ralentir un peu, t’autoriser des pauses inutiles, relâcher certaines exigences…
Ce sont souvent de petits gestes qui font une grande différence.`,

  fatigue_profonde: `Tu sembles fonctionner sur les réserves.
Le repos ne suffit plus toujours à te régénérer.
Ce n’est pas une faiblesse, mais un signal clair de surcharge prolongée.
Ton corps te demande de prendre cette fatigue au sérieux.
Tu mérites un repos profond, réel, sans culpabilité.`,

  anxiete: `Quelque chose en toi reste en alerte.
Ton esprit anticipe, analyse, s’inquiète.
Cette anxiété n’est pas imaginaire : elle traduit un besoin de sécurité.
Ce bilan t’invite à revenir au corps, à ralentir les stimulations,
et à créer des espaces où tu n’as rien à gérer.`,

  confusion: `Tu avances sans direction claire.
Le flou que tu ressens est souvent le signe d’une transition intérieure.
Tu n’es pas perdu·e, tu es en réajustement.
Il n’y a rien à forcer.
Les réponses viendront avec le temps.`,

  hypersensibilite: `Tu ressens intensément.
Cette sensibilité est une richesse, mais elle demande de la protection.
Tu as peut-être besoin de limites plus douces,
d’environnements apaisants,
et de moments pour souffler émotionnellement.`,

  auto_exigence: `Tu te demandes beaucoup.
Parfois plus que ce qui est juste pour toi.
Cette exigence vient souvent d’un désir de bien faire.
Mais elle peut t’épuiser.
Ce bilan t’invite à te parler avec plus de douceur.`,

  epuisement_emotionnel: `Tu donnes beaucoup sans toujours te recharger.
Une fatigue émotionnelle profonde peut s’installer.
Tu as le droit de recevoir, de poser des limites,
et de prendre soin de toi sans justification.`,

  deconnexion: `Une distance intérieure semble s’être installée.
C’est souvent un mécanisme de protection.
Ce bilan t’invite à recréer du lien avec toi-même,
à ton rythme, sans forcer.`,

  transition: `Quelque chose change.
Les anciennes façons ne te conviennent plus,
les nouvelles ne sont pas encore claires.
C’est inconfortable, mais profondément vivant.
Tu es en mouvement.`,

  ancrage_fragile: `Malgré tout, tu tiens.
Il existe en toi une stabilité fragile mais réelle.
Ta capacité à t’écouter est une vraie force.
Continue de la nourrir.`
};

// ==================
// ÉTAT
// ==================
let current = 0;
let history = [];
let tagCount = {};

// ==================
// AFFICHER QUESTION
// ==================
function showQuestion() {
  const q = questions[current];
  questionText.textContent = q.text;
  answersDiv.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;

    btn.onclick = () => {
      history.push({ index: current, tags: answer.tags });
      answer.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
      current++;
      current < questions.length ? showQuestion() : showTransition();
    };

    answersDiv.appendChild(btn);
  });

  backBtn.style.display = history.length ? "block" : "none";
}

// ==================
// TRANSITION
// ==================
function showTransition() {
  questionText.textContent = "Merci d’avoir pris ce temps pour toi 💚";
  answersDiv.innerHTML = `<p style="text-align:center;">Ton bilan se prépare doucement…</p>`;
  backBtn.style.display = "none";

  setTimeout(showResult, 3000);
}

// ==================
// RÉSULTAT
// ==================
function showResult() {
  const dominant = Object.keys(tagCount).reduce((a, b) =>
    tagCount[a] > tagCount[b] ? a : b
  );

  questionText.textContent = "Ton bilan personnalisé";
  answersDiv.innerHTML = `<p>${results[dominant]}</p>`;
}

// ==================
// RETOUR
// ==================
backBtn.onclick = () => {
  if (!history.length) return;

  const last = history.pop();
  current = last.index;

  tagCount = {};
  history.forEach(h => {
    h.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  showQuestion();
};

// ==================
// LANCEMENT
// ==================
showQuestion();
