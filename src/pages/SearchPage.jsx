import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import TMDbServiseApi from '../services/apiService.js'

const TMDbServise = new TMDbServiseApi()

export default function SearchPage() {
  const [filmsList, setFilmsList] = useState(null)
  const [movieName, setMovieName] = useState(null)

  console.log(movieName)

  function handleFormSubmit(filmName) {
    if (filmName.trim() === '') {
      toast.error('Please, enter the key word!')
    } else if (filmName.trim() === movieName) {
      toast('Look, We already find it!', {
        style: { color: 'blue', backgroundColor: 'yellow' },
        icon: '🔥',
      })
    } else {
      TMDbServise.searchMovies(filmName)
        .then((response) => {
          setFilmsList(response)
        })
        .catch((error) => alert(error.message))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const inputValue = e.target.elements.movieName.value
    if (inputValue === localStorage.getItem('findFilmByName')) {
      toast('Look, We already find it!', {
        style: { color: 'blue', backgroundColor: 'yellow' },
        icon: '🔥',
      })
    }
    setMovieName(inputValue.trim())
    localStorage.setItem('findFilmByName', inputValue.trim())
    handleFormSubmit(inputValue)
  }

  useEffect(() => {
    if (!movieName && !filmsList) {
      localStorage.clear()
    }
  }, [])

  useEffect(() => {
    if (filmsList && filmsList.length === 0) {
      toast.error("We tried, but can't find any")
    }

    if (filmsList) {
      localStorage.setItem('lastSearch', JSON.stringify(filmsList))
    }
  }, [filmsList])

  const lastFindings = JSON.parse(localStorage.getItem('lastSearch'))

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="movieName"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
        <button type="submit">Search</button>
      </form>
      {filmsList && (
        <ul>
          {filmsList.map((film) => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `movies/${film.id}`,
                  state: { from: `/movies` },
                }}
              >
                {film.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!filmsList && lastFindings && (
        <ul>
          {lastFindings.map((film) => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `movies/${film.id}`,
                  state: { from: `/movies` },
                }}
              >
                {film.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Toaster position="top-right" />
    </>
  )
}
