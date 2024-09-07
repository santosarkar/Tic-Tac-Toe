const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize game
function initializeGame() {
    board.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    updateStatus();
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (gameBoard[cellIndex] === '' && isGameActive) {
        gameBoard[cellIndex] = currentPlayer;
        this.textContent = currentPlayer;
        checkWinner();
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function updateStatus() {
    if (isGameActive) {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (!gameBoard.includes('')) {
        statusText.textContent = 'Game is a draw!';
        isGameActive = false;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    board.forEach(cell => cell.textContent = '');
    updateStatus();
}

// Start the game
initializeGame();
