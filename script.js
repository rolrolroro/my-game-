const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player1 = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    health: 100,
    keys: {
        left: false,
        up: false,
        right: false,
        down: false,
        attack: false
    }
};

const player2 = {
    x: 700,
    y: 50,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    health: 100,
    keys: {
        left: false,
        up: false,
        right: false,
        down: false,
        attack: false
    }
};

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer(player) {
    if (player.keys.left && player.x > 0) {
        player.x -= player.speed;
    }
    if (player.keys.right && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (player.keys.up && player.y > 0) {
        player.y -= player.speed;
    }
    if (player.keys.down && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
}

function checkCollision(player1, player2) {
    return (
        player1.x < player2.x + player2.width &&
        player1.x + player1.width > player2.x &&
        player1.y < player2.y + player2.height &&
        player1.y + player1.height > player2.y
    );
}

function handleAttack(attacker, defender) {
    if (attacker.keys.attack && checkCollision(attacker, defender)) {
        defender.health -= 1;
        console.log(defender.health);
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            player1.keys.left = true;
            break;
        case 'w':
            player1.keys.up = true;
            break;
        case 'd':
            player1.keys.right = true;
            break;
        case 's':
            player1.keys.down = true;
            break;
        case ' ':
            player1.keys.attack = true;
            break;
        case 'ArrowLeft':
            player2.keys.left = true;
            break;
        case 'ArrowUp':
            player2.keys.up = true;
            break;
        case 'ArrowRight':
            player2.keys.right = true;
            break;
        case 'ArrowDown':
            player2.keys.down = true;
            break;
        case 'Enter':
            player2.keys.attack = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            player1.keys.left = false;
            break;
        case 'w':
            player1.keys.up = false;
            break;
        case 'd':
            player1.keys.right = false;
            break;
        case 's':
            player1.keys.down = false;
            break;
        case ' ':
            player1.keys.attack = false;
            break;
        case 'ArrowLeft':
            player2.keys.left = false;
            break;
        case 'ArrowUp':
            player2.keys.up = false;
            break;
        case 'ArrowRight':
            player2.keys.right = false;
            break;
        case 'ArrowDown':
            player2.keys.down = false;
            break;
        case 'Enter':
            player2.keys.attack = false;
            break;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlayer(player1);
    updatePlayer(player2);
    handleAttack(player1, player2);
    handleAttack(player2, player1);
    drawPlayer(player1);
    drawPlayer(player2);
    requestAnimationFrame(gameLoop);
}

gameLoop();
