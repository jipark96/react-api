import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const URL =
  "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(URL, {
        params: {
          numOfRows: 1,
          pageNo: 10,
        },
      });

      setMovies(response.data.data.movies);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>
          <img src={movie.medium_cover_image} alt="" />
          <h2>{movie.title}</h2>
          <p>Rating: {movie.rating}</p>
          <p>Year: {movie.year}</p>
          <p>Genres: {movie.genres}</p>
        </div>
      ))}
    </>
  );
}

export default App;
