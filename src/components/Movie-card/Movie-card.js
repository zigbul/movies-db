import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Rate } from 'antd';

const MovieCard = ({ title, overview, releaseDate, posterURL, id }) => {

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

   const onRateMovie = (value) => {
      return fetch(`
      https://api.themoviedb.org/3/movie/${id}/rating?api_key=a76933120539bb595d9b2c24cec6040a&guest_session_id=${localStorage.getItem('guestSessionID')}`,
      {
         method: "POST",
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
         },
         "value": value,
      })
      .then( res => res.json())
      .then( data => console.log(data));
   }

   return (
      <li className="film-list__item film-card">
         <img src={posterURL} className="film-card__poster" alt="film-poster" width="183px" height="281px"/>
         <div className="film-card__body">
            <div className="header-wrapper">
               <h2 className="film-card__header">
                  {title}
               </h2>
               <div className="rate-circle">
                  6.5
               </div>
            </div>
            <span className="film-card__date">
               {dateChecker(releaseDate)}
            </span>
            <ul className="film-card__genre genre-list">
               <li className="genre-list__item">
                  <p className="genre-list__text">Action</p>
               </li>
               <li className="genre-list__item">
                  <p className="genre-list__text">Drama</p>
               </li>
            </ul>
            <p className="film-card__overview">
            {stringCutter(overview, 200)}
            </p>
            <Rate
              allowHalf 
              defaultValue={0}
              count={10}
              onChange={(value) => onRateMovie(value)}
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