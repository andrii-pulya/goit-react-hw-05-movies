import React, { useState, useEffect } from 'react'

import TMDbServiseApi from '../services/apiService.js'

const TMDbServise = new TMDbServiseApi()

export default function Reviews({ movieId }) {
  const [filmReviews, setFilmReviews] = useState(null)

  useEffect(() => {
    TMDbServise.getMovieReviews(movieId)
      .then((response) => setFilmReviews(response))
      .catch((error) => alert(error.message))
  }, [movieId])

  return (
    <div>
      {!filmReviews || filmReviews !== [] ? (
        <p>We do not have any reviews for this movie.</p>
      ) : (
        <ul>
          {filmReviews &&
            filmReviews.map((review) => (
              <li key={review.id}>
                <h2>{review.author}</h2>
                <p>{review.content}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
