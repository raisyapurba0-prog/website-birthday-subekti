
const passwordInput = document.getElementById("password");
const enterButton = document.getElementById("enterButton");
const errorMessage = document.getElementById("errorMessage");

function checkPassword() {
    const password = passwordInput.value.trim();

    if (password === "271106") {
        errorMessage.textContent = "";

   window.location.href = "kejutan.html";

    } else {
        errorMessage.textContent = "Sandi belum tepat. Coba lagi, ya.";

        passwordInput.value = "";
        passwordInput.focus();
    }
}

enterButton.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

// MEMBUAT PARTIKEL CAHAYA EMAS
const particleContainer = document.querySelector(".particles");

if (particleContainer) {
    for (let i = 0; i < 38; i++) {
        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";
        particle.style.setProperty("--size", (Math.random() * 3 + 1) + "px");
        particle.style.setProperty("--duration", (Math.random() * 10 + 8) + "s");
        particle.style.setProperty("--delay", (-Math.random() * 18) + "s");
        particle.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
        particle.style.setProperty("--opacity", (Math.random() * 0.5 + 0.3));

        particleContainer.appendChild(particle);
    }
}
