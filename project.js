// // ===== Game State Variables =====
// //the things that going to change at the game 
// let clue = 0;                        // Index to track the current level
// let wrongLetters = [];              // Store letters the user guessed wrong
// let correctLetters = [];            // Store letters guessed correctly
// let blanks;                         // Container for blank spans
// let chosenWord;                     // Word selected for current level
// let splitWord;                      // The selected word split into an array of letters
// let blankSpaces = [];               // Array to hold span elements representing blanks
// let maxAttempts = 7;                // Max number of allowed incorrect guesses

// // ===== Sound Effects Setup =====
// //sounds files
// const clickSound = new Audio("appleCrash.mp3");  // Play when a button is clicked
// const correctSound = new Audio("correct.mp3");   // Play when guess is correct
// const wrongSound = new Audio("wrong.mp3");       // Play when guess is wrong
// const winSound = new Audio("win.mp3");           // Play when player wins
// const loseSound = new Audio("lose.mp3");         // Play when player loses

// // ===== Game Levels & Clues =====
// let levels = [
//   {
//     word: "CAR",
//     clue: "I have a heart that never loves, yet it keeps me going. ❤️ I bleed, but it's not blood. 🛢️ I breathe through filters, not lungs. 🫁 Who am I?"
//   },
//   {
//     word: "KEYBOARD",
//     clue: "🗝 I have keys but open no locks.🚀 I have space but no room.🚪 You can enter, but I’m not a door.🤔 What am I?"
//   }
// ];

// // const video = document.getElementById("game-over-video");
// // video.onplay = () => {
// //   console.log("🎥 Game Over video is playing.");
// // };
// // video.onerror = () => {
// //   console.error("❌ Error loading Game Over video.");
// // };
// // ===== Game Initialization =====
// //it shows the clue 
// //the blanks is on the letters  number
// //hide every thing that is releated for winning or game over 
// function startGame() {
//   // Reset all game state
//   //reset the blanks so 
//   correctLetters = [];
//   wrongLetters = [];
//   blankSpaces = [];

//   // Display the current clue
//   document.getElementById("hint").innerText = levels[clue].clue;

//   // Get the word and split into letters
//   chosenWord = levels[clue].word.toUpperCase();
//   splitWord = chosenWord.split("");

//   // Prepare blank spaces
//   blanks = document.getElementById("blanks");
//   blanks.innerHTML = "";
//   splitWord.forEach(() => {
//     let span = document.createElement("span");
//     span.innerText = "_";
//     blanks.appendChild(span);
//     blankSpaces.push(span);
//   });

//   // Hide win/loss UI elements
//   document.getElementById("videoContainer").style.display = "none";
//   document.getElementById("gameOverContainer").style.display = "none";
//   document.getElementById("win-caption").style.display = "none";
//   document.getElementById("retry-btn").style.display = "none";

//   // Reset health bar
//   document.getElementById("health-bar").style.width = "100%";

//   // Re-enable all keyboard buttons
//   const buttons = document.querySelectorAll("#letters-container button");
//   buttons.forEach((btn) => {
//     btn.disabled = false;
//     btn.style.backgroundColor = "";
//   });
// }

// // ===== Handle a Letter Button Press =====
// //the letter that the player click on it 
// //the letter cannot be clicked it twice 
// //on every time u click on the letter or button there is a sound played
// function handleGuess(event) {
//   const letter = event.target.innerText;
//   event.target.disabled = true;

//   // 🔊 Play button click sound
//   clickSound.currentTime = 0;
//   clickSound.play();

//   // ✅ Correct Guess
//   //shows the letter in there place on the blancks
//   if (splitWord.includes(letter)) {
//     correctSound.play();

