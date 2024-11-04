// Identifying the game board element for writing the logic for memory game;
let board = document.getElementById("game-board");

// Let's use alphabets as pairs of values to be memorized in the game
const values = ["A", "S", "D", "F", "B", "C", "E", "G", "H", "K", "R", "V"];

let flipped = []; // tracker to hold the state of opened cards and their values
let blockClicks = false; // boolean flag used to block the cards that are already has pairs found or in flipped state
let pairsFound = 0; // counter to track how many pairs needs to be found

/** Shuffling logic to randomize the positions of alphabets between the cards */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

/**
 * Function used to setting the memory game
 */
const createGameBoard = () => {
  board.innerHTML = "";
  let cards = shuffle([...values, ...values]);

  cards.forEach((card) => {
    const $card = document.createElement("div");
    $card.classList.add("card");
    $card.textContent = "?";
    $card.dataset.value = card;

    // adding event listeners for each card to enable flipping while clicking the card
    $card.addEventListener("click", () => flipCard($card));

    board.appendChild($card);
  });

  // Initializing the game state
  flipped = [];
  pairsFound = 0;
  blockClicks = false;
};

/**
 * Function used to flip the card and check whether the already flipped card is matching with current flipped one.
 */
const flipCard = (card) => {
  if (blockClicks || card.classList.contains("flipped")) {
    return;
  }

  card.textContent = card.dataset.value;
  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    blockClicks = true;
    checkPairMatch();
  }
};

/**
 * Comparing the flipped cards to identify the exact pairs.
 */
const checkPairMatch = () => {
  const [card1, card2] = flipped;

  if (card1.dataset.value === card2.dataset.value) {
    pairsFound++;
    flipped = [];
    blockClicks = false;

    if (pairsFound === values.length) {
      alert("You Won the game!!");
    }
  } else {
    // Flipping back the cards to original state if the flipped card was not matching after 500 milliseconds
    setTimeout(() => {
      card1.textContent = "?";
      card2.textContent = "?";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flipped = [];
      blockClicks = false;
    }, 500);
  }
};

// initialize game
createGameBoard();
