document.addEventListener("DOMContentLoaded", () => {

  const textarea = document.getElementById("chatInput");
  const button = document.getElementById("sendMessage");
  const envelope = document.getElementById("envelope");
  const responsesContainer = document.getElementById("chatResponses");

  if (!textarea || !button || !envelope || !responsesContainer) return;

  /* ===============================
     FILTRE INSULTES (BASIQUE SAFE)
  =============================== */
  function containsForbidden(text) {
    const forbidden = ["con", "connard", "pute", "salope", "fdp", "nique"];
    return forbidden.some(word =>
      text.toLowerCase().includes(word)
    );
  }

  /* ===============================
     MESSAGES SELON L’HEURE
  =============================== */
  function getTimeResponses() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return [
        "Tu peux commencer la journée doucement 🌱",
        "Rien ne presse ce matin.",
        "Ce que tu ressens a le droit d’exister dès maintenant."
      ];
    }

    if (hour >= 12 && hour < 18) {
      return [
        "Tu peux faire une pause, même au milieu de la journée 🌿",
        "Tu n’as pas besoin d’aller vite pour aller bien.",
        "Déposer ici, c’est déjà prendre soin de toi."
      ];
    }

    if (hour >= 18 && hour < 23) {
      return [
        "Ce soir, tu peux poser ce qui pèse 🌙",
        "La journée peut s’arrêter ici.",
        "Tu n’as rien à régler maintenant."
      ];
    }

    return [
      "Il est tard… merci d’avoir déposé ici 🌌",
      "Même la nuit, tu n’es pas seul·e.",
      "Tu peux laisser ça ici et te reposer."
    ];
  }

  function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* ===============================
     ACTION : DÉPOSER ✉️
  =============================== */
  button.addEventListener("click", () => {
    const text = textarea.value.trim();

    if (text === "") {
      showResponse("Tu peux écrire même un seul mot 🌱");
      return;
    }

    if (containsForbidden(text)) {
      showResponse("Ici, on parle sans se faire violence 🤍");
      textarea.value = "";
      return;
    }

    /* 🔄 RESET animation */
    envelope.classList.add("hidden");
    envelope.classList.remove("fold");

    void envelope.offsetWidth; // 🔑 force le repaint

    /* ✉️ LANCEMENT ANIMATION */
    textarea.classList.add("fold");
    envelope.classList.remove("hidden");

    setTimeout(() => {
      envelope.classList.add("fold");
    }, 900);

    /* 🌿 MESSAGE FINAL */
    setTimeout(() => {
      const responses = getTimeResponses();
      showResponse(randomFrom(responses));

      // reset
      textarea.classList.remove("fold");
      textarea.value = "";
      envelope.classList.add("hidden");
      envelope.classList.remove("fold");
    }, 2000);
  });

  /* ===============================
     AFFICHER MESSAGE
  =============================== */
  function showResponse(text) {
    responsesContainer.innerHTML = "";

    const p = document.createElement("p");
    p.className = "chat-response";
    p.textContent = text;

    responsesContainer.appendChild(p);
  }

});
