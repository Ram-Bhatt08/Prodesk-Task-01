# 🎬 React Movie Search App

A responsive movie search application built with **React.js**, using the **TMDB API** to fetch real-time movie data. It features search-as-you-type functionality, dark/light mode toggle, and a clean UI for displaying movie cards.

---

## 🚀 Features

- 🔍 **Live Search** — Search movies by title using the TMDB API.
- 🌐 **Popular Movies on Load** — Loads trending/popular movies when the app starts.
- 💡 **Dark/Light Mode** — Toggle between dark and light themes with localStorage support.
- 🖼️ **Poster Fallbacks** — Displays placeholder if poster is missing.
- 📱 **Responsive UI** — Built with Flexbox and media queries for all devices.

---

## 🧪 Demo

> 🧠 Type a movie name like `Avengers`, `Inception`, or `Avatar` to test the search feature.

---

---

## 🔑 TMDB API Setup

1. Go to [TMDB](https://www.themoviedb.org/)
2. Create a free account → Navigate to **Settings → API**
3. Choose **Developer (Personal Use)** and apply
4. Copy your API key
5. Add it to:  
   `src/API/fetchMovies.js`

```js
const API_KEY = 'YOUR_TMDB_API_KEY';

