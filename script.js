// --- CARGA INICIAL ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
    generateHearts();
});

function generateHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartEmojis = ['❤️', '💖', '✨', '🥰', '💕'];
    const numHearts = 40;
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-emoji');
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 8 + 7}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heartsContainer.appendChild(heart);
    }
}

// --- REPRODUCTOR ---
const audio = document.getElementById('background-music');
const prevSongButton = document.getElementById('prev-song-button');
const nextSongButton = document.getElementById('next-song-button');
const playPauseButton = document.getElementById('play-pause-button');
const volumeSlider = document.getElementById('volume-slider');
const songNameDisplay = document.getElementById('song-name');
const songFiles = ['audio/Those_Eyes.mp3', 'audio/cancion_para_nicol.mp3', 'audio/Sebastian_Yatra_-_Cristina.mp3', 'audio/Por Amarte Así.mp3', 'audio/Ruth B. - Dandelions.mp3', 'audio/Sebastián Yatra - No hay nadie más.mp3'];
const songDisplayNames = ["Those Eyes", "Canción para Nicol", "Cristina - Sebastián Yatra", "Por Amarte Así - Cristian Castro", "Dandelions - Ruth B.", "No Hay Nadie Más - Sebastián Yatra"];
let currentSongIndex = 0;
let musicStarted = false;

function loadSong(songIndex) {
    audio.src = songFiles[songIndex];
    songNameDisplay.innerText = `Sonando: ${songDisplayNames[songIndex]}`;
    audio.play().catch(e => console.log("Play"));
}
function playPauseSong() { if (audio.paused) audio.play(); else audio.pause(); }
function nextSong() { currentSongIndex = (currentSongIndex + 1) % songFiles.length; loadSong(currentSongIndex); }
function prevSong() { currentSongIndex = (currentSongIndex - 1 + songFiles.length) % songFiles.length; loadSong(currentSongIndex); }

prevSongButton.addEventListener('click', prevSong);
nextSongButton.addEventListener('click', nextSong);
playPauseButton.addEventListener('click', playPauseSong);
audio.addEventListener('ended', nextSong);
volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value);
audio.onplay = () => playPauseButton.innerText = "⏸️ Pausa";
audio.onpause = () => playPauseButton.innerText = "▶️ Play";

// --- MENSAJES ROTATIVOS ---
const messageElement = document.getElementById('message');
const messageButton = document.getElementById('message-button');
const messages = ["😊 Eres la razón por la que mis días son más bonitos. 😊", "💖 Contigo, cada momento es un recuerdo inolvidable. 💖 ", "💕 No solo estás en mi mente, vives en mi corazón.💕", " 🥰 Me enamoro de ti un poquito más cada día. 🥰", "😘 Eres lo mejor que me ha pasado. 😘"];
let currentMessageIndex = -1;
let isFirstClick = true;
let messageTimer = null;

function showNextMessage() {
    if (messageTimer) clearTimeout(messageTimer);
    messageElement.classList.add('slide-out');
    setTimeout(() => {
        let newIndex;
        do { newIndex = Math.floor(Math.random() * messages.length); } while (newIndex === currentMessageIndex);
        currentMessageIndex = newIndex;
        messageElement.innerText = messages[currentMessageIndex];
        messageElement.classList.remove('slide-out');
        messageTimer = setTimeout(showNextMessage, 6000);
    }, 800);
}

messageButton.addEventListener('click', () => {
    if (!musicStarted) { loadSong(currentSongIndex); musicStarted = true; document.querySelectorAll('.music-button, .volume-control').forEach(el => el.classList.add('visible')); }
    if (isFirstClick) { messageButton.innerHTML = "Siguiente mensaje 💕"; isFirstClick = false; }
    showNextMessage();
});

// --- CONTADORES PRECISOS ---
const startDateLucky = new Date('2023-01-27T00:00:00');
const startDateCouple = new Date('2026-02-11T18:00:00');

