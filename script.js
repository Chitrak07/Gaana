const playlist = [
    { id: "hR0MOXXNCGA", title: "Chand Si Mehbooba Ho Meri", artist: "Mukesh" },
    { id: "hEatV9WPK-o", title: "Yeh Reshmi Zulfein", artist: "Mohammed Rafi" },
    { id: "VueN49P7JyU", title: "Yeh Chand Sa Roshan Chehra", artist: "Mohammed Rafi" },
    { id: "8drSZlOo3Uo", title: "Chehra Hai Ya Chand Khila Hai", artist: "R.D.Burman" },
    { id: "9PdSmDRGIwM", title: "Mere Sapno Ki Rani", artist: "Kishore Kumar" },
    { id: "L4_b0ulPqdo", title: "Likhe Jo Khat Tujhe", artist: "Mohammed Rafi" },
    { id: "i8cm_ide9EY", title: "Ude jab jab zulfen teri Teri", artist: "Mohammed Rafi | Asha Bhosle" }
];

// 1. Helper for Cards
function createMiniCard(song) {
    return `
        <div class="mini-card" onclick="playSelected('${song.id}', '${song.title}', '${song.artist}')"> 
            <img src="https://img.youtube.com/vi/${song.id}/mqdefault.jpg">
            <p><strong>${song.title}</strong></p>
        </div>
    `;
}

// 2. Play Manual Selection
function playSelected(id, title, artist) {
    document.getElementById('song-title').innerText = title;
    document.getElementById('song-artist').innerText = artist;
    document.getElementById('bg-image').style.backgroundImage = `url('https://img.youtube.com/vi/${id}/maxresdefault.jpg')`;
    document.getElementById('player').innerHTML = `
        <iframe width="100%" height="100%" 
            src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" 
            frameborder="0" allowfullscreen></iframe>`;
}

// 3. Shuffle & Recommendations
function refreshRecommendations() {
    const currentTitle = document.getElementById('song-title').innerText;
    const others = playlist.filter(s => s.title !== currentTitle);
    
    // Fisher-Yates Shuffle
    for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [others[i], others[j]] = [others[j], others[i]];
    }
    
    const recs = others.slice(0, 3);
    document.getElementById('recommendations').innerHTML = recs.map(s => createMiniCard(s)).join('');
}

// 4. History Tracking
function handleHistory(todaysSong) {
    let history = JSON.parse(localStorage.getItem('vibe_history')) || {};
    const todayStr = new Date().toDateString();
    
    // Save today
    history[todayStr] = todaysSong;
    localStorage.setItem('vibe_history', JSON.stringify(history));

    // Check Yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    const historyBox = document.getElementById('history-list');
    if (history[yesterdayStr]) {
        historyBox.innerHTML = createMiniCard(history[yesterdayStr]);
    } else {
        historyBox.innerHTML = "<p style='font-size:0.7rem; color:gray;'>Kal wapas aana history dekhne!</p>";
    }
}

// 5. Main Init
function init() {
    const now = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    document.getElementById('date-display').innerText = now.toLocaleDateString('en-GB', dateOptions);

    const dayIndex = Math.floor(now / (1000 * 60 * 60 * 24)); 
    const todaysSong = playlist[dayIndex % playlist.length];

    playSelected(todaysSong.id, todaysSong.title, todaysSong.artist);
    
    handleHistory(todaysSong);
    refreshRecommendations();
}

window.onload = init;


