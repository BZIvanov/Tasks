function createCanvas(command) {
    const rows = +command.split(' ')[2];
    const cols = +command.split(' ')[1];
    gameBoard = [];

    for (let row = 0; row < rows; row++) {
        gameBoard.push([]);
        for (let col = 0; col < cols; col++) {
            gameBoard[row].push('O');
        }
    }
}

function clearCanvas() {
    gameBoard = gameBoard.map(row => row.map(col => col = 'O'));
}

function colourPixel(command) {
    const row = +command.split(' ')[2] - 1;
    const col = +command.split(' ')[1] - 1;
    const colour = command.split(' ')[3];

    gameBoard[row][col] = colour;
}

function drawVerticalLine(command) {
    const col = +command.split(' ')[1] - 1;
    const rowStart = +command.split(' ')[2] - 1;
    const rowEnd = +command.split(' ')[3] - 1;
    const colour = command.split(' ')[4];

    for (let row = rowStart; row <= rowEnd; row++) {
        gameBoard[row][col] = colour;
    }
}

function drawHorizontalLine(command) {
    const row = +command.split(' ')[3] - 1;
    const colStart = +command.split(' ')[1] - 1;
    const colEnd = +command.split(' ')[2] - 1;
    const colour = command.split(' ')[4];

    for (let col = colStart; col <= colEnd; col++) {
        gameBoard[row][col] = colour;
    }
}

function fillRegion(command) {
    const row = +command.split(' ')[2] - 1;
    const col = +command.split(' ')[1] - 1;
    const colour = command.split(' ')[3];

    function filler(r, c) {
        if (r < 0 || r >= gameBoard.length || 
            c < 0 || c >= gameBoard[0].length || 
            gameBoard[r][c] !== 'O') {
                return;
            }
        
        gameBoard[r][c] = colour;
        filler(r + 1, c);
        filler(r - 1, c);
        filler(r, c + 1);
        filler(r, c - 1);
    }

    filler(row, col)
}

function showContent() {
    draw();
}

function terminateSession() {
    gameBoard = [[]];
    draw();
}
