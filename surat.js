
const openButton = document.getElementById("openLetter");
const envelopeSection = document.getElementById("envelopeSection");
const letterContent = document.getElementById("letterContent");

let isOpening = false;

openButton.addEventListener("click", function () {

    if (isOpening) return;

    isOpening = true;
    openButton.disabled = true;

    // Animasi membuka amplop
    envelopeSection.classList.add("opening");

    // Menyembunyikan amplop
    setTimeout(function () {
        envelopeSection.classList.add("hide");
    }, 1800);

    // Menampilkan isi surat
    setTimeout(function () {

        envelopeSection.style.display = "none";
        letterContent.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        requestAnimationFrame(function () {
            letterContent.classList.add("show");
        });

        // Membuat tombol menuju galeri
        if (!document.getElementById("galleryButton")) {

            const nextButton = document.createElement("a");

            nextButton.id = "galleryButton";
            nextButton.textContent = "LANJUTKAN →";
            nextButton.href = "./galeri.html";
            nextButton.className = "continue-button";

            letterContent.appendChild(nextButton);
        }

    }, 2800);

});
