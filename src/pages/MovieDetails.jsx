import React, { useState, useEffect, lazy, Suspense } from 'react'
import {
  Switch,
  NavLink,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom'
import styled from '@emotion/styled'

// import Cast from '../components/Cast.jsx'
// import Reviews from '../components/Reviews.jsx'
import TMDbServiseApi from '../services/apiService.js'

const Cast = lazy(() =>
  import('../components/Cast.jsx' /* webpackChunkName: "cast" */),
)
const Reviews = lazy(() =>
  import('../components/Reviews.jsx' /* webpackChunkName: "reviews" */),
)

const TMDbServise = new TMDbServiseApi()
const STATIC_IMG_PATH = 'https://image.tmdb.org/t/p/original/'
const imgNotFound =
  'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'

export default function MovieDetails() {
  const { filmId } = useParams()
  const { url, path } = useRouteMatch()
  const [filmDetails, setFilmDetails] = useState(null)
  const location = useLocation()
  const history = useHistory()

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

  const handkeGoBack = () => {
    history.push(location.state?.from ? location.state.from : '/')
  }

  return (
    <>
      <button onClick={handkeGoBack} style={blockMargin}>
        ⟵ Go back
      </button>
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
            <div>
              {filmDetails.genres.map((filmGenre) => (
                <div key={filmGenre.name} style={genresStyles}>
                  {filmGenre.name}
                </div>
              ))}
            </div>
          </div>
        </StyledFilmDetails>
      )}
      <hr />
      <p>Additinal information</p>
      <ul>
        <li>
          <NavLink to={{ ...location, pathname: `${url}/cast` }}>Cast</NavLink>
        </li>
        <li>
          <NavLink to={{ ...location, pathname: `${url}/reviews` }}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<h1>LOADING additional info...</h1>}>
        <Switch>
          <Route path={`${path}/cast`}>
            <Cast movieId={filmId} />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews movieId={filmId} />
          </Route>
        </Switch>
      </Suspense>
    </>
  )
}
