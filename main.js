// HTML DAGI CLASSLARNI, JS DA YASAB OLYAPMIZ
const elForm = document.querySelector(".test-form");
const elQuestionText = document.querySelector(".question-text");
const elQuestionList = document.querySelector(".question-list");
const elTestLevel = document.querySelector(".test-level");
const elTestTime = document.querySelector(".test-time");

const user = {
    trueAnswer: 0,
    falseAnswer: 5,
    ball: 0,
}

let elTestLevelValue;

let testLevel;

let index = 0;
// HTMLDAGI CLASSLARGA TEXT ELEMENT BERISH UCHUN JS GA CHAQIRIB OLYAPMIZ
const elUserLevel = document.querySelector(".user-level-js");
const elUserMinut = document.querySelector(".user-minut-js");
let elUserTrue = document.querySelector(".user-true-js");
let elUserFalse = document.querySelector(".user-false-js");
let elUserAllask = document.querySelector(".user-allask-js");
let elUserBall = document.querySelector(".user-ball-js");

// CANVAS MODAL
let elCanvas = document.querySelector(".canvas");

// MP3 AUDIO BERISH UCHUN YASAB OLYAPMIZ
ringtoneTrue = new Audio("./mp4/true.mp3");
ringtoneFalse = new Audio("./mp4/false.mp3");
ringtoneStart = new Audio("./mp4/bismillah.mp3");
gameWin = new Audio("./mp4/gamewin.mp3");
gameOver = new Audio("./mp4/gameoverr.mp3");


// FUNKSIYA NI VAQT BERISH UCHUN  OCHYAPMIZ
let timerText = document.querySelector(".timer-js");
let timer;
const initTimer = (maxTime) => {
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            let sec = "0" + maxTime % 60;
            timerText.textContent = `${Math.floor(maxTime / 60)}: ${maxTime % 60 > 9 ? maxTime % 60 : sec}`;
        } else {
            elCanvas.innerHTML = `
            <video class="video" src="./mp4/gameover.mp4" autoplay loop></video>
            ${gameOver.play()}
            <div class="d-flex justify-content-between align-items-center reset-box">
              <div>
                <p>Score: ${user.ball}</p>
                <p>Amount chance: ${user.falseAnswer}</p>
                <p>Time is out!</p>
              </div>
              <button class="reset-btn">
                <img class="reset-img" src="./images/refresh.svg" width="50" height="50" alt="">
              </button>
            </div>`;
            resetBtn = document.querySelector(".reset-btn");
            resetBtn.addEventListener("click", function () {
                location.reload();
            })
        }
    }, 1000)
}

// FUNCTION SHUFFLE
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// FUNCTION JS FILE DAN JS GA CHAQIRIB HTML ELEMENT YASAB OLYAPMIZ (LI,IMG)
function renderAnswers(array, wrapper) {
    wrapper.innerHTML = ""
    array.forEach(element => {
        const elItem = document.createElement("li");
        elItem.classList.add("mb-4", "question-item");
        const elImg = document.createElement("img");
        elImg.classList.add("question-img");
        elImg.style.visibility = ("visible");
        elImg.src = element.symbol_img;
        elItem.appendChild(elImg);
        elQuestionList.appendChild(elItem);
    });
}

// FUNCTION SAVOLLARNI RANDOM QILISH UCHUN OCHYAPMIZ
function renderQuestions(level) {
    elQuestionText.textContent = `${level[Math.floor(Math.random() * level.length)].symbol_title}`;
}

// FUNCTION NECHTA TEST KELISHI VA TESTLEVELGA O'SHANCHA TESTLARNI JOYLASH 
function testArray(number) {
    let array = [];
    for (let i = 0; i < number; i++) {
        array[i] = roadSymbols[i];
    }
    return array;
}

