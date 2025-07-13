import React, { useEffect, useState, useRef, useCallback } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { fetchMovies } from '../API/fetchMovies';
import './MovieSection.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function MovieSection({ title, category, darkMode }) {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fetch movies for the category
  useEffect(() => {
    fetchMovies(category).then(setMovies);
  }, [category]);

  // Check scroll boundaries to disable arrows when necessary
  const checkScrollPosition = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  }, []);

  // Attach scroll listener to update scroll position state
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollPosition();

    el.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      el.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition, movies]);

  // Scroll handler
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = direction === 'left' ? -500 : 500;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="movie-section">
      <h2 className={`section-title ${darkMode ? 'dark-text' : ''}`}>{title}</h2>

      <div className="movie-list-wrapper">
        <button
          className="scroll-arrow scroll-left"
          onClick={() => scroll('left')}
          aria-label={`Scroll ${title} left`}
          disabled={!canScrollLeft}
          tabIndex={canScrollLeft ? 0 : -1}
        >
          <FaChevronLeft />
        </button>

        <div className="movie-list" ref={scrollRef} tabIndex={0} aria-label={`${title} movies list`}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} darkMode={darkMode} />
          ))}
        </div>

        <button
          className="scroll-arrow scroll-right"
          onClick={() => scroll('right')}
          aria-label={`Scroll ${title} right`}
          disabled={!canScrollRight}
          tabIndex={canScrollRight ? 0 : -1}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default MovieSection;

