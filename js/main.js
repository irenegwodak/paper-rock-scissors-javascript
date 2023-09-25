'use strict';

// HTML ELEMENT FUNCTIONS
//Make easier call html elements
const getElement = (element) => document.querySelector(element);
//Make easier write innnerHTML elements
const trackElement = (element, msg) => (element.innerHTML = msg);
//Make easier write classList
const addStyle = (element, classElement) => element.classList.add(classElement);
const removeStyle = (element, classElement) =>
  element.classList.remove(classElement);
const hideElement = (element) => addStyle(element, 'hidden');
const showElement = (element) => removeStyle(element, 'hidden');

// DECLARATIONS
const inputSelect = getElement('.js-select');
const btnPlay = getElement('.js-play-button');
const endGameHtmlBlock = getElement('.js-endgame-container');
const endGameImg = getElement('.js-engdame-img');
const btnReset = getElement('.js-reset-button');

//ICONS
const iconRock = '&#9994;';
const iconPaper = '&#128400;&#65039;';
const iconScissors = '&#9996;&#65039;';
const iconDraw = '&#128566;';

//PRINTERS
const mainPrinterContainer = getElement('.js-main-printer-container');
const printerMainElement = getElement('.js-print');
const printMachineOpt = getElement('.js-print-machine-option');
const printEndGame = getElement('.js-endgame');
const totalAttemptsPerGame = getElement('.js-attempts');
const playedGames = getElement('.js-played-games-list');

//COUNTERS
const counterUser = getElement('.js-counter-user');
const counterMachine = getElement('.js-counter-machine');
const counterDraw = getElement('.js-draws');
const counterGame = getElement('.js-counter-game');

let userCount = 0;
let machineCount = 0;
let drawCount = 0;
let gameCount = 0;

///////// CHOOSE ATTEMPTS /////////
const defaultAttemptsPerGame = 10;

//MESSAGES TO PRINT
//Default
const defaultMsg =
  'Dale a <span class="play-button"> Jugar</span> para empezar';
trackElement(printerMainElement, defaultMsg);
trackElement(totalAttemptsPerGame, defaultAttemptsPerGame);

const warning = '¡Escoge piedra, papel o tijera!';

//Messages of computer option
const machineRock = `La máquina ha escogido piedra ${iconRock}`;
const machinePaper = `La máquina ha escogido papel ${iconPaper}`;
const machineScissors = `La máquina ha escogido tijeras ${iconScissors}`;
//Messages per attempt
const youWin = 'Has ganado esta jugada &#128588;';
const youLose = 'Has perdido esta jugada &#128581;';
const draw = 'Empate &#128566;';
//Messages at the end of game
const msgEndGameWin = '¡Has ganado la partida! &#127881;';
const msgEndGameDraw = 'Menuda partida, ¡habéis empatado!&#129784;&#129783;';
const msgEndGameLose = 'Has perdido la partida &#129394;';

//FUNCTIONS

// GENERIC FUNCTIONS
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}
//Prints on html in the principal printer
function printMsg(msg) {
  trackElement(printerMainElement, msg);
}

// SPECIFIC FUNCTIONS

//COUNTERS
function updateCounters() {
  trackElement(counterUser, userCount);
  trackElement(counterMachine, machineCount);
  trackElement(counterDraw, drawCount);
  trackElement(counterGame, gameCount);
}
//Check and update the counters if user win, lose or draw
function checkCounters(msg) {
  gameCount += 1;
  if (msg !== warning) {
    if (msg === youWin) {
      userCount = userCount + 1;
      updateCounters();
    } else if (msg === youLose) {
      machineCount += 1;
      updateCounters();
    } else {
      drawCount += 1;
    }
    updateCounters();
  }
}

//MACHINE
//Let show to user machine selection
function showMachineOption(msg) {
  showElement(printMachineOpt);
  trackElement(printMachineOpt, msg);
}

//Get random machine option
function getMachineSelect() {
  const randomNumber = getRandomNumber(9);

  /* Machine: rock:0-3, paper:7+, else: scissors*/
  let machineSelect = '';
  if (randomNumber <= 3) {
    machineSelect = 'rock';
    showMachineOption(machineRock);
  } else if (randomNumber >= 7) {
    machineSelect = 'paper';
    showMachineOption(machinePaper);
  } else {
    machineSelect = 'scissors';
    showMachineOption(machineScissors);
  }
  return machineSelect;
}

