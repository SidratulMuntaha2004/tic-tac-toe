const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

function handleClick(index) {
    if (gameBoard[index] === '' && !isGameOver) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        if (checkWinner(currentPlayer)) {
            isGameOver = true;
            message.textContent = `${currentPlayer} wins!`;
        } else if (gameBoard.every(cell => cell !== '')) {
            isGameOver = true;
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner(player) {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombination.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

restartButton.addEventListener('click', restartGame);
