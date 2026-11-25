
const birthdayMusic = document.getElementById("birthdayMusic");

const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const replayButton = document.getElementById("replayButton");

const musicDisc = document.getElementById("musicDisc");
const visualizer = document.getElementById("visualizer");
const musicPlayer = document.getElementById("musicPlayer");

const currentLyric = document.getElementById("currentLyric");
const lyricsPage = document.getElementById("lyricsPage");
const continueButton = document.getElementById("continueButton");

// DAFTAR LIRIK DAN WAKTU
const lyrics = [
    { time: 0, text: "Musiknya sudah dimulai! ♡" },
    { time: 3, text: "Waktunya menikmati musik! 🎀" },
    { time: 6.5, text: "Jangan cuma duduk diam! 💃" },
    { time: 10, text: "Ayo ikut bergoyang! 😚" },
    { time: 13.5, text: "Semangat terus, Bubub! ✨" },
    { time: 17, text: "Nikmati setiap momennya! ♡" },
    { time: 20, text: "Goyang sedikit tidak apa-apa! 🥳" },
    { time: 23, text: "Nah, begitu dong! 💗" },
    { time: 26, text: "Yeay, musiknya hampir selesai! 🎉" }
];

// STATUS LIRIK
let previousLyricIndex = -1;

// MENJALANKAN ANIMASI
function startAnimation() {
    musicDisc.classList.add("playing");
    visualizer.classList.add("playing");
    musicPlayer.classList.add("playing");
}

// MENGHENTIKAN ANIMASI
function stopAnimation() {
    musicDisc.classList.remove("playing");
    visualizer.classList.remove("playing");
    musicPlayer.classList.remove("playing");
}

// MEMPERBARUI LIRIK
function updateLyrics() {
    const currentTime = birthdayMusic.currentTime;

    let activeIndex = 0;

    for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].time) {
            activeIndex = i;
        }
    }

    if (activeIndex !== previousLyricIndex) {
        previousLyricIndex = activeIndex;

        currentLyric.classList.remove("active");
        currentLyric.textContent = lyrics[activeIndex].text;

        lyricsPage.textContent =
            String(activeIndex + 1).padStart(2, "0") +
            " / " +
            String(lyrics.length).padStart(2, "0");

        void currentLyric.offsetWidth;
        currentLyric.classList.add("active");
    }
}

// TOMBOL PUTAR
playButton.addEventListener("click", async function () {
    try {
        await birthdayMusic.play();
    } catch (error) {
        alert("Musik belum bisa diputar. Periksa file tatitut.mp3, ya!");
    }
});

// TOMBOL JEDA
pauseButton.addEventListener("click", function () {
    birthdayMusic.pause();
});

// TOMBOL PUTAR ULANG
replayButton.addEventListener("click", async function () {
    birthdayMusic.currentTime = 0;

    previousLyricIndex = -1;

    continueButton.hidden = true;

    try {
        await birthdayMusic.play();
    } catch (error) {
        alert("Musik belum bisa diputar. Periksa file tatitut.mp3, ya!");
    }
});

// AUDIO MENGIKUTI WAKTU LAGU
birthdayMusic.addEventListener("timeupdate", updateLyrics);
birthdayMusic.addEventListener("seeked", updateLyrics);

// STATUS MUSIK
birthdayMusic.addEventListener("play", function () {
    startAnimation();
    continueButton.hidden = true;
});

birthdayMusic.addEventListener("pause", stopAnimation);

// KETIKA MUSIK SELESAI
birthdayMusic.addEventListener("ended", function () {
    stopAnimation();

    currentLyric.classList.remove("active");
    currentLyric.textContent = "YEAY! MUSIK SELESAI! ♡";

    lyricsPage.textContent = "SELESAI";

    continueButton.hidden = false;
});
