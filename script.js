// --- EVENTO DE CARGA DE PÁGINA ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
    generateHearts();
});

// --- GENERACIÓN DINÁMICA DE CORAZONES ---
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
        heart.style.fontSize = `${Math.random() * 20 + 20}s`;
        heartsContainer.appendChild(heart);
    }
}

// --- LÓGICA DEL REPRODUCTOR DE MÚSICA PRINCIPAL---
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
    audio.play().catch(error => console.log("La reproducción principal debe ser iniciada por el usuario."));
}
function playPauseSong() { if (audio.paused) { audio.play(); } else { audio.pause(); } }
function nextSong() { currentSongIndex = (currentSongIndex + 1) % songFiles.length; loadSong(currentSongIndex); }
function prevSong() { currentSongIndex = (currentSongIndex - 1 + songFiles.length) % songFiles.length; loadSong(currentSongIndex); }
prevSongButton.addEventListener('click', prevSong);
nextSongButton.addEventListener('click', nextSong);
playPauseButton.addEventListener('click', playPauseSong);
audio.addEventListener('ended', nextSong);
volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value);
audio.onplay = () => playPauseButton.innerText = "⏸️ Pausa";
audio.onpause = () => playPauseButton.innerText = "▶️ Play";

// --- LÓGICA DE MENSAJES ---
const messageElement = document.getElementById('message');
const messageButton = document.getElementById('message-button');
const copyMessageButton = document.getElementById('copy-message-button');
let currentMessageIndex = -1;
let isFirstClick = true;
let messageTimer = null;
const messages = ["😊 Eres la razón por la que mis días son más bonitos. 😊", "💖 Contigo, cada momento se convierte en un recuerdo inolvidable. 💖 ", "💕 No solo estás en mi mente, vives en mi corazón.💕", "😌 Gracias por ser mi paz en medio del caos y el motivo de mi felicidad. 🍃", " 🥰 Me enamoro de ti un poquito más cada día que pasa. 🥰", "😁 Su sonrisa tiene el poder de arreglar cualquier cosa. 👀", "🫣 Eres mi aventura favorita y mi puerto seguro, todo en uno. 🥹", "😢 No imagino un futuro en el que no estés a mi lado. 💔", "🥰 Llegaste y transformaste mi mundo en un lugar maravilloso. 🥰", "😚 Te quiero no solo por como eres, sino por como me haces ser y sentir. 😚", "😶‍🌫️ Eres esa canción que no puedo dejar de repetir en mi cabeza. 😶‍🌫️", "😘 Por si no te lo he dicho hoy: eres lo mejor que me ha pasado en mi vida. 😘", "🫣 El reloj marca la hora, los días marcan el tiempo pero usted marco lo que un día fue un sueño para mí. ❤️", "❤️ Te quiero mucho Nicol, eres mi princesa. 👸🏼", "💖 Gracias por hacerme el hombre más feliz del mundo. 🥰", "💕 Se que he estado ausente estos días pero quiero que recuerdes que siempre te tengo presente. 💕", "💖 Voy a estar contigo aunque la distancia nos separe... 💖", "😘 Te enviaré un beso con el viento, confiándolo a sus suaves caricias. 🍃", "🫣 Aunque no me veas, sabrás que estáre allí, siempre junto a usted. ❤️", " 💖 Si me necesita, solo llámeme. No me importa si estoy durmiendo o teniendo mis propios problemas, siempre tendré tiempo y estaré ahí para usted 💖", "🤫 Desde que llegaste a mi vida, hasta el silencio tiene tu nombre. Te pienso sin querer, te imagino sin buscarte, y hasta en mis momentos tranquilos... tu recuerdo hace ruido en mi pecho. No es que no pueda dejar de pensarte, es que mi alma se acostumbró a vivir contigo, aunque no estés cerca de mí. 💖", "🥺 Perdoneme por favor si te escribo demasiado o me apego mucho a usted, solo quiero darte el cariño que creo debes merecer 💖"];

