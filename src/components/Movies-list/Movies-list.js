import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../Movie-card';

const MoviesList = ({ moviesData, rateMovie }) => {

   const basePosterURL = "https://image.tmdb.org/t/p/w185/";
   const defaultPosterURL = `https://torrentorg.com/image700x1050/uploads/posts/2020-04/1586557386_poster_none.png`;
   const setID = () => {
      return `_${Math.random().toString(36).substr(2, 9)}`;
    };

   const elements = moviesData.map(({ poster_path, ...movieItems }) => {

      return (
         <MovieCard
            key={setID()}
            {...movieItems}
            posterURL={poster_path ? basePosterURL + poster_path : defaultPosterURL}
            rateMovie={rateMovie}
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