// 1. PLAYLIST (Make sure every song has tags)
const playlist = [
    { id: "7zEx0AJguSM", title: "Rabba Mehar Kari", artist: "Darshan Raval", tags: ["New Hits", "Romantic"] },
    { id: "DoaE_6Y2_8I", title: "Morni", artist: "Darshan Raval", tags: ["New Hits", "Upbeat"] },
    { id: "hR0MOXXNCGA", title: "Chand Si Mehbooba", artist: "Mukesh", tags: ["Classic 70s", "Romantic"] },
    { id: "hEatV9WPK-o", title: "Yeh Reshmi Zulfein", artist: "Mohammed Rafi", tags: ["Classic 70s", "Romantic"] },
    { id: "VueN49P7JyU", title: "Yeh Chand Sa Roshan", artist: "Mohammed Rafi", tags: ["Classic 70s", "Upbeat"] },
    { id: "1lyJyjSezC8", title: "Chhup Gaye Sare Nazare", artist: "Lata & Rafi", tags: ["Classic 70s", "Romantic"] },
    { id: "ieu6xnwJxdA", title: "Kitaben Bahut Si", artist: "Asha & Vinod", tags: ["90s", "Romantic"] },
    { id: "eM8Mjuq4MwQ", title: "Aankhein Khuli", artist: "Lata & Udit", tags: ["00s", "Upbeat"] },
    { id: "Mo5tQDcs__g", title: "Aao Milo Chalen", artist: "Shaan", tags: ["00s", "Travel"] },
    { id: "DA3GyfDY0Aw", title: "Tera Naam Liya", artist: "Manhar & Anuradha", tags: ["90s", "Romantic"] },
    { id: "kzTWRX9Dhrg", title: "Chalte Chalte", artist: "Mohabbatein Cast", tags: ["00s", "Romantic"] },
    { id: "eVnG_Rqfgg4", title: "Neele Neele Ambar Par", artist: "Kishore Kumar", tags: ["Classic 80s", "Upbeat"] },
    { id: "uqa0BvYy03I", title: "Neele Neele (New)", artist: "Sanam", tags: ["Unplugged", "Upbeat"] },
    { id: "bN_Gv0TPVCU", title: "Tere Nainon Ke", artist: "Lata & Rafi", tags: ["Classic 70s", "Romantic"] },
    { id: "GjPGVVebVUc", title: "Zindagi Ek Safar", artist: "Kishore Kumar", tags: ["Classic 70s", "Travel"] },
    { id: "UNjhqT_hlbg", title: "Chala Jata Hoon", artist: "Kishore Kumar", tags: ["Classic 70s", "Travel"] },
    { id: "RBX_29oGqec", title: "Chale Jaise Hawaien", artist: "K.K., Vasundhara", tags: ["00s", "Upbeat"] },
    { id: "lK7j4q9vVpE", title: "Tu Tu Hai Wahi", artist: "Asha & Kishore", tags: ["Classic 80s", "Romantic"] },
    { id: "7dO_MS9tZ5E", title: "Dekha Ek Khwab", artist: "Kishore & Lata", tags: ["Classic 80s", "Romantic"] },
    { id: "8drSZlOo3Uo", title: "Chehra Hai Ya Chand", artist: "R.D.Burman", tags: ["Classic 80s", "Romantic"] },
    { id: "9PdSmDRGIwM", title: "Mere Sapno Ki Rani", artist: "Kishore Kumar", tags: ["Classic 70s", "Upbeat"] },
    { id: "3wGLsjgTx4c", title: "Likhe Jo Khat Tujhe", artist: "Sanam", tags: ["Unplugged", "Romantic"] },
    { id: "dcFIB9GJXz4", title: "Ajab Si", artist: "K.K.", tags: ["00s", "Romantic"] }
];

let currentIndex = 0; 
let isShuffle = false;
let ytPlayer;
let currentFilter = 'All';
let likedSongs = [];

// Safely load liked songs
try {
    likedSongs = JSON.parse(localStorage.getItem('liked_songs')) || [];
} catch (e) {
    console.error("Storage error:", e);
    likedSongs = [];
}

