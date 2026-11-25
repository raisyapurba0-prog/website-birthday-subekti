
const photos = [
    {
        src: "assets/foto/foto1.jpg",
        caption: "Kece abis, nggak ada lawan."
    },
    {
        src: "assets/foto/foto2.jpg",
        caption: "Wih, cakep juga orang ini."
    },
    {
        src: "assets/foto/foto3.jpg",
        caption: "Ini mah juara."
    },
    {
        src: "assets/foto/foto4.jpg",
        caption: "Gantengnya nggak main-main."
    },
    {
        src: "assets/foto/foto5.jpg",
        caption: "Aura bintang utama."
    },
    {
        src: "assets/foto/foto6.jpg",
        caption: "Waduh, keren betul."
    },
    {
        src: "assets/foto/foto7.jpg",
        caption: "Paket lengkap, nih."
    },
    {
        src: "assets/foto/foto8.jpg",
        caption: "Senyumnya boleh juga."
    },
    {
        src: "assets/foto/foto9.jpg",
        caption: "Fix, salah satu favorit."
    },
    {
        src: "assets/foto/foto10.jpg",
        caption: "Penutup yang sangat meyakinkan. WKWK."
    }
];

const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const photoNumber = document.getElementById("photoNumber");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const progressFill = document.getElementById("progressFill");
const continueButton = document.getElementById("continueButton");

let currentPhoto = 0;
let transitionTimer;

function showPhoto(index) {

    const photo = photos[index];

    clearTimeout(transitionTimer);

    // Sembunyikan tombol lanjut selama belum di foto terakhir
    continueButton.hidden = true;

    galleryImage.style.opacity = "0";
    galleryImage.style.transform = "scale(0.97)";

    transitionTimer = setTimeout(function () {

        galleryImage.onload = function () {
            galleryImage.style.opacity = "1";
            galleryImage.style.transform = "scale(1)";
        };

        galleryImage.onerror = function () {
            galleryImage.style.opacity = "1";
            galleryImage.style.transform = "scale(1)";

            galleryCaption.textContent =
                "Foto belum ditemukan. Periksa nama dan lokasi file.";
        };

        galleryImage.src = photo.src;
        galleryImage.alt = `Foto Subekti nomor ${index + 1}`;

        galleryCaption.textContent = photo.caption;

        photoNumber.textContent =
            `${String(index + 1).padStart(2, "0")} / 10`;

        progressFill.style.width =
            `${((index + 1) / photos.length) * 100}%`;

        previousButton.disabled = index === 0;
        nextButton.disabled = index === photos.length - 1;

        // Tampilkan tombol lanjut pada foto ke-10
        if (index === photos.length - 1) {
            continueButton.hidden = false;
        }

    }, 350);
}

// FOTO SEBELUMNYA
previousButton.addEventListener("click", function () {

    if (currentPhoto > 0) {
        currentPhoto--;
        showPhoto(currentPhoto);
    }

});

// FOTO BERIKUTNYA
nextButton.addEventListener("click", function () {

    if (currentPhoto < photos.length - 1) {
        currentPhoto++;
        showPhoto(currentPhoto);
    }

});

// TOMBOL LANJUT KE MUSIK
continueButton.addEventListener("click", function () {
    window.location.href = "./musik.html";
});

// TAMPILKAN FOTO PERTAMA
showPhoto(currentPhoto);
