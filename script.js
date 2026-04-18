const messages = {
    1: "Thật ra anh đã để ý em từ lâu rồi. Mỗi lần gặp em, tim anh lại đập nhanh hơn một chút...",
    2: "Anh thích cách em cười, thích cả những lúc em giận hờn vu vơ. Ở bên em, anh thấy bình yên lạ thường.",
    3: "Anh hứa sẽ luôn bên cạnh em, lắng nghe em và cùng em đi qua những ngày giông bão cũng như những ngày nắng đẹp.",
    4: "Em làm người yêu anh nhé? ❤️ Anh sẽ cố gắng hết mình để mang lại hạnh phúc cho em mỗi ngày!"
};

const confessionText = document.getElementById('confession-text');
const bgMusic = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume-slider');
const heartContainer = document.getElementById('heart-container');

let isPlaying = false;
let typingTimeout;

// Typing effect function
function typeWriter(text, i = 0) {
    if (i === 0) {
        clearTimeout(typingTimeout);
        confessionText.innerHTML = '';
    }
    if (i < text.length) {
        confessionText.innerHTML += text.charAt(i);
        typingTimeout = setTimeout(() => typeWriter(text, i + 1), 50);
    }
}

// Show message function
function showMessage(id) {
    const text = messages[id];
    typeWriter(text);
    
    // Create extra hearts on button click for visual feedback
    for(let i=0; i<5; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// Music control
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        playPauseBtn.innerText = '🔇';
    } else {
        bgMusic.play().catch(e => console.log("Cần tương tác người dùng để phát nhạc!"));
        playPauseBtn.innerText = '🔊';
    }
    isPlaying = !isPlaying;
});

volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value;
});

// Auto-play music on first click anywhere (due to browser policy)
document.body.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play().catch(e => {});
        playPauseBtn.innerText = '🔊';
        isPlaying = true;
    }
}, { once: true });

// Heart particle effect
let heartCount = 0;
const MAX_HEARTS = 20;

function createHeart() {
    if (heartCount >= MAX_HEARTS) return;
    
    heartCount++;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 15 + 10 + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    
    heartContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
        heartCount--;
    }, 5000);
}

setInterval(createHeart, 300);

// Initialize with a welcome message
window.onload = () => {
    typeWriter("Chào em, anh có điều muốn nói với em...");
};
