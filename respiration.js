document.addEventListener("DOMContentLoaded", () => {

  const circle = document.getElementById("circle");
  const instruction = document.getElementById("instruction");
  const startBtn = document.getElementById("start");

  let isRunning = false;

  startBtn.addEventListener("click", () => {
    if (isRunning) return;

    isRunning = true;
    startBtn.disabled = true;
    startBtn.style.opacity = "0.6";

    instruction.textContent = "Inspire…";
    circle.classList.add("expand");

    setTimeout(() => {
      instruction.textContent = "Expire…";
      circle.classList.remove("expand");
    }, 4000);

    setTimeout(() => {
      instruction.textContent = "Bien joué. Recommence quand tu veux 🌿";
      startBtn.textContent = "Recommencer";
      startBtn.disabled = false;
      startBtn.style.opacity = "1";
      isRunning = false;
    }, 8000);
  });

});
