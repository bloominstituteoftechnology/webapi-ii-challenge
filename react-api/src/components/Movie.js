import React from 'react';

function Movie(props) {
  return(
    <div>
      <div>Movies!!!</div>
      <img src={props.posterURL} alt='movie poster'/>
      <div className="rottenScore">{props.rating}</div>
      <h3>{props.title}</h3>
    </div>
  );
}

export default Movie;