// --- CARGA INICIAL Y PERSISTENCIA (LocalStorage) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
    generateHearts();
    preloadGalleryImages(); 

    const messageEl = document.getElementById('message');
    if (localStorage.getItem('visited')) {
        messageEl.innerText = "Bienvenida de nuevo, mi hermosa princesa 💖 Toca el botón para continuar.";
    } else {
        localStorage.setItem('visited', 'true');
    }
});

function generateHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartEmojis = ['❤️', '💖', '✨', '🥰', '💕'];
    for (let i = 0; i < 40; i++) {
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

// --- REPRODUCTOR (Con Fade-In) ---
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
let maxVolume = 0.8; 

function loadSong(songIndex, withFade = false) {
    audio.src = songFiles[songIndex];
    songNameDisplay.innerText = `Sonando: ${songDisplayNames[songIndex]}`;
    
    if (withFade) {
        audio.volume = 0;
        audio.play().catch(e => console.log("Play error"));
        let vol = 0;
        const fadeInterval = setInterval(() => {
            if (vol < maxVolume) {
                vol += 0.05;
                audio.volume = Math.min(vol, maxVolume);
            } else {
                clearInterval(fadeInterval);
            }
        }, 200);
    } else {
        audio.volume = maxVolume;
        audio.play().catch(e => console.log("Play error"));
    }
}

function playPauseSong() { if (audio.paused) audio.play(); else audio.pause(); }
function nextSong() { currentSongIndex = (currentSongIndex + 1) % songFiles.length; loadSong(currentSongIndex); }
function prevSong() { currentSongIndex = (currentSongIndex - 1 + songFiles.length) % songFiles.length; loadSong(currentSongIndex); }

prevSongButton.addEventListener('click', prevSong);
nextSongButton.addEventListener('click', nextSong);
playPauseButton.addEventListener('click', playPauseSong);
audio.addEventListener('ended', nextSong);
volumeSlider.addEventListener('input', (e) => {
    maxVolume = e.target.value; 
    audio.volume = maxVolume;
});
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
    if (!musicStarted) { loadSong(currentSongIndex, true); musicStarted = true; document.querySelectorAll('.music-button, .volume-control').forEach(el => el.classList.add('visible')); }
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
    const m = Math.floor((diffMs / 60000) % 60);
    const s = Math.floor((diffMs / 1000) % 60);

    targetElement.innerHTML = `${years > 0 ? `<strong>${years}</strong> años, ` : ''}<strong>${months}</strong> meses, <strong>${days}</strong> días, <strong>${h}</strong>h, <strong>${m}</strong>m y <strong>${s}</strong>s`;
}

setInterval(() => { calculateTimeDiff(startDateLucky, 'countdown'); calculateTimeDiff(startDateCouple, 'countdown-pareja'); }, 1000);

// --- ESTRELLAS FUGACES ---
let shootingStarInterval;
function createShootingStar() {
    const containers = document.querySelectorAll('.modal.visible .shooting-stars-container');
    if (containers.length === 0) return;

    const star = document.createElement('div');
    star.classList.add('shooting-star');
    star.style.top = `${Math.random() * 50}%`;
    star.style.left = `${Math.random() * 80 + 20}%`;
    
    containers[0].appendChild(star);
    setTimeout(() => star.remove(), 2000);
}

function startShootingStars() {
    if (shootingStarInterval) clearInterval(shootingStarInterval);
    shootingStarInterval = setInterval(() => {
        if (Math.random() > 0.7) createShootingStar(); 
    }, 3000);
}
function stopShootingStars() {
    clearInterval(shootingStarInterval);
}

// --- GALERÍA AUTO ---
const galleryModal = document.getElementById('gallery-modal');
const galleryImage = document.getElementById('gallery-image');
const images = Array.from({length: 28}, (_, i) => `Fotos_juntos/Foto${i+1}.jpg`);
let currentImgIdx = 0;
let galInterval;

function preloadGalleryImages() {
    images.forEach(src => { const img = new Image(); img.src = src; });
}

function showImg(idx) {
    if (idx >= images.length) idx = 0; if (idx < 0) idx = images.length - 1;
    currentImgIdx = idx;
    galleryImage.style.opacity = '0';
    setTimeout(() => { 
        galleryImage.src = images[currentImgIdx]; 
        galleryImage.style.opacity = '1'; 
    }, 400);
}

document.getElementById('gallery-button').addEventListener('click', () => {
    if (!audio.paused) { mainMusicPlaying = true; audio.pause(); }
    galleryAudio.currentTime = 0;
    galleryAudio.play().catch(e => console.log("Error al reproducir música en galería"));
    showImg(currentImgIdx);
    galleryModal.classList.add('visible');
    galInterval = setInterval(() => showImg(currentImgIdx + 1), 4000);
});

