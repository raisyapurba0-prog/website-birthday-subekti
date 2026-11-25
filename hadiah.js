
const giftBox = document.getElementById("giftBox");
const openGift = document.getElementById("openGift");
const giftInstruction = document.getElementById("giftInstruction");

const coupon = document.getElementById("coupon");
const claimCoupon = document.getElementById("claimCoupon");

const confirmation = document.getElementById("confirmation");
const continueButton = document.getElementById("continueButton");

const formLink = "https://forms.gle/zK7DwyGyWo7pS3oa8";

let giftOpened = false;
let couponUsed = false;

// MEMBUKA KOTAK HADIAH
openGift.addEventListener("click", function () {

    if (giftOpened) return;

    giftOpened = true;

    giftBox.classList.add("opened");

    giftInstruction.textContent =
        "TADAAA! ADA SESUATU BUAT BUBUB! ♡";

    openGift.textContent = "KOTAK SUDAH DIBUKA ♡";
    openGift.disabled = true;

    // Menampilkan kupon setelah animasi kotak
    setTimeout(function () {
        coupon.classList.remove("hidden");
    }, 800);

});

// MENGGUNAKAN KUPON
claimCoupon.addEventListener("click", function () {

    if (couponUsed) return;

    couponUsed = true;

    // Membuka Google Form pilihan hadiah
    window.open(formLink, "_blank");

    // Menyembunyikan kupon
    coupon.classList.add("hidden");

    // Menampilkan konfirmasi
    confirmation.classList.remove("hidden");

    giftInstruction.textContent =
        "Hehehe, kuponnya sudah digunakan!";

});
