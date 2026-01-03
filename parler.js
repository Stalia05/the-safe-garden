document.addEventListener("DOMContentLoaded", () => {

  const textarea = document.getElementById("chatInput");
  const button = document.getElementById("sendMessage");
  const envelope = document.getElementById("envelope");
  const responsesZone = document.getElementById("chatResponses");

  if (!textarea || !button || !envelope || !responsesZone) return;

  /* ===============================
     FILTRE GROSSES INSULTES
  =============================== */
  const forbiddenWords = [
    "pute","salope","connard","connasse",
    "fdp","enculé","fuck","bitch","asshole"
  ];

  function containsForbidden(text) {
    return forbiddenWords.some(word =>
      text.toLowerCase().includes(word)
    );
  }

  /* ===============================
     RÉPONSES SELON L’HEURE
  =============================== */
  function getResponses() {
    const hour = new Date().getHours();

    if (hour >= 22 || hour < 6) {
      return [
        "La nuit rend les choses plus lourdes… merci de l’avoir déposé ici 🌙",
        "Tu peux laisser ça ici avant de dormir.",
        "Même la nuit, tu n’es pas seul·e."
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

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ===============================
     ENVOI MESSAGE — RITUEL ✉️
  =============================== */
  button.addEventListener("click", () => {
    const text = textarea.value.trim();
    if (!text) return;

    // ⛔ langage violent
    if (containsForbidden(text)) {
      responsesZone.innerHTML =
        `<p class="chat-response">Ici, on parle sans se faire violence 🤍</p>`;
      textarea.value = "";
      return;
    }

    // 📝 plier le texte
    textarea.classList.add("fold");

    // ✉️ afficher enveloppe
    envelope.classList.remove("hidden");

    // vider
    textarea.value = "";

    // 🌿 réponse douce
    const reply = randomFrom(getResponses());

    setTimeout(() => {
      responsesZone.innerHTML =
        `<p class="chat-response">${reply}</p>`;
    }, 1000);

    // ✉️ fermer enveloppe
    setTimeout(() => {
      envelope.classList.add("fold");
    }, 1600);

    // 🔁 reset complet
    setTimeout(() => {
      envelope.classList.add("hidden");
      envelope.classList.remove("fold");
      textarea.classList.remove("fold");
    }, 2600);
  });

});
