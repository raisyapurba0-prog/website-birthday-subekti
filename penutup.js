
const starsContainer = document.getElementById("stars");

const starSymbols = ["✦", "✧", "⋆", "♡", "·"];

function createStars() {
    for (let i = 0; i < 45; i++) {
        const star = document.createElement("span");

        star.className = "star";
        star.textContent = starSymbols[
            Math.floor(Math.random() * starSymbols.length)
        ];

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.fontSize =
            (Math.random() * 12 + 7) + "px";

        star.style.animationDelay =
            (Math.random() * 4) + "s";

        star.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        starsContainer.appendChild(star);
    }
}

createStars();
