'use strict';

// DECLARATIONS
const inputSelect = getElement('.js-select');
const btnPlay = getElement('.js-play-button');
const endGameHtmlBlock = getElement('.js-endgame-container');
const btnReset = getElement('.js-reset-button');

//printers
const printElement = getElement('.js-print');
const printEndGame = getElement('.js-endgame');

//counters
const counterUser = getElement('.js-counter-user');
const counterMachine = getElement('.js-counter-machine');
const counterGame = getElement('.js-counter-game');

let userCount = 0;
let machineCount = 0;
let gameCount = 0;

//Messages to print
const defaultMsg = '¡Vamos a jugar!';
const youWin = '¡Has ganado la jugada!';
const youLose = '¡Has perdido la jugada!';
const draw = 'Empate';
const warning = '¡Escoge piedra, papel o tijera!';
const msgEndGameWin = 'Has ganado la partida';
const msgEndGameDraw = 'Empate de la partida';
const msgEndGameLose = 'Has perdido la partida';

trackElement(printElement, defaultMsg);

//FUNCTIONS
// HTML ELEMENT FUNCIONTS
function getElement(element) {
  return document.querySelector(element);
}
function trackElement(element, msg) {
  return (element.innerHTML = msg);
}

// GENERIC FUNCTIONS
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}
function printMsg(msg) {
  trackElement(printElement, msg);
}

// SPECIFIC FUNCTIONS
function updateCounters() {
  trackElement(counterUser, userCount);
  trackElement(counterMachine, machineCount);
  trackElement(counterGame, gameCount);
}
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

function getMachineSelect() {
  const randomNumber = getRandomNumber(9);

  /* machine: rock:0-3, paper:7+, else: scissors*/
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

// function checkIfUserOption

function userVsMachine(userValue) {
  let msg = '';
  const machineSelect = getMachineSelect();
  //user wins
  if (
    (userValue === 'paper' && machineSelect === 'rock') ||
    (userValue === 'rock' && machineSelect === 'scissors') ||
    (userValue === 'scissors' && machineSelect === 'paper')
  ) {
    msg = youWin;
  }
  //draw
  else if (userValue === machineSelect) {
    msg = draw;
  }
  //user lose
  else {
    msg = youLose;
  }
  printMsg(msg);
  checkCounters(msg);
}
function playGame() {
  //check if user selected an option
  const userSelect = inputSelect.value;
  if (userSelect === 'default') {
    printMsg(warning);
  } else {
    userVsMachine(userSelect);
  }
}
function endGame() {
  if (gameCount >= 10) {
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

// HandleClick Functions
function handleClickPlay(event) {
  event.preventDefault();
  playGame();
  endGame();
}
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