document.querySelector('#gallery-modal .close-button').addEventListener('click', () => {
    galleryModal.classList.remove('visible');
    clearInterval(galInterval);
    galleryAudio.pause();
    if (mainMusicPlaying) { audio.play(); mainMusicPlaying = false; }
});

document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(galInterval); 
    showImg(currentImgIdx - 1);
    galInterval = setInterval(() => showImg(currentImgIdx + 1), 4000); 
});
document.querySelector('.next').addEventListener('click', () => {
    clearInterval(galInterval);
    showImg(currentImgIdx + 1);
    galInterval = setInterval(() => showImg(currentImgIdx + 1), 4000);
});

// --- LÓGICA DE CARTAS (TYPING Y SKIP) ---
const letterAudio = document.getElementById('letter-music');
const galleryAudio = document.getElementById('gallery-music');
let mainMusicPlaying = false;
let typingInterval;
let isTyping = false;
let currentHtmlContent = "";
let currentContainer = null;
let currentElement = null;

const anniversaryPlaylist = [
    "Música_aniversario/Punaladas.mp3", 
    "Música_aniversario/I_Wouldn't_Mind_by_He_Is_We.mp3", 
    "Música_aniversario/Magia.mp3"
];
let currentAnniversaryIdx = 0;
let isAnniversaryActive = false;
let currentPageIdx = 0;

function typeWriter(element, htmlContent, container, skipBtn) {
    element.innerHTML = "";
    let i = 0;
    clearInterval(typingInterval);
    isTyping = true;
    currentHtmlContent = htmlContent;
    currentElement = element;
    currentContainer = container;
    
    if(skipBtn) skipBtn.style.display = 'inline-block';

    typingInterval = setInterval(() => {
        if (i < htmlContent.length) {
            if (htmlContent.charAt(i) === "<") i = htmlContent.indexOf(">", i) + 1;
            else if (htmlContent.charAt(i) === "&") i = htmlContent.indexOf(";", i) + 1;
            else i++;
            element.innerHTML = htmlContent.slice(0, i) + '<span class="typing-cursor"></span>';
            // Suavizamos el scroll para que no provoque saltos de pantalla en móviles
            container.scrollTop = container.scrollHeight;
        } else {
            element.innerHTML = htmlContent;
            isTyping = false;
            clearInterval(typingInterval);
            if(skipBtn) skipBtn.style.display = 'none';
        }
    }, 57); 
}

function skipTyping() {
    if (isTyping && currentElement) {
        clearInterval(typingInterval);
        currentElement.innerHTML = currentHtmlContent;
        isTyping = false;
        document.querySelectorAll('.skip-btn').forEach(btn => btn.style.display = 'none');
    }
}

document.getElementById('skip-typing-button').addEventListener('click', skipTyping);
document.getElementById('skip-anniversary-btn').addEventListener('click', skipTyping);

function updateLetterPage(withFade = false) {
    const pages = document.querySelectorAll('#letter-modal .letter-page');
    const title = document.getElementById('modal-title');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const container = document.getElementById('letter-text');
    const skipBtn = document.getElementById('skip-typing-button');
    const contentBox = document.querySelector('#letter-modal .letter-content');

    const updateContent = () => {
        pages.forEach((p, idx) => p.classList.toggle('active', idx === currentPageIdx));
        
        if(currentPageIdx === 0) title.innerText = "Unas Palabras Solo Para Ti...";
        else if(currentPageIdx === 1) title.innerText = "Nuestro Primer Mes ❤️";
        else if(currentPageIdx === 2) title.innerText = "Dos Meses de Amor 💞";
        else if(currentPageIdx === 3) title.innerText = "Tres Meses Juntos ✨";
        else if(currentPageIdx === 4) title.innerText = "Cuatro Meses de Felicidad 💖";
        else if(currentPageIdx === 5) title.innerText = "Cinco Meses Juntitos 💖";
        else if(currentPageIdx === 6) title.innerText = "Seis Meses Inolvidables 💍";
        else if(currentPageIdx === 7) title.innerText = "Siete Meses de Magia ✨";
        else if(currentPageIdx === 8) title.innerText = "Ocho Meses Contigo 💖";

        prevBtn.style.display = (currentPageIdx === 0) ? 'none' : 'inline-block';
        nextBtn.style.display = (currentPageIdx === pages.length - 1) ? 'none' : 'inline-block';

        const activePage = pages[currentPageIdx];
        const originalHTML = activePage.getAttribute('data-original') || activePage.innerHTML;
        if (!activePage.getAttribute('data-original')) activePage.setAttribute('data-original', originalHTML);
        
        typeWriter(activePage, originalHTML, container, skipBtn);
        if (withFade) contentBox.classList.remove('fade-out');
    };

    if (withFade) {
        contentBox.classList.add('fade-out');
        clearInterval(typingInterval);
        setTimeout(updateContent, 400);
    } else {
        updateContent();
    }
}

