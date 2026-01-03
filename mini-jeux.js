document.addEventListener("DOMContentLoaded", function () {

  console.log("✅ mini-jeux.js chargé correctement");

  /* ===============================
     BOUTON RETOUR À L’ACCUEIL
  =============================== */
  const backHome = document.querySelector(".back-home-fixed");

  if (backHome) {
    backHome.style.display = "block";
  }

  /* ===============================
     ANIMATION DOUCE DES CARTES
     (juste visuel, pas de logique cachée)
  =============================== */
  const cards = document.querySelectorAll(".game-card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

});
