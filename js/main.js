'use strict';
console.log('ikuyo! :)');

// DECLARATIONS

const inputSelect = document.querySelector('.js-select');
const btn = document.querySelector('.js-button');
const printElement = document.querySelector('.js-print-result');

// GENERIC FUNCTIONS
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

// SPECIFIC FUNCTIONS
function handleClick() {
  /* machine: rock:0-3, paper:7+, else: scissors*/
  const randomNumber = Math.ceil(Math.random() * 9);
  let machineSelect = '';
  if (randomNumber <= 3) {
    machineSelect = 'rock';
  } else if (randomNumber >= 7) {
    machineSelect = 'paper';
  } else {
    machineSelect = 'scissors';
  }
  console.log(randomNumber);
  console.log(machineSelect);

  /* Compares user vs machine: rock:0-3, paper:7+, else: scissors*/
  const userSelect = inputSelect.value;
  //user wins
  if (userSelect === 'paper' && machineSelect === 'rock') {
    printElement.innerHTML = '¡Has ganado!';
  }
  else if (userSelect === 'rock' && machineSelect === 'scissors') {
    printElement.innerHTML = '¡Has ganado!';
  }
  else if (userSelect === 'scissors' && machineSelect === 'paper') {
    printElement.innerHTML = '¡Has ganado!';
  } 
  // draw
  else if (userSelect === machineSelect) {
    printElement.innerHTML = 'Empate';
  }
  else {
    printElement.innerHTML = '¡Has perdido!';
  }
//   console.log(userSelect);
}

//EVENTS
btn.addEventListener('click', handleClick);
