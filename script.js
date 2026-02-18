
const playlist = [
    {
        id: "hR0MOXXNCGA", // YouTube Video ID
        title: "Chand Si Mehbooba Ho Meri",
        artist: "Mukesh"
    },
    {
        id: "hEatV9WPK-o",
        title: "Yeh Reshmi Zulfein",
        artist: "Mohammed Rafi"
    },
    {
        id: "s-bdclQyWGM",
        title: "Yeh Chand Sa Roshan Chehra",
        artist: "Mohammed Rafi"
    },
    {
        id: "8drSZlOo3Uo",
        title: "Chehra Hai Ya Chand Khila Hai",
        artist: "R.D.Burman"
    }
    
];

function init() {
    const now = new Date();
    
    // 1. Set Date (English format looks better for Hinglish)
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    document.getElementById('date-display').innerText = now.toLocaleDateString('en-GB', dateOptions);

    // 2. Logic to pick today's song
    // Ye har din automatically change hoga
    const dayIndex = Math.floor(now / (1000 * 60 * 60 * 24)); 
    const songIndex = dayIndex % playlist.length;
    const todaysSong = playlist[songIndex];

    // 3. Update Text
    document.getElementById('song-title').innerText = todaysSong.title;
    document.getElementById('song-artist').innerText = todaysSong.artist;

    // 4. Background Update
    const bgImage = document.getElementById('bg-image');
    // Using high-res thumbnail
    bgImage.style.backgroundImage = `url('https://img.youtube.com/vi/${todaysSong.id}/maxresdefault.jpg')`;

    // 5. Load Video
    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = `
        <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/${todaysSong.id}?theme=dark&color=white&rel=0" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
}

// Start kar bhai
init();
