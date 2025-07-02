import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './MovieCard.css';

function MovieCard({ movie, darkMode }) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(movie.rating);
    const hasHalfStar = movie.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star-icon full-star" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star-icon half-star" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star-icon empty-star" />);
    }

    return stars;
  };

  return (
    <div className={`card ${darkMode ? 'dark-card' : ''}`}>
      <img
        src={movie.image}
        alt={movie.title}
        className="card-img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
        }}
      />
      <div className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-description">{movie.description}</p>
        <div className="card-footer">
          <div className="stars-container">
            {renderStars()}
            <span className="rating-text">{movie.rating.toFixed(1)}</span>
          </div>
          <p className="card-year">📅 {movie.year}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
