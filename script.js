// 1. PLAYLIST WITH TRIVIA
const playlist = [
    { id: "JQoSSJDZxOo", title: "Rimjhim Gire Sawan", artist: "Kishore Kumar", tags: ["Classic 70s", "Romantic"], trivia: "The film was signed years prior when Amitabh was yet to find stardom." },
    { id: "7zEx0AJguSM", title: "Rabba Mehar Kari", artist: "Darshan Raval", tags: ["New Hits", "Romantic"], trivia: "Darshan Raval has gained millions of fans for his soulful romantic tracks." },
    { id: "vzlXfZlH5dk", title: "Main Koi Aisa Geet Gaoon", artist: "Alka Yagnik, Abhijeet Bhattacharya", tags: ["90s", "Romantic"], trivia: "This beautiful love song captures pure emotions, innocence, and the magic of 90’s Hindi cinema." },
    { id: "DoaE_6Y2_8I", title: "Morni", artist: "Darshan Raval", tags: ["New Hits", "Upbeat"], trivia: "A perfect pop anthem to get you dancing!" },
    { id: "hR0MOXXNCGA", title: "Chand Si Mehbooba", artist: "Mukesh", tags: ["Classic 70s", "Romantic"], trivia: "Mukesh was known as the 'Man with the Golden Voice'." },
    { id: "hEatV9WPK-o", title: "Yeh Reshmi Zulfein", artist: "Mohammed Rafi", tags: ["Classic 70s", "Romantic"], trivia: "Mohammed Rafi recorded over 7,000 songs in his lifetime." },
    { id: "VueN49P7JyU", title: "Yeh Chand Sa Roshan", artist: "Mohammed Rafi", tags: ["Classic 70s", "Upbeat"], trivia: "Shammi Kapoor's energy made this song an absolute blockbuster in Kashmir." },
    { id: "1lyJyjSezC8", title: "Chhup Gaye Sare Nazare", artist: "Lata & Rafi", tags: ["Classic 70s", "Romantic"], trivia: "Lata Mangeshkar and Rafi had the most iconic duets of the 70s." },
    { id: "ieu6xnwJxdA", title: "Kitaben Bahut Si", artist: "Asha & Vinod", tags: ["90s", "Romantic"], trivia: "From the iconic movie Baazigar starring Shah Rukh Khan!" },
    { id: "eM8Mjuq4MwQ", title: "Aankhein Khuli", artist: "Lata & Udit", tags: ["00s", "Upbeat"], trivia: "Mohabbatein was a massive musical success of the 2000s." },
    { id: "Mo5tQDcs__g", title: "Aao Milo Chalen", artist: "Shaan", tags: ["00s", "Travel"], trivia: "The ultimate road trip song from Jab We Met." },
    { id: "DA3GyfDY0Aw", title: "Tera Naam Liya", artist: "Manhar & Anuradha", tags: ["90s", "Romantic"], trivia: "Ram Lakhan's soundtrack is still considered legendary." },
    { id: "kzTWRX9Dhrg", title: "Chalte Chalte", artist: "Mohabbatein Cast", tags: ["00s", "Romantic"], trivia: "Features the voices of many young, upcoming singers of that era." },
    { id: "eVnG_Rqfgg4", title: "Neele Neele Ambar Par", artist: "Kishore Kumar", tags: ["Classic 80s", "Upbeat"], trivia: "Kalyanji-Anandji composed this timeless guitar riff." },
    { id: "uqa0BvYy03I", title: "Neele Neele (New)", artist: "Sanam", tags: ["Unplugged", "Upbeat"], trivia: "Sanam band is famous for bringing classic Bollywood back to life." },
    { id: "bN_Gv0TPVCU", title: "Tere Nainon Ke", artist: "Lata & Rafi", tags: ["Classic 70s", "Romantic"], trivia: "A beautiful melody that defines golden era romance." },
    { id: "GjPGVVebVUc", title: "Zindagi Ek Safar", artist: "Kishore Kumar", tags: ["Classic 70s", "Travel"], trivia: "Kishore Kumar's famous yodeling makes this song unforgettable." },
    { id: "UNjhqT_hlbg", title: "Chala Jata Hoon", artist: "Kishore Kumar", tags: ["Classic 70s", "Travel"], trivia: "RD Burman's magical composition for Rajesh Khanna." },
    { id: "RBX_29oGqec", title: "Chale Jaise Hawaien", artist: "K.K., Vasundhara", tags: ["00s", "Upbeat"], trivia: "Main Hoon Na was Farah Khan's directorial debut." },
    { id: "lK7j4q9vVpE", title: "Tu Tu Hai Wahi", artist: "Asha & Kishore", tags: ["Classic 80s", "Romantic"], trivia: "One of the most remixed classic songs in Bollywood history!" },
    { id: "7dO_MS9tZ5E", title: "Dekha Ek Khwab", artist: "Kishore & Lata", tags: ["Classic 80s", "Romantic"], trivia: "Shot in the beautiful tulip gardens of Keukenhof, Netherlands." },
    { id: "8drSZlOo3Uo", title: "Chehra Hai Ya Chand", artist: "R.D.Burman", tags: ["Classic 80s", "Romantic"], trivia: "RD Burman was known affectionately as 'Pancham Da'." },
    { id: "9PdSmDRGIwM", title: "Mere Sapno Ki Rani", artist: "Kishore Kumar", tags: ["Classic 70s", "Upbeat"], trivia: "Rajesh Khanna is driving a jeep while Sharmila Tagore is on a train in the video." },
    { id: "3wGLsjgTx4c", title: "Likhe Jo Khat Tujhe", artist: "Sanam", tags: ["Unplugged", "Romantic"], trivia: "A modern pop-rock take on the classic Mohammed Rafi song." },
    { id: "dcFIB9GJXz4", title: "Ajab Si", artist: "K.K.", tags: ["00s", "Romantic"], trivia: "KK's voice captured the magic of Om Shanti Om perfectly." }
];

