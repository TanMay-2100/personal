// Typing message
const text = "You are the best thing that ever happened to me ❤️";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("message").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
}
window.onload = typeWriter;

// Countdown to midnight
function updateCountdown() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24,0,0,0);

  const diff = midnight - now;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60 % 60);
  const seconds = Math.floor(diff / 1000 % 60);

  document.getElementById("countdown").innerHTML =
    `⏳ ${hours}h ${minutes}m ${seconds}s left for your special day ❤️`;
}
setInterval(updateCountdown, 1000);

// Letters
function showLetters() {
  document.getElementById("letters").classList.remove("hidden");
}

function openLetter(type) {
  let msg = "";
  if(type === "happy") msg = "I love seeing you smile 😊";
  if(type === "sad") msg = "I'm always here for you ❤️";
  if(type === "miss") msg = "I miss you every second 💖";

  const box = document.getElementById("letterContent");
  box.innerHTML = msg;
  box.classList.remove("hidden");
}

// Gallery
function showGallery() {
  document.getElementById("gallery").classList.remove("hidden");
}

// Video
function playVideo() {
  document.getElementById("videoPopup").classList.remove("hidden");
}

// Surprise
function showSurprise() {
  document.getElementById("surprise").classList.remove("hidden");
}

// Floating hearts
setInterval(() => {
  const heart = document.createElement("div");
  heart.innerHTML = "💖";
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}, 500);