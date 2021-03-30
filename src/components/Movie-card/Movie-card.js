import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Rate } from 'antd';
import GenreList from './Genre-list';

const MovieCard = ({ title, overview, releaseDate, posterURL, id, rating, rateMovie, genre_ids }) => {

   function stringCutter(str, endIndex) {
      if(str.length > endIndex) {
         let newString = str.slice(0, endIndex);
         newString = `${newString.slice(0, newString.lastIndexOf(" "))}...`;
         return newString;
      }
      return str;
   }

   function dateChecker(date) {
      try {
         return format(new Date(date), 'PP');
      } catch(err) {
         return null;
      }
   }

   let circleColor = "rate-circle";

   if (rating < 3 || rating === undefined) {
      circleColor = "rate-circle rate-circle_low-rating";
   } else if (rating < 5) {
      circleColor = "rate-circle rate-circle_avarage-rating";
   } else if (rating < 7) {
      circleColor = "rate-circle rate-circle_good-rating";
   } else {
      circleColor = "rate-circle rate-circle_high-rating";
   }

   return (
      <li className="film-list__item film-card">
         <img src={posterURL} className="film-card__poster" alt="film-poster" width="183px" height="281px"/>
         <div className="film-card__body">
            <div className="header-wrapper">
               <h2 className="film-card__header">
                  {title}
               </h2>
               <div className={circleColor}>
                  {rating ?? 0}
               </div>
            </div>
            <span className="film-card__date">
               {dateChecker(releaseDate)}
            </span>
            <GenreList genre_ids={genre_ids} />
            <p className="film-card__overview">
            {stringCutter(overview, 100)}
            </p>
            <Rate
              allowHalf 
              defaultValue={0}
              value={rating}
              count={10}
              onChange={(value) => rateMovie(value, id)}
            />
         </div>
      </li>
   );
};

MovieCard.defaultProps = {
   releaseDate: '',
}

MovieCard.propTypes = {
   title: PropTypes.string,
   overview: PropTypes.string,
   releaseDate: PropTypes.string,
   poster: PropTypes.string
}

export default MovieCard;