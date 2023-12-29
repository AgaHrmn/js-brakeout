const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const boardHeight = 300
const boardWidth = 560
const blockHeight = 20
const blockWidth = 100
const startPosition = [230, 10]
const ballDim = 14
let score = 0
let timerId
let xDir = 2
let yDir = 2

let playerPosition = startPosition
let ballStartPosition = [startPosition[0] + blockWidth / 2 - ballDim / 2, startPosition[1] + blockHeight]
let ballPosition = ballStartPosition

const player = document.createElement('div')
player.classList.add('player')
grid.appendChild(player)

const ball = document.createElement('div')
ball.classList.add('ball');
grid.appendChild(ball)

class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + blockWidth, y]
        this.topRight = [x + blockWidth, y + blockHeight]
        this.topLeft = [x, y + blockHeight]

    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

function drawBall() {
    ball.style.left = ballPosition[0] + 'px'
    ball.style.bottom = ballPosition[1] + 'px'
}

function drawPlayer() {

    player.style.left = playerPosition[0] + 'px'
    player.style.bottom = playerPosition[1] + 'px'
}

function movePlayer(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (playerPosition[0] > 0) {
                playerPosition[0] -= 10
                drawPlayer()
            }
            break;
        case 'ArrowRight':
            if (playerPosition[0] < 460) {
                playerPosition[0] += 10
                drawPlayer()
            }
            break;
    }
}

function moveBall() {
    checkCollisions()
    ballPosition[0] += 2 * xDir
    ballPosition[1] += 2 * yDir
    drawBall()
}

function changeDirection() {
    if (xDir === 2 && yDir === 2) {
        yDir *= -1
        return
    }

    if (xDir === 2 && yDir === -2) {
        xDir *= -1
        return
    }
    if (xDir === -2 && yDir === 2) {
        xDir *= -1
        return
    }

    if (xDir === -2 && yDir === -2) {
        yDir *= -1
        return
    }
}

function checkCollisions() {
    pointLost()
    if (ballPosition[1] >= 290 ) {
        changeDirection()
    }
    if (ballPosition[0] <= 0 || ballPosition[0] > boardWidth) {
        changeDirection()
    }

    for (let i = 0; i < blocks.length; i++) {
        if (ballPosition[0] > blocks[i].bottomLeft[0] && ballPosition[0] < blocks[i].bottomRight[0] &&
            ballPosition[1] + ballDim > blocks[i].topRight[1] && ballPosition[1] < blocks[i].topLeft[1]) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score += 1
            if (blocks.length === 0) {
                score = "CONGRATS!!!"
                clearInterval(timerId)
            }
        }
        scoreDisplay.innerHTML = score
    }

    if ((ballPosition[0] > playerPosition[0] && ballPosition[0] < playerPosition[0]+ blockWidth) && 
    (ballPosition[1] > playerPosition[1] && ballPosition[1] < playerPosition[1] + blockHeight)) {
        
        changeDirection()
    }

}

function pointLost() {
    if (ballPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = "You Lose :("
        document.removeEventListener(keydown, movePlayer)
    }
}


timerId = setInterval(moveBall, 30)
addBlocks()
drawPlayer()
drawBall()
document.addEventListener('keydown', movePlayer)
