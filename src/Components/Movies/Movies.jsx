import React, { useState, useEffect, useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Navbar from '../Navbar/Navbar';
import { fetchMovies } from '../API/fetchMovies';
import MovieSection from '../MovieSection/MovieSection';
import './Movies.css';

function Movies() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeout = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    searchTimeout.current = setTimeout(async () => {
      const results = await fetchMovies('', searchQuery);
      setSearchResults(results);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
    document.body.classList.toggle('dark-mode', saved);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} onSearch={handleSearch} />

      <div className="movies-container">
        {searchQuery.trim() ? (
          isLoading ? (
            <div className="loading-spinner"></div>
          ) : searchResults.length > 0 ? (
            <div className="search-results">
              <h2>Search Results</h2>
              <div className="movie-list">
                {searchResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} darkMode={darkMode} />
                ))}
              </div>
            </div>
          ) : (
            <div className="no-results">
              <h3>No movies found</h3>
              <p>Try searching for a different title</p>
            </div>
          )
        ) : (
          <>
            <MovieSection title="🔥 Popular Movies" category="popular" darkMode={darkMode} />
            <MovieSection title="⭐ Top Rated" category="topRated" darkMode={darkMode} />
            <MovieSection title="🎬 Now Playing" category="latest" darkMode={darkMode} />
            <MovieSection title="🎥 Upcoming Movies" category="upcoming" darkMode={darkMode} />
          </>
        )}
      </div>
    </div>
  );
}

export default Movies;

