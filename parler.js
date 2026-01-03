document.addEventListener("DOMContentLoaded", () => {

  console.log("🌿 Parler.js chargé");

  const textarea = document.getElementById("chatInput");
  const button = document.getElementById("sendMessage");
  const envelope = document.getElementById("envelope");
  const responsesContainer = document.getElementById("chatResponses");

  if (!textarea || !button || !envelope || !responsesContainer) {
    console.warn("❌ Un élément est manquant dans le HTML");
    return;
  }

  /* ===============================
     PHRASES SELON L’HEURE
  =============================== */
  function getTimeResponses() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return [
        "Tu peux commencer la journée doucement 🌱",
        "Rien ne presse ce matin.",
        "Ce que tu ressens a le droit d’exister dès maintenant.",
        "Tu n’as pas besoin d’aller vite aujourd’hui."
      ];
    }

    if (hour >= 12 && hour < 18) {
      return [
        "Tu peux faire une pause, même au milieu de la journée 🌿",
        "Tu n’as pas besoin d’aller vite pour aller bien.",
        "Déposer ici, c’est déjà prendre soin de toi.",
        "Tu peux respirer avant de continuer."
      ];
    }

    if (hour >= 18 && hour < 23) {
      return [
        "Ce soir, tu peux poser ce qui pèse 🌙",
        "La journée peut s’arrêter ici.",
        "Tu n’as rien à régler maintenant.",
        "Tu peux relâcher un peu."
      ];
    }

    return [
      "Il est tard… merci d’avoir déposé ici 🌌",
      "Même la nuit, tu peux être entendu·e.",
      "Tu peux laisser ça ici et te reposer.",
      "Le silence peut aussi être doux."
    ];
  }

  function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* ===============================
     RESET VISUEL (IMPORTANT)
  =============================== */
  function resetAnimation() {
    envelope.classList.add("hidden");
    envelope.classList.remove("fold");

    textarea.classList.remove("fold");

    // reset animation lettre
    const letter = envelope.querySelector(".letter");
    if (letter) {
      letter.style.animation = "none";
      void letter.offsetWidth;
      letter.style.animation = "";
    }
  }

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

  /* ===============================
     ACTION : DÉPOSER ✉️
  =============================== */
  button.addEventListener("click", () => {
    const text = textarea.value.trim();

    if (text === "") {
      showResponse("Tu peux écrire même un seul mot 🌱");
      return;
    }

    // reset avant lancement
    resetAnimation();

    // 🔄 force repaint
    void envelope.offsetWidth;

    /* ✉️ animation lettre */
    textarea.classList.add("fold");
    envelope.classList.remove("hidden");

    setTimeout(() => {
      envelope.classList.add("fold");
    }, 900);

    /* 🌿 message doux */
    setTimeout(() => {
      showResponse(randomFrom(getTimeResponses()));

      textarea.value = "";
      textarea.classList.remove("fold");
      envelope.classList.add("hidden");
      envelope.classList.remove("fold");
    }, 2000);
  });

});