// 2. START THE APP SAFELY ONCE HTML LOADS
document.addEventListener("DOMContentLoaded", () => {
    console.log("App starting! Loading UI...");
    
    try {
        const now = new Date();
        const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
        
        const dateDisplay = document.getElementById('date-display');
        if(dateDisplay) dateDisplay.innerText = now.toLocaleDateString('en-GB', dateOptions);

        // Pick daily song safely
        currentIndex = Math.floor(now.getTime() / (1000 * 60 * 60 * 24)) % playlist.length; 
        
        // Draw all interface lists FIRST (so you see them instantly)
        renderFilters();
        updateSongList();
        renderLikedSongs();
        handleHistory(playlist[currentIndex]);
        
        // Update the big song text
        updateSongUI(currentIndex);

        // Load YouTube API safely in the background
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag); // Safe injection
        
    } catch (error) {
        console.error("Critical UI Error:", error);
    }
});

// 3. YOUTUBE API SETUP
function onYouTubeIframeAPIReady() {
    console.log("YouTube Ready!");
    const song = playlist[currentIndex];
    ytPlayer = new YT.Player('player', {
        videoId: song.id,
        playerVars: {
            'autoplay': 1, 
            'rel': 0,
            'controls': 0, 
            'disablekb': 1
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. CORE UI FUNCTIONS
function updateSongUI(index) {
    const song = playlist[index];
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const bgEl = document.getElementById('bg-image');
    
    if(titleEl) titleEl.innerText = song.title;
    if(artistEl) artistEl.innerText = song.artist;
    if(bgEl) bgEl.style.backgroundImage = `url('https://img.youtube.com/vi/${song.id}/maxresdefault.jpg')`;
    
    updateLikeButtonUI();
}

function playSelected(index) {
    currentIndex = index;
    const song = playlist[currentIndex];
    
    updateSongUI(currentIndex);

    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
        ytPlayer.loadVideoById(song.id);
    }
            
    const searchBar = document.getElementById('search-bar');
    if(searchBar && searchBar.value !== '') {
        searchBar.value = '';
        const listTitle = document.getElementById('list-title');
        if(listTitle) listTitle.innerText = 'Aur Gaane 🎧';
    }
    
    updateSongList(); 
}

// 5. LIST RENDERERS (BULLETPROOF)
function updateSongList() {
    const container = document.getElementById('recommendations');
    if(!container) return;

    const searchInput = document.getElementById('search-bar');
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    const listHTML = playlist
        .map((song, index) => ({ song, index }))
        .filter(item => query !== '' || item.index !== currentIndex) 
        .filter(item => currentFilter === 'All' || (item.song.tags && item.song.tags.includes(currentFilter))) 
        .filter(item => item.song.title.toLowerCase().includes(query) || item.song.artist.toLowerCase().includes(query)) 
        .map(item => `
        <div class="mini-card" onclick="playSelected(${item.index})"> 
            <img src="https://img.youtube.com/vi/${item.song.id}/mqdefault.jpg" alt="${item.song.title}">
            <p><strong>${item.song.title}</strong></p>
        </div>`)
        .join('');
    
    container.innerHTML = listHTML || "<p style='font-size:0.8rem; color:gray; padding:10px;'>Koi gaana nahi mila.</p>";
}

function renderFilters() {
    const container = document.getElementById('filters-container');
    if(!container) return;

    const tags = new Set();
    // Safely collect tags
    playlist.forEach(song => {
        if(song.tags) song.tags.forEach(t => tags.add(t));
    });
    
    let html = `<button class="filter-btn active-filter" onclick="setFilter('All', this)">All</button>`;
    tags.forEach(tag => {
        html += `<button class="filter-btn" onclick="setFilter('${tag}', this)">${tag}</button>`;
    });
    
    container.innerHTML = html;
}

function renderLikedSongs() {
    const container = document.getElementById('liked-list');
    if(!container) return;
    
    const favoritesHTML = playlist
        .map((song, index) => ({ song, index }))
        .filter(item => likedSongs.includes(item.song.id))
        .map(item => `
        <div class="mini-card" onclick="playSelected(${item.index})"> 
            <img src="https://img.youtube.com/vi/${item.song.id}/mqdefault.jpg">
            <p><strong>${item.song.title}</strong></p>
        </div>`)
        .join('');

    container.innerHTML = favoritesHTML || "<p style='font-size:0.8rem; color:gray; padding:10px;'>Aapki playlist khali hai ❤️</p>";
}

// 6. BUTTON ACTIONS
function setFilter(tag, btnElement) {
    currentFilter = tag;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active-filter'));
    if(btnElement) btnElement.classList.add('active-filter');
    updateSongList();
}

function searchSongs() {
    const searchBar = document.getElementById('search-bar');
    const query = searchBar ? searchBar.value : '';
    const listTitle = document.getElementById('list-title');
    if(listTitle) listTitle.innerText = query ? 'Search Results 🔍' : 'Aur Gaane 🎧';
    updateSongList();
}

function toggleLike() {
    const songId = playlist[currentIndex].id;
    const indexInLikes = likedSongs.indexOf(songId);

    if (indexInLikes > -1) {
        likedSongs.splice(indexInLikes, 1);
    } else {
        likedSongs.push(songId);
    }

    localStorage.setItem('liked_songs', JSON.stringify(likedSongs));
    updateLikeButtonUI();
    renderLikedSongs();
}

function updateLikeButtonUI() {
    const btn = document.getElementById('like-btn');
    if(!btn) return;
    const isLiked = likedSongs.includes(playlist[currentIndex].id);
    btn.innerText = isLiked ? "❤️" : "🤍";
}

function togglePlayPause() {
    if (!ytPlayer || typeof ytPlayer.getPlayerState !== 'function') return;
    const state = ytPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
    } else {
        ytPlayer.playVideo();
    }
}

function changeVolume(value) {
    if (ytPlayer && typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(value);
}

function onPlayerStateChange(event) {
    const playBtn = document.getElementById('play-pause-btn');
    if (!playBtn) return;
    
    if (event.data === YT.PlayerState.PLAYING) {
        playBtn.innerText = "⏸";
    } else {
        playBtn.innerText = "▶️";
    }
    if (event.data === YT.PlayerState.ENDED) playNext();
}

// 7. NAVIGATION
function playNext() {
    let nextIndex;
    if (isShuffle) {
        do { nextIndex = Math.floor(Math.random() * playlist.length); } 
        while (nextIndex === currentIndex && playlist.length > 1);
    } else {
        nextIndex = (currentIndex + 1) % playlist.length;
    }
    playSelected(nextIndex);
}

function playPrev() {
    let prevIndex;
    if (isShuffle) {
        do { prevIndex = Math.floor(Math.random() * playlist.length); } 
        while (prevIndex === currentIndex && playlist.length > 1);
    } else {
        prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    }
    playSelected(prevIndex);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    const btn = document.getElementById('shuffle-toggle-btn');
    if(!btn) return;
    btn.innerText = isShuffle ? "🔀 ON" : "🔀 OFF";
    btn.classList.toggle("active-shuffle", isShuffle);
}

// 8. HISTORY LOGIC
function handleHistory(todaysSong) {
    let history = {};
    try {
        history = JSON.parse(localStorage.getItem('vibe_history')) || {};
    } catch(e) {}
    
    const todayStr = new Date().toDateString();
    history[todayStr] = todaysSong;
    localStorage.setItem('vibe_history', JSON.stringify(history));

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    const historyBox = document.getElementById('history-list');
    if(!historyBox) return;

    if (history[yesterdayStr]) {
        const pastSong = history[yesterdayStr];
        historyBox.innerHTML = `
            <div class="mini-card" onclick="playSelected(playlist.findIndex(s => s.id === '${pastSong.id}'))" style="cursor: pointer;"> 
                <img src="https://img.youtube.com/vi/${pastSong.id}/mqdefault.jpg">
                <p><strong>${pastSong.title}</strong></p>
            </div>`;
    } else {
        historyBox.innerHTML = "<p style='font-size:0.7rem; color:gray; padding:10px;'>Kal wapas aana history dekhne!</p>";
    }
}

function shareSong() {
    const song = playlist[currentIndex];
    const shareData = {
        title: 'Aaj Ka Gaana 🎵',
        text: `Meri vibe abhi '${song.title}' ki hai. Sun ke dekho! 🎧`,
        url: window.location.href 
    };

    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        alert("Aapka browser share support nahi karta. 😢");
    }
}