let currentIndex = 0; 
let isShuffle = false;
let ytPlayer;
let currentFilter = 'All';
let likedSongs = [];
let progressInterval;

try { likedSongs = JSON.parse(localStorage.getItem('liked_songs')) || []; } 
catch (e) { likedSongs = []; }

// 2. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => console.log('SW failed', err));
    }

    const now = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    const dateDisplay = document.getElementById('date-display');
    if(dateDisplay) dateDisplay.innerText = now.toLocaleDateString('en-GB', dateOptions);

    currentIndex = Math.floor(now.getTime() / (1000 * 60 * 60 * 24)) % playlist.length; 
    
    renderFilters();
    updateSongList();
    renderLikedSongs();
    handleHistory(playlist[currentIndex]);
    updateSongUI(currentIndex);

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
});

// 3. YOUTUBE API
function onYouTubeIframeAPIReady() {
    const song = playlist[currentIndex];
    ytPlayer = new YT.Player('player', {
        videoId: song.id,
        playerVars: { 'autoplay': 1, 'rel': 0, 'controls': 0, 'disablekb': 1 },
        events: { 'onStateChange': onPlayerStateChange }
    });
}

// 4. UPDATE UI & LOCK SCREEN (MEDIA SESSION API)
function updateSongUI(index) {
    const song = playlist[index];
    
    document.getElementById('song-title').innerText = song.title;
    document.getElementById('song-artist').innerText = song.artist;
    document.getElementById('song-trivia').innerText = song.trivia || "A great track to vibe to!";
    document.getElementById('bg-image').style.backgroundImage = `url('https://img.youtube.com/vi/${song.id}/maxresdefault.jpg')`;
    
    // Reset seek bar visually
    document.getElementById('seek-bar').value = 0;
    document.getElementById('current-time').innerText = "0:00";

    updateLikeButtonUI();

    // Update Phone Lock Screen Metadata
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.artist,
            album: 'Aaj Ka Gaana',
            artwork: [
                { src: `https://img.youtube.com/vi/${song.id}/hqdefault.jpg`, sizes: '480x360', type: 'image/jpeg' }
            ]
        });

        navigator.mediaSession.setActionHandler('play', () => { togglePlayPause(); });
        navigator.mediaSession.setActionHandler('pause', () => { togglePlayPause(); });
        navigator.mediaSession.setActionHandler('previoustrack', () => { playPrev(); });
        navigator.mediaSession.setActionHandler('nexttrack', () => { playNext(); });
    }
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
        document.getElementById('list-title').innerText = 'Aur Gaane 🎧';
    }
    updateSongList(); 
}

// 5. KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
    // Prevent triggering if typing in search bar
    if(document.activeElement.id === 'search-bar') return;
    
    if (e.code === 'Space') {
        e.preventDefault(); 
        togglePlayPause();
    } else if (e.code === 'ArrowRight') {
        playNext();
    } else if (e.code === 'ArrowLeft') {
        playPrev();
    }
});

// 6. CONTROLS & SEEK BAR
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
        progressInterval = setInterval(updateSeekBar, 500); // Start moving seek bar
    } else {
        playBtn.innerText = "▶️";
        clearInterval(progressInterval); // Stop moving seek bar
    }
    
    if (event.data === YT.PlayerState.ENDED) playNext();
}

function updateSeekBar() {
    if (ytPlayer && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
        const currentTime = ytPlayer.getCurrentTime();
        const duration = ytPlayer.getDuration();
        
        const seekBar = document.getElementById('seek-bar');
        seekBar.max = duration; 
        seekBar.value = currentTime; 

        document.getElementById('current-time').innerText = formatTime(currentTime);
        document.getElementById('total-time').innerText = formatTime(duration);
    }
}

