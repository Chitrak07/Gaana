# Aaj Ka Gaana 🎵

A beautifully designed, modern Progressive Web App (PWA) that serves a curated "Song of the Day" alongside a robust, glassmorphic music player. Built with Vanilla JavaScript and the YouTube Iframe API.

## ✨ Features

**🎨 Stunning Glassmorphism UI**
* Dynamic blurred background based on the currently playing song's thumbnail.
* Smooth, translucent glass cards with responsive horizontal scrolling lists.

**🎧 Advanced Audio Player**
* **Custom Controls:** Replaced default YouTube controls with a sleek, custom Play/Pause button, Volume slider, and an interactive Seek/Progress Bar.
* **Auto-Play & Shuffle:** Automatically plays the next song when a track ends. Includes a shuffle toggle for randomized playback.
* **Keyboard Shortcuts:** Press `Spacebar` to Play/Pause, `Right Arrow` for Next, and `Left Arrow` for Previous.

**📱 Progressive Web App (PWA)**
* **Installable:** Users can click the "⬇️ Get App" button to install the web app directly to their mobile or desktop home screen.
* **Lock Screen Controls:** Integrates the `Media Session API` so users can pause, skip, and see album art directly from their phone's lock screen.

**💖 Personalized User Experience**
* **Meri Playlist (Favorites):** Like a song (🤍 ➔ ❤️) to save it permanently to your personal list using `localStorage`.
* **History:** Missed yesterday's vibe? The app tracks your daily history so you can see "Kal Ka Gaana".
* **Smart Search & Filters:** Instantly search by song title or artist, or use the dynamic mood/era tags (e.g., *90s, Romantic, Upbeat*) to filter the playlist.
* **Song Trivia:** Discover fun facts and trivia about the currently playing track!
* **Native Sharing:** Integrated Web Share API to easily send the current vibe to friends via WhatsApp, Instagram, etc.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, Glassmorphism)
* **Logic:** Vanilla JavaScript (ES6+)
* **Media:** YouTube Iframe Player API
* **Storage:** Browser `localStorage`
* **PWA:** `manifest.json` & Service Workers (`sw.js`)

## 📂 Project Structure

```text
aaj-ka-gaana/
├── index.html       # The main UI and structure
├── style.css        # Glassmorphism styling and responsive layout
├── script.js        # Core logic, YT API, PWA, and local storage handling
├── manifest.json    # PWA configuration for app installation
└── sw.js            # Service worker for PWA support
