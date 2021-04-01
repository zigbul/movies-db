import React, { useState, useEffect } from 'react';
import MoviesList from '../Movies-list';
import RatedList from '../Rated-list';
import { debounce } from 'lodash';
import { Pagination, Spin, Input, Tabs, Alert } from 'antd';
import 'antd/dist/antd.css';
import '../../index.css';
import { useLocalStorage } from '../../useLocalStorage';
import { MyContext } from '../../context';
// import { API_KEY } from '../../helper';

const API_KEY = 'api_key=a76933120539bb595d9b2c24cec6040a';

const MoviesApp = () => {

  const { TabPane } = Tabs;

  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(null);
  const [queryString, setQueryString] = useState('return');
  const [ratedMovies, setRatedMovies] = useLocalStorage('ratedMovies', {});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (!localStorage.guestSessionID) {
      fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?${API_KEY}`)
      .then( res => res.json())
      .then( data => localStorage.setItem('guestSessionID', data.guest_session_id))
      .catch( e => console.log(e));
    }

    fetch(`https://api.themoviedb.org/3/genre/movie/list?${API_KEY}`)
      .then( res => res.json())
      .then( data => setGenres(data.genres))
      .catch( e => console.log(e));
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${queryString}&page=${currentPage}`)
    .then( res => res.json())
    .then( data => {
      setMoviesData(data.results);
      setTotalMovies(data.total_results);
    })
    .then(() => setLoading(false))
    .catch( e => console.log(e));
  }, [queryString, currentPage])

  const onPageChange = page => {
    setCurrentPage(page);
    setLoading(true);
  };

  const onStringChange = e => {
    if (e.target.value === '') {
      setQueryString('return')
    } else {  
      setQueryString(e.target.value);
    }
    setCurrentPage(1);
    setLoading(true);
  }

  // const rateMovie = (value, id) => {
  //   return fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=a76933120539bb595d9b2c24cec6040a&guest_session_id=${localStorage.getItem('guestSessionID')}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //       "value": value,
  //     })
  //   .then( res => res.json())
  //   .then( data => console.log(data))
  //   .catch( e => console.log(e));
  // }

  const rateMovie = (id) => {
    const arr = moviesData.map( movie => {
      if(movie.id === id) {
        setRatedMovies({...ratedMovies, [movie.id]: {...movie, rated: true}});
        return { ...movie, rated: true};
      }
      return movie;
    });
    setMoviesData(arr);
  }

  return (
    <MyContext.Provider value={genres}>
      <div className="container">
        <Tabs defaultActiveKey="1" className="tabs">
          <TabPane tab="Search" key="1">
            <Input 
              className="input"
              placeholder="Type to search movies"
              onChange={debounce((e) => onStringChange(e), 1000)}
            />
            {loading ? <Spin size="large" className="spinner" /> : moviesData.length === 0 
                     ? <Alert message="No movies found" type="info" showIcon />
                     : <MoviesList  moviesData={moviesData} rateMovie={rateMovie} />}
            {moviesData.length === 0 ? null : <Pagination 
                                                className="pagination"
                                                current={currentPage} 
                                                onChange={(page) => onPageChange(page)}
                                                defaultPageSize={20}
                                                total={totalMovies}
                                                showSizeChanger={false} 
                                              />}
          </TabPane>
          <TabPane tab="Rated" key="2">
            {<RatedList  moviesData={ratedMovies} rateMovie={rateMovie} />}
          </TabPane>
        </Tabs>
      </div>
    </MyContext.Provider>
  );
};

export default MoviesApp;