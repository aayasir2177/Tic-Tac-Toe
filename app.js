let cells = document.querySelectorAll("[data-cell]");

// Adding event listener to all cells
cells.forEach((cell) => {
  cell.addEventListener("click", markMarking);
});

// Converting from object to an array
cells = Object.values(cells);

// Announcement page data
const announcement = document.querySelector("#announcement");
const winner = document.querySelector("#winner");
const restartBtn = document.querySelector("#restart-btn");
restartBtn.onclick = () => {
  reset();
};

// All Winning Possibilities
const winningPossibilities = [
  // Horizontal Lines
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical Lines
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagnoal Lines
  [0, 4, 8],
  [2, 4, 6],
];

// Marks Player Marking
let turn = true;
function markMarking(e) {
  let cell = e.target;

  if (cell.innerText === "") {
    cell.setAttribute("filled", true);
    if (turn) {
      cell.innerText = "X";
      turn = !turn;
    } else {
      cell.innerText = "O";
      turn = !turn;
    }

    checkWin(cell.innerText);
  }
}

// Checks and Announce Winner
function checkWin(cellData) {
  // Checking if the board is full
  const isBoardFull = cells.every((value) => value.textContent != "");

  // Checking if the winning possibility is found
  let checkWinner = winningPossibilities.find((combination) =>
    combination.every((index) => cells[index].innerText === cellData)
  );

  // Announcer
  if (checkWinner) {
    announcement.classList.remove("d-none");
    winner.innerText = `Player "${cellData}" has Won!`;
  } else if (isBoardFull) {
    announcement.classList.remove("d-none");
    winner.innerText = `Tie!`;
  }
}

// Resets everyting
function reset() {
  announcement.classList.add("d-none");

  cells.forEach((cell) => {
    cell.innerText = "";
    cell.removeAttribute("filled");
  });
}