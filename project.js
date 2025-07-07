// Variables
//adding the variables is the thinga that in might change in the game

let clue = 0 //for changing the hint on every level
let wrongLetters = [] //it will save the wrong guessed letters if the player add it more than one time
let correctLetters = []
let level = 1
let winner = false
let blanks
let chosenWord
let splitWord

let levels = [
    {
        word : "CAR",
        clue : "I have a heart that never loves, yet it keeps me going. ❤️I bleed, but it's not blood. 🛢️I breathe through filters, not lungs. 🫁Who am I??"
    },
    {
        word : "KEYBOARD",
        clue : " 🗝 I have keys but open no locks.🚀 I have space but no room.🚪 You can enter, but I’m not a door.🤔 What am I?"
    }
]// im going to add more arrays but just two clues so ill know how every thing is going to be when it start working 

let blankSpaces = [] // Store spans to update later

// Cached Elements
// down here is the how the clue will be shown withoout the answers 
const hintEl = document.querySelector("#hint")
const blanksContainer = document.getElementById("blanks")

// Functions
const chooseWord = () => {
    chosenWord = levels[level].word
}

const createSpans = () => {
    splitWord = chosenWord.split("")
    splitWord.forEach(() => {
        const blankSpace = document.createElement("div")
        blankSpace.textContent = "_"
        blanksContainer.appendChild(blankSpace)
        blankSpaces.push(blankSpace)
    })        
}

//const matchLetter = () => {
  const matchLetter = () => {
    const clickedLetter = event.target.innerText;

    if (splitWord.includes(clickedLetter)) {
        if (correctLetters.includes(clickedLetter)) {
            return;
        } else {
            correctLetters.push(clickedLetter);
            updateDisplay(); // ✅ تظهر الحروف الصح
        }
        console.log("correct letters", correctLetters);
    } else {
        if (wrongLetters.includes(clickedLetter)) {
            return;
        } else {
            wrongLetters.push(clickedLetter);
        }
        console.log("wrong letters:", wrongLetters);
    }
};

    //this my old answer for the match letter
    // for loop through all of the letters in chosenWord to check if the event.target.innerText matches the letter
    //if (splitWord.includes(event.target.innerText)) {
      //  if (correctLetters.includes(event.target.innerText)){
        //    return
        //}else{
          //  correctLetters.push(event.target.innerText)
        //}    
        //console.log("correct letters", correctLetters)
   // } else {
     //   if (wrongLetters.includes(event.target.innerText)) {
           // return
       // } else {
         //   wrongLetters.push(event.target.innerText)
        //}
        //console.log("wrong letters:", wrongLetters)
    //}
    //updateDisplay()
    //if statment 
    //checkAnswer()
//} 

const updateDisplay = () => {
    splitWord.forEach((letter, index) => {
        if (correctLetters.includes(letter)) {
            blankSpaces[index].textContent = letter
        } else {
            blankSpaces[index].textContent = "_"
        }
    })
}
    // /use the divs stored in blankSpaces


const checkAnswer = () => {
    let answer = new Array(correctLetters)
    let solution = new Array(splitWord)
    // sort both answer and solution arrays the soloution to do an arrays --    Array.prototype.sort()
    console.log(answer)
    console.log(solution)
    // if answer === solution, player wins
    
    if(JSON.stringify(answer) === JSON.stringify(solution)) {
        winner = true
        console.log(winner)
        gameEnd()
    }else{
        return
    }
    
}

const gameEnd = () => {
const gameEnd = (didWin) => {
    if (didWin) {
        alert("🎉 You saved Mr. Blank!")
    } else {
        alert(`💀 Game Over! The word was "${chosenWord}"`)
    }

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true)
}
}

// Event Listeners

//all the buttons in a loop
let buttons=document.querySelectorAll('button')
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        matchLetter(event.target.innerText)
        // console.log(event.target.innerText)
        // console.log(chosenWord)
    })
})

const initializeGame = () => {
    beingPlayed = true
    hintEl.textContent = levels[level].clue
    chooseWord()
    createSpans()
    console.log(splitWord)
}

initializeGame()