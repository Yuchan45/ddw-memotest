// Globals
const TABLE_ELEMENTS = 8;
let tableNumbers = [];
let revealedCount = 0;
let card1;
let card2;
let valueCard1;
let valueCard2;
let matches = 0;
const matchesTxt = document.getElementById('matches');

// Functions
function hide() {
  card1.innerHTML = `  `;
  card2.innerHTML = `  `;
  revealedCount = 0;
}

function match() {
  matches++;
  console.log('Matches', matches);
  matchesTxt.innerHTML = `Matches: ${matches}`;
  revealedCount = 0;
  if (matches === TABLE_ELEMENTS) {
    alert('You won!');
  }
}

function reveal(index) {
  revealedCount++;

  if (revealedCount === 1) {
    card1 = document.getElementById(`button_${index}`);
    valueCard1 = tableNumbers[index];
    card1.innerHTML = `${valueCard1}`;
    card1.disabled = true;
  } else if (revealedCount === 2) {
    card2 = document.getElementById(`button_${index}`);
    valueCard2 = tableNumbers[index];
    card2.innerHTML = `${valueCard2}`;
    card2.disabled = true;

    if (valueCard1 === valueCard2) {
      match();
    } else {
      setTimeout(() => {
        hide();
      }, 1000);
    }
    card1.disabled = false;
    card2.disabled = false;
  }
}

function handleReset(buttons) {
  console.log('Reset!');
  initializeGame();
  Array.from(buttons).map((button) => {
    button.innerHTML = `  `;
    button.disabled = false;
  });
  matches = 0;
}

function handleRevealAll(buttons) {
  console.log('Reveal All!');
  Array.from(buttons).map((button, i) => {
    button.innerHTML = `${tableNumbers[i]}`;
    button.disabled = true;
  });
  matches = TABLE_ELEMENTS;
}

/**
 * Given the number of positions in the table
 * It returns an array of randomized values in order to fill the table.
 */
function generateRandomNumbers() {
  let availableNumbers = [];
  for (let i = 1; i <= TABLE_ELEMENTS; i++) {
    availableNumbers.push(i);
    availableNumbers.push(i);
  }

  tableNumbers = availableNumbers.sort(() => Math.random() - 0.5);
}

function initializeGame() {
  generateRandomNumbers();
  console.log(tableNumbers);
}

// OnLoad
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Loaded');

  // Elements
  const buttons = document.querySelectorAll('.square-button button');
  const resetBtn = document.querySelector('#reset');
  const revealBtn = document.querySelector('#reveal');

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
  initializeGame();
});
