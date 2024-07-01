// Globals
const TABLE_ELEMENTS = 8;
const TIME_LIMIT = 400;
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

// Road Signs & Descriptions
const roadSigns = [
  {
    id: 1,
    name: 'Lomo de burro',
    description:
      'Señal que indica la presencia de una elevación en la calle que tiene el objetivo de reducir la velocidad de circulación de los vehículos.',
  },
  {
    id: 2,
    name: 'Camino Sinuoso',
    description:
      'Señal que indica que el camino más adelante es sinuoso y tiene una serie de curvas o vueltas. En todas las curvas baje la velocidad para tener un mejor control.',
  },
  {
    id: 3,
    name: 'Prohibido Giro en U',
    description:
      'Señal que indica que el conductor no debe hacer un giro de 180 grados o devolverse.',
  },
  {
    id: 4,
    name: 'Permitido Estacionar',
    description:
      'Señal que indica la presencia de una zona habilitada para el estacionamiento o aparcamiento de vehículos.',
  },
  {
    id: 5,
    name: 'Zona Escolar',
    description:
      'Señal que indica la existencia de instituciones educativas en una zona puntual. Debe bajarse la velocidad a 30 km/h para evitar accidentes y garantizar la seguridad de estudiantes, docentes y miembros de la comunidad educativa en general.',
  },
  {
    id: 6,
    name: 'STOP',
    description:
      'Señal que indica la obligación de detener el vehículo por completo antes de la señal y de la marca vial de detención.',
  },
  {
    id: 7,
    name: 'Derrumbe o Deslizamiento',
    description:
      'Señal que indica que estás por pasar por una zona de alto riesgo, en la cual, muy seguramente ya han habido derrumbes.',
  },
  {
    id: 8,
    name: 'Doble Sentido',
    description:
      'Señal que advierte a los conductores que circulan por una vía unidireccional que se aproxima a un tramo de vía sin separador central, en el cual la circulación se efectúa en los dos sentido.',
  },
];

// Elements
const roadInfoContainer = document.querySelector('.road-info');
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

function addRoadItem(index) {
  const roadSign = roadSigns.find((sign) => sign.id == index);
  let roadItemHTML = `
    <div class="road-item">
      <img src="./resources/images/${index}.png" alt="">
      <div class="item-info">
        <h2>${roadSign.name}</h2>
        <p>${roadSign.description}</p>
      </div>
    </div>
  `;
  roadInfoContainer.insertAdjacentHTML('beforeend', roadItemHTML);
}

function match(index) {
  matches++;
  console.log('Aciertos', matches);
  matchesTxt.innerHTML = `${matches}`;
  revealedCount = 0;

  // Show the corresponding road Item description.
  addRoadItem(index);

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

  // Remove all road items descriptions
  roadInfoContainer.innerHTML = '';

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
  // Reveal all road items descriptions
  for (let i = 1; i <= 8; i++) {
    addRoadItem(i);
  }

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
      match(valueCard2);
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
