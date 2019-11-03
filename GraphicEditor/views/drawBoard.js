function draw() {
    const canvas = document.getElementById('playField');
    const ctx = canvas.getContext('2d');
    document.getElementById('notification').textContent = '';
    
    if (gameBoard.length === 0) {
        document.getElementById('notification').textContent = 'Please draw something!';
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }

    drawOnCanvas(canvas, ctx);
}

function drawOnCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = gameBoard[0].length * 6.18;
    canvas.height = gameBoard.length * 10.03;

    ctx.font = "bold 11px monospace";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    for (let row = 0; row < gameBoard.length; row++) {
        const text = gameBoard[row].join('');
        ctx.fillText(text, 0, row * 10);
    }
}

function invalidInputNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message.substring(0, 10) + ' is incorrect input';
}
