import React, { useState, useEffect } from 'react'
import TMDbServiseApi from '../services/apiService.js'

const TMDbServise = new TMDbServiseApi()

export const HomePage = () => {
  const { trendFilms, setTrendFilms } = useState(null)

  useEffect(() => {
    TMDbServise.getTrendingFilm()
      .then((response) => setTrendFilms(response))
      .catch((error) => alert(error.message))
  })

  console.log(trendFilms)
  return (
    <ul>
      {trendFilms.map((film) => (
        <li>{film.title}</li>
      ))}
    </ul>
  )
}
