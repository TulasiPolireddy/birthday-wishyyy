/* =========================================
   BIRTHDAY WISH APP — THARUN ❤️
   ========================================= */

let currentPage = 1;
let kissCount = 0;


/* =========================================
   PAGE NAVIGATION
   ========================================= */

function nextPage() {

    // Remove current page
    const current = document.getElementById(`page${currentPage}`);

    if (current) {
        current.classList.remove("active");
    }

    // Move to next page
    currentPage++;

    // Page 6 was deleted, so skip it
    if (currentPage === 6) {
        currentPage = 7;
    }

    // Show next page
    const next = document.getElementById(`page${currentPage}`);

    if (next) {
        next.classList.add("active");
    }

    // Add sparkle effect
    createSparkles();

    // Confetti on final page
    if (currentPage === 11) {
        createConfetti();
    }
}


/* =========================================
   FLOATING HEARTS
   ========================================= */

function createFloatingHeart() {

    const container = document.querySelector(".floating-hearts");

    if (!container) return;

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const hearts = ["❤️", "💗", "💖", "💕", "💓"];

    heart.innerHTML =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    heart.style.fontSize =
        (12 + Math.random() * 20) + "px";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createFloatingHeart, 650);


/* =========================================
   SPARKLES
   ========================================= */

function createSparkles() {

    const container =
        document.querySelector(".sparkle-container");

    if (!container) return;

    for (let i = 0; i < 12; i++) {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.innerHTML = "✦";

        sparkle.style.left =
            Math.random() * 100 + "%";

        sparkle.style.top =
            Math.random() * 100 + "%";

        sparkle.style.animationDelay =
            Math.random() * 0.5 + "s";

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}


/* =========================================
   HEART MINI GAME
   ========================================= */

const messages = {

    1:
        "You found it! Apparently you have excellent boyfriend skills. 😂❤️",

    2:
        "Wrong one... but I'll allow it because you're cute. 😌💗",

    3:
        "You found the secret! The secret is... I love you. Obviously. 😂❤️"

};


function chooseHeart(choice) {

    const result =
        document.getElementById("heartResult");

    const nextButton =
        document.getElementById("heartNext");

    if (!result || !nextButton) return;

    result.innerHTML =
        messages[choice];

    nextButton.style.display =
        "inline-block";

    createSparkles();
}


/* =========================================
   KISS DELIVERY 💋
   ========================================= */

function sendKiss() {

    kissCount++;

    const count =
        document.getElementById("kissCount");

    if (count) {
        count.textContent = kissCount;
    }

    const button =
        document.getElementById("kissButton");

    if (!button) return;

    /*
       Kiss that pops directly above
       the button that was pressed
    */

    const kiss =
        document.createElement("div");

    kiss.className = "kiss-pop";

    kiss.innerHTML = "💋";

    button.parentElement.appendChild(kiss);


    /* Extra flying kisses */

    const area =
        document.getElementById("kissArea");

    if (area) {

        for (let i = 0; i < 3; i++) {

            const flyingKiss =
                document.createElement("div");

            flyingKiss.className =
                "kiss-fly";

            flyingKiss.innerHTML =
                Math.random() > 0.5
                    ? "💋"
                    : "❤️";

            flyingKiss.style.left =
                Math.random() * 90 + "%";

            flyingKiss.style.bottom =
                Math.random() * 30 + "px";

            flyingKiss.style.animationDelay =
                Math.random() * 0.2 + "s";

            area.appendChild(flyingKiss);

            setTimeout(() => {
                flyingKiss.remove();
            }, 2000);
        }
    }


    /* Remove main kiss */

    setTimeout(() => {
        kiss.remove();
    }, 1300);
}


/* =========================================
   GIFT BOX 🎁
   ========================================= */

let giftOpened = false;


function openGift() {

    if (giftOpened) return;

    giftOpened = true;

    const gift =
        document.querySelector(".gift");

    const message =
        document.getElementById("giftMessage");

    const giftButton =
        document.getElementById("giftButton");

    const nextButton =
        document.getElementById("giftNext");


    if (gift) {
        gift.classList.add("opened");
    }

    if (message) {

        message.innerHTML =
            "Surprise! 🎁 You thought I'd actually let your birthday pass without one? 😂❤️";
    }

    if (giftButton) {
        giftButton.style.display = "none";
    }

    if (nextButton) {
        nextButton.style.display = "inline-block";
    }

    createConfetti();
}


/* =========================================
   BIRTHDAY CAKE 🎂
   ========================================= */

let candlesBlown = false;


function blowCandles() {

    if (candlesBlown) return;

    candlesBlown = true;


    const flames =
        document.querySelectorAll(".flame");

    flames.forEach(flame => {

        flame.style.opacity = "0";

        flame.style.transform =
            "scale(0)";

    });


    const wish =
        document.getElementById("wishMessage");

    if (wish) {

        wish.innerHTML =
            "Make your biggest wish... ✨ And yes, I hope I am part of it. 😂❤️";
    }


    const nextButton =
        document.getElementById("cakeNext");

    if (nextButton) {
        nextButton.style.display = "inline-block";
    }

    createConfetti();
}


/* =========================================
   CONFETTI 🎉
   ========================================= */

function createConfetti() {

    const pieces = 80;

    for (let i = 0; i < pieces; i++) {

        const confetti =
            document.createElement("div");

        confetti.className =
            "confetti";

        confetti.innerHTML =
            Math.random() > 0.5
                ? "❤️"
                : "✦";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        confetti.style.animationDelay =
            Math.random() * 0.5 + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}


/* =========================================
   MUSIC BUTTON 🎵
   ========================================= */

function toggleMusic() {

    const button =
        document.getElementById("musicButton");

    if (!button) return;

    if (button.innerHTML.includes("🎵")) {

        button.innerHTML = "🔊";

    } else {

        button.innerHTML = "🎵";
    }
}


/* =========================================
   RESTART APP 🔄
   ========================================= */

function restartApp() {

    /* Reset page */

    document.querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    currentPage = 1;

    const firstPage =
        document.getElementById("page1");

    if (firstPage) {
        firstPage.classList.add("active");
    }


    /* Reset kisses */

    kissCount = 0;

    const kissCounter =
        document.getElementById("kissCount");

    if (kissCounter) {
        kissCounter.textContent = "0";
    }


    /* Reset gift */

    giftOpened = false;

    const gift =
        document.querySelector(".gift");

    if (gift) {
        gift.classList.remove("opened");
    }


    const giftMessage =
        document.getElementById("giftMessage");

    if (giftMessage) {

        giftMessage.innerHTML =
            "Go on... click the suspiciously cute box. 😂";
    }


    const giftButton =
        document.getElementById("giftButton");

    const giftNext =
        document.getElementById("giftNext");

    if (giftButton) {
        giftButton.style.display = "inline-block";
    }

    if (giftNext) {
        giftNext.style.display = "none";
    }


    /* Reset candles */

    candlesBlown = false;

    document.querySelectorAll(".flame")
        .forEach(flame => {

            flame.style.opacity = "1";

            flame.style.transform =
                "scale(1)";

        });


    const wish =
        document.getElementById("wishMessage");

    if (wish) {
        wish.innerHTML = "";
    }


    const cakeNext =
        document.getElementById("cakeNext");

    if (cakeNext) {
        cakeNext.style.display = "none";
    }


    /* Reset heart game */

    const heartResult =
        document.getElementById("heartResult");

    const heartNext =
        document.getElementById("heartNext");

    if (heartResult) {
        heartResult.innerHTML = "";
    }

    if (heartNext) {
        heartNext.style.display = "none";
    }


    createSparkles();
}


/* =========================================
   INITIAL EFFECT
   ========================================= */

window.addEventListener("load", () => {

    createSparkles();

});