function calculateTimeDiff(startDate, elementId) {
    const now = new Date();
    const targetElement = document.getElementById(elementId);
    const nowSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const startSecs = startDate.getHours() * 3600 + startDate.getMinutes() * 60 + startDate.getSeconds();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (nowSecs < startSecs) days--;
    if (days < 0) { months--; const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += prevMonth.getDate(); }
    if (months < 0) { years--; months += 12; }

    const diffMs = now - startDate;
    const h = Math.floor((diffMs / 3600000) % 24);
    const m = Math.floor((diffMs / 60000) % 60);
    const s = Math.floor((diffMs / 1000) % 60);

    targetElement.innerHTML = `${years > 0 ? `<strong>${years}</strong> años, ` : ''}<strong>${months}</strong> meses, <strong>${days}</strong> días, <strong>${h}</strong>h, <strong>${m}</strong>m y <strong>${s}</strong>s`;
}

setInterval(() => { calculateTimeDiff(startDateLucky, 'countdown'); calculateTimeDiff(startDateCouple, 'countdown-pareja'); }, 1000);

// --- GALERÍA AUTO ---
const galleryModal = document.getElementById('gallery-modal');
const galleryImage = document.getElementById('gallery-image');
const images = Array.from({length: 28}, (_, i) => `Fotos_juntos/Foto${i+1}.jpg`);
let currentImgIdx = 0;
let galInterval;

function showImg(idx) {
    if (idx >= images.length) idx = 0; if (idx < 0) idx = images.length - 1;
    currentImgIdx = idx;
    galleryImage.style.opacity = '0';
    setTimeout(() => { galleryImage.src = images[currentImgIdx]; galleryImage.style.opacity = '1'; }, 400);
}

document.getElementById('gallery-button').addEventListener('click', () => {
    showImg(currentImgIdx);
    galleryModal.classList.add('visible');
    galInterval = setInterval(() => showImg(currentImgIdx + 1), 4000);
});

document.querySelector('#gallery-modal .close-button').addEventListener('click', () => {
    galleryModal.classList.remove('visible');
    clearInterval(galInterval);
});

document.querySelector('.prev').addEventListener('click', () => showImg(currentImgIdx - 1));
document.querySelector('.next').addEventListener('click', () => showImg(currentImgIdx + 1));

// --- LÓGICA DE CARTAS (TYPING) ---
const letterAudio = document.getElementById('letter-music');
let mainMusicPlaying = false;
let typingInterval;

function typeWriter(element, htmlContent, container) {
    element.innerHTML = "";
    let i = 0;
    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
        if (i < htmlContent.length) {
            if (htmlContent.charAt(i) === "<") i = htmlContent.indexOf(">", i) + 1; else i++;
            element.innerHTML = htmlContent.slice(0, i) + '<span class="typing-cursor"></span>';
            container.scrollTop = container.scrollHeight;
        } else {
            element.innerHTML = htmlContent;
            clearInterval(typingInterval);
        }
    }, 45); 
}

function openLetter(modalId, textId, pageClass, musicFile) {
    if (!audio.paused) { mainMusicPlaying = true; audio.pause(); }
    const modal = document.getElementById(modalId);
    const page = modal.querySelector('.' + pageClass);
    const container = document.getElementById(textId);
    
    modal.classList.add('visible');
    const originalHTML = page.innerHTML;
    page.innerHTML = "";
    
    letterAudio.src = musicFile;
    letterAudio.play().catch(e => console.log(e));
    
    setTimeout(() => typeWriter(page, originalHTML, container), 600);
}

function closeAllLetters() {
    clearInterval(typingInterval);
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('visible'));
    letterAudio.pause();
    if (mainMusicPlaying) audio.play();
}

document.getElementById('letter-button').addEventListener('click', () => 
    openLetter('letter-modal', 'letter-text', 'letter-page', 'canciones-carta/A_Thousand_Years.mp3')
);

document.getElementById('anniversary-button').addEventListener('click', () => 
    openLetter('anniversary-modal', 'anniversary-text', 'anniversary-page', 'audio/Sebastian_Yatra_-_Cristina.mp3')
);

document.querySelectorAll('.close-letter-button').forEach(btn => btn.addEventListener('click', closeAllLetters));

// --- EFECTO CLIC ---
document.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') {
        for (let i = 0; i < 6; i++) {
            const h = document.createElement('div');
            h.className = 'click-heart'; h.innerText = '❤️';
            h.style.left = e.pageX + 'px'; h.style.top = e.pageY + 'px';
            h.style.setProperty('--x-move', `${(Math.random() - 0.5) * 200}px`);
            h.style.setProperty('--y-move', `${(Math.random() - 1) * 200}px`);
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 800);
        }
    }
});
