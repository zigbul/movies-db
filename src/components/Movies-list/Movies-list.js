import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../Movie-card';

const MoviesList = ({ moviesData }) => {

   console.log(moviesData);

   const elements = moviesData.map(({ poster_path, ...movieItems }) => {

      const basePosterURL = "https://image.tmdb.org/t/p/w185/";
      const defaultPosterURL = `https://torrentorg.com/image700x1050/uploads/posts/2020-04/1586557386_poster_none.png`;

      return (
         <MovieCard
            key={movieItems.id}
            {...movieItems}
            posterURL={poster_path ? basePosterURL + poster_path : defaultPosterURL}
         />
      )
   });

   return (
      <ul className="film-list">
         {elements}
      </ul>
   )
}

MoviesList.propTypes = {
   moviesData: PropTypes.array
}

export default MoviesList;