import React, { useMemo } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './MovieCard.css';

function MovieCard({ movie, darkMode }) {
  const renderStars = useMemo(() => {
    const stars = [];
    const fullStars = Math.floor(movie.rating);
    const hasHalfStar = movie.rating % 1 >= 0.5;
    const totalStars = hasHalfStar ? fullStars + 1 : fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star-icon full-star" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star-icon half-star" />);
    }
    for (let i = totalStars; i < 5; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star-icon empty-star" />);
    }
    return stars;
  }, [movie.rating]);

  return (
    <div
      className={`card ${darkMode ? 'dark-card' : ''}`}
      aria-label={`Movie card for ${movie.title}`}
      title={movie.title}
    >
      <img
        src={movie.image}
        alt={`${movie.title} poster`}
        className="card-img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
        }}
      />
      <div className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-description">
          {movie.description?.length > 120
            ? `${movie.description.slice(0, 120)}...`
            : movie.description || 'No description available.'}
        </p>
        <div className="card-footer">
          <div className="stars-container" title={`Rating: ${movie.rating.toFixed(1)}`}>
            {renderStars}
            <span className="rating-text">{movie.rating.toFixed(1)}</span>
          </div>
          <p className="card-year">📅 {movie.year}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;

