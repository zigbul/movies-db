import React, { useContext } from 'react';
import { MyContext } from '../../../context';

const GenreList = ({ genre_ids }) => {

   const genres = useContext(MyContext);

   let cache;
   let ln1 = genre_ids.length, ln2 = genres.length;
   const genreList = [];

   for (let i = 0; i < ln2; ++i) {
      cache = genres[i].id;

      for (let j = 0; j < ln1; ++j) {
         if (cache === genre_ids[j]) {
            genreList.push(genres[i].name);
            break;
         }
      }
   }
   
   const elements = genreList.map( genreName => {
      return (
         <li className="genre-list__item">
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