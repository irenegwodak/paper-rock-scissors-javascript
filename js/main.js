'use strict';

// DECLARATIONS
const inputSelect = getElement('.js-select');
const btnPlay = getElement('.js-play-button');
const endGameHtmlBlock = getElement('.js-endgame-container');
const btnReset = getElement('.js-reset-button');

//PRINTERS
const printElement = getElement('.js-print');
const printEndGame = getElement('.js-endgame');
const totalAttemptsPerGame = getElement('.js-attempts');

//COUNTERS
const counterUser = getElement('.js-counter-user');
const counterMachine = getElement('.js-counter-machine');
const counterGame = getElement('.js-counter-game');

let userCount = 0;
let machineCount = 0;
let gameCount = 0;

//MESSAGES TO PRINT
//Default
const defaultMsg = '¡Vamos a jugar!';
const defaultAttemptsPerGame = 10;
trackElement(printElement, defaultMsg);
trackElement(totalAttemptsPerGame, defaultAttemptsPerGame);

const warning = '¡Escoge piedra, papel o tijera!';

//Messages during the game
const youWin = '¡Has ganado la jugada!';
const youLose = '¡Has perdido la jugada!';
const draw = 'Empate';
//Messages at the end of game
const msgEndGameWin = 'Has ganado la partida';
const msgEndGameDraw = 'Empate de la partida';
const msgEndGameLose = 'Has perdido la partida';


//FUNCTIONS

// HTML ELEMENT FUNCIONTS
//To make easier call html elements
function getElement(element) {
  return document.querySelector(element);
}
//To make easier print innnerHTML elements
function trackElement(element, msg) {
  return (element.innerHTML = msg);
}

// GENERIC FUNCTIONS
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}
//Prints on html on the principal advices
function printMsg(msg) {
  trackElement(printElement, msg);
}

// SPECIFIC FUNCTIONS
function updateCounters() {
  trackElement(counterUser, userCount);
  trackElement(counterMachine, machineCount);
  trackElement(counterGame, gameCount);
}
//Check and update the counters if iser win, lose or draw
function checkCounters(msg) {
  gameCount += 1;
  if (msg !== warning) {
    if (msg === youWin) {
      userCount = userCount + 1;
      updateCounters();
    }
    if (msg === youLose) {
      machineCount += 1;
      updateCounters();
    } else updateCounters();
  }
}

//Get random machine option
function getMachineSelect() {
  const randomNumber = getRandomNumber(9);

  /* Machine: rock:0-3, paper:7+, else: scissors*/
  let machineSelect = '';
  if (randomNumber <= 3) {
    machineSelect = 'rock';
  } else if (randomNumber >= 7) {
    machineSelect = 'paper';
  } else {
    machineSelect = 'scissors';
  }
  return machineSelect;
}

function userVsMachine(userValue) {
  let msg = '';
  const machineSelect = getMachineSelect();
  //User wins
  if (
    (userValue === 'paper' && machineSelect === 'rock') ||
    (userValue === 'rock' && machineSelect === 'scissors') ||
    (userValue === 'scissors' && machineSelect === 'paper')
  ) {
    msg = youWin;
  }
  //Draw
  else if (userValue === machineSelect) {
    msg = draw;
  }
  //User lose
  else {
    msg = youLose;
  }
  printMsg(msg);
  checkCounters(msg);
}
function playGame() {
  //Check if user selected an option
  const userSelect = inputSelect.value;
  if (userSelect === 'default') {
    printMsg(warning);
  } else {
    userVsMachine(userSelect);
  }
}
//Check if user reached the attempts
function endGame() {
  if (gameCount >= defaultAttemptsPerGame) {
    btnPlay.classList.add('hidden');
    endGameHtmlBlock.classList.remove('hidden');
    if (userCount > machineCount) {
      trackElement(printEndGame, msgEndGameWin);
    } else if (userCount === machineCount) {
      trackElement(printEndGame, msgEndGameDraw);
    } else {
      trackElement(printEndGame, msgEndGameLose);
    }
  }
}

function resetCounters() {
  userCount = 0;
  machineCount = 0;
  gameCount = 0;
  updateCounters();
}

// HANDLECLICK FUNCTIONS

//Start the game
function handleClickPlay(event) {
  event.preventDefault();
  playGame();
  endGame();
}
//Reset game
function handleClickReset(event) {
  event.preventDefault();

  inputSelect.value = 'default';
  resetCounters();
  trackElement(printElement, defaultMsg);
  btnPlay.classList.remove('hidden');
  trackElement(printEndGame, '');
  endGameHtmlBlock.classList.add('hidden');
}

//EVENTS
btnPlay.addEventListener('click', handleClickPlay);
btnReset.addEventListener('click', handleClickReset);
