const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const finalScoreSpan = document.getElementById('finalScore');

canvas.width = 400;
canvas.height = 600;

const rocket = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 60,
    speed: 5
};

let obstacles = [];
let stars = [];
let score = 0;
let gameLoop;
let obstacleSpeed = 3;

function drawRocket() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(rocket.x - rocket.width / 2, rocket.y - rocket.height / 2, rocket.width, rocket.height);
}

function drawObstacles() {
    ctx.fillStyle = '#00ff00';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function drawStars() {
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawScore() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function createObstacle() {
    const obstacle = {
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30
    };
    obstacles.push(obstacle);
}

function createStar() {
    const star = {
        x: Math.random() * canvas.width,
        y: 0,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 3 + 1
    };
    stars.push(star);
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed;
    });
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

function moveStars() {
    stars.forEach(star => {
        star.y += star.speed;
    });
    stars = stars.filter(star => star.y < canvas.height);
}

function checkCollision() {
    return obstacles.some(obstacle =>
        rocket.x - rocket.width / 2 < obstacle.x + obstacle.width &&
        rocket.x + rocket.width / 2 > obstacle.x &&
        rocket.y - rocket.height / 2 < obstacle.y + obstacle.height &&
        rocket.y + rocket.height / 2 > obstacle.y
    );
}

function gameOver() {
    clearInterval(gameLoop);
    gameOverScreen.classList.remove('hidden');
    finalScoreSpan.textContent = score;
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    moveObstacles();
    moveStars();
    
    if (Math.random() < 0.02) createObstacle();
    if (Math.random() < 0.1) createStar();
    
    drawStars();
    drawObstacles();
    drawRocket();
    drawScore();
    
    if (checkCollision()) {
        gameOver();
    }
    
    score++;
    if (score % 500 === 0) obstacleSpeed += 0.5;
}

function startGame() {
    obstacles = [];
    stars = [];
    score = 0;
    obstacleSpeed = 3;
    rocket.x = canvas.width / 2;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameLoop = setInterval(updateGame, 1000 / 60);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            if (rocket.x > rocket.width / 2) rocket.x -= rocket.speed;
            break;
        case 'ArrowRight':
            if (rocket.x < canvas.width - rocket.width / 2) rocket.x += rocket.speed;
            break;
    }
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);


function drawRocket() {
    // Draw rocket body
    const gradient = ctx.createLinearGradient(rocket.x - rocket.width / 2, rocket.y - rocket.height / 2, rocket.x + rocket.width / 2, rocket.y - rocket.height / 2);
    gradient.addColorStop(0, '#ff0000'); // Red
    gradient.addColorStop(1, '#ff6600'); // Orange

    ctx.fillStyle = gradient;
    ctx.fillRect(rocket.x - rocket.width / 2, rocket.y - rocket.height / 2, rocket.width, rocket.height);

    // Draw rocket flame
    ctx.fillStyle = '#ffcc00'; // Yellow flame
    ctx.beginPath();
    ctx.moveTo(rocket.x, rocket.y + rocket.height / 2);
    ctx.lineTo(rocket.x - 10, rocket.y + rocket.height);
    ctx.lineTo(rocket.x + 10, rocket.y + rocket.height);
    ctx.closePath();
    ctx.fill();
}