const text = "Dearest Muskan,\n\nOr should I say… my Golu 💖\n\nTonight feels special… because somewhere between all the ordinary days, you became the most beautiful part of my life.\n\nYou are not just someone I love… you are someone I never want to lose.\n\nYour smile is my peace.\nYour voice is my comfort.\nAnd your love… is my everything ❤️";

let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("message").innerHTML += text.charAt(i).replace(/\n/g, "<br>");
    i++;
    setTimeout(typeWriter, 35);
  }
}

window.onload = typeWriter;

function showMessage() {
  document.getElementById("extra").classList.remove("hidden");
}
// CLOSE VIDEO
function closeVideo() {
  document.getElementById("videoBox").classList.add("hidden");
}

// READ HEART (SHOW MESSAGE + HEART ANIMATION)
function showMessage() {
  document.getElementById("extra").classList.remove("hidden");

  // create falling hearts
  for (let i = 0; i < 30; i++) {
    let heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}
function openVideo() {
  document.getElementById("videoBox").classList.remove("hidden");
  
}
function openVideo() {
  const videoBox = document.getElementById("videoBox");
  const video = document.getElementById("myVideo");

  videoBox.classList.remove("hidden");

  video.currentTime = 0;
  video.play();
}

function closeVideo() {
  const videoBox = document.getElementById("videoBox");
  const video = document.getElementById("myVideo");

  video.pause();

  videoBox.classList.add("hidden");
}