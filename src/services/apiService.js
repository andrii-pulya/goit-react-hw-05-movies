import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const MY_KEY = "beea9164eba1ba2b98c8949b252f13b7";

export default class TMDbServiseApi {
  async getTrendingFilm() {
    try {
      const request = await axios.get(`trending/movie/day?api_key=${MY_KEY}`);
      return request.data.results;
    } catch (error) {
      return error;
    }
  }

  async searchMovies(filmName) {
    try {
      const request = await axios.get(
        `search/movie?api_key=${MY_KEY}&query=${filmName}`
      );
      return request.data.results;
    } catch (error) {
      return error;
    }
  }

  async getMovieDetails(movieId) {
    try {
      const request = await axios.get(`movie/${movieId}?api_key=${MY_KEY}`);
      return request.data;
    } catch (error) {
      return error;
    }
  }

  async getMovieCredits(movieId) {
    try {
      const request = await axios.get(
        `movie/${movieId}/credits?api_key=${MY_KEY}`
      );
      return request.data.cast;
    } catch (error) {
      return error;
    }
  }

  async getMovieReviews(movieId) {
    try {
      const request = await axios.get(
        `movie/${movieId}/reviews?api_key=${MY_KEY}`
      );
      return request.data.results;
    } catch (error) {
      return error;
    }
  }
}
