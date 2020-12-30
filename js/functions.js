function drawBoard() {
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        for(let currentCol = 0; currentCol < COL; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol];
            drawSquare(currentRow, currentCol, currentSquareColor);
        }
    }

    scoreElement.innerHTML = score;
    speedElement.innerHTML = speed;
}

function drawSquare(y, x, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    if (color === defaultColor) {
        ctx.strokeStyle = defaultBorder;
    }

    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

function randomPiece() {
    const randomPieceNumber = Math.floor(Math.random() * PIECES.length);
    return new Piece(
        PIECES[randomPieceNumber][0],
        PIECES[randomPieceNumber][1],
    );
}

function drop() {
    const now = Date.now();
    const delta = now - dropStart;

    if (delta > speed) {
        piece.moveDown();
        dropStart = Date.now();
    }

    requestAnimationFrame(drop);
}

function control(e) {
    if (e.keyCode === 68)
        piece.moveRight()
    else if (e.keyCode === 87)
        piece.rotate()
    else if (e.keyCode === 65)
        piece.moveLeft()
    else if (e.keyCode === 83)
        piece.moveDown()
}

function updateRowAndScore(row) {
    canMove = false;

    for (let y = row; y > 1; y--) {
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            removeRow(y, currentCol);
        }
    }

    for (let currentCol = 0; currentCol < COL; currentCol++) {
        board[0][currentCol] = defaultColor;
    }

    score += 10;

    if (speed > 50) {
        speed -= 20;
    }

    canMove = true;
}

function removeRow(rowToRemove, colToRemove) {
    board[rowToRemove][colToRemove] = board[rowToRemove - 1][colToRemove];
}

function gameOver() {
    alert("Игра окончена! Ваш результат - " + scoreElement.innerHTML);
        resetGame();
}

function resetGame() {
    speed = 500;
    dropStart = Date.now();
    score = 0;

    board = [];
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        board[currentRow] = [];
        for(let currentCol = 0; currentCol < COL; currentCol++) {
            board[currentRow][currentCol] = defaultColor;
        }
    }

    piece = randomPiece();
    drawBoard();
}