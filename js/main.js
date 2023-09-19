'use strict';

// DECLARATIONS
const inputSelect = document.querySelector('.js-select');
const btn = document.querySelector('.js-button');
const printElement = document.querySelector('.js-print-result');

//Messages to print
const youWin = '¡Has ganado!';
const youLose = '¡Has perdido!';
const draw = 'Empate.';


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
  return machineSelect;
}

function userVsMachine() {
  const userSelect = inputSelect.value;
  const machineSelect = getMachineSelect();
  let result = '';

  //user wins
  if (userSelect === 'paper' && machineSelect === 'rock') {
    result = youWin;
  } else if (userSelect === 'rock' && machineSelect === 'scissors') {
    result = youWin;
  } else if (userSelect === 'scissors' && machineSelect === 'paper') {
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

  return result;
}

function print() {
    const result = userVsMachine();
    printElement.innerHTML = result;
}

function handleClick() {
  userVsMachine();
  print();
}

//EVENTS
btn.addEventListener('click', handleClick);
