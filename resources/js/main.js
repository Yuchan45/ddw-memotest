// Globals
const TABLE_ELEMENTS = 8;
const TIME_LIMIT = 40;
let tableNumbers = [];
let revealedCount = 0;
let card1;
let card2;
let valueCard1;
let valueCard2;
let matches = 0;
let countdown;
let isTimerOn = false;
let timer = TIME_LIMIT;
let totalMoves = 0;

// Elements
const buttons = document.querySelectorAll('.square-button button');
const resetBtn = document.querySelector('#reset');
const revealBtn = document.querySelector('#reveal');
const matchesTxt = document.getElementById('matches');
const timertxt = document.getElementById('timer');
const totalMovestxt = document.getElementById('total-moves');
const messagetxt = document.getElementById('message');

// Default txts
matchesTxt.innerHTML = `${matches}`;
totalMovestxt.innerHTML = `${totalMoves}`;
timertxt.innerHTML = `${TIME_LIMIT}`;

// Functions
function hide() {
  card1.innerHTML = `  `;
  card2.innerHTML = `  `;
  revealedCount = 0;
}

function match() {
  matches++;
  console.log('Aciertos', matches);
  matchesTxt.innerHTML = `${matches}`;
  revealedCount = 0;

  if (matches == TABLE_ELEMENTS) {
    console.log('Win!');
    clearInterval(countdown);

    matchesTxt.innerHTML = `${matches} 🔥`;
    totalMovestxt.innerHTML = `${totalMoves} ♟️`;
    messagetxt.innerHTML = `Increible! Solo tardaste ${
      TIME_LIMIT - timer
    }s en resolver el MemoTest! ⌛🚄`;
  }
}

function handleReset(buttons) {
  console.log('Reset!');
  initializeGame();
  clearInterval(countdown);
  Array.from(buttons).map((button) => {
    button.innerHTML = `  `;
    button.disabled = false;
  });

  matches = 0;
  revealedCount = 0;
  totalMoves = 0;
  timer = TIME_LIMIT;
  isTimerOn = false;

  matchesTxt.innerHTML = `${matches}`;
  totalMovestxt.innerHTML = `${totalMoves}`;
  timertxt.innerHTML = `${timer}`;
}

function handleRevealAll(buttons) {
  console.log('Reveal All!');
  Array.from(buttons).map((button, i) => {
    button.innerHTML = `<img src="./resources/images/${tableNumbers[i]}.png" alt="">`;
    button.disabled = true;
  });
  clearInterval(countdown);
  matches = TABLE_ELEMENTS;
  revealedCount = 0;
  totalMoves = 0;

  matchesTxt.innerHTML = `${TABLE_ELEMENTS}`;
  totalMovestxt.innerHTML = `-`;
  timertxt.innerHTML = `0`;
  messagetxt.innerHTML = ``;
}

function startCountdown() {
  countdown = setInterval(() => {
    timer--;
    timertxt.innerHTML = `${timer}`;

    if (timer === 0) {
      clearInterval(countdown);
      handleRevealAll(buttons);
      isTimerOn = false;
    }
  }, 1000);
}

/**
 * Given the number of items to fit in the table
 * It returns an array of randomized values in order to fill it.
 */
function initializeGame() {
  let availableNumbers = [];
  // Load the array with values between 1 and TABLE_ELEMENTS (Duplicated)
  for (let i = 1; i <= TABLE_ELEMENTS; i++) {
    availableNumbers.push(i);
    availableNumbers.push(i);
  }

  // Sort randomly
  tableNumbers = availableNumbers.sort(() => Math.random() - 0.5);
  return tableNumbers;
}

function reveal(index) {
  revealedCount++;

  if (!isTimerOn) {
    startCountdown();
    isTimerOn = true;
  }

  if (revealedCount === 1) {
    card1 = document.getElementById(`button_${index}`);
    valueCard1 = tableNumbers[index];
    card1.innerHTML = `<img src="./resources/images/${valueCard1}.png" alt="">`;
    card1.disabled = true;
  } else if (revealedCount === 2) {
    card2 = document.getElementById(`button_${index}`);
    valueCard2 = tableNumbers[index];
    card2.innerHTML = `<img src="./resources/images/${valueCard2}.png" alt="">`;
    card2.disabled = true;

    if (valueCard1 === valueCard2) {
      match();
    } else {
      totalMoves++;
      totalMovestxt.innerHTML = `${totalMoves}`;
      setTimeout(() => {
        hide();
      }, 700);
    }
    card1.disabled = false;
    card2.disabled = false;
  }
}

// OnLoad
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Loaded');

  // Add Event listeners
  buttons.forEach((button, index) => {
    button.onclick = () => reveal(index);
  });

  resetBtn.onclick = () => {
    handleReset(buttons);
  };
  revealBtn.onclick = () => {
    handleRevealAll(buttons);
  };

  console.log('Initializing game!');
  const table = initializeGame();
  console.log(table);
});
