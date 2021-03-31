import React from 'react';
import MovieCard from '../Movie-card';
import { setID, basePosterURL, defaultPosterURL } from '../../helper';
import { Alert } from 'antd';

const RatedList = ({ moviesData, rateMovie }) => {

   const ratedMovies = [];

   for (const movie in moviesData) {
      ratedMovies.push(moviesData[movie]);
   }

   const elements = ratedMovies.map(({ poster_path, ...movieItems }) => {

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
         {elements.length === 0 ? <Alert message="No movies found" type="info" showIcon /> : elements}
      </ul>
   )
}

export default RatedList;