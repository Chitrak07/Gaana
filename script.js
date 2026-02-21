const playlist = [
    { id: "hR0MOXXNCGA", title: "Chand Si Mehbooba Ho Meri", artist: "Mukesh" },
    { id: "hEatV9WPK-o", title: "Yeh Reshmi Zulfein", artist: "Mohammed Rafi" },
    { id: "VueN49P7JyU", title: "Yeh Chand Sa Roshan Chehra", artist: "Mohammed Rafi" },
    { id: "1lyJyjSezC8", title: "Chhup Gaye Sare Nazare", artist: "Lata Mangeshkar & Mohd.Rafi" },
    { id: "ieu6xnwJxdA", title: "Kitaben Bahut Si", artist: "Asha Bhosle & Vinod Rathod" },
    { id: "eM8Mjuq4MwQ", title: "Aankhein Khuli", artist: "Lata Mangeshkar, Udit Narayan" },
    { id: "kzTWRX9Dhrg", title: "Chalte Chalte", artist: "Udbhav, Manohar Shetty, Ishaan, Shweta Pandit, Sonali Bhatawdekar, Pritha Mazumdar" },
    { id: "bC7RmYYMqTw", title: "Pairon Mein Bandhan Hai", artist: "Udbhav, Manohar Shetty, Ishaan, Shweta Pandit, Sonali Bhatawdekar, Pritha Mazumdar" },
    { id: "OpLD97fG9Hw", title: "Soni Soni", artist: "Udit Narayan, Jaspinder Narula, Udbhav, Manohar Shetty, Ishaan, Shweta Pandit, Sonali Bhatawdekar, Pritha Mazumdar" },
    { id: "GjPGVVebVUc", title: "Zindagi Ek Safar Hai Suhana", artist: "Kishore Kumar" },
    { id: "UNjhqT_hlbg", title: "Chala Jata Hoon", artist: "Kishore Kumar" },
    { id: "RBX_29oGqec", title: "Chale Jaise Hawaien", artist: "K.K., Vasundhara Das" },
    { id: "lK7j4q9vVpE", title: "Tu Tu Hai Wahi", artist: "Asha Bhosle, Kishore Kumar" },
    { id: "7dO_MS9tZ5E", title: "Dekha Ek Khwab", artist: "Kishore Kumar, Lata Mangeshkar" },
    { id: "8drSZlOo3Uo", title: "Chehra Hai Ya Chand Khila Hai", artist: "R.D.Burman" },
    { id: "9PdSmDRGIwM", title: "Mere Sapno Ki Rani", artist: "Kishore Kumar" },
    { id: "3wGLsjgTx4c", title: "Likhe Jo Khat Tujhe(New)", artist: "Sanam" },
    { id: "i8cm_ide9EY", title: "Ude jab jab zulfen teri Teri", artist: "Mohammed Rafi | Asha Bhosle" },
    { id: "dcFIB9GJXz4", title: "Ajab Si", artist: "Vishal-Shekhar" }
];

let currentIndex = 0; 
let isShuffle = false; // Track if shuffle mode is ON or OFF

// 1. Play Specific Song by Index
function playSelected(index) {
    currentIndex = index;
    const song = playlist[currentIndex];
    
    document.getElementById('song-title').innerText = song.title;
    document.getElementById('song-artist').innerText = song.artist;
    document.getElementById('bg-image').style.backgroundImage = `url('https://img.youtube.com/vi/${song.id}/maxresdefault.jpg')`;
    
    // Embed the YouTube Video
    document.getElementById('player').innerHTML = `
        <iframe width="100%" height="100%" 
            src="https://www.youtube.com/embed/${song.id}?autoplay=1&rel=0" 
            frameborder="0" allowfullscreen></iframe>`;
            
    updateSongList(); // Refresh the bottom list
}

// 2. Toggle Shuffle ON/OFF
function toggleShuffle() {
    isShuffle = !isShuffle;
    const btn = document.getElementById('shuffle-toggle-btn');
    
    if (isShuffle) {
        btn.innerText = "🔀 ON";
        btn.classList.add("active-shuffle");
    } else {
        btn.innerText = "🔀 OFF";
        btn.classList.remove("active-shuffle");
    }
}

// 3. Next and Previous Logic (with Shuffle Support)
function playNext() {
    let nextIndex;
    if (isShuffle) {
        // Pick a random song that isn't the currently playing one
        do {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === currentIndex && playlist.length > 1);
    } else {
        // Play sequential next
        nextIndex = (currentIndex + 1) % playlist.length;
    }
    playSelected(nextIndex);
}

function playPrev() {
    let prevIndex;
    if (isShuffle) {
        // Pick a random song that isn't the currently playing one
        do {
            prevIndex = Math.floor(Math.random() * playlist.length);
        } while (prevIndex === currentIndex && playlist.length > 1);
    } else {
        // Play sequential previous
        prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    }
    playSelected(prevIndex);
}

// 4. Update the horizontal list (Shows all songs except the current one)
function updateSongList() {
    const container = document.getElementById('recommendations');
    
    const listHTML = playlist.map((song, index) => {
        if (index === currentIndex) return ''; // Skip the playing song
        return `
        <div class="mini-card" onclick="playSelected(${index})"> 
            <img src="https://img.youtube.com/vi/${song.id}/mqdefault.jpg">
            <p><strong>${song.title}</strong></p>
        </div>`;
    }).join('');
    
    container.innerHTML = listHTML;
}

// 5. History Tracking
function handleHistory(todaysSong) {
    let history = JSON.parse(localStorage.getItem('vibe_history')) || {};
    const todayStr = new Date().toDateString();
    
    history[todayStr] = todaysSong;
    localStorage.setItem('vibe_history', JSON.stringify(history));

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    const historyBox = document.getElementById('history-list');
    if (history[yesterdayStr]) {
        const pastSong = history[yesterdayStr];
        historyBox.innerHTML = `
            <div class="mini-card" style="cursor: default;"> 
                <img src="https://img.youtube.com/vi/${pastSong.id}/mqdefault.jpg">
                <p><strong>${pastSong.title}</strong></p>
            </div>`;
    } else {
        historyBox.innerHTML = "<p style='font-size:0.7rem; color:gray;'>Kal wapas aana history dekhne!</p>";
    }
}

// 6. Main Init
function init() {
    const now = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    document.getElementById('date-display').innerText = now.toLocaleDateString('en-GB', dateOptions);

    currentIndex = Math.floor(now.getTime() / (1000 * 60 * 60 * 24)) % playlist.length; 
    
    playSelected(currentIndex);
    handleHistory(playlist[currentIndex]);
}

window.onload = init;



