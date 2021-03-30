import React, { useContext } from 'react';
import { MyContext } from '../../../context';

const GenreList = ({ genre_ids }) => {

   const genres = useContext(MyContext);
   console.log(genres);

   return (
      <ul className="film-card__genre genre-list">
         <li className="genre-list__item">
            <p className="genre-list__text">Action</p>
         </li>
         <li className="genre-list__item">
            <p className="genre-list__text">Drama</p>
         </li>
      </ul>
   );
};

export default GenreList;