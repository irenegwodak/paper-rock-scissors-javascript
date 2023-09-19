"use strict";
console.log("ikuyo! :)")

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
}




//EVENTS
btn.addEventListener('click', handleClick);