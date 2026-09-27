let currentScreen = 1;
const totalScreens = 9;

// Default Messages (Edit here to hardcode permanent messages)
const defaultData = {
  name: "Birthday Star",
  mainMsg: "I hope you know how much joy and warmth you bring into my life. Thank you for always being your genuine, adorable, and wonderful self. You deserve all the happiness the universe can offer! 🌸✨",
  secretMsg: "No matter where life takes us, you will always have a special place in my heart. Keep shining bright, chasing your dreams, and never lose that sweet smile. Happy Birthday once again! 💖🌟"
};

// Load Saved Data from URL Hash or LocalStorage
function loadSavedData() {
  let data = { ...defaultData };

  if (window.location.hash && window.location.hash.startsWith("#msg=")) {
    try {
      const encoded = window.location.hash.replace("#msg=", "");
      const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
      data = { ...data, ...decoded };
    } catch(e) {
      console.log("Could not decode hash", e);
    }
  } else if (localStorage.getItem("bday_custom_data")) {
    try {
      data = JSON.parse(localStorage.getItem("bday_custom_data"));
    } catch(e) {}
  }

  document.getElementById("display-name-1").innerText = data.name || "Birthday Star";
  document.getElementById("display-name-2").innerText = `To ${data.name || "the sweetest soul"} 💖`;
  document.getElementById("display-name-3").innerText = data.name || "Favorite Person";
  document.getElementById("display-bday-msg").innerText = data.mainMsg;
  document.getElementById("secret-letter-text").innerText = data.secretMsg;

  document.getElementById("inputName").value = data.name;
  document.getElementById("inputMainMsg").value = data.mainMsg;
  document.getElementById("inputSecretMsg").value = data.secretMsg;
}

// Modal Handlers
function openEditModal() {
  document.getElementById("editModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

function saveAndCopyLink() {
  const data = {
    name: document.getElementById("inputName").value.trim() || defaultData.name,
    mainMsg: document.getElementById("inputMainMsg").value.trim() || defaultData.mainMsg,
    secretMsg: document.getElementById("inputSecretMsg").value.trim() || defaultData.secretMsg
  };

  localStorage.setItem("bday_custom_data", JSON.stringify(data));
  const base64Str = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  const shareUrl = `${window.location.origin}${window.location.pathname}#msg=${base64Str}`;

  loadSavedData();
  closeEditModal();

  navigator.clipboard.writeText(shareUrl).then(() => {
    alert("🎉 Message Saved!\n\nYour custom shareable link has been copied to your clipboard! Send this link to the birthday person and they will see your message permanently.");
  }).catch(() => {
    alert("🎉 Message Saved locally!");
  });
}

// Background Floating Hearts
function createFloatingHearts() {
  const heartsBg = document.getElementById('hearts-bg');
  const symbols = ['💖', '💕', '💗', '💓', '✨', '🌸', '🧁', '🍬', '⭐', '🎈'];
  for (let i = 0; i < 28; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.animationDelay = (Math.random() * 6) + 's';
    heart.style.fontSize = (16 + Math.random() * 22) + 'px';
    heartsBg.appendChild(heart);
  }
}
createFloatingHearts();

// Web Audio API Synthesizer
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playChime(freq = 587.33) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.8);
}

function playPartyHorn() {
  [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => setTimeout(() => playChime(f), i * 90));
}

