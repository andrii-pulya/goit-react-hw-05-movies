import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TMDbServiseApi from '../services/apiService.js'

const TMDbServise = new TMDbServiseApi()

export default function HomePage() {
  const [trendFilms, setTrendFilms] = useState(null)

  useEffect(() => {
    TMDbServise.getTrendingFilm()
      .then((response) => setTrendFilms(response))
      .catch((error) => alert(error.message))
  }, [])

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {trendFilms &&
          trendFilms.map((film) => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `movies/${film.id}`,
                  state: { from: `/` },
                }}
              >
                {film.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  )
}
