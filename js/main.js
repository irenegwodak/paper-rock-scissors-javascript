'use strict';

// DECLARATIONS
const inputSelect = document.querySelector('.js-select');
const btnPlay = document.querySelector('.js-play-button');
const endGameHtmlBlock = document.querySelector('.js-endgame-container');
const btnReset = document.querySelector('.js-reset-button');

//printers
const printElement = document.querySelector('.js-print');
const printEndGame = document.querySelector('.js-endgame');

//counters
const counterUser = document.querySelector('.js-counter-user');
const counterMachine = document.querySelector('.js-counter-machine');
const counterGame = document.querySelector('.js-counter-game');
let userCount = 0;
let machineCount = 0;
let gameCount = 0;

//Messages to print
const defaultMsg = '¡Vamos a jugar!';
const youWin = '¡Has ganado la jugada!';
const youLose = '¡Has perdido la jugada!';
const draw = 'Empate';
const warning = '¡Escoge piedra, papel o tijera!';

printElement.innerHTML = defaultMsg;

//FUNCTIONS

// GENERIC FUNCTIONS
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}
function printMsg(msg) {
  printElement.innerHTML = msg;
}

// SPECIFIC FUNCTIONS
function updateCounters() {
  counterUser.innerHTML = userCount;
  counterMachine.innerHTML = machineCount;
  counterGame.innerHTML = gameCount;
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
  console.log('número random: ', randomNumber);
  console.log('selección máquina: ', machineSelect);
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
  // draw
  else if (userValue === machineSelect) {
    msg = draw;
  }
  // user lose
  else {
    msg = youLose;
  }
  printMsg(msg);
  checkCounters(msg);
  console.log('userVsmachine: ', msg);
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
      printEndGame.innerHTML = 'Has ganado la partida';
    } else if (userCount === machineCount) {
      printEndGame.innerHTML = 'Empate de la partida';
    } else {
      printEndGame.innerHTML = 'Has perdido la partida';
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
  console.log('gamecount: ', gameCount);
}
function handleClickReset(event) {
  event.preventDefault();

  inputSelect.value = 'default';
  resetCounters();
  printElement.innerHTML = defaultMsg;
  btnPlay.classList.remove('hidden');
  printEndGame.innerHTML = '';
  endGameHtmlBlock.classList.add('hidden');
}

//EVENTS
btnPlay.addEventListener('click', handleClickPlay);
btnReset.addEventListener('click', handleClickReset);
