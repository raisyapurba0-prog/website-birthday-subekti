
const gameArena = document.getElementById("gameArena");
const gameStart = document.getElementById("gameStart");
const startButton = document.getElementById("startButton");

const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const messageBox = document.getElementById("messageBox");

const gameResult = document.getElementById("gameResult");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const continueButton = document.getElementById("continueButton");

let score = 0;
let timeLeft = 40;
let gameRunning = false;

let timerInterval;
let balloonInterval;
let activeBalloons = [];

const balloonMessages = {
    pink: [
        "IHHH, KOK DIPECAH SIH? MANIS-MANIS GINI LOH! 🎀",
        "CUP CUP, PELAN-PELAN DONG, TUAN!",
        "ADUH, GALAK BANGET. KANGEN LIKA, YA? WKWK!",
        "IHHH, JANGAN NAKAL-NAKAL DONG! 💗",
        "KOK GEMAS BANGET SIH, SAMPAI BALONNYA IKUT DIINCAR!"
    ],

    gold: [
        "EAAA, ANAK EMASNYA LIKA DAPAT BONUS!",
        "WUIHH, HOKI BANGET SIH TUAN SATU INI!",
        "BOLEH SOMBONG, HARI INI LAGI BERUNTUNG!",
        "CIEE, DAPAT HADIAH KHUSUS NIH! 👑",
        "WADUH, BINTANG KEBERUNTUNGAN LAGI BERPIHAK!"
    ],

    purple: [
        "KOK DARI TADI NYARIIN LIKA TERUS? 🤭",
        "HEHE, KETAHUAN DEH LAGI SENANG!",
        "SATU LAGI DONG, MASA UDAHAN? ♡",
        "IHHH, KOK MAKIN SEMANGAT SIH?",
        "JANGAN LUPA SENYUM DULU, TUAN! 💜"
    ]
};

const balloonTypes = [
    { type: "pink", color: "pink", points: 10 },
    { type: "gold", color: "gold", points: 30 },
    { type: "purple", color: "purple", points: 20 }
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateScore(points) {
    score += points;
    scoreDisplay.textContent = score;
}

function createBalloon() {
    if (!gameRunning) return;

    const data = randomItem(balloonTypes);
    const balloon = document.createElement("button");

    balloon.type = "button";
    balloon.className = `balloon ${data.color}`;
    balloon.setAttribute("aria-label", `Balon ${data.color}`);

    const maxLeft = Math.max(0, gameArena.clientWidth - 75);

    balloon.style.left = `${Math.random() * maxLeft}px`;
    balloon.style.bottom = "-100px";

    balloon.innerHTML = `
        <span class="balloon-shine"></span>
        <span class="balloon-string"></span>
    `;

    gameArena.appendChild(balloon);
    activeBalloons.push(balloon);

    const duration = 5500 + Math.random() * 2000;

    const animation = balloon.animate(
        [
            { transform: "translateY(0) rotate(-8deg)" },
            { transform: "translateY(-550px) rotate(8deg)" }
        ],
        {
            duration: duration,
            easing: "linear",
            fill: "forwards"
        }
    );

    balloon.addEventListener("click", function () {
        if (!gameRunning || balloon.dataset.popped) return;

        balloon.dataset.popped = "true";

        updateScore(data.points);

        const message = randomItem(balloonMessages[data.type]);
        messageBox.textContent = message;

        balloon.classList.add("popped");
        animation.cancel();

        setTimeout(function () {
            balloon.remove();
            activeBalloons = activeBalloons.filter(
                item => item !== balloon
            );
        }, 180);
    });

    animation.onfinish = function () {
        balloon.remove();

        activeBalloons = activeBalloons.filter(
            item => item !== balloon
        );
    };
}

function startGame() {
    if (gameRunning) return;

    score = 0;
    timeLeft = 40;
    gameRunning = true;

    scoreDisplay.textContent = "0";
    timerDisplay.textContent = "40";

    messageBox.textContent = "AYOOO, PECAHKAN SEMUANYA! 🎈";

    gameStart.classList.add("hidden");
    gameResult.classList.add("hidden");

    activeBalloons.forEach(balloon => balloon.remove());
    activeBalloons = [];

    createBalloon();

    balloonInterval = setInterval(createBalloon, 650);

    timerInterval = setInterval(function () {
        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameRunning = false;

    clearInterval(timerInterval);
    clearInterval(balloonInterval);

    activeBalloons.forEach(balloon => balloon.remove());
    activeBalloons = [];

    finalScore.textContent = score;

    if (score >= 500) {
        resultMessage.textContent =
            "WADUHH! JAGO BANGET! LIKA SAMPAI KEHABISAN BALON! 👑";
    } else if (score >= 250) {
        resultMessage.textContent =
            "HEBATTT! Ternyata Bubub jago juga, ya! WKWKWK 💗";
    } else {
        resultMessage.textContent =
            "HEHE, YANG PENTING SUDAH IKUT MAIN! GEMAS DEH! 🎀";
    }

    gameResult.classList.remove("hidden");
    messageBox.textContent = "WAKTUNYA HABIS! ♡";
}

function continueGame() {
    window.location.href = "./penutup.html";
}

startButton.addEventListener("click", startGame);
continueButton.addEventListener("click", continueGame);
