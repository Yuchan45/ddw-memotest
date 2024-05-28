const TABLE_ELEMENTS = 8;

// Functions
function reveal(index) {
  console.log(index);
}

function handleReset(buttons) {
  console.log('Reset');
  initializeGame(buttons);
}

function handleReveal(buttons) {
  console.log('Reveal');
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

  return availableNumbers.sort(() => Math.random() - 0.5);
}

function initializeGame(buttons) {
  const availableNumbers = generateRandomNumbers();
  Array.from(buttons).map((button, i) => {
    button.innerHTML = `${availableNumbers[i]}`;
  });
}

function main(buttons) {
  console.log('Initializing game!');
  initializeGame(buttons);
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
    handleReveal(buttons);
  };

  main(buttons);
});
