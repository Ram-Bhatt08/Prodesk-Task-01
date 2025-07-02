const API_KEY = 'ffef630e4f704d9193ed9506db70c6c6';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMoviesFromTMDB(query = '') {
  try {
    const url = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      rating: movie.vote_average,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image',
      year: movie.release_date?.split('-')[0] || 'N/A',
    }));
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return [];
  }
}

