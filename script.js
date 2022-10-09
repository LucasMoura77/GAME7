const screenHeight = window.screen.height
const boxGame = window.document.querySelector('.boxGame')
const playerBlock = window.document.querySelector('.playerBlock')
const cpuBlock = window.document.querySelector('.cpuBlock')
let moveAnimation = 33
let cpuBlockDrop = -200
let cpuDropAnimate;
let checkColision;
let score = 0
let positionsCpuBlock = [0.5,33.5,66.5]
let initMenu = window.document.querySelector('.newGame')
let speedBlock = 10
let audioTheme = new Audio('BG-MUSIC.mp3')
audioTheme.loop=true
audioTheme.volume=0.05
cpuBlock.style.right=`${positionsCpuBlock[Math.round(Math.random()*2)]}%`

function gameOn(){
    audioTheme.play()
    initMenu.style.visibility='hidden'
    cpuDropAnimate = setInterval(cpuDropGenerate, 10)
    checkColision = setInterval(blockColision,0)
}



function cpuDropGenerate(){
    cpuBlockDrop += speedBlock
    if(cpuBlockDrop >= screenHeight){
        score += 1
        speedBlock += 0.5
        if(speedBlock == 20){
            speedBlock = 20
        }
        generateScore()
        cpuBlockDrop = -200
        cpuBlock.style.right=`${positionsCpuBlock[Math.round(Math.random()*2)]}%`
    }
    cpuBlock.style.top=`${cpuBlockDrop}px`
    
}

function blockColision(){
    let cpuPositionX = cpuBlock.getBoundingClientRect().x
    let cpuPositionY = cpuBlock.getBoundingClientRect().y
    let playerPositionX = playerBlock.getBoundingClientRect().x
    let playerPositionY = playerBlock.getBoundingClientRect().y - 200
    if(cpuPositionX == playerPositionX && cpuPositionY >= playerPositionY){
        clearInterval(cpuDropAnimate)
        clearInterval(checkColision)
        gameOver()
        
    }
}



function generateScore(){
    const scoreArea = window.document.querySelector('.playerScore')
    scoreArea.textContent=score
}

function gameOver(){
    const scoreText = window.document.querySelector('.scoreText')
    scoreText.textContent=`PONTUAÇÃO: ${score}`
    const gameOver = window.document.querySelector('.gameOver')
    const btns = window.document.querySelector('.btns')
    gameOver.style.visibility='visible'
    btns.style.visibility='hidden'
}

function reloadGame(){
    document.location.reload(true)
}

function movePlayerLeft(){
    let moveLeftInterval = setInterval(function(){
        moveAnimation += 3
        if(moveAnimation == 33.5){
            clearInterval(moveLeftInterval)
            moveAnimation = 33.5
        }else if(moveAnimation >= 66.5){
            clearInterval(moveLeftInterval)
            moveAnimation = 66.5
        }
        playerBlock.style.right=`${moveAnimation}%`
    },7)
}

function movePlayerRight(){
    let moveRightInterval = setInterval(function(){
        moveAnimation -= 3
        if(moveAnimation == 33.5){
            clearInterval(moveRightInterval)
            moveAnimation = 33.5
        }else if(moveAnimation <= 0.5){
            clearInterval(moveRightInterval)
            moveAnimation = 0.5
        }
        playerBlock.style.right=`${moveAnimation}%`
    },7)
}