document.getElementById('letter-button').addEventListener('click', () => {
    if (!audio.paused) { mainMusicPlaying = true; audio.pause(); }
    currentPageIdx = 0;
    isAnniversaryActive = false;
    document.getElementById('letter-modal').classList.add('visible');
    letterAudio.src = 'canciones-carta/A_Thousand_Years.mp3';
    letterAudio.loop = true;
    letterAudio.play().catch(e => console.log(e));
    updateLetterPage(false);
    startShootingStars();
});

document.getElementById('anniversary-button').addEventListener('click', () => {
    if (!audio.paused) { mainMusicPlaying = true; audio.pause(); }
    isAnniversaryActive = true;
    currentAnniversaryIdx = 0;
    const modal = document.getElementById('anniversary-modal');
    const container = document.getElementById('anniversary-text');
    const page = modal.querySelector('.anniversary-page');
    const skipBtn = document.getElementById('skip-anniversary-btn');
    
    modal.classList.add('visible');
    letterAudio.src = anniversaryPlaylist[0];
    letterAudio.loop = false;
    letterAudio.play().catch(e => console.log(e));
    startShootingStars();
    
    const originalHTML = page.getAttribute('data-original') || page.innerHTML;
    if (!page.getAttribute('data-original')) page.setAttribute('data-original', originalHTML);
    
    setTimeout(() => typeWriter(page, originalHTML, container, skipBtn), 600);
});

document.getElementById('next-page').addEventListener('click', () => { 
    const pagesCount = document.querySelectorAll('#letter-modal .letter-page').length;
    if(currentPageIdx < pagesCount - 1) { 
        if(isTyping) skipTyping();
        currentPageIdx++; 
        updateLetterPage(true); 
    }
});
document.getElementById('prev-page').addEventListener('click', () => { 
    if(currentPageIdx > 0) { 
        if(isTyping) skipTyping();
        currentPageIdx--; 
        updateLetterPage(true); 
    }
});

function closeAllLetters() {
    clearInterval(typingInterval);
    document.querySelectorAll('.skip-btn').forEach(btn => btn.style.display = 'none');
    document.querySelectorAll('.modal').forEach(m => {
        if(m.id !== 'gallery-modal') m.classList.remove('visible');
    });
    letterAudio.pause();
    isAnniversaryActive = false;
    stopShootingStars();
    if (mainMusicPlaying) { 
        audio.volume = 0;
        audio.play(); 
        let vol = 0;
        const resInterval = setInterval(() => {
            if (vol < maxVolume) {
                vol += 0.05;
                audio.volume = Math.min(vol, maxVolume);
            } else {
                clearInterval(resInterval);
            }
        }, 150);
        mainMusicPlaying = false; 
    }
}

document.querySelectorAll('.close-letter-button').forEach(btn => btn.addEventListener('click', closeAllLetters));

letterAudio.addEventListener('ended', () => {
    if (isAnniversaryActive) {
        currentAnniversaryIdx = (currentAnniversaryIdx + 1) % anniversaryPlaylist.length;
        letterAudio.src = anniversaryPlaylist[currentAnniversaryIdx];
        letterAudio.play();
    }
});

// --- EFECTO CLIC ---
document.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const heartEmojis = ['❤️', '💖', '✨', '🥰', '💕', '💗', '🌸'];
        const amount = 18; 
        for (let i = 0; i < amount; i++) {
            const h = document.createElement('div');
            h.className = 'click-heart';
            h.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            h.style.left = e.pageX + 'px';
            h.style.top = e.pageY + 'px';
            const xMove = (Math.random() - 0.5) * 350; 
            const yMove = (Math.random() - 0.7) * 350; 
            const rotation = Math.random() * 360;
            const size = Math.random() * 15 + 15;
            h.style.setProperty('--x-move', `${xMove}px`);
            h.style.setProperty('--y-move', `${yMove}px`);
            h.style.setProperty('--rotation', `${rotation}deg`);
            h.style.fontSize = `${size}px`;
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 800);
        }
    }
});