//PLAYED GAMES LIST CONTAINER
//Selections in emojis format
function userOptIcon(userOpt) {
  let userEmoji = '';
  switch (userOpt) {
    case 'rock':
      userEmoji = iconRock;
      break;
    case 'paper':
      userEmoji = iconPaper;
      break;
    default:
      userEmoji = iconScissors;
  }
  return userEmoji;
}
function machineOptIcon(machineOpt) {
  let machineEmoji = '';
  switch (machineOpt) {
    case 'rock':
      machineEmoji = iconRock;
      break;
    case 'paper':
      machineEmoji = iconPaper;
      break;
    default:
      machineEmoji = iconScissors;
  }
  return machineEmoji;
}
let playedGamesList = '';
function printWhoWins(result, userEmoji, machineEmoji) {
  let whoWins = '';
  switch (result) {
    case youWin:
      whoWins = userEmoji;
      playedGamesList += `<li>${gameCount}. ${userEmoji} VS ${machineEmoji} Gana ${whoWins}</li>`;
      break;
    case youLose:
      whoWins = machineEmoji;
      playedGamesList += `<li>${gameCount}. ${userEmoji} VS ${machineEmoji} Gana ${whoWins}</li>`;
      break;
    default:
      whoWins = iconDraw;
      playedGamesList += `<li>${gameCount}. ${userEmoji} VS ${machineEmoji} Empate ${whoWins}</li>`;
  }
  trackElement(playedGames, playedGamesList);
}

//Print the result games in the "Played Games" list container with emojis
function printPlayedGame(userOpt, machineOpt, result) {
  let userEmoji = userOptIcon(userOpt);
  let machineEmoji = machineOptIcon(machineOpt);
  printWhoWins(result, userEmoji, machineEmoji);
}

//MAIN GAME
//Get the results and print them
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
  printPlayedGame(userValue, machineSelect, msg);
}

//START
function playGame() {
  //Check if user selected an option
  const userSelect = inputSelect.value;
  if (userSelect === 'default') {
    printMsg(warning);
    hideElement(printMachineOpt);
    addStyle(printerMainElement, 'red-warning');
  } else {
    userVsMachine(userSelect);
    removeStyle(printerMainElement, 'red-warning');
  }
}
//STOP: Check if user reached the attempts
function endGame() {
  if (gameCount >= defaultAttemptsPerGame) {
    hideElement(inputSelect);
    hideElement(btnPlay);
    hideElement(mainPrinterContainer);
    showElement(endGameHtmlBlock);
    if (userCount > machineCount) {
      trackElement(printEndGame, msgEndGameWin);
      endGameImg.src = 'https://media.tenor.com/06026DSpi60AAAAd/happy-cat.gif';
      endGameImg.alt = 'Happy Cat';
    } else if (userCount === machineCount) {
      trackElement(printEndGame, msgEndGameDraw);
      endGameImg.src = 'https://media.tenor.com/OSVtpDZ9E7kAAAAC/discord.gif';
      endGameImg.alt = 'Poker Cat';
    } else {
      trackElement(printEndGame, msgEndGameLose);
      endGameImg.src = 'https://media.tenor.com/uu9seSBtPaEAAAAC/sad-cat.gif';
      endGameImg.alt = 'Angry Cat';
    }
  }
}

function resetCounters() {
  userCount = 0;
  machineCount = 0;
  drawCount = 0;
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

  resetCounters();
  inputSelect.value = 'default';
  showElement(inputSelect);
  showElement(btnPlay);
  showElement(mainPrinterContainer);

  hideElement(printMachineOpt);
  hideElement(endGameHtmlBlock);
  endGameImg.src = '';
  endGameImg.alt = '';

  trackElement(printerMainElement, defaultMsg);
  trackElement(printEndGame, '');
  playedGamesList = '';
  trackElement(playedGames, '');
}

//EVENTS
btnPlay.addEventListener('click', handleClickPlay);
btnReset.addEventListener('click', handleClickReset);
