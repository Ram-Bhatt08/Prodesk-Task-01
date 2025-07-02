import React, { useState, useEffect, useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Navbar from '../Navbar/Navbar';
import { fetchMoviesFromTMDB } from '../API/fetchMovies';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);          // Holds movies to display
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchTimeout = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    // Clear previous debounce timer
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    setIsLoading(true);

    searchTimeout.current = setTimeout(async () => {
      // fetchMoviesFromTMDB handles popular movies if query is empty
      const fetchedMovies = await fetchMoviesFromTMDB(searchQuery);
      setMovies(fetchedMovies);
      setIsLoading(false);
    }, 400); // debounce delay

    // Cleanup on unmount or query change
    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  // Dark mode toggle and persistence
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
    document.body.classList.toggle('dark-mode', saved);
  }, []);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Navbar
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        onSearch={handleSearch}
      />

      <div className="movies-container">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} darkMode={darkMode} />
          ))
        ) : searchQuery.trim() !== '' ? (
          <div className="no-results">
            <h3>No movies found</h3>
            <p>Try searching for a different title</p>
          </div>
        ) : (
          // Optional: show nothing or a message when no search & no movies yet
          <div className="welcome-message">
            <h3>Welcome! Start typing to search for movies.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;

