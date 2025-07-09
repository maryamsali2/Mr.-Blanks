

// ===== Game State Variables =====
let clue = 0;                        
let wrongLetters = [];              
let correctLetters = [];            
let blanks;                         
let chosenWord;                     
let splitWord;                      
let blankSpaces = [];               
let maxAttempts = 7;                

// ===== Sound Effects Setup =====
const clickSound = new Audio("appleCrash.mp3");  // Click sound

// ===== Game Levels & Clues =====
let levels = [
  {
    word: "CAR",
    clue: "I have a heart that never loves, yet it keeps me going. ❤️ I bleed, but it's not blood. 🛢️ I breathe through filters, not lungs. 🫁 Who am I?"
  },
  {
    word: "KEYBOARD",
    clue: "🗝 I have keys but open no locks.🚀 I have space but no room.🚪 You can enter, but I’m not a door.🤔 What am I?"
  }
];

// ===== Game Initialization =====
function startGame() {
  correctLetters = [];
  wrongLetters = [];
  blankSpaces = [];

  document.getElementById("hint").innerText = levels[clue].clue;

  chosenWord = levels[clue].word.toUpperCase();
  splitWord = chosenWord.split("");

  blanks = document.getElementById("blanks");
  blanks.innerHTML = "";
  splitWord.forEach(() => {
    let span = document.createElement("span");
    span.innerText = "_";
    blanks.appendChild(span);
    blankSpaces.push(span);
  });

  document.getElementById("videoContainer").style.display = "none";
  document.getElementById("gameOverContainer").style.display = "none";
  document.getElementById("win-caption").style.display = "none";
  document.getElementById("retry-btn").style.display = "none";

  document.getElementById("health-bar").style.width = "100%";

  const buttons = document.querySelectorAll("#letters-container button");
  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.style.backgroundColor = "";
  });
}

// ===== Handle a Letter Button Press =====
function handleGuess(event) {
  const letter = event.target.innerText;
  event.target.disabled = true;

  clickSound.currentTime = 0;
  clickSound.play();

  if (splitWord.includes(letter)) {
    splitWord.forEach((l, i) => {
      if (l === letter) {
        blankSpaces[i].innerText = letter;
        correctLetters.push(letter);
      }
    });

    const uniqueCorrect = [...new Set(correctLetters)];
    const uniqueWord = [...new Set(splitWord)];
    if (uniqueCorrect.length === uniqueWord.length) {
      document.getElementById("videoContainer").style.display = "flex";
      document.getElementById("winVideo").currentTime = 0;
      document.getElementById("winVideo").play();
      document.getElementById("win-caption").style.display = "block";
      disableAllButtons();
    }

  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      updateHealth();

      if (wrongLetters.length === maxAttempts) {
        document.getElementById("videoContainer").style.display = "none";
        document.getElementById("win-caption").style.display = "none";

        const gameOverVideo = document.getElementById("game-over-video");
        document.getElementById("gameOverContainer").style.display = "flex";
        gameOverVideo.currentTime = 0;
        gameOverVideo.play();

        document.getElementById("retry-btn").style.display = "block";

        loseSound.play();

        disableAllButtons();
      }
    }

    event.target.style.backgroundColor = "#f77";
  }
}

// ===== Update Health Bar Based on Mistakes =====
function updateHealth() {
  let remaining = maxAttempts - wrongLetters.length;
  let percent = (remaining / maxAttempts) * 100;
  document.getElementById("health-bar").style.width = `${percent}%`;
}

// ===== Disable All Keyboard Buttons =====
function disableAllButtons() {
  const buttons = document.querySelectorAll("#letters-container button");
  buttons.forEach((btn) => {
    btn.disabled = true;
  });
}

// ===== Run Game on Page Load =====
window.addEventListener("DOMContentLoaded", () => {
  startGame();

  const buttons = document.querySelectorAll("#letters-container button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", handleGuess);
  });

  document.getElementById("retry-btn").addEventListener("click", () => {
    clue++;
    if (clue >= levels.length) clue = 0;
    startGame();
  });
});
