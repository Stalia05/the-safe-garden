document.addEventListener("DOMContentLoaded", () => {

  const pickField = document.getElementById("pickField");
  const pickResult = document.getElementById("pickResult");
  const resetBtn = document.getElementById("resetPick");

  /* 🌱 GRANDE LISTE DE PENSÉES */
  const thoughts = [
    "Tu n’as rien à prouver ici.",
    "Tu fais de ton mieux, et c’est déjà beaucoup.",
    "Respirer est déjà un acte de courage.",
    "Tu as le droit d’être fatigué·e.",
    "Ce que tu ressens est valide.",
    "Tu n’es pas en retard sur ta vie.",
    "Ralentir n’est pas échouer.",
    "Tu peux faire une pause sans te justifier.",
    "Tu es plus fort·e que tu ne le crois.",
    "Aujourd’hui, survivre suffit.",
    "Tu as le droit de demander de l’aide.",
    "Même les jours lents ont de la valeur.",
    "Tu n’as pas besoin d’aller bien pour mériter de la douceur.",
    "Ton rythme est le bon.",
    "Tu peux recommencer autant de fois que nécessaire.",
    "Ce n’est pas grave de ne pas savoir.",
    "Tu n’es pas un fardeau.",
    "Tu as le droit de dire non.",
    "Ce moment difficile ne te définit pas.",
    "Tu avances, même quand ça ne se voit pas.",
    "Tu peux déposer ce poids ici.",
    "Tu n’as pas à tout porter seul·e.",
    "Ta sensibilité est une force.",
    "Tu mérites le repos.",
    "Tu as le droit de changer d’avis.",
    "Être doux·ce avec soi-même, ça s’apprend.",
    "Tu fais déjà assez.",
    "Même immobile, tu existes pleinement.",
    "Tu peux respirer, là, maintenant.",
    "Ce que tu ressens a le droit d’exister.",
    "Tu n’es pas faible parce que tu ressens.",
    "Tu as le droit d’être soutenu·e.",
    "Un petit pas reste un pas.",
    "Tu peux te choisir, sans culpabiliser.",
    "Ce n’est pas grave d’aller lentement.",
    "Tu es légitime dans ce que tu ressens.",
    "Tu peux t’autoriser la douceur.",
    "Tu n’es pas seul·e ici.",
    "Tu fais de ton mieux avec ce que tu as.",
    "Aujourd’hui, c’est suffisant."
  ];

  let availableThoughts = [];

  /* 🔀 Mélange les pensées */
  function shuffleThoughts() {
    availableThoughts = [...thoughts].sort(() => Math.random() - 0.5);
  }

  /* 🌼 Prend une pensée sans répétition immédiate */
  function getThought() {
    if (availableThoughts.length === 0) {
      shuffleThoughts();
    }
    return availableThoughts.pop();
  }

  /* 🌿 Crée les feuilles / étoiles */
  function createItems() {
    pickField.innerHTML = "";
    pickResult.textContent = "Clique sur une feuille ou une étoile.";
    pickResult.classList.remove("show");

    shuffleThoughts();

    for (let i = 0; i < 20; i++) {
      const el = document.createElement("div");
      el.classList.add("pick-item");

      const isStar = Math.random() > 0.5;
      el.textContent = isStar ? "✦" : "🍃";
      el.classList.add(isStar ? "star" : "leaf");

      el.style.left = Math.random() * 90 + "%";
      el.style.top = Math.random() * 80 + "%";
      el.style.fontSize = (18 + Math.random() * 20) + "px";

      el.addEventListener("click", () => {
        pickResult.classList.remove("show");
        pickResult.textContent = getThought();

        setTimeout(() => {
          pickResult.classList.add("show");
        }, 50);

        el.style.opacity = "0.3";
        el.style.pointerEvents = "none";
      });

      pickField.appendChild(el);
    }
  }

  /* 🔄 Bouton régénérer */
  resetBtn.addEventListener("click", createItems);

  /* 🚀 Lancement */
  createItems();
});
