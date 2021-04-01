import React from 'react';
import RatedMovieCard from '../Rated-movie-card';
import { setID, basePosterURL, defaultPosterURL } from '../../helper';
import { Alert } from 'antd';

const RatedList = ({ moviesData, unRateMovie }) => {

   const ratedMovies = [];

   for (const movie in moviesData) {
      ratedMovies.push(moviesData[movie]);
   }

   const elements = ratedMovies.map(({ poster_path, ...movieItems }) => {

      return (
         <RatedMovieCard
            key={setID()}
            {...movieItems}
            posterURL={poster_path ? basePosterURL + poster_path : defaultPosterURL}
            unRateMovie={unRateMovie}
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