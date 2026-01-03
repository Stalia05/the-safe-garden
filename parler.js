document.addEventListener("DOMContentLoaded", () => {

  const textarea = document.getElementById("chatInput");
  const button = document.getElementById("sendMessage");
  const feedback = document.getElementById("chatFeedback");

  if (!textarea || !button || !feedback) return;

  /* ===============================
     FILTRE INSULTES
  =============================== */
  const forbiddenWords = [
    "pute","salope","connard","connasse","nique",
    "fdp","enculé","fuck","bitch","asshole","suicide"
  ];

  function containsForbidden(text) {
    return forbiddenWords.some(word =>
      text.toLowerCase().includes(word)
    );
  }

  /* ===============================
     RÉPONSES SELON L’HEURE
  =============================== */
  function getResponsesByTime() {
    const hour = new Date().getHours();

    if (hour >= 22 || hour < 6) {
      return [
        "La nuit rend les choses plus lourdes… merci de l’avoir déposé ici 🌙",
        "Tu peux laisser ça ici avant de dormir.",
        "Même la nuit, tu peux respirer ici."
      ];
    }

    if (hour < 12) {
      return [
        "Merci d’avoir commencé ta journée ici 🌿",
        "Tu peux avancer doucement aujourd’hui."
      ];
    }

    if (hour < 18) {
      return [
        "Tu as bien fait de t’arrêter un instant.",
        "Respirer ici compte."
      ];
    }

    return [
      "La journée a été longue… tu peux poser ça ici.",
      "Tu peux ralentir maintenant."
    ];
  }

  const gentleBase = [
    "Merci de l’avoir déposé ici 🌿",
    "Tu n’as rien à prouver.",
    "Ce que tu ressens a sa place.",
    "Je t’entends.",
    "Tu peux rester un moment."
  ];

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ===============================
     ENVOI + ANIMATION
  =============================== */
  button.addEventListener("click", () => {
    const text = textarea.value.trim();

    if (!text) {
      feedback.textContent = "Tu peux écrire même un seul mot 🌱";
      return;
    }

    if (containsForbidden(text)) {
      feedback.textContent = "Ici, on se parle sans se faire violence 🤍";
      textarea.value = "";
      return;
    }

    // ✉️ animation pliage
    textarea.classList.add("fold");

    setTimeout(() => {
      textarea.value = "";
      textarea.classList.remove("fold");
    }, 700);

    const responses = [...gentleBase, ...getResponsesByTime()];
    feedback.textContent = randomFrom(responses);

    // animation réponse
    feedback.style.opacity = "0";
    feedback.style.transform = "translateY(6px)";

    setTimeout(() => {
      feedback.style.opacity = "1";
      feedback.style.transform = "translateY(0)";
    }, 150);
  });

});
