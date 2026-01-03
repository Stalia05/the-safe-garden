document.addEventListener("DOMContentLoaded", () => {

  const textarea = document.getElementById("chatInput");
  const button = document.getElementById("chatSend");
  const feedback = document.getElementById("chatFeedback");

  if (!textarea || !button || !feedback) return;

  /* ===============================
     FILTRAGE DOUX
  =============================== */
  const forbiddenWords = [
    "suicide",
    "me tuer",
    "mourir",
    "crever",
    "je veux mourir",
    "me faire du mal",
    "mutiler",
    "auto destruction",
    "haine",
    "violence"
  ];

  function containsForbidden(text) {
    const lowered = text.toLowerCase();
    return forbiddenWords.some(word => lowered.includes(word));
  }

  /* ===============================
     RÉPONSES SAFE GARDEN
  =============================== */
  const gentleResponses = [
    "Merci de l’avoir déposé ici 🌿",
    "Tu n’as pas à porter ça seul·e.",
    "C’est ok de ressentir ça.",
    "Tu peux prendre ton temps.",
    "Je t’entends.",
    "Ici, tu peux écrire sans te justifier.",
    "Ce que tu ressens mérite de l’attention.",
    "Respire… tu es en sécurité ici."
  ];

  function randomResponse() {
    return gentleResponses[
      Math.floor(Math.random() * gentleResponses.length)
    ];
  }

  /* ===============================
     ENVOI DU MESSAGE
  =============================== */
  button.addEventListener("click", () => {
    const text = textarea.value.trim();

    if (text === "") {
      feedback.textContent = "Tu peux écrire même un seul mot 🌱";
      return;
    }

    // ⛔ mot sensible détecté
    if (containsForbidden(text)) {
      feedback.textContent =
        "Ce que tu ressens est important 🤍  
        Mais ici, on ne parle pas de se faire du mal.  
        Tu mérites de l’aide réelle, humaine, et immédiate.";

      textarea.value = "";
      return;
    }

    // 🌿 réponse douce
    feedback.textContent = randomResponse();

    textarea.value = "";

    // petite animation discrète
    feedback.style.opacity = "0";
    feedback.style.transform = "translateY(6px)";

    setTimeout(() => {
      feedback.style.opacity = "1";
      feedback.style.transform = "translateY(0)";
    }, 100);
  });

});
