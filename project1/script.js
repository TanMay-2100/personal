function showWish(option) {
    const messageBox = document.getElementById("messageBox");

    const wishes = {
        1: "🌸 May your life be filled with vibrant colors and happiness. Happy Holi!",
        2: "🎨 Let’s splash colors of joy and celebrate together. Happy Holi my friend!",
        3: "🌈 May this Holi bring love, peace, and prosperity to your life!",
        4: "💖 Wishing you and your family a bright and colorful Holi!",
       
    };

    messageBox.innerText = wishes[option];
}