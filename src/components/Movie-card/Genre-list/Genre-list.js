import React, { useContext } from 'react';
import { MyContext } from '../../../context';
import { setID } from '../../../helper';

const GenreList = ({ genre_ids }) => {

   const genres = useContext(MyContext);

   let cache;
   let genreIdsArraylength = genre_ids.length, genreArrayLength = genres.length;
   const genreList = [];

   for (let i = 0; i < genreArrayLength; ++i) {
      cache = genres[i].id;

      for (let j = 0; j < genreIdsArraylength; ++j) {
         if (cache === genre_ids[j]) {
            genreList.push(genres[i].name);
            break;
         }
      }
   }
   
   const elements = genreList.map( genreName => {
      return (
         <li className="genre-list__item" key={setID()}>
            <p className="genre-list__text">{genreName}</p>
         </li>
      )
   })

   return (
      <ul className="film-card__genre genre-list">
         {elements}
      </ul>
   );
};

export default GenreList;