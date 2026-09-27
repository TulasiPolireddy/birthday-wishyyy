/* ================= PAGE NAVIGATION ================= */

let currentPage = 1;

function nextPage() {

    const current = document.getElementById(`page${currentPage}`);

    current.classList.remove("active");

    currentPage++;

    const next = document.getElementById(`page${currentPage}`);

    if (next) {
        next.classList.add("active");
    }

}


/* ================= FLOATING HEARTS ================= */

const heartContainer = document.querySelector(".floating-hearts");

const hearts = ["❤️", "💕", "💗", "💖", "💋"];

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 5 + 5 + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 700);


/* ================= KISS BUTTON ================= */

let kissCount = 0;

function sendKiss() {

    kissCount++;

    document.getElementById("kissCount").textContent = kissCount;

    const kiss = document.createElement("div");

    kiss.className = "kiss";

    kiss.innerHTML = "💋";

    kiss.style.left =
        Math.random() * 90 + "%";

    document.getElementById("kissArea").appendChild(kiss);

    setTimeout(() => {
        kiss.remove();
    }, 1500);

}


/* ================= GIFT ================= */

let giftOpened = false;

function openGift() {

    if (giftOpened) return;

    giftOpened = true;

    const gift = document.querySelector(".gift");

    gift.classList.add("open");

    document.getElementById("giftMessage").innerHTML =
        "Surprise! 🎁 Your actual gift is having me in your life. You're welcome. 😂❤️";

    document.getElementById("giftButton").innerHTML =
        "That was the gift 😌❤️";

}


/* ================= CAKE ================= */

function blowCandles() {

    const flames = document.querySelectorAll(".flame");

    flames.forEach(flame => {
        flame.classList.add("off");
    });

    document.getElementById("wishMessage").innerHTML =
        "✨ Wish made! I hope every beautiful thing you're wishing for finds its way to you. ❤️";

    createConfetti();

}


/* ================= CONFETTI ================= */

function createConfetti() {

    const symbols = ["✨", "❤️", "🎉", "💕", "💋", "🥳"];

    for (let i = 0; i < 60; i++) {

        const confetti = document.createElement("div");

        confetti.innerHTML =
            symbols[Math.floor(Math.random() * symbols.length)];

        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-30px";

        confetti.style.fontSize =
            Math.random() * 20 + 15 + "px";

        confetti.style.zIndex = "100";

        confetti.style.transition =
            "transform 3s ease, opacity 3s ease";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.style.transform =
                `translateY(110vh) rotate(${Math.random() * 720}deg)`;

            confetti.style.opacity = "0";

        }, 50);

        setTimeout(() => {
            confetti.remove();
        }, 3200);

    }

}


/* ================= RESTART ================= */

function restartApp() {

    document
        .getElementById(`page${currentPage}`)
        .classList.remove("active");

    currentPage = 1;

    document
        .getElementById("page1")
        .classList.add("active");

    kissCount = 0;

    document.getElementById("kissCount").textContent = "0";

}
