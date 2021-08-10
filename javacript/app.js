const holes = document.querySelectorAll('.mole__hole');
const moles = document.querySelectorAll('.mole__mole');
const scoreBoardElement = document.querySelector('.score');
const timeLeft = document.querySelector('#time__left');
let scoreBoard = 0;
let startGame;
let time = 60;
let timeRemainSet;
let elementPosition;
window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach) // make IE support forEach

/**
 * Get random position 
 */
function randomPosition() {
    clearClasses();
    elementPosition = Math.floor(Math.random() * moles.length);
    const randomPositions = moles[elementPosition];
    randomPositions.classList.remove('hide__mole');
    randomPositions.classList.add("opened__eye");

}
/**
 * Clearing the mole classes
 */
function clearClasses() {
    moles.forEach(mole => {
        mole.classList.remove('opened__eye', 'scored__mole');
        mole.classList.add('hide__mole');
    });
}

/**
 * Get the random time
 */
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

/**
 * start the mole movement by clicking on start button
 */
function start() {
    scoreBoard = 0;
    scoreBoardElement.textContent = scoreBoard;
    score();
    const time = randomTime(500, 1000);
    timeRemainSet = setInterval(() => { timeRemains() }, 1000);
    startGame = setInterval(() => {
        randomPosition();
    }, time);
}

function stop() {
    clearInterval(startGame);
    clearInterval(timeRemainSet);
    clearClasses();
}

function clearData() {
    clearInterval(startGame);
    clearInterval(timeRemainSet);
    clearClasses();
    scoreBoard = 0;
    time = 60;
    scoreBoardElement.textContent = scoreBoard;
    timeLeft.textContent = time;
}


/**
 * Adding clicking events on each mole and set the score while click on particular mole
 */
function score() {
    moles.forEach(mole => {
        mole.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.isTrusted && mole.id == elementPosition + 1) {
                mole.classList.add("scored__mole");
                scoreBoard++;
                scoreBoardElement.textContent = scoreBoard;
                elementPosition = null;
                setTimeout(() => {
                    mole.classList.add('hide__mole');
                }, 500);
            }
        });
    })
}

/**
 * set the timelimit
 */
function timeRemains() {
    time--;
    timeLeft.textContent = time;
    if (time === 0) {
        stop();
        time = 60;
        alert(`Game Over!!!!!!!!!!!!! Your Score: ${scoreBoard}`);
    }
}

