'use strict';
console.log('ikuyo! :)');

// DECLARATIONS

const inputSelect = document.querySelector('.js-js-select');
const btn = document.querySelector('.js-button');
const printElement = document.querySelector('.js-print-result');

// GENERIC FUNCTIONS
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

//SPECIFIC FUNCTIONS
function handleClick() {
  //   const userSelect = inputSelect.value;

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
  //   if ()
}

//EVENTS
btn.addEventListener('click', handleClick);
