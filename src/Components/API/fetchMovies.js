const API_KEY = 'ffef630e4f704d9193ed9506db70c6c6';
const BASE_URL = 'https://api.themoviedb.org/3';

const endpoints = {
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  latest: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
};

export async function fetchMovies(category = 'popular', query = '') {
  try {
    const url = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      : endpoints[category];

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

