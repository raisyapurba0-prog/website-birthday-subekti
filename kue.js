
const flameTwo = document.getElementById("flameTwo");
const flameZero = document.getElementById("flameZero");

const blowButton = document.getElementById("blowButton");
const instruction = document.getElementById("instruction");

const wishMessage = document.getElementById("wishMessage");
const continueButton = document.getElementById("continueButton");

let candleBlown = false;

function blowCandle() {

    // Mencegah tombol ditekan berkali-kali
    if (candleBlown) return;

    candleBlown = true;

    // Memadamkan kedua api lilin
    flameTwo.classList.add("off");
    flameZero.classList.add("off");

    // Mengubah instruksi
    instruction.textContent =
        "Yeay! Semoga semua harapan baik menjadi kenyataan! ✨";

    // Mengubah tombol tiup lilin
    blowButton.innerHTML = "HARAPAN TERKIRIM ♡";
    blowButton.disabled = true;

    // Menampilkan pesan ulang tahun
    setTimeout(function () {

        wishMessage.classList.add("show");

        // Menampilkan tombol menuju halaman hadiah
        setTimeout(function () {
            continueButton.hidden = false;
        }, 1200);

    }, 800);
}

// Menjalankan fungsi saat tombol ditekan
blowButton.addEventListener("click", blowCandle);
