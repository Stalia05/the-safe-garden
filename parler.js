document.addEventListener("DOMContentLoaded", () => {

  const textarea = document.getElementById("chatInput");
  const button = document.getElementById("chatSend");
  const feedback = document.getElementById("chatFeedback");

  if (!textarea || !button || !feedback) return;

  /* ===============================
     RÉPONSES SAFE GARDEN
  =============================== */

  const gentleResponses = [
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
    "Respire un instant… on reformule ensemble."
  ];

  function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
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

    // ⛔ mot interdit / insulte détectée
    if (containsForbidden(text)) {
      feedback.textContent = randomFrom(boundaryResponses);

      textarea.value = "";
      return;
    }

    // 🌿 réponse douce
    feedback.textContent = randomFrom(gentleResponses);

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
