//Get references to DOM elements for user input and buttons
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

//Initialize game variables
let targetNumber; //number of user needs to guess
let attempts = 0; //Number of attempts made by the user
const maxNumberOfAttempts = 5; //max allowed attempts

// Returns a random number from min (inclusive) to max (exclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Function to check user's guess
function checkGuess() {
  // Parse user's guess from the input field
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1; //Increment the attempt count

  hideAllMessages(); //Hide all feedback messages

  //Check if the guess is correct
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = ''; //Show number of guesses message
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = ''; //Show correct guess message

    //Disable input and submit button after correct guess
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  //Check if guess is incorrect
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = ''; //Show too low message
    } else {
      tooHighMessage.style.display = ''; //Show too high message
    }

    //Calulate remaining attempts and display message
    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  //Check if the user has reached the maximum number of attempts
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true; //Disable submit button
    guessInput.disabled = true; //Disable input field
  }

  guessInput.value = ''; //Clear the input field

  resetButton.style.display = ''; // Show the reset button 
}

//Function to hide all feedback messages
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

//Function to set up the game
function setup() {
  // Generate random target number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`); //Log the target number for debugging

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages(); //Hide all messages at the start
  resetButton.style.display = 'none'; //Hide the reset button initially
}

//Add event listeners for the submit and reset buttons
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

//Initialize game setup
setup();
