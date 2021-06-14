const playButton = document.querySelector(".playButton");
const stopButton = document.querySelector(".stopButton");
const img = document.querySelector(".background");
const floor = document.querySelector(".floor");
const counter = document.querySelector(".counter");
const timer = document.querySelector(".timer");
const mainHeader = document.querySelector(".header");
const carrot = document.querySelector(".carrot");
const modal = document.querySelector(".modal");
const success = document.querySelector(".success");
const fail = document.querySelector(".fail");
const replay = document.querySelector(".replay");
const replayModal = document.querySelector(".replayModal");
const replayButton = document.querySelector(".replayButton");
const floorSize = floor.getBoundingClientRect();

let carrotCount = 9;
const bugCount = 9;
let setTime = undefined;
let time = 5;
let started = false;

function gameOut() {
    started = false;
    let audio = new Audio("alert.wav");
    audio.play();
    if (success.style.display === "block") {
        return;
    }
    modal.style.visibility = "visible";
    fail.style.display = "block";
    mainHeader.style.display = "none";
}

function gameSuccess() {
    started = false;
    let audio = new Audio("game_win.mp3");
    audio.play();
    if (fail.style.display === "block") {
        return;
    }
    modal.style.visibility = "visible";
    success.style.display = "block";
    mainHeader.style.display = "none";
}

function gameStart() {}

floor.addEventListener("click", () => {
    if (!started) {
        return;
    }
    if (event.target.className === "carrot") {
        let audio = new Audio("carrot_pull.mp3");
        audio.play();
        event.target.remove();
        carrotCount--;
        counter.innerText = carrotCount;
    }

    if (event.target.className === "bug") {
        let audio = new Audio("bug_pull.mp3");
        audio.play();
        gameOut();
    }

    if (carrotCount === 0) {
        gameSuccess();
    }
});

replay.addEventListener("click", () => {
    history.go(0);
});

function firstTimer(time) {
    const second = time % 60;
    timer.innerText = second < 10 ? `00:0${second}` : `00:${second}`;
}

function startTimer() {
    firstTimer(time);
    setTime = setInterval(() => {
        time--;
        firstTimer(time);
        if (time < 0) {
            clearInterval(setTime);
            gameOut();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(setTime);
    setTime = null;
}

playButton.addEventListener("click", () => {
    started = true;
    let audio = new Audio("bg.mp3");
    audio.play();
    startTimer();

    addItem("carrot", carrotCount, "carrot/img/carrot.png");
    addItem("bug", bugCount, "carrot/img/bug.png");
    timer.style.visibility = "visible";
    counter.style.visibility = "visible";
    playButton.classList.toggle("offButton");
    stopButton.classList.toggle("off");
});

stopButton.addEventListener("click", () => {
    started = false;
    stopButton.classList.toggle("off");
    replayModal.style.visibility = "visible";
    pauseTimer();
});

replayButton.addEventListener("click", () => {
    /*타이머 재시작 */
    started = true;
    startTimer();
    replayModal.style.visibility = "hidden";
    stopButton.classList.toggle("off");
});

/* item 생성함수 */

function addItem(name, count, imgSrc) {
    counter.innerText = carrotCount;

    const x1 = 0;
    const y1 = 0;
    const x2 = floorSize.width - 80;
    const y2 = floorSize.height - 100;

    for (let i = 0; i < count; i++) {
        const itemImg = document.createElement("img");
        itemImg.setAttribute("class", name);
        itemImg.setAttribute("src", imgSrc);
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        itemImg.style.left = `${x}px`;
        itemImg.style.top = `${y}px`;
        floor.appendChild(itemImg);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
