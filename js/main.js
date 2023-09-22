'use strict';

// DECLARATIONS
const inputSelect = document.querySelector('.js-select');
const btn = document.querySelector('.js-button');
const printElement = document.querySelector('.js-print-result');
//counters
const counterUser = document.querySelector('.js-counter-user');
const counterMachine = document.querySelector('.js-counter-machine');
const counterGame = document.querySelector('.js-counter-game');
let userCount = 0;
let machineCount = 0;
let gameCount = 0;

//Messages to print
const youWin = '¡Has ganado en esta jugada!';
const youLose = '¡Has perdido en esta jugada!';
const draw = 'Empate';

//FUNCTIONS

// GENERIC FUNCTIONS
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

// SPECIFIC FUNCTIONS
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
  console.log("número random: ", randomNumber);
  console.log('selección máquina en función getMachineSelect: ', machineSelect);
  return machineSelect;
}

function userVsMachine() {
  const userSelect = inputSelect.value;
  const machineSelect = getMachineSelect();
  let result = '';

  //user wins
  if (
    (userSelect === 'paper' && machineSelect === 'rock') ||
    (userSelect === 'rock' && machineSelect === 'scissors') ||
    (userSelect === 'scissors' && machineSelect === 'paper')
  ) {
    result = youWin;
  }
  // draw
  else if (userSelect === machineSelect) {
    result = draw;
  }
  // user lose
  else {
    result = youLose;
  }
  console.log('resultado de función userVsmachine: ', result);
  return result;
}

function printMsgResult(userVsMachineResult) {
  const result = userVsMachineResult;
  printElement.innerHTML = result;
}
function updateCounters(userVsMachineResult) {
  if (userVsMachineResult === youWin) {
    userCount = userCount + 1;
    counterUser.innerHTML = userCount;
  }
  if (userVsMachineResult === youLose) {
    machineCount += 1;
    counterMachine.innerHTML = machineCount;
  }
  counterGame.innerHTML = gameCount += 1;
}

function handleClick(event) {
  event.preventDefault();
  const result = userVsMachine();
  printMsgResult(result);
  updateCounters(result);

  console.log('constante result: ', result);
  console.log('jugadas: ', gameCount);
}

//EVENTS
btn.addEventListener('click', handleClick);
