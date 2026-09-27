/* =========================================
   PAGE NAVIGATION
========================================= */

let currentPage = 1;

function nextPage() {

    const current = document.getElementById(
        `page${currentPage}`
    );

    current.classList.remove("active");

    currentPage++;

    const next = document.getElementById(
        `page${currentPage}`
    );

    if (next) {

        next.classList.add("active");

        createSparkles();

        if (currentPage === 11) {
            createConfetti();
        }
    }
}


/* =========================================
   FLOATING HEARTS
========================================= */

const heartContainer =
    document.querySelector(".floating-hearts");

const heartSymbols = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💓",
    "💞",
    "💋"
];

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    heart.innerHTML =
        heartSymbols[
            Math.floor(
                Math.random() *
                heartSymbols.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 5 + 5 + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 650);


/* =========================================
   SPARKLES
========================================= */

function createSparkles() {

    const container =
        document.querySelector(".sparkle-container");

    for (let i = 0; i < 25; i++) {

        const sparkle =
            document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.innerHTML = "✦";

        sparkle.style.left =
            Math.random() * 100 + "%";

        sparkle.style.top =
            Math.random() * 100 + "%";

        sparkle.style.fontSize =
            Math.random() * 15 + 8 + "px";

        sparkle.style.color =
            "#ffd5e3";

        sparkle.style.animationDelay =
            Math.random() * .8 + "s";

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
}


/* =========================================
   HEART GAME
========================================= */

let heartGameFinished = false;

function chooseHeart(choice) {

    if (heartGameFinished) return;

    heartGameFinished = true;

    const result =
        document.getElementById("heartResult");

    const messages = {

        1:
            "You found it! Apparently you have excellent boyfriend skills. 😂❤️",

        2:
            "Wrong one... but I'll allow it because you're cute. 😌💗",

        3:
            "You found the secret! The secret is... I love you. Obviously. 😂❤️"
    };

    result.innerHTML =
        messages[choice];

    document.getElementById(
        "heartNext"
    ).style.display = "inline-block";

    createSparkles();
}


/* =========================================
   KISS SERVICE
========================================= */

let kissCount = 0;

function sendKiss() {

    kissCount++;

    document.getElementById(
        "kissCount"
    ).textContent = kissCount;


    /*
       MAIN KISS:
       This appears immediately ABOVE
       the button that was pressed.
    */

    const button =
        document.getElementById("kissButton");

    const kiss =
        document.createElement("div");

    kiss.className = "kiss-pop";

    kiss.innerHTML = "💋";

    button.parentElement.appendChild(kiss);


    /*
       Extra kisses fly around the screen
    */

    const area =
        document.getElementById("kissArea");

    for (let i = 0; i < 3; i++) {

        const flyingKiss =
            document.createElement("div");

        flyingKiss.className =
            "kiss-fly";

        flyingKiss.innerHTML =
            Math.random() > .5
                ? "💋"
                : "❤️";

        flyingKiss.style.left =
            Math.random() * 90 + "%";

        flyingKiss.style.bottom =
            Math.random() * 30 + "px";

        flyingKiss.style.animationDelay =
            Math.random() * .2 + "s";

        area.appendChild(flyingKiss);

        setTimeout(() => {
            flyingKiss.remove();
        }, 2000);
    }


    /*
       Remove the main kiss after animation
    */

    setTimeout(() => {
        kiss.remove();
    }, 1300);

}


/* =========================================
   GIFT
========================================= */

let giftOpened = false;

function openGift() {

    if (giftOpened) return;

    giftOpened = true;

    const gift =
        document.querySelector(".gift");

    gift.classList.add("open");

    document.getElementById(
        "giftMessage"
    ).innerHTML =
        "Surprise! 🎁 Your actual gift is having me in your life. You're welcome. 😂❤️";

    document.getElementById(
        "giftButton"
    ).innerHTML =
        "Gift successfully stolen 😌";

    document.getElementById(
        "giftNext"
    ).style.display =
        "inline-block";

    createConfetti();
}


/* =========================================
   CAKE
========================================= */

let candlesBlown = false;

function blowCandles() {

    if (candlesBlown) return;

    candlesBlown = true;

    const flames =
        document.querySelectorAll(".flame");

    flames.forEach(flame => {
        flame.classList.add("off");
    });

    document.getElementById(
        "wishMessage"
    ).innerHTML =
        "✨ Wish made! May every beautiful thing you're hoping for find its way to you. ❤️";

    document.getElementById(
        "cakeNext"
    ).style.display =
        "inline-block";

    createConfetti();
}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols = [
        "✨",
        "❤️",
        "🎉",
        "💕",
        "💋",
        "🥳",
        "🎊"
    ];

    for (let i = 0; i < 70; i++) {

        const confetti =
            document.createElement("div");

        confetti.innerHTML =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        confetti.style.position =
            "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-30px";

        confetti.style.fontSize =
            Math.random() * 20 + 14 + "px";

        confetti.style.zIndex = "300";

        confetti.style.transition =
            "transform 3s ease, opacity 3s ease";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.style.transform =
                `translateY(110vh)
                 rotate(${Math.random() * 720}deg)`;

            confetti.style.opacity = "0";

        }, 50);

        setTimeout(() => {
            confetti.remove();
        }, 3300);
    }
}


/* =========================================
   MUSIC
========================================= */

let musicPlaying = false;

function toggleMusic() {

    const button =
        document.getElementById(
            "musicButton"
        );

    /*
       Music isn't automatically included because
       GitHub cannot magically provide a song file.

       If you later add your own MP3, you can connect
       it here.
    */

    musicPlaying = !musicPlaying;

    button.innerHTML =
        musicPlaying
            ? "🔊"
            : "🎵";
}


/* =========================================
   RESTART
========================================= */

function restartApp() {

    const current =
        document.getElementById(
            `page${currentPage}`
        );

    current.classList.remove("active");

    currentPage = 1;

    document.getElementById(
        "page1"
    ).classList.add("active");


    /*
       Reset kiss counter
    */

    kissCount = 0;

    document.getElementById(
        "kissCount"
    ).textContent = "0";


    /*
       Reset gift
    */

    giftOpened = false;

    const gift =
        document.querySelector(".gift");

    if (gift) {
        gift.classList.remove("open");
    }


    /*
       Reset cake
    */

    candlesBlown = false;

    document.querySelectorAll(
        ".flame"
    ).forEach(flame => {

        flame.classList.remove("off");

    });


    document.getElementById(
        "wishMessage"
    ).innerHTML = "";

    document.getElementById(
        "cakeNext"
    ).style.display = "none";


    /*
       Reset heart game
    */

    heartGameFinished = false;

    document.getElementById(
        "heartResult"
    ).innerHTML = "";

    document.getElementById(
        "heartNext"
    ).style.display = "none";

}