function showNextMessageAndSchedule() {
    if (messageTimer) clearTimeout(messageTimer);
    messageElement.classList.add('slide-out');
    setTimeout(() => {
        let newIndex;
        do { newIndex = Math.floor(Math.random() * messages.length); } while (newIndex === currentMessageIndex);
        currentMessageIndex = newIndex;
        const currentText = messages[currentMessageIndex];
        messageElement.innerText = currentText;
        messageElement.classList.remove('slide-out');
        const words = currentText.split(' ').length;
        const readingTime = 2000 + (words * 350);
        const delay = Math.max(5000, readingTime);
        messageTimer = setTimeout(showNextMessageAndSchedule, delay);
    }, 800);
}
function handleMainButtonClick() {
    if (!musicStarted) {
        loadSong(currentSongIndex);
        musicStarted = true;
        document.querySelectorAll('.music-button').forEach(btn => btn.classList.add('visible'));
        document.querySelector('.volume-control').classList.add('visible');
    }
    if (isFirstClick) {
        messageButton.innerHTML = "Siguiente mensaje 💕";
        isFirstClick = false;
        copyMessageButton.classList.add('visible');
    }
    showNextMessageAndSchedule();
}
messageButton.addEventListener('click', handleMainButtonClick);
copyMessageButton.addEventListener('click', () => {
    navigator.clipboard.writeText(messageElement.innerText).then(() => {
        copyMessageButton.innerText = '✅';
        setTimeout(() => { copyMessageButton.innerText = '📋'; }, 1500);
    });
});

// --- LÓGICA DEL CONTADOR DE TIEMPO ---
const countdownElement = document.getElementById('countdown');
const startDate = new Date('2023-01-27T00:00:00');
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    let seconds = Math.floor(diff / 1000); let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60); let days = Math.floor(hours / 24);
    const years = Math.floor(days / 365.25);
    days = Math.floor(days % 365.25); hours %= 24; minutes %= 60; seconds %= 60;
    countdownElement.innerHTML = `<strong>${years}</strong> años, <strong>${days}</strong> días, <strong>${hours}</strong>h, <strong>${minutes}</strong>m y <strong>${seconds}</strong>s`;
}
setInterval(updateTimer, 1000);
updateTimer();

// --- LÓGICA DE LA GALERÍA DE FOTOS ---
const galleryModal = document.getElementById('gallery-modal');
const galleryButton = document.getElementById('gallery-button');
const closeGalleryButton = document.querySelector('#gallery-modal .close-button');
const galleryImage = document.getElementById('gallery-image');
const prevImageButton = document.querySelector('#gallery-modal .prev');
const nextImageButton = document.querySelector('#gallery-modal .next');
const gallerySpinner = document.querySelector('.spinner-gallery');
const floatingMessage = document.getElementById('floating-message');

const images = ['images/Corazones.png', 'images/imagesfoto2.png', 'images/imagesfoto3.gif'];
let currentImageIndex = 0;
let isImageLoading = false;

function showImage(index) {
    if (isImageLoading) return;
    isImageLoading = true;
    if (index >= images.length) index = 0;
    if (index < 0) index = images.length - 1;
    currentImageIndex = index;
    gallerySpinner.classList.add('visible');
    galleryImage.style.opacity = '0';
    setTimeout(() => {
        galleryImage.src = images[currentImageIndex];
    }, 400);
}
galleryImage.onload = () => {
    gallerySpinner.classList.remove('visible');
    galleryImage.style.opacity = '1';
    isImageLoading = false;
};
galleryImage.onerror = function() {
    console.error(`Error al cargar la imagen: ${galleryImage.src}.`);
    gallerySpinner.classList.remove('visible');
    isImageLoading = false;
};
galleryButton.addEventListener('click', () => {
    if (galleryButton.classList.contains('galeria-desactivada')) {
        floatingMessage.innerText = "💖 Cuando nos saquemos fotografías juntos, mi princesa, las guardaremos acá 💖";
        floatingMessage.classList.add('visible');
        setTimeout(() => {
            floatingMessage.classList.remove('visible');
        }, 3500);
    } else {
        showImage(currentImageIndex);
        galleryModal.classList.add('visible');
    }
});
closeGalleryButton.addEventListener('click', () => galleryModal.classList.remove('visible'));
galleryModal.addEventListener('click', (e) => { if (e.target === galleryModal) galleryModal.classList.remove('visible'); });
prevImageButton.addEventListener('click', () => showImage(currentImageIndex - 1));
nextImageButton.addEventListener('click', () => showImage(currentImageIndex + 1));


