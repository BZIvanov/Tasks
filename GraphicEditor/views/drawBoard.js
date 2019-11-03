function draw() {
    const board = document.getElementById('root');
    document.getElementById('notification').textContent = '';
    board.innerHTML = '';

    if (gameBoard.length === 0) {
        return board.textContent = 'Please draw something!';
    }

    for (let row = 0; row < gameBoard.length; row++) {
        const htmlRow = document.createElement('div');
        for (let col = 0; col < gameBoard[0].length; col++) {
            const htmlCell = drawCell(gameBoard[row][col]);
            htmlRow.appendChild(htmlCell);
        }
        board.appendChild(htmlRow);
    }
}

function drawCell(letter) {
    const htmlSpan = document.createElement('span');
    htmlSpan.textContent = letter;
    return htmlSpan;
}

function invalidInputNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message.substring(0, 10) + ' is incorrect input';
}