// Navigation
function showScreen(num) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${num}`);
  if (target) {
    target.classList.add('active');
    currentScreen = num;
  }
}

function nextScreen() {
  playChime(659.25);
  if (currentScreen < totalScreens) showScreen(currentScreen + 1);
}

function prevScreen() {
  playChime(440);
  if (currentScreen > 1) showScreen(currentScreen - 1);
}

function nextScreenWithConfetti() {
  playPartyHorn();
  firePartyPoppers();
  setTimeout(() => showScreen(2), 350);
}

function firePartyPoppers() {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };
  function fire(ratio, opts) {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio) });
  }
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

// -------------------------------------------------------------
// DUCK & RUNAWAY "YES" BUTTON LOGIC (SCREEN 5)
// -------------------------------------------------------------
let timerStarted = false;
let evasionActive = true;
let timerSeconds = 10;
let duckDelivered = false;

function dodgeYesButton(e) {
  if (e) e.preventDefault();
  if (!evasionActive) return;

  const btnYes = document.getElementById('btnYes');
  const gameArea = document.getElementById('gameArea');
  const hint = document.getElementById('love-game-hint');

  // Start the 10-second countdown on first attempt
  if (!timerStarted) {
    timerStarted = true;
    hint.innerHTML = `🏃💨 Catch it if you can! (<span id="duckCountdown">${timerSeconds}</span>s)`;

    const countdownInterval = setInterval(() => {
      timerSeconds--;
      const cdEl = document.getElementById('duckCountdown');
      if (cdEl) cdEl.innerText = timerSeconds;

      if (timerSeconds <= 0) {
        clearInterval(countdownInterval);
        triggerDuckDelivery();
      }
    }, 1000);
  }

  // Calculate random position inside gameArea
  const areaRect = gameArea.getBoundingClientRect();
  const btnRect = btnYes.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width - 20;
  const maxY = areaRect.height - btnRect.height - 20;

  const randomX = Math.max(10, Math.floor(Math.random() * maxX));
  const randomY = Math.max(10, Math.floor(Math.random() * maxY));

  btnYes.style.position = 'absolute';
  btnYes.style.left = `${randomX}px`;
  btnYes.style.top = `${randomY}px`;

  playChime(750);
}

function triggerDuckDelivery() {
  evasionActive = false;
  duckDelivered = true;

  const duck = document.getElementById('duckHelper');
  const btnYes = document.getElementById('btnYes');
  const hint = document.getElementById('love-game-hint');

  hint.innerHTML = "🦆 <strong>A little helper arrived!</strong>";

  // Position duck and move YES button to center
  duck.style.display = 'flex';
  duck.style.left = '20px';
  duck.style.bottom = '15px';

  // Smoothly move the YES button towards center/cursor
  btnYes.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  btnYes.style.left = '50%';
  btnYes.style.top = '50%';
  btnYes.style.transform = 'translate(-50%, -50%)';
  btnYes.classList.add('yes-delivered');

  playPartyHorn();
}

function handleYesClick() {
  if (evasionActive) return; // Prevent clicking while running away

  playPartyHorn();
  firePartyPoppers();

  document.getElementById('love-game-hint').innerHTML = "🥰 <strong>YAY! I KNEW IT! LOVE YOU TOO! 💖</strong>";
  document.getElementById('btn-after-love').style.display = 'inline-flex';
  document.getElementById('duckBubble').innerText = "Mission Accomplished! 🥳✨";
}

function handleNoClick() {
  alert("Hey! 'No' is not an option! 😝 Try pressing YES!");
  dodgeYesButton();
}

// Screen 6 Love Pills
function popTag(el) {
  el.classList.toggle('popped');
  playChime(880);
  confetti({ particleCount: 15, spread: 40, origin: { y: 0.6 } });
}

// Screen 7 Candles
let candlesBlown = false;
function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;
  document.querySelectorAll('.flame').forEach(f => f.classList.add('blown'));
  playPartyHorn();
  firePartyPoppers();
  document.getElementById('candle-text').innerHTML = "✨ <strong>WISH GRANTED!</strong> May all your dreams come true! ✨";
  document.getElementById('btn-after-candles').style.display = 'inline-flex';
}

// Screen 8 Envelope
function openEnvelope() {
  document.getElementById('env-icon').innerText = '💌';
  playPartyHorn();
  document.getElementById('secret-letter-text').style.display = 'block';
  document.getElementById('btn-final').style.display = 'inline-flex';
  confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
}

// Screen 9 Finale
function celebrateGrandFinale() {
  showScreen(9);
  playPartyHorn();
  const end = Date.now() + 5000;
  const interval = setInterval(() => {
    if (Date.now() > end) return clearInterval(interval);
    confetti({ particleCount: 40, startVelocity: 30, spread: 360, origin: { x: Math.random(), y: Math.random() - 0.2 } });
  }, 250);
}

// Replay
function replayAll() {
  candlesBlown = false;
  timerStarted = false;
  evasionActive = true;
  timerSeconds = 10;
  duckDelivered = false;

  const btnYes = document.getElementById('btnYes');
  btnYes.style.position = 'relative';
  btnYes.style.left = 'auto';
  btnYes.style.top = 'auto';
  btnYes.style.transform = 'none';
  btnYes.classList.remove('yes-delivered');

  document.getElementById('duckHelper').style.display = 'none';
  document.getElementById('love-game-hint').innerText = "Choose wisely... be 100% honest! 😉";
  document.querySelectorAll('.flame').forEach(f => f.classList.remove('blown'));
  document.getElementById('candle-text').innerHTML = "✨ Make a wish and tap the cake to blow out the flames! ✨";
  document.getElementById('btn-after-candles').style.display = 'none';
  document.getElementById('btn-after-love').style.display = 'none';
  document.getElementById('secret-letter-text').style.display = 'none';
  document.getElementById('btn-final').style.display = 'none';
  document.getElementById('env-icon').innerText = '✉️';

  showScreen(1);
}

// Init
loadSavedData();
