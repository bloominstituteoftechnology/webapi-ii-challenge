import React from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';

function Movie(props) {
  return(
    <div className='movie'>
      <div className="rottenScore">{props.rating}</div>
      <Link to={`/movie/${props.id}`}><img src={props.posterURL} alt='movie poster'/></Link>
      <h3 className='title'>{props.title}</h3>
    </div>
  );
}

export default Movie;