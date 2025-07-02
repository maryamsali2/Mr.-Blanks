// Variables
//adding the variables is the thinga that in might change in the game

let clue = 0 //for changing the hint on every level
let guessedLetters = [] //it will save the wrong guessed letters if the player add it more than one time
let Level = 1
let isWinner = false 
let blanks 

// Cached Elements
//arays

let levels = [
    {
        word : "Book",
        clue : "I have no voice, yet I carry knowledge 🤫.  I have no mind, yet I make yours grow. 🧠You turn me inside out, yet I do not feel. 🔄I dress in colors, but I have no skin. 🎨 You seek me in silence, and I always answer. 🌌Who am I?"
    },
    {
        word : "Keyboard",
        clue : " 🗝 I have keys but open no locks.🚀 I have space but no room.🚪 You can enter, but I’m not a door.🤔 What am I?"
    }
]// im going to add more arrays but just two clues so ill know how every thing is going to be when it start working 


// down here is the how the clue will be shown withoout the answers 
const hintEl = document.querySelector("#hint")
let level = 0;
hintEl.textContent = levels[level].clue

// in this step were adding the blanks 
//string statment

//for the 1st clue
 const string = "Book"
 const nm1 = string.split("")
 console.log(nm1);

 //for the 2nd clue
  const str = "Keyboard" 
 const chars = str.split("")
 console.log(chars);
// Functions



// Event Listeners

//all the buttons in a loop
let buttons=document.querySelectorAll('button')
for(let i=0;i<=buttons.length;i++){
    buttons[i].addEventListener('click',()=>{

        console.log("clicked")
    })
}
