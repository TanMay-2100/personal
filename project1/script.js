const text = "You are the best thing that ever happened to me 💖";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("message").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

window.onload = typeWriter;

function showSurprise() {
  document.getElementById("surprise").classList.remove("hidden");
}   