// =======================================================
// --- LÓGICA DE LA CARTA (CON PAGINACIÓN Y MÚSICA) ---
// =======================================================
const letterModal = document.getElementById('letter-modal');
const letterButton = document.getElementById('letter-button');
const closeLetterButton = document.querySelector('.close-letter-button');
const letterAudio = document.getElementById('letter-music');
let mainMusicWasPlaying = false;

const letterPages = document.querySelectorAll('.letter-page');
const prevPageButton = document.getElementById('prev-page-button');
const nextPageButton = document.getElementById('next-page-button');
const pageCounter = document.getElementById('page-counter');
const letterNavigation = document.querySelector('.letter-navigation');
let currentPageIndex = 0;
let isPageTurning = false;

// CORRECCIÓN: Si tienes más de una canción, déjalas aquí. Si solo tienes una, puedes dejar solo esa.
const letterSongFiles = ['audio/canciones-carta/A_Thousand_Years.mp3']; //, 'audio/canciones-carta/Married_Life.mp3', etc.
let currentLetterSongIndex = 0; // Se mantiene por si en el futuro añades más.

function updateLetterNav(index) {
    pageCounter.textContent = `Página ${index + 1} de ${letterPages.length}`;
    prevPageButton.disabled = (index === 0);
    nextPageButton.disabled = (index === letterPages.length - 1);
}
function changeLetterPage(newIndex) {
    if (isPageTurning || newIndex === currentPageIndex) return;
    isPageTurning = true;
    const currentPage = letterPages[currentPageIndex];
    const nextPage = letterPages[newIndex];
    currentPage.classList.add('fade-out');
    setTimeout(() => {
        currentPage.classList.remove('active', 'fade-out');
        nextPage.classList.add('active', 'fade-in');
        setTimeout(() => {
            nextPage.classList.remove('fade-in');
            isPageTurning = false;
        }, 400);
    }, 400);
    currentPageIndex = newIndex;
    updateLetterNav(currentPageIndex);
}
if (letterNavigation && !letterNavigation.classList.contains('navegacion-desactivada')) {
    prevPageButton.addEventListener('click', () => { if (currentPageIndex > 0) changeLetterPage(currentPageIndex - 1); });
    nextPageButton.addEventListener('click', () => { if (currentPageIndex < letterPages.length - 1) changeLetterPage(currentPageIndex + 1); });
}

// CORRECCIÓN: Esta función ahora solo carga la canción. El loop lo hace el HTML.
function loadLetterSong(songIndex) { 
    letterAudio.src = letterSongFiles[songIndex]; 
    letterAudio.volume = audio.volume; 
    letterAudio.play().catch(error => console.log(error)); 
}

// CORRECCIÓN: Se eliminan las funciones 'nextLetterSong' y el 'event listener' de 'ended'
// ya que el atributo 'loop' en el HTML se encarga de repetir la canción.

letterButton.addEventListener('click', () => {
    if (!audio.paused) {
        mainMusicWasPlaying = true;
        audio.pause();
    } else {
        mainMusicWasPlaying = false;
    }
    letterModal.classList.add('visible');
    letterPages.forEach((page, index) => {
        page.classList.toggle('active', index === 0);
    });
    currentPageIndex = 0;
    if (letterNavigation && !letterNavigation.classList.contains('navegacion-desactivada')) {
        updateLetterNav(0);
    }
    loadLetterSong(currentLetterSongIndex);
});
function closeLetter() {
    letterModal.classList.remove('visible');
    letterAudio.pause();
    letterAudio.currentTime = 0;
    if (mainMusicWasPlaying) {
        audio.play();
    }
}
closeLetterButton.addEventListener('click', closeLetter);
letterModal.addEventListener('click', (e) => { if (e.target === letterModal) closeLetter(); });