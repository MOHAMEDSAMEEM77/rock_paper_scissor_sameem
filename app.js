// Cache the DOM
let userScore = 0;
let computerScore = 0;
const winAudio = new Audio('sounds/correct.mp3');
const losesAudio = new Audio('sounds/fail.mp3')


// DOM variables
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const scoreBoardEl = document.querySelectorAll(".score__board__badge");
const userScoreBoardEl = document.getElementById("user-label");
const compScoreBoardEl = document.getElementById("comp-label");
const scoreBoardUserEl = document.querySelector(".score__board__badge-left")
const resultEl = document.querySelector(".result__copy");
const rockEl = document.getElementById("r");
const paperEl = document.getElementById("p");
const scissorsEl = document.getElementById("s");
const resetButton = document.querySelector('.button-reset');


function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter === 'r') return "Rock";
    if (letter === 'p') return "Paper";
    return "Scissors"
}

function win(user, computer) {
    const userChoiceEl = document.getElementById(user)
    userScore++;
    userScoreEl.innerHTML = userScore;
    computerScoreEl.innerHTML = computerScore;
    resultEl.innerHTML = `${convertToWord(user)} ${("(user)").fontsize(4)} beats ${convertToWord(computer)}${("(comp)").fontsize(4)} You win!\u{1F525}`
    // Glow score and button effects
    userChoiceEl.classList.add('green-glow');
    userScoreBoardEl.style.backgroundColor = 'var(--color-green)';
    setTimeout(() => {
        winAudio.play();
        userChoiceEl.classList.remove('green-glow');
        userScoreBoardEl.style.backgroundColor = 'var(--color-red)';
        },500);
}

function lose(user, computer) {
    const userChoiceEl = document.getElementById(user)
    computerScore++;
    userScoreEl.innerHTML = userScore;
    computerScoreEl.innerHTML = computerScore;
    resultEl.innerHTML = `${convertToWord(user)} ${("(user)").fontsize(4)} loses to ${convertToWord(computer)}${("(comp)").fontsize(4)} You lost!\u{1F4A9}`
    // Glow score and button effects
    userChoiceEl.classList.add('red-glow');
    compScoreBoardEl.style.backgroundColor = 'var(--color-green)';
    setTimeout(() => {
        losesAudio.play();
        userChoiceEl.classList.remove('red-glow');
        compScoreBoardEl.style.backgroundColor = 'var(--color-red)';
    }, 500);
}

function draw(user, computer) {
    const userChoiceEl = document.getElementById(user)
    userScoreEl.innerHTML = userScore;
    computerScoreEl.innerHTML = computerScore;
    resultEl.innerHTML = `${convertToWord(user)} ${("(user)").fontsize(4)} equals ${convertToWord(computer)}${("(comp)").fontsize(4)} It's a draw!\u{1F610}`
    userChoiceEl.classList.add('grey-glow');
    scoreBoardEl.forEach((item) => {
        item.style.backgroundColor = 'var(--color-grey';
    });

    setTimeout(() => {
        userChoiceEl.classList.remove('grey-glow')
        scoreBoardEl.forEach((item) => {
            item.style.backgroundColor = 'var(--color-red';
        });
    } ,500);
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice) {
        case 'rs':
        case 'pr':
        case 'sp':
            win(userChoice, computerChoice);
            break
        case 'rp':
        case 'ps':
        case 'sr':
            lose(userChoice, computerChoice);
            break
        case 'rr':
        case 'pp':
        case 'ss':
            draw(userChoice, computerChoice)
            break
    }
}

function main() {
    rockEl.addEventListener('click', function () {
        game("r");
    });

    paperEl.addEventListener('click', function () {
        game("p");
    });

    scissorsEl.addEventListener('click', function () {
        game("s");
    });
}

resetButton.Onclick= resetScore;

function resetScore(){
    location.reload();
 }


main();