function seekVideo(value) {
    if (ytPlayer) {
        ytPlayer.seekTo(value, true); 
        document.getElementById('current-time').innerText = formatTime(value);
    }
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 7. LISTS, FILTERS, LIKES, & SHARE 
function updateSongList() {
    const container = document.getElementById('recommendations');
    const query = document.getElementById('search-bar') ? document.getElementById('search-bar').value.toLowerCase() : '';

    const listHTML = playlist
        .map((song, index) => ({ song, index }))
        .filter(item => query !== '' || item.index !== currentIndex) 
        .filter(item => currentFilter === 'All' || (item.song.tags && item.song.tags.includes(currentFilter))) 
        .filter(item => item.song.title.toLowerCase().includes(query) || item.song.artist.toLowerCase().includes(query)) 
        .map(item => `
        <div class="mini-card" onclick="playSelected(${item.index})"> 
            <img src="https://img.youtube.com/vi/${item.song.id}/mqdefault.jpg">
            <p><strong>${item.song.title}</strong></p>
        </div>`).join('');
    
    container.innerHTML = listHTML || "<p style='font-size:0.8rem; color:gray; padding:10px;'>Koi gaana nahi mila.</p>";
}

function renderFilters() {
    const tags = new Set();
    playlist.forEach(song => { if(song.tags) song.tags.forEach(t => tags.add(t)); });
    
    let html = `<button class="filter-btn active-filter" onclick="setFilter('All', this)">All</button>`;
    tags.forEach(tag => { html += `<button class="filter-btn" onclick="setFilter('${tag}', this)">${tag}</button>`; });
    document.getElementById('filters-container').innerHTML = html;
}

function setFilter(tag, btnElement) {
    currentFilter = tag;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active-filter'));
    if(btnElement) btnElement.classList.add('active-filter');
    updateSongList();
}

function searchSongs() {
    const query = document.getElementById('search-bar').value;
    document.getElementById('list-title').innerText = query ? 'Search Results 🔍' : 'Aur Gaane 🎧';
    updateSongList();
}

function toggleLike() {
    const songId = playlist[currentIndex].id;
    const indexInLikes = likedSongs.indexOf(songId);
    if (indexInLikes > -1) likedSongs.splice(indexInLikes, 1);
    else likedSongs.push(songId);
    
    localStorage.setItem('liked_songs', JSON.stringify(likedSongs));
    updateLikeButtonUI();
    renderLikedSongs();
}

function updateLikeButtonUI() {
    const btn = document.getElementById('like-btn');
    const isLiked = likedSongs.includes(playlist[currentIndex].id);
    if(btn) btn.innerText = isLiked ? "❤️" : "🤍";
}

function renderLikedSongs() {
    const favoritesHTML = playlist
        .map((song, index) => ({ song, index }))
        .filter(item => likedSongs.includes(item.song.id))
        .map(item => `
        <div class="mini-card" onclick="playSelected(${item.index})"> 
            <img src="https://img.youtube.com/vi/${item.song.id}/mqdefault.jpg">
            <p><strong>${item.song.title}</strong></p>
        </div>`).join('');
    document.getElementById('liked-list').innerHTML = favoritesHTML || "<p style='font-size:0.8rem; color:gray; padding:10px;'>Aapki playlist khali hai ❤️</p>";
}

function playNext() {
    let nextIndex;
    if (isShuffle) {
        do { nextIndex = Math.floor(Math.random() * playlist.length); } 
        while (nextIndex === currentIndex && playlist.length > 1);
    } else nextIndex = (currentIndex + 1) % playlist.length;
    playSelected(nextIndex);
}

function playPrev() {
    let prevIndex;
    if (isShuffle) {
        do { prevIndex = Math.floor(Math.random() * playlist.length); } 
        while (prevIndex === currentIndex && playlist.length > 1);
    } else prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSelected(prevIndex);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    const btn = document.getElementById('shuffle-toggle-btn');
    if(btn) { btn.innerText = isShuffle ? "🔀 ON" : "🔀 OFF"; btn.classList.toggle("active-shuffle", isShuffle); }
}

function handleHistory(todaysSong) {
    let history = {};
    try { history = JSON.parse(localStorage.getItem('vibe_history')) || {}; } catch(e) {}
    
    history[new Date().toDateString()] = todaysSong;
    localStorage.setItem('vibe_history', JSON.stringify(history));

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const pastSong = history[yesterday.toDateString()];

    document.getElementById('history-list').innerHTML = pastSong ? `
        <div class="mini-card" onclick="playSelected(playlist.findIndex(s => s.id === '${pastSong.id}'))" style="cursor: pointer;"> 
            <img src="https://img.youtube.com/vi/${pastSong.id}/mqdefault.jpg">
            <p><strong>${pastSong.title}</strong></p>
        </div>` : "<p style='font-size:0.7rem; color:gray; padding:10px;'>Kal wapas aana history dekhne!</p>";
}

function shareSong() {
    const song = playlist[currentIndex];
    if (navigator.share) navigator.share({ title: 'Aaj Ka Gaana 🎵', text: `Meri vibe abhi '${song.title}' ki hai. Sun ke dekho! 🎧`, url: window.location.href }).catch(console.error);
    else alert("Aapka browser share support nahi karta. 😢");
}



