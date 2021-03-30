import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../Movie-card';
import { setID, basePosterURL, defaultPosterURL } from '../../helper';

const MoviesList = ({ moviesData, rateMovie }) => {

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