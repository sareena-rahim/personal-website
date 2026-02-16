const maze = document.getElementById("maze");
const restartBtn = document.getElementById("restartBtn");
const movesText = document.getElementById("moves");

const mazeLayout = [
  ["P", "", "W", "", "", ""],
  ["W", "", "W", "", "W", ""],
  ["", "", "", "", "W", ""],
  ["", "W", "W", "", "", ""],
  ["", "", "", "W", "W", ""],
  ["W", "W", "", "", "", "G"]
];

let playerPosition = { row: 0, col: 0 };
let gameWon = false;
let moves = 0;

function drawMaze() {
  maze.innerHTML = "";
  
   for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
		
		 const cell = document.createElement("div");
         cell.classList.add("cell");
         
		 if (mazeLayout[row][col] === "W") {
        cell.classList.add("wall");
        }
		
		if (mazeLayout[row][col] === "G") {
        cell.textContent = "🏠";
        }
		
		if (row === playerPosition.row && col === playerPosition.col) {
        cell.textContent = gameWon ? "😄" : "😐";
        }
		
		maze.appendChild(cell);
	}
	
    }

    movesText.textContent = moves;
}

function movePlayer(newRow, newCol) {
	 if (gameWon) return;  
	if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 6) return;
    if (mazeLayout[newRow][newCol] === "W") return;
	
	playerPosition.row = newRow;
    playerPosition.col = newCol;
    moves++;
	
	if (mazeLayout[newRow][newCol] === "G") {
		gameWon = true;
		alert("You reached home!  🎉");
    }
	
	  drawMaze();
}

document.addEventListener("keydown", (e) => {
  if (gameWon) return;
  
  if (e.key === "ArrowUp") moveUp();
  if (e.key === "ArrowDown") moveDown();
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

function moveUp() {
  movePlayer(playerPosition.row - 1, playerPosition.col);
}

function moveDown() {
  movePlayer(playerPosition.row + 1, playerPosition.col);
}

function moveLeft() {
  movePlayer(playerPosition.row, playerPosition.col - 1);
}

function moveRight() {
  movePlayer(playerPosition.row, playerPosition.col + 1);
}

restartBtn.addEventListener("click", () => {
  playerPosition = { row: 0, col: 0 };
  gameWon = false;
  moves = 0;
  drawMaze();
});

drawMaze();
