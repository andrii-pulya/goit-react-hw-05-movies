import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import TMDbServiseApi from '../services/apiService.js'

const TMDbServise = new TMDbServiseApi()
const STATIC_IMG_PATH = 'https://image.tmdb.org/t/p/original/'
const imgNotFound =
  'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'

export default function Cast({ movieId }) {
  const [castFilm, setCastFilm] = useState(null)

  useEffect(() => {
    TMDbServise.getMovieCredits(movieId)
      .then((response) => setCastFilm(response))
      .catch((error) => alert(error.message))
  }, [movieId])

  return (
    <ul>
      {castFilm &&
        castFilm.map((cast) => (
          <li key={cast.id}>
            <img
              src={
                cast.profile_path
                  ? `${STATIC_IMG_PATH}${cast.profile_path}`
                  : imgNotFound
              }
              alt={cast.name}
              width="100"
            />
            <p>{cast.name}</p>
            <p>{cast.character}</p>
          </li>
        ))}
    </ul>
  )
}

Cast.propTypes = {
  movieId: PropTypes.string,
}
