const levels = [
  {
    title: "La primera pista",
    difficulty: "FÁCIL",
    story:
      "Todo comienza con una contraseña de cuatro números. No necesitas buscar demasiado lejos.",
    clue:
      "La contraseña es el número de letras que tiene la palabra «LUNA», seguido del número de letras de «SOL».",
    answer: "43",
    extra:
      "Cuenta las letras de cada palabra. No necesitas hacer ninguna operación."
  },

  {
    title: "El mensaje oculto",
    difficulty: "FÁCIL",
    story:
      "Has encontrado el primer código. El siguiente archivo contiene una pista aparentemente sencilla.",
    clue:
      "¿Qué número falta? 2, 4, 6, 8, ?, 12",
    answer: "10",
    extra:
      "Observa la diferencia entre cada número."
  },

  {
    title: "La palabra secreta",
    difficulty: "MEDIO",
    story:
      "El sistema detecta que has avanzado. Ahora tendrás que descubrir una palabra.",
    clue:
      "Soy algo que ves durante el día, desaparezco durante la noche y puedo estar cubierto por nubes.",
    answer: "sol",
    extra:
      "Mira hacia arriba durante el día."
  },

  {
    title: "Código de letras",
    difficulty: "MEDIO",
    story:
      "El sistema ha cambiado el formato. Esta vez no necesitas encontrar un número.",
    clue:
      "A=1, B=2, C=3... ¿Qué palabra forman los números 3 - 1 - 19 - 1?",
    answer: "casa",
    extra:
      "Cada número representa la posición de una letra en el abecedario."
  },

  {
    title: "El último acceso",
    difficulty: "DIFÍCIL",
    story:
      "Has llegado al último nivel. Una última contraseña separa tu investigación del archivo final.",
    clue:
      "Tengo ciudades pero no casas, montañas pero no árboles y agua pero no peces. ¿Qué soy?",
    answer: "mapa",
    extra:
      "Puedes usarme para encontrar lugares sin tener que estar allí."
  }
];

let currentLevel = 0;
let attempts = 0;

const levelNumber = document.getElementById("levelNumber");
const difficulty = document.getElementById("difficulty");
const levelTitle = document.getElementById("levelTitle");
const story = document.getElementById("story");
const clueText = document.getElementById("clueText");
const passwordInput = document.getElementById("passwordInput");
const checkButton = document.getElementById("checkButton");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const hintButton = document.getElementById("hintButton");
const extraHint = document.getElementById("extraHint");

const successScreen = document.getElementById("successScreen");
const successTitle = document.getElementById("successTitle");
const successText = document.getElementById("successText");
const nextButton = document.getElementById("nextButton");

function loadLevel() {
  const level = levels[currentLevel];

  levelNumber.textContent =
    `NIVEL ${String(currentLevel + 1).padStart(2, "0")}`;

  difficulty.textContent = level.difficulty;
  levelTitle.textContent = level.title;
  story.textContent = level.story;
  clueText.textContent = level.clue;

  progressText.textContent =
    `Nivel ${currentLevel + 1} de ${levels.length}`;

  progressFill.style.width =
    `${((currentLevel + 1) / levels.length) * 100}%`;

  passwordInput.value = "";
  message.textContent = "";
  message.className = "";

  extraHint.textContent = "";
  extraHint.classList.add("hidden");

  attemptsText.textContent = `Intentos: ${attempts}`;

  passwordInput.focus();
}

function checkPassword() {
  const userAnswer = passwordInput.value
    .trim()
    .toLowerCase();

  const correctAnswer = levels[currentLevel].answer
    .toLowerCase();

  if (!userAnswer) {
    message.textContent = "⚠️ Escribe una respuesta primero.";
    message.className = "message-error";
    return;
  }

  attempts++;

  attemptsText.textContent = `Intentos: ${attempts}`;

  if (userAnswer === correctAnswer) {

    message.textContent = "✓ Contraseña correcta.";
    message.className = "message-success";

    successTitle.textContent =
      currentLevel === levels.length - 1
        ? "🏆 ¡Has completado el juego!"
        : "🔓 ¡Nivel desbloqueado!";

    successText.textContent =
      currentLevel === levels.length - 1
        ? "Has conseguido descubrir todas las contraseñas."
        : `Has superado el nivel ${currentLevel + 1}.`;

    nextButton.textContent =
      currentLevel === levels.length - 1
        ? "JUGAR DE NUEVO"
        : "SIGUIENTE NIVEL →";

    setTimeout(() => {
      successScreen.classList.remove("hidden");
    }, 350);

  } else {

    message.textContent = "✕ Contraseña incorrecta. Busca otra pista.";
    message.className = "message-error";

    passwordInput.select();
  }
}

function showHint() {
  extraHint.textContent = levels[currentLevel].extra;
  extraHint.classList.remove("hidden");
}

function nextLevel() {

  successScreen.classList.add("hidden");

  if (currentLevel === levels.length - 1) {
    currentLevel = 0;
    attempts = 0;
  } else {
    currentLevel++;
  }

  loadLevel();
}

checkButton.addEventListener("click", checkPassword);

hintButton.addEventListener("click", showHint);

nextButton.addEventListener("click", nextLevel);

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkPassword();
  }
});

loadLevel();
