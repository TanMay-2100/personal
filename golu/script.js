const bgMusic = new Audio("song.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.7;
bgMusic.muted = true;
const totalTime = 24000;


// STEP 1: KEEP INTRO VISIBLE
setTimeout(() => {
  document.getElementById("intro").style.opacity = "1";
}, totalTime);

// STEP 2: UNBLUR IMAGES
document.querySelectorAll(".bg").forEach((img, index) => {
  setTimeout(() => {
    img.classList.add("clear");
  }, (index + 1) * 6000);
});

// STEP 3: HEART GROW
setTimeout(() => {
  const heart = document.getElementById("mainHeart");
  heart.classList.add("big-heart");
  showPopup();
}, totalTime + 2000);

// POPUP
function showPopup() {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = "Click the heart 💖";
  document.body.appendChild(popup);
}

// STEP 4: CLICK HEART
document.addEventListener("click", function(e) {
  if (e.target.id === "mainHeart") {
    startCandleScene();
  }
});

// STEP 5: CANDLE SCENE (FIXED)
function startCandleScene() {
  document.body.innerHTML = `
    <div class="candle-screen">
      <h1>Blow the candle 🕯️</h1>
      <div id="count">3</div>

      <div class="candle-wrap">
        <div class="candle">
          <div class="flame"></div>
        </div>
      </div>
    </div>
  `;

  let count = 3;

  const timer = setInterval(() => {
    count--;
    document.getElementById("count").innerText = count;

    if (count === 0) {
      clearInterval(timer);

      // ✅ FIX: safely hide flame
      const flame = document.querySelector(".flame");
      if (flame) flame.style.display = "none";

      setTimeout(showCake, 1500);
    }
  }, 1000);
}

// 🎉 HEART BURST
function burstHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = "20px";

    heart.style.transform = `translate(${Math.random()*400-200}px, ${Math.random()*400-200}px)`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

// STEP 6: CAKE SCREEN
function showCake() {
  document.body.innerHTML = `
    <div class="cake-screen">

      <h1 class="cake-title">Happy Birthday GOLU 💖</h1>

      <div class="cake-container">

        <!-- REAL CAKE IMAGE -->
        <div class="cake-wrapper" id="cake">
          <img src="cake.jpeg" class="cake-img" id="cakeImg">

          <!-- SLICE OVERLAY -->
          <div class="slice-overlay" id="slice"></div>
        </div>

      </div>

      <p class="cut-msg">Hold mouse & move to cut 🎂</p>

    </div>
  `;

  enableKnifeCut();
}

// STEP 7: FIXED KNIFE CUT
function enableKnifeCut() {
  let isCutting = false;
  let cutDone = false;

  const cake = document.getElementById("cake");
  const slice = document.getElementById("slice");

  document.onmousedown = () => isCutting = true;
  document.onmouseup = () => isCutting = false;

  document.onmousemove = (e) => {

    // knife cursor
    const knife = document.createElement("div");
    knife.className = "knife";
    knife.style.left = e.clientX + "px";
    knife.style.top = e.clientY + "px";
    document.body.appendChild(knife);
    setTimeout(() => knife.remove(), 80);

    if (!isCutting || cutDone) return;

    const rect = cake.getBoundingClientRect();

    if (
      e.clientX > rect.left &&
      e.clientX < rect.right &&
      e.clientY > rect.top &&
      e.clientY < rect.bottom
    ) {
      cutDone = true;

      // 🎂 SLICE CUT
     slice.style.transform = "translateX(200px) rotate(15deg)";
      cake.style.transform = "scale(0.96)";

      // 💖 celebration
   setTimeout(() => {
  burstHearts();
  showContinueButton();
}, 400);
    }
  };
}
function showContinueButton() {
  const btn = document.createElement("button");
  btn.innerText = "Continue 💖";
  btn.className = "continue-btn";

  btn.onclick = showProposal;

  document.body.appendChild(btn);
}
function showProposal() {
  document.body.innerHTML = `
    <div class="proposal-screen">

      <h1 class="question">Do you love me? 💖</h1>

      <div class="options">
        <button id="yesBtn">Yes ✅ 💖</button>
        <button id="noBtn">No ❌ 🔫</button>
      </div>

    </div>
  `;

  setupProposal();
}

function setupProposal() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  let posX = window.innerWidth / 2 + 80;
  let posY = window.innerHeight / 2;

  noBtn.style.position = "absolute";
  noBtn.style.left = posX + "px";
  noBtn.style.top = posY + "px";

  let chaseCounter = 0;

  const taunts = [
    "Are you sure? 😏",
    "Think again 😜",
    "You can't catch me 😈",
    "Say YES na 💖",
    "No is not allowed 😂",
  ];

  document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();

    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = btnX - e.clientX;
    const dy = btnY - e.clientY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // 💣 EXPLOSION WHEN TOO CLOSE
    if (distance < 80) {
      createExplosion(btnX, btnY);
    }

    // RUN AWAY
    if (distance < 180) {
      chaseCounter++;

      posX += dx * 0.4;
      posY += dy * 0.4;

      posX = Math.max(20, Math.min(window.innerWidth - 120, posX));
      posY = Math.max(20, Math.min(window.innerHeight - 60, posY));

      noBtn.style.left = posX + "px";
      noBtn.style.top = posY + "px";

      // 😂 RANDOM TAUNT
      if (chaseCounter % 10 === 0) {
        showTaunt(taunts[Math.floor(Math.random() * taunts.length)], posX, posY);
      }

      // 🎯 HOMING BULLETS
      if (chaseCounter % 6 === 0) {
        shootHomingBullets(e.clientX, e.clientY);
      }
    }
  });

  yesBtn.onclick = showLoveExplosion;
}
function shootGuns(x, y) {

  // number of guns (increase here)
  const gunCount = 6;

  for (let i = 0; i < gunCount; i++) {

    const side = i % 2 === 0 ? "left" : "right";

    const gun = document.createElement("div");
    gun.className = "gun";
    gun.innerHTML = "🔫";

    // spread guns vertically
    const offsetY = y + (Math.random() * 200 - 100);

    gun.style.top = offsetY + "px";

    if (side === "left") {
      gun.style.left = "0px";
    } else {
      gun.style.right = "0px";
    }

    document.body.appendChild(gun);

    // 🔥 MORE BULLETS PER GUN
    for (let j = 0; j < 5; j++) {
      const bullet = document.createElement("div");
      bullet.className = "bullet";

      bullet.style.top = offsetY + "px";

      if (side === "left") {
        bullet.style.left = "60px";
      } else {
        bullet.style.left = (window.innerWidth - 60) + "px";
      }

      document.body.appendChild(bullet);

      setTimeout(() => bullet.remove(), 800);
    }

    setTimeout(() => gun.remove(), 800);
  }
}
function showLoveExplosion() {
  document.body.innerHTML = `
    <div class="love-screen">
      <h1 class="love-text">I Love You tooo 💖</h1>
    </div>
  `;

  startLoveShower();

  // 👉 After 3 sec → emotional ending
  setTimeout(showEmotionalEnding, 3000);
}
function showEmotionalEnding() {
  document.body.innerHTML = `
    <div class="final-screen">

      <div class="message-box">
        <p id="typeText"></p>
      </div>

    </div>
  `;

  typeMessage();
  startFinalShower();
}

