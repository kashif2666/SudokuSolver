const boardElement = document.getElementById("board");
const board = [];

// Initialize the board with input fields
for (let i = 0; i < 9; i++) {
  const row = [];
  for (let j = 0; j < 9; j++) {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("min", "1");
    input.setAttribute("max", "9");
    input.setAttribute("maxlength", "1");
    input.setAttribute("oninput", 'validity.valid||(value="")');
    input.addEventListener("keydown", (e) => handleKeyDown(e, i, j));
    boardElement.appendChild(input);
    row.push(input);
  }
  board.push(row);
}

function handleKeyDown(event, row, col) {
  switch (event.key) {
    case "Enter":
      moveToNextCell(row, col);
      break;
    case "ArrowRight":
      moveRight(row, col);
      break;
    case "ArrowLeft":
      moveLeft(row, col);
      break;
    case "ArrowDown":
      moveDown(row, col);
      break;
    case "ArrowUp":
      moveUp(row, col);
      break;
  }
}

function moveToNextCell(row, col) {
  if (col < 8) {
    board[row][col + 1].focus();
  } else if (row < 8) {
    board[row + 1][0].focus();
  }
}

function moveRight(row, col) {
  if (col < 8) {
    board[row][col + 1].focus();
  }
}

function moveLeft(row, col) {
  if (col > 0) {
    board[row][col - 1].focus();
  }
}

function moveDown(row, col) {
  if (row < 8) {
    board[row + 1][col].focus();
  }
}

function moveUp(row, col) {
  if (row > 0) {
    board[row - 1][col].focus();
  }
}

function solveSudoku() {
  const grid = board.map((row) => row.map((cell) => parseInt(cell.value) || 0));
  if (solve(grid)) {
    updateBoard(grid);
  } else {
    alert("Cannot solve the Sudoku");
  }
}

function updateBoard(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j].value = grid[i][j] || "";
    }
  }
}

function resetBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j].value = "";
    }
  }
}

function solve(grid) {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      if (solve(grid)) {
        return true;
      }
      grid[row][col] = 0;
    }
  }

  return false;
}

function findEmptyCell(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

function isSafe(grid, row, col, num) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}
