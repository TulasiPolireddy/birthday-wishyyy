/* =========================
   PAGE NAVIGATION
========================= */

let currentPage = 1;

function nextPage() {

    const current = document.getElementById("page" + currentPage);

    if (current) {
        current.classList.remove("active");
    }

    currentPage++;

    const next = document.getElementById("page" + currentPage);

    if (next) {

        next.classList.add("active");

        /*
         * FIX:
         * Always move the new page back to the top.
         */
        next.scrollTop = 0;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }

    createSparkles();

    if (currentPage === 10) {
        createConfetti();
    }
}


/* =========================
   BACKGROUND EMOJIS
========================= */

function createFloatingHeart() {

    const container = document.getElementById("floatingContainer");

    if (!container) return;

    const emojis = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💓",
        "💞",
        "💋",
        "😘",
        "🥰",
        "✨",
        "🌸"
    ];

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerText =
        emojis[Math.floor(Math.random() * emojis.length)];

    /*
     * IMPORTANT:
     * Random position across the COMPLETE width.
     */
    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (14 + Math.random() * 24) + "px";

    const duration =
        5 + Math.random() * 6;

    heart.style.animationDuration =
        duration + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, (duration + 1) * 1000);
}


function createFloatingHearts() {

    /*
     * Create some immediately so the background
     * doesn't start empty.
     */
    for (let i = 0; i < 18; i++) {

        setTimeout(() => {
            createFloatingHeart();
        }, i * 200);

    }

    /*
     * Keep creating emojis continuously.
     */
    setInterval(() => {
        createFloatingHeart();
    }, 450);
}


/* =========================
   SPARKLES
========================= */

function createSparkles() {

    const emojis = ["✨", "💗", "💕", "❤️"];

    for (let i = 0; i < 8; i++) {

        const sparkle = document.createElement("div");

        sparkle.innerText =
            emojis[Math.floor(Math.random() * emojis.length)];

        sparkle.style.position = "fixed";
        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";

        sparkle.style.fontSize =
            (12 + Math.random() * 15) + "px";

        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "5";

        sparkle.style.animation =
            "heartbeat 1s ease forwards";

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}


/* =========================
   HEART GAME
========================= */

let heartAlreadyPicked = false;

function pickHeart(button) {

    if (heartAlreadyPicked) return;

    heartAlreadyPicked = true;

    button.classList.add("selected");

    const result =
        document.getElementById("heartResult");

    result.innerHTML =
        "You found it! ❤️ <br> Just like you found your way into my heart. 🥹";

    const next =
        document.getElementById("heartNext");

    next.classList.remove("hidden");

    const hearts =
        document.querySelectorAll(".game-heart");

    hearts.forEach(heart => {
        heart.disabled = true;
    });
}


/* =========================
   KISS DELIVERY
========================= */

function sendKiss() {

    const area =
        document.getElementById("kissArea");

    if (!area) return;

    const kiss =
        document.createElement("div");

    kiss.className = "kiss";

    kiss.innerText = "💋";

    kiss.style.left =
        (20 + Math.random() * 60) + "%";

    kiss.style.top =
        (40 + Math.random() * 30) + "%";

    area.appendChild(kiss);

    setTimeout(() => {
        kiss.remove();
    }, 1200);
}


/* =========================
   GIFT
========================= */

let giftOpened = false;

function openGift() {

    if (giftOpened) return;

    giftOpened = true;

    const gift =
        document.getElementById("gift");

    gift.classList.add("opened");

    const message =
        document.getElementById("giftMessage");

    message.innerHTML =
        "Surprise! 🎁❤️ <br> The actual gift is having me in your life. 😂";

    const next =
        document.getElementById("giftNext");

    next.classList.remove("hidden");
}


/* =========================
   CAKE
========================= */

let cakeBlown = false;

function blowCake() {

    if (cakeBlown) return;

    cakeBlown = true;

    const cake =
        document.getElementById("cake");

    cake.classList.add("blown");

    const message =
        document.getElementById("wishMessage");

    message.innerHTML =
        "Wish made! ✨❤️ <br> I hope every good thing finds you.";

    const next =
        document.getElementById("cakeNext");

    next.classList.remove("hidden");
}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const emojis = [
        "❤️",
        "💕",
        "✨",
        "🎉",
        "🥳",
        "💋",
        "🎂"
    ];

    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("div");

        confetti.className = "confetti";

        confetti.innerText =
            emojis[Math.floor(Math.random() * emojis.length)];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.fontSize =
            (14 + Math.random() * 20) + "px";

        confetti.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        confetti.style.animationDelay =
            Math.random() * 2 + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 8000);
    }
}


/* =========================
   START
========================= */

document.addEventListener("DOMContentLoaded", () => {

    createFloatingHearts();

    createSparkles();

});
