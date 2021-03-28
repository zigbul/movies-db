import React, { useState, useEffect } from 'react';
import MoviesList from '../Movies-list/Movies-list';
import { debounce } from 'lodash';
import { Pagination, Spin, Input, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../../index.css';

const API_KEY = "api_key=a76933120539bb595d9b2c24cec6040a";

const MoviesApp = () => {

  const { TabPane } = Tabs;

  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(null);
  const [queryString, setQueryString] = useState('return');

  useEffect(() => {
    if (!localStorage.guestSessionID) {
      fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?${API_KEY}`)
      .then( res => res.json())
      .then( data => localStorage.setItem('guestSessionID', data.guest_session_id))
      .catch( e => console.log(e));
    }
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

  return (
    <div className="container">
      <Tabs defaultActiveKey="1" className="tabs">
        <TabPane tab="Search" key="1">
          <Input 
            className="input"
            placeholder="Type to search movies"
            onChange={debounce((e) => onStringChange(e), 3000)}
          />
          {loading ? <Spin size="large" className="spinner" /> : <MoviesList  moviesData={moviesData} />}
          <Pagination 
            className="pagination"
            current={currentPage} 
            onChange={(page) => onPageChange(page)}
            defaultPageSize={20}
            total={totalMovies}
            showSizeChanger={false} 
          />
        </TabPane>
        <TabPane tab="Rated" key="2">
          {loading ? <Spin size="large" className="spinner" /> : <MoviesList  moviesData={moviesData} />}
          <Pagination 
            className="pagination"
            current={currentPage} 
            onChange={(page) => onPageChange(page)}
            defaultPageSize={20}
            total={totalMovies}
            showSizeChanger={false} 
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MoviesApp;