function startLoveShower() {
  const emojis = ["💖","💋","🌸","❤️"];

  const interval = setInterval(() => {
    const el = document.createElement("div");
    el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "%";
    el.style.top = "-20px";
    el.style.fontSize = "20px";

    el.style.animation = "fallDown 3s linear";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 3000);

  }, 200);

  // STOP AFTER 10 SEC
  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}
function createExplosion(x, y) {
  for (let i = 0; i < 12; i++) {
    const boom = document.createElement("div");
    boom.innerHTML = "💥";
    boom.className = "boom";

    boom.style.left = x + "px";
    boom.style.top = y + "px";

    boom.style.transform = `translate(${Math.random()*200-100}px, ${Math.random()*200-100}px)`;

    document.body.appendChild(boom);

    setTimeout(() => boom.remove(), 800);
  }
}
function showTaunt(text, x, y) {
  const taunt = document.createElement("div");
  taunt.className = "taunt";
  taunt.innerText = text;

  taunt.style.left = x + "px";
  taunt.style.top = (y - 40) + "px";

  document.body.appendChild(taunt);

  setTimeout(() => taunt.remove(), 1500);
}
function shootHomingBullets(targetX, targetY) {

  for (let i = 0; i < 6; i++) {

    const bullet = document.createElement("div");
    bullet.className = "bullet";

    // start from random side
    const startX = Math.random() < 0.5 ? 0 : window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    bullet.style.left = startX + "px";
    bullet.style.top = startY + "px";

    document.body.appendChild(bullet);

    let x = startX;
    let y = startY;

    const interval = setInterval(() => {

      const dx = targetX - x;
      const dy = targetY - y;

      x += dx * 0.1;
      y += dy * 0.1;

      bullet.style.left = x + "px";
      bullet.style.top = y + "px";

      // remove when near cursor
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
        clearInterval(interval);
        bullet.remove();
      }

    }, 20);

    setTimeout(() => {
      clearInterval(interval);
      bullet.remove();
    }, 2000);
  }
}
function typeMessage() {
  const text = `
Muskan… 💖

From the moment you came into my life,
everything started feeling different… magical ✨

You are not just someone I love,
you are my peace, my happiness, my home 🏡

Every smile of yours means the world to me,
and today… I just want to say —

I am the luckiest person to have you 💫

Happy Birthday My Golu 🧸💖
I love you endlessly ❤️
  `;

  let i = 0;
  const speed = 40;

  function typing() {
    if (i < text.length) {
      document.getElementById("typeText").innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

// ▶️ Start music only once
function startMusicOnce() {
  bgMusic.play();
  document.removeEventListener("click", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);

window.addEventListener("load", () => {
  bgMusic.play().then(() => {
    // unmute after slight delay
    setTimeout(() => {
      bgMusic.muted = false;
    }, 1000);
  }).catch(() => {
    console.log("Autoplay blocked");
  });
});