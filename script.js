// --- EVENTO DE CARGA DE PÁGINA ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 800);
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
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heartsContainer.appendChild(heart);
    }
}


// --- LÓGICA DEL REPRODUCTOR DE MÚSICA ---
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
    audio.play().catch(error => console.log("La reproducción debe ser iniciada por el usuario."));
}
function playPauseSong() {
    if (audio.paused) { audio.play(); } else { audio.pause(); }
}
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songFiles.length;
    loadSong(currentSongIndex);
}
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songFiles.length) % songFiles.length;
    loadSong(currentSongIndex);
}
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
        // CAMBIO: Ahora añadimos una clase CSS en lugar de cambiar el estilo directamente.
        copyMessageButton.classList.add('visible');
    }
    showNextMessageAndSchedule();
}

messageButton.addEventListener('click', handleMainButtonClick);

copyMessageButton.addEventListener('click', () => {
    navigator.clipboard.writeText(messageElement.innerText).then(() => {
        const originalText = copyMessageButton.innerText;
        copyMessageButton.innerText = '✅';
        setTimeout(() => {
            copyMessageButton.innerText = '📋';
        }, 1500);
    });
});


// --- LÓGICA DEL CONTADOR DE TIEMPO ---
const countdownElement = document.getElementById('countdown');
const startDate = new Date('2023-01-27T00:00:00'); 
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    const years = Math.floor(days / 365.25);
    days = Math.floor(days % 365.25);
    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    countdownElement.innerHTML = `<strong>${years}</strong> años, <strong>${days}</strong> días, <strong>${hours}</strong>h, <strong>${minutes}</strong>m y <strong>${seconds}</strong>s`;
}
setInterval(updateTimer, 1000);
updateTimer(); 


// --- LÓGICA DE LA GALERÍA DE FOTOS ---
const galleryModal = document.getElementById('gallery-modal');
const galleryButton = document.getElementById('gallery-button');
const closeButton = document.querySelector('.close-button');
const galleryImage = document.getElementById('gallery-image');
const prevImageButton = document.querySelector('.prev');
const nextImageButton = document.querySelector('.next');

const images = ['images/foto1.jpg', 'images/foto2.png', 'images/foto3.gif'];
let currentImageIndex = 0;

function showImage(index) {
    if (index >= images.length) index = 0;
    if (index < 0) index = images.length - 1;
    currentImageIndex = index;
    galleryImage.src = images[currentImageIndex];
}
galleryImage.onerror = function() {
    console.error(`Error al cargar la imagen: ${galleryImage.src}. Verifica que el archivo exista en la carpeta 'images' y el nombre sea correcto.`);
};
galleryButton.addEventListener('click', () => {
    showImage(currentImageIndex);
    galleryModal.style.display = 'flex';
});
closeButton.addEventListener('click', () => galleryModal.style.display = 'none');
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) galleryModal.style.display = 'none';
});
prevImageButton.addEventListener('click', () => showImage(currentImageIndex - 1));
nextImageButton.addEventListener('click', () => showImage(currentImageIndex + 1));
