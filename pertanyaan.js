
const questionButton = document.getElementById("questionButton");
const continueButton = document.getElementById("continueButton");

const formLink = "https://forms.gle/5jpRkzg7va19Jv8s7";

let formOpened = false;

questionButton.addEventListener("click", function () {

    if (formOpened) return;

    const newTab = window.open(formLink, "_blank");

    if (newTab) {
        formOpened = true;

        questionButton.textContent = "PERTANYAAN SUDAH DIBUKA ♡";
        questionButton.disabled = true;

        continueButton.hidden = false;
    } else {
        alert("Izinkan pop-up agar Google Form bisa dibuka, ya!");
    }

});
