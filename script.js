const playlist = [
    { id: "7zEx0AJguSM", title: "Rabba Mehar Kari ", artist: "Darshan Raval" },
    { id: "DoaE_6Y2_8I", title: "Morni ", artist: "Darshan Raval" },
    { id: "hR0MOXXNCGA", title: "Chand Si Mehbooba Ho Meri", artist: "Mukesh" },
    { id: "hEatV9WPK-o", title: "Yeh Reshmi Zulfein", artist: "Mohammed Rafi" },
    { id: "VueN49P7JyU", title: "Yeh Chand Sa Roshan Chehra", artist: "Mohammed Rafi" },
    { id: "1lyJyjSezC8", title: "Chhup Gaye Sare Nazare", artist: "Lata Mangeshkar & Mohd.Rafi" },
    { id: "ieu6xnwJxdA", title: "Kitaben Bahut Si", artist: "Asha Bhosle & Vinod Rathod" },
    { id: "eM8Mjuq4MwQ", title: "Aankhein Khuli", artist: "Lata Mangeshkar, Udit Narayan" },
    { id: "Mo5tQDcs__g", title: "Aao Milo Chalen", artist: "Shaan" },
    { id: "DA3GyfDY0Aw", title: "Tera Naam Liya Tujhe Yaad Kiya", artist: "Manhar Udhas, Anuradha Paudwal" },
    { id: "kzTWRX9Dhrg", title: "Chalte Chalte", artist: "Udbhav, Manohar Shetty, Ishaan, Shweta Pandit, Sonali Bhatawdekar, Pritha Mazumdar" },
    { id: "eVnG_Rqfgg4", title: "Neele Neele Ambar Par", artist: "Kishore Kumar" },
    { id: "uqa0BvYy03I", title: "Neele Neele Ambar Par New", artist: "Sanam" },
    { id: "bN_Gv0TPVCU", title: "Tere Nainon Ke Main Deep Jalaoonga", artist: "Lata Mangeshkar, Mohammed Rafi" },
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
let isShuffle = false;
let ytPlayer; // Will hold the YouTube player instance

// 1. Load the YouTube Iframe API dynamically
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function is automatically called by YouTube when its API is ready
function onYouTubeIframeAPIReady() {
    init(); // Start the app only after YouTube is ready
}

// 3. Play Specific Song by Index
function playSelected(index) {
    currentIndex = index;
    const song = playlist[currentIndex];
    
    document.getElementById('song-title').innerText = song.title;
    document.getElementById('song-artist').innerText = song.artist;
    document.getElementById('bg-image').style.backgroundImage = `url('https://img.youtube.com/vi/${song.id}/maxresdefault.jpg')`;
    
    if (ytPlayer) {
        // If player already exists, load new video
        ytPlayer.loadVideoById(song.id);
    } else {
        // Create player for the first time
        ytPlayer = new YT.Player('player', {
            videoId: song.id,
            playerVars: {
                'autoplay': 1, // Note: Browsers may still require a user click for the very first play
                'rel': 0
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
            
    updateSongList(); // Refresh the bottom list
}

// 4. Auto-play next song when current finishes
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNext();
    }
}

// 5. Toggle Shuffle ON/OFF
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

// 6. Next and Previous Logic
function playNext() {
    let nextIndex;
    if (isShuffle) {
        do {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === currentIndex && playlist.length > 1);
    } else {
        nextIndex = (currentIndex + 1) % playlist.length;
    }
    playSelected(nextIndex);
}

function playPrev() {
    let prevIndex;
    if (isShuffle) {
        do {
            prevIndex = Math.floor(Math.random() * playlist.length);
        } while (prevIndex === currentIndex && playlist.length > 1);
    } else {
        prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    }
    playSelected(prevIndex);
}

// 7. Update the horizontal list (Cleaned up the mapping logic)
function updateSongList() {
    const container = document.getElementById('recommendations');
    
    // Filter out the currently playing song, then map the rest to HTML
    const listHTML = playlist
        .map((song, index) => ({ song, index }))
        .filter(item => item.index !== currentIndex)
        .map(item => `
        <div class="mini-card" onclick="playSelected(${item.index})"> 
            <img src="https://img.youtube.com/vi/${item.song.id}/mqdefault.jpg">
            <p><strong>${item.song.title}</strong></p>
        </div>`)
        .join('');
    
    container.innerHTML = listHTML;
}

// 8. History Tracking
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
            <div class="mini-card" onclick="playSelected(playlist.findIndex(s => s.id === '${pastSong.id}'))" style="cursor: pointer;"> 
                <img src="https://img.youtube.com/vi/${pastSong.id}/mqdefault.jpg">
                <p><strong>${pastSong.title}</strong></p>
            </div>`;
    } else {
        historyBox.innerHTML = "<p style='font-size:0.7rem; color:gray;'>Kal wapas aana history dekhne!</p>";
    }
}

// 9. Main Init
function init() {
    const now = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    document.getElementById('date-display').innerText = now.toLocaleDateString('en-GB', dateOptions);

    // Calculate Daily Song
    currentIndex = Math.floor(now.getTime() / (1000 * 60 * 60 * 24)) % playlist.length; 
    
    playSelected(currentIndex);
    handleHistory(playlist[currentIndex]);
}

// NEW: Search functionality
function searchSongs() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const container = document.getElementById('recommendations');
    const listTitle = document.getElementById('list-title');

    // If the search is empty, go back to the default list
    if (query.trim() === '') {
        listTitle.innerText = 'Aur Gaane 🎧';
        updateSongList();
        return;
    }

    // Change title to indicate search mode
    listTitle.innerText = 'Search Results 🔍';

    // Filter playlist based on song title OR artist name
    const results = playlist
        .map((song, index) => ({ song, index })) // Keep original index for playing
        .filter(item => 
            item.song.title.toLowerCase().includes(query) || 
            item.song.artist.toLowerCase().includes(query)
        );

    // If no songs match the search
    if (results.length === 0) {
        container.innerHTML = `<p style="font-size: 0.8rem; color: #ccc; padding: 10px;">Koi gaana nahi mila 😔</p>`;
        return;
    }

    // Render the matching songs
    const listHTML = results.map(item => `
        <div class="mini-card" onclick="playFromSearch(${item.index})"> 
            <img src="https://img.youtube.com/vi/${item.song.id}/mqdefault.jpg">
            <p><strong>${item.song.title}</strong></p>
            <p style="font-size: 0.6rem; color: #aaa;">${item.song.artist}</p>
        </div>
    `).join('');

    container.innerHTML = listHTML;
}

// NEW: Helper to play song from search and reset the search bar
function playFromSearch(index) {
    document.getElementById('search-bar').value = ''; // Clear search bar
    document.getElementById('list-title').innerText = 'Aur Gaane 🎧'; // Reset title
    playSelected(index);
}

// Note: Removed window.onload = init; because YouTube's onYouTubeIframeAPIReady handles starting the app now.
