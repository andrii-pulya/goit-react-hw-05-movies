import React, { useState, useEffect } from 'react'
import { NavLink, Route, useParams, useRouteMatch } from 'react-router-dom'
import TMDbServiseApi from '../services/apiService.js'
import styled from '@emotion/styled'

const TMDbServise = new TMDbServiseApi()
const STATIC_IMG_PATH = 'https://image.tmdb.org/t/p/original/'
const imgNotFound =
  'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'

export default function MovieDetails() {
  const { filmId } = useParams()
  const { url } = useRouteMatch()
  const [filmDetails, setFilmDetails] = useState(null)

  const genresStyles = {
    display: 'inline-flex',
    marginRight: 10 + 'px',
  }

  const blockMargin = {
    margin: 10 + 'px',
  }

  const StyledFilmDetails = styled('div')`
    display: flex;
    margin-right: 10px;
  `

  useEffect(() => {
    TMDbServise.getMovieDetails(filmId)
      .then((response) => setFilmDetails(response))
      .catch((error) => alert(error.message))
  }, [filmId])

  return (
    <>
      <button style={blockMargin}>⟵ Go back</button>
      {filmDetails && (
        <StyledFilmDetails>
          <div style={blockMargin}>
            <img
              src={
                filmDetails.poster_path
                  ? `${STATIC_IMG_PATH}${filmDetails.poster_path}`
                  : imgNotFound
              }
              alt={filmDetails.title}
              width="240"
            />
          </div>
          <div style={blockMargin}>
            <h1>{filmDetails.title}</h1>
            <p>User Score: {filmDetails.vote_average * 10 + ' %'}</p>
            <h2>Overview</h2>
            <p>{filmDetails.overview}</p>
            <h3>Genres</h3>
            <p>
              {filmDetails.genres.map((filmGenre) => (
                <div style={genresStyles}>{filmGenre.name}</div>
              ))}
            </p>
          </div>
        </StyledFilmDetails>
      )}
      <hr />
      <p>Additinal information</p>
      <ul>
        <li>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
        </li>
      </ul>
      <hr />
    </>
  )
}
