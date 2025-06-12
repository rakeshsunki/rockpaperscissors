// Game score variables
let userScore = 0;
let compScore = 0;

// DOM elements
const choices = document.querySelectorAll('.uchoice');
const resultElement = document.querySelector('#output');
const userScoreDisplay = document.querySelector('#user-score');
const computerScoreDisplay = document.querySelector('#computer-score');
const resetButton = document.querySelector('#reset-game');

/**
 * Generates a random choice for the computer
 * @returns {string} Computer's choice (rock, paper, or scissors)
 */
const getComputerChoice = () => {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
};

/**
 * Updates the score display
 */
const updateScores = () => {
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = compScore;
};

/**
 * Resets the game scores and display
 */
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    updateScores();
    resultElement.textContent = "Game reset! Pick your choice";
    resultElement.className = "result-display";
};

/**
 * Determines the game result and updates the UI
 * @param {string} userChoice - The user's selected choice
 */
const playGame = (userChoice) => {
    const computerChoice = getComputerChoice();
    
    // Remove all previous result classes
    resultElement.classList.remove('draw', 'lost', 'won');
    resultElement.classList.add('result-display');
    
    // Determine game outcome
    if (computerChoice === userChoice) {
        // Draw condition
        resultElement.classList.add('draw');
        resultElement.innerHTML = `
            <p>DRAW!</p>
            <p>Computer chose: <strong>${computerChoice}</strong> | You chose: <strong>${userChoice}</strong></p>
        `;
    } else if (
        (userChoice === 'rock' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'rock')
    ) {
        // Computer wins
        compScore++;
        resultElement.classList.add('lost');
        resultElement.innerHTML = `
            <p>You lost!</p>
            <p>Computer chose: <strong>${computerChoice}</strong> | You chose: <strong>${userChoice}</strong></p>
        `;
    } else {
        // User wins
        userScore++;
        resultElement.classList.add('won');
        resultElement.innerHTML = `
            <p>You won!</p>
            <p>Computer chose: <strong>${computerChoice}</strong> | You chose: <strong>${userChoice}</strong></p>
        `;
    }
    
    // Update the scoreboard
    updateScores();
    
    // Highlight the choices
    highlightChoices(userChoice, computerChoice);
};

/**
 * Temporarily highlights the user and computer choices
 * @param {string} userChoice - The user's choice
 * @param {string} computerChoice - The computer's choice
 */
const highlightChoices = (userChoice, computerChoice) => {
    // Add visual feedback for selected choices
    const userChoiceElement = document.getElementById(userChoice);
    
    // Create visual feedback
    userChoiceElement.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.8)";
    userChoiceElement.style.transform = "scale(1.1)";
    
    // Reset after animation
    setTimeout(() => {
        userChoiceElement.style.boxShadow = "";
        userChoiceElement.style.transform = "";
    }, 1000);
};

// Add click event listeners to all choice buttons
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        playGame(userChoice);
    });
});

// Add event listener for reset button
resetButton.addEventListener('click', resetGame);

// Initialize scores
updateScores();