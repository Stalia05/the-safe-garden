document.addEventListener("DOMContentLoaded", () => {

  const textarea = document.getElementById("chatInput");
  const button = document.getElementById("sendMessage");
  const feedback = document.getElementById("chatFeedback");

  if (!textarea || !button || !feedback) return;

  /* ===============================
     FILTRE INSULTES (GROSSES)
  =============================== */
  const forbiddenWords = [
    "pute", "salope", "connard", "connasse",
    "nique", "nique ta", "fdp", "enculé",
    "merde", "fuck", "bitch", "asshole",
    "suicide", "me tuer", "me buter"
  ];

  function containsForbidden(text) {
    const lower = text.toLowerCase();
    return forbiddenWords.some(word => lower.includes(word));
  }

  /* ===============================
     RÉPONSES SELON L’HEURE 🌙🌤️
  =============================== */
  function getTimeResponses() {
    const hour = new Date().getHours();

    if (hour >= 22 || hour < 6) {
      return [
        "La nuit rend les choses plus lourdes… merci de l’avoir déposé ici 🌙",
        "Tu peux laisser ça ici avant de dormir.",
        "Même la nuit, tu n’es pas seul·e.",
        "Tu peux fermer les yeux après ça."
      ];
    }

    if (hour >= 6 && hour < 12) {
      return [
        "Merci de commencer la journée en déposant ça ici 🌿",
        "Tu peux avancer doucement aujourd’hui.",
        "Ce que tu ressens a sa place, même le matin.",
      ];
    }

    if (hour >= 12 && hour < 18) {
      return [
        "Merci de prendre un moment pour toi.",
        "Tu peux faire une pause ici.",
        "Respirer un peu change déjà les choses.",
      ];
    }

    // soir
    return [
      "La journée a été longue… tu peux poser ça ici.",
      "Merci de t’être arrêté·e un instant.",
      "Tu peux ralentir maintenant.",
    ];
  }

  const gentleResponsesBase = [
    "Merci de l’avoir déposé ici 🌿",
    "Tu peux écrire sans te censurer.",
    "Ce que tu ressens mérite de l’espace.",
    "Tu n’as rien à prouver ici.",
    "Je t’entends.",
    "Tu peux ralentir.",
    "Ici, on respire avant de répondre.",
    "Tu peux rester un moment."
  ];

  const boundaryResponses = [
    "Ici, on parle sans se faire violence 🤍",
    "Je comprends la colère, mais pas les insultes.",
    "On peut dire les choses autrement ici.",
    "Ta colère a le droit d’exister, pas de blesser.",
    "Respire un instant… reformule quand tu veux."
  ];

  function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* ===============================
     ENVOI DU MESSAGE 🌿
  =============================== */
  button.addEventListener("click", () => {
    const text = textarea.value.trim();

    if (text === "") {
      feedback.textContent = "Tu peux écrire même un seul mot 🌱";
      return;
    }

    // ⛔ insultes / mots violents
    if (containsForbidden(text)) {
      feedback.textContent = randomFrom(boundaryResponses);
      textarea.value = "";
      return;
    }

    // 🌿 réponse douce + heure
    const timeResponses = getTimeResponses();
    const allResponses = [...gentleResponsesBase, ...timeResponses];

    feedback.textContent = randomFrom(allResponses);
    textarea.value = "";

    // animation douce
    feedback.style.opacity = "0";
    feedback.style.transform = "translateY(6px)";

    setTimeout(() => {
      feedback.style.opacity = "1";
      feedback.style.transform = "translateY(0)";
    }, 120);
  });

});
