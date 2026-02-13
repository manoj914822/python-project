const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake;
let direction;
let food;
let score;
let game;

function initGame() {
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = "RIGHT";
    food = randomFood();
    score = 0;
    document.getElementById("score").innerText = score;

    if (game) clearInterval(game);
    game = setInterval(draw, 120);
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT")
        direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN")
        direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT")
        direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP")
        direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(part.x, part.y, box, box);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Collision check
    if (
        headX < 0 || headY < 0 ||
        headX >= canvas.width || headY >= canvas.height ||
        collision({ x: headX, y: headY }, snake)
    ) {
        clearInterval(game);
        alert("Game Over! Final Score: " + score);
        return;
    }

    // Food check
    if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = randomFood();
    } else {
        snake.pop();
    }

    snake.unshift({ x: headX, y: headY });
}

function collision(head, body) {
    return body.some(part => part.x === head.x && part.y === head.y);
}

function restartGame() {
    initGame();
}

initGame();
