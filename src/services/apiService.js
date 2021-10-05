import axios from "axios";

export default class TMDbServiseApi {
  async getTrendingFilm() {
    axios.defaults.baseURL = "https://api.themoviedb.org/3/";
    const myKey = "beea9164eba1ba2b98c8949b252f13b7";
    try {
      const request = await axios.get(`trending/movie/day?api_key=${myKey}`);
      return request.data.results;
    } catch (error) {
      return error;
    }
  }

  async searchMovies(filmName) {
    axios.defaults.baseURL = "https://api.themoviedb.org/3/";
    const myKey = "beea9164eba1ba2b98c8949b252f13b7";
    try {
      const request = await axios.get(
        `search/movie?api_key=${myKey}&query=${filmName}`
      );
      return request.results;
    } catch (error) {
      return error;
    }
  }

  async getMovieDetails(movieId) {
    axios.defaults.baseURL = "https://api.themoviedb.org/3/";
    const myKey = "beea9164eba1ba2b98c8949b252f13b7";
    try {
      const request = await axios.get(`movie/${movieId}?api_key=${myKey}`);
      return request.data;
    } catch (error) {
      return error;
    }
  }

  async getMovieCredits(movieId) {
    axios.defaults.baseURL = "https://api.themoviedb.org/3/";
    const myKey = "beea9164eba1ba2b98c8949b252f13b7";
    try {
      const request = await axios.get(
        `movie/${movieId}/credits?api_key=${myKey}`
      );
      return request.cast;
    } catch (error) {
      return error;
    }
  }

  async getMovieReviews(movieId) {
    axios.defaults.baseURL = "https://api.themoviedb.org/3/";
    const myKey = "beea9164eba1ba2b98c8949b252f13b7";
    try {
      const request = await axios.get(
        `movie/${movieId}/reviews?api_key=${myKey}`
      );
      return request.results;
    } catch (error) {
      return error;
    }
  }
}
