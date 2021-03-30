import React from 'react';
import MovieCard from '../Movie-card';
import { setID, basePosterURL, defaultPosterURL } from '../../helper';

const RatedList = ({ moviesData, rateMovie }) => {

   // const filtredFilms = moviesData.filter( movie => {
   //    if (movie.rated) {
   //       return movie;
   //    }
   //    return false;
   // });

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
         {elements.length === 0 ? <h1>No movies</h1> : elements}
      </ul>
   )
}

export default RatedList;