//     // Reveal the correct letter in the word
//     splitWord.forEach((l, i) => {
//       if (l === letter) {
//         blankSpaces[i].innerText = letter;
//         correctLetters.push(letter);
//       }
//     });
//     const video = document.getElementById("game-over-video");
// video.onplay = () => {
//   console.log("🎥 Game Over video is playing.");
// };
// video.onerror = () => {
//   console.error("❌ Error loading Game Over video.");
// };

//     // Check if player won
//     //if the player got all the letters and it has shown correctly it
//     //shows video 
//     //and the user cant press the button 
//     const uniqueCorrect = [...new Set(correctLetters)];
//     const uniqueWord = [...new Set(splitWord)];
//     if (uniqueCorrect.length === uniqueWord.length) {
//       // Show winning video and message
//       document.getElementById("videoContainer").style.display = "flex";
//       document.getElementById("winVideo").currentTime = 0;
//       document.getElementById("winVideo").play();
//       document.getElementById("win-caption").style.display = "block";
//       winSound.play();
//       disableAllButtons();
//     }
// //else if the user fails
// //it shown the gameover video 
// //AND THE HEALTH BAR GET DOWN LIKE FROM 80-75
//   } else {
//     // ❌ Wrong Guess
//     wrongSound.play();

//     if (!wrongLetters.includes(letter)) {
//       wrongLetters.push(letter);
//       updateHealth();

//       // 💀 Game Over Condition
//       //IF THE PLAYER FAILS
//       //IN THIS IF STATMENT 
//       //I HIDE THE VIDEO OF WINNING OR FAILING 
//       //SHOWN THE LOSING SOUND OR THE VIDEO WHEN THE USER GET IT WRONG 
//       //SHOWS THE PLAY AGAIN VIDEO 
//       if (wrongLetters.length === maxAttempts) {
//         // Hide win UI if showing
//         document.getElementById("videoContainer").style.display = "none";
//         document.getElementById("win-caption").style.display = "none";

//         // Show Game Over Video
//         const gameOverVideo = document.getElementById("game-over-video");
//         document.getElementById("gameOverContainer").style.display = "flex";
//         gameOverVideo.currentTime = 0;
//         gameOverVideo.play();

//         // Show retry button
//         //IT SHOWS THE BUTTON WHEN U CLICK ON IT AND GOES TO ANOTHER LEVEL
//         document.getElementById("retry-btn").style.display = "block";

//         // 🔊 Play lose sound
//         loseSound.play();

//         // Disable all further input
//         disableAllButtons();
//       }
//     }

//     // Change button color to red
//     event.target.style.backgroundColor = "#f77";
//   }
// }

// // ===== Update Health Bar Based on Mistakes =====
// function updateHealth() {
//   let remaining = maxAttempts - wrongLetters.length;
//   let percent = (remaining / maxAttempts) * 100;
//   document.getElementById("health-bar").style.width = `${percent}%`;
// }

// // ===== Disable All Keyboard Buttons =====
// function disableAllButtons() {
//   const buttons = document.querySelectorAll("#letters-container button");
//   buttons.forEach((btn) => {
//     btn.disabled = true;
//   });
// }

// // ===== Run Game on Page Load =====
// //WHEN THE PAGE OPENS  THE GAME START AGAIN
// //ALL THE KEYBOARD BUTTONS IS ACTIVATED AND U CAN CLICK ON IT
// window.addEventListener("DOMContentLoaded", () => {
//   startGame(); // Initialize game when page loads
// //its when u click a button it works
//   // Add event listeners for each keyboard button
//   const buttons = document.querySelectorAll("#letters-container button");
//   buttons.forEach((btn) => {
//     btn.addEventListener("click", handleGuess);
//   });

//   // 🔁 Restart game when clicking retry
//   //IT SHOWS THE BUTTON WHEN U CLICK ON IT AND GOES TO ANOTHER LEVEL
//   document.getElementById("retry-btn").addEventListener("click", () => {
//     clue++;
//     if (clue >= levels.length) clue = 0;
//     startGame();
//   });
// });

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
