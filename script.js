const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const xScoreDisplay = document.getElementById('x-score');
const oScoreDisplay = document.getElementById('o-score');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const newGameBtn = document.getElementById('new-game-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let xScore = 0;
let oScore = 0;

// Function to check if the current player has won
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWinner(pattern);
            return board[a];
        }
    }

    // Check for a tie
    if (!board.includes('')) {
        return 'Tie';
    }

    return null;
}

// Function to highlight the winning combination
function highlightWinner(pattern) {
    pattern.forEach(index => {
        cells[index].style.backgroundColor = 'green';
    });
}

// Function to handle cell click
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] || gameOver) return;

    // Update the board and cell
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check if there's a winner
    const winner = checkWinner();

    if (winner) {
        gameOver = true;
        if (winner === 'X') {
            xScore++;
        } else if (winner === 'O') {
            oScore++;
        }
        updateScore();
        showModal(winner === 'Tie' ? "It's a Tie!" : `${winner} wins!`);
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to update the score
function updateScore() {
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
}

// Function to show the modal with win or tie message
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

// Function to restart the game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';

    // Clear cells and reset styles
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#f0f0f0';
    });

    modal.style.display = 'none'; // Hide the modal
}

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

newGameBtn.addEventListener('click', restartGame);
