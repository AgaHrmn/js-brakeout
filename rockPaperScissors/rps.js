const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');

const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerCoice;
let result;
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    generateResult();
}))

function generateComputerChoice() {

    const randomNumber = Math.floor(Math.random() * possibleChoices.length);

    if (randomNumber === 0) {
        computerCoice = 'rock'
    } else if (randomNumber === 1) {
        computerCoice = 'paper'
    } else {
        computerCoice = 'scissors'
    }
    
    computerChoiceDisplay.innerHTML = computerCoice;

}

function generateResult() {
    if (computerCoice === userChoice) {
        result = 'Draw!'
    } else  if (computerCoice === 'scissors' && userChoice === 'paper' || 
    computerCoice === 'rock' && userChoice === 'scissors'  
       || computerCoice === 'paper' && userChoice === 'rock' ) {
        result = 'You Loose'  
    } else {
        result = 'You win!'
    }

    resultDisplay.innerHTML = result;
} 