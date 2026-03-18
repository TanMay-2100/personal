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

function openVideo() {
  document.getElementById("videoBox").classList.remove("hidden");
}