// FUNCTION  QIYMATLARNI TEXT ELEMENT ORQALI WINDOWGA CHIQARISH CHIQARISH
function renderTextWindow() {
    elUserAllask.textContent = `You have chosen test: ${testLevel.length}`;
    elUserMinut.textContent = `Test time: ${elTestTime.value / 60} minut`;
    elUserTrue.textContent = user.trueAnswer;
    elUserFalse.textContent = user.falseAnswer;
    elUserBall.textContent = user.ball;
}
// FUNCTION FORMNI ESHITISH HODISASI
elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    ringtoneStart.play();

    testLevel = testArray(Number(elTestLevel.value));

    renderQuestions(testLevel);
    renderTextWindow();

    renderAnswers(shuffle(testLevel), elQuestionList);

    initTimer(elTestTime.value);
})

let resetBtn;
let score;
let falseImgArray = [];


// FUNCTION LISTNI ESHITISH HODISASI
elQuestionList.addEventListener("click", function (evt) {
    let temp;
    //IMGNI BOSILGANDAGI HOLATI
    if (evt.target.matches(".question-img")) {
        for (let j = 0; j < testLevel.length; j++) {
            let src = testLevel[j].symbol_img.substring(1);
            if (evt.target.src.endsWith(src) && elQuestionText.textContent == testLevel[j].symbol_title) {
                temp = j;
                break;
            }
        }
        // TRUE HOLATI
        if (temp != null) {
            falseImgArray = [];
            setTimeout(() => {
                evt.target.style.visibility = ("hidden");
            }, 2000);

            evt.target.src = "./images/checkmark.gif";
            testLevel.splice(temp, 1);
            elUserTrue.textContent = ++user.trueAnswer;
            user.ball = user.ball + 2;
            elUserBall.textContent = user.ball;
            ringtoneTrue.play();
            if (testLevel.length != 0) {
                renderQuestions(testLevel);
            }
        }
        // FALSE HOLATI 
        else {
            setTimeout(() => {
                evt.target.style.mixBlendMode = "normal";
            }, 2000);
            evt.target.style.mixBlendMode = "hue";

            ringtoneFalse.play();
            if (falseImgArray.size != 0 && checkFalse(evt.target.src));
            else {
                elUserFalse.textContent = --user.falseAnswer;
                elUserBall.textContent = --user.ball;
                falseImgArray.push(evt.target.src);
            }

            if (user.falseAnswer == 0) {
                elCanvas.innerHTML = `
                <video class="video" src="./mp4/gameover.mp4" autoplay loop></video>
                ${gameOver.play()}
                <div class="d-flex justify-content-between align-items-center reset-box">
                    <div>
                        <p>Score: ${user.ball}</p>
                        <p>Amount chance: ${user.falseAnswer}</p>
                    </div>
                    <button class="reset-btn">
                        <img class="reset-img" src="./images/refresh.svg" width="50" height="50" alt="">
                    </button>
                </div>`;
                resetBtn = document.querySelector(".reset-btn");
                resetBtn.addEventListener("click", function () {
                    location.reload();
                })
            }
        }
        // O'YIN TUGAGAN HOLATI
        if (testLevel.length == 0) {
            elCanvas.innerHTML = `
            <video class="video" src="./mp4/win.mp4" autoplay loop></video>
            ${gameWin.play()}
            <div class="d-flex justify-content-between align-items-center reset-box">
                <div>
                    <p>Score: ${user.ball}</p>
                    <p>Amount chance: ${user.falseAnswer}</p>
                </div>
                <button class="reset-btn">
                    <img class="reset-img" src="./images/refresh.svg" width="50" height="50" alt="">
                </button>
            </div>`;
            resetBtn = document.querySelector(".reset-btn");
            resetBtn.addEventListener("click", function () {
                location.reload();
            })
        }
    }
})

function checkFalse(img) {
    for (let i = 0; i < falseImgArray.length; i++) {
        if (falseImgArray[i] == img) {
            return true;
        }
    }
    return false;
}