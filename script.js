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
const startDateCouple = new Date('2026-02-11T19:00:00');

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
    const m = Math
