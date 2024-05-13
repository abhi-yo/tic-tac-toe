const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
    box.classList.remove("win");
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerHTML = `Current Player - ${currentPlayer}'s turn`;
}

initGame();

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameInfo.innerHTML = `Current Player - ${currentPlayer}'s turn`;
}

function checkGameOver() {
  let winner = null;

  for (const position of winningPositions) {
    const [a, b, c] = position;
    if (
      gameGrid[a] !== "" &&
      gameGrid[a] === gameGrid[b] &&
      gameGrid[a] === gameGrid[c]
    ) {
      winner = gameGrid[a];
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");
      break;
    }
  }

  if (winner) {
    gameInfo.innerText = `Winner Player - ${winner}`;
    newGameBtn.classList.add("active");
    boxes.forEach((box) => {
      box.style.pointerEvents = "none";
    });
    return;
  }

  if (gameGrid.every((value) => value !== "")) {
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "" && currentPlayer === "X") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
    
    // Check if the game is not over and it's now O's turn
    if (currentPlayer === "O") {
      // Call the AI function to make a move
      makeAIMove();
    }
  }
}

function makeAIMove() {
  // Simple AI logic: Choose the first available empty box
  for (let i = 0; i < gameGrid.length; i++) {
    if (gameGrid[i] === "") {
      // Make the move for "O" player
      gameGrid[i] = currentPlayer;
      boxes[i].innerText = currentPlayer;
      boxes[i].style.pointerEvents = "none";
      swapTurn();
      checkGameOver();
      break;
    }
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
