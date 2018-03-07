import React from 'react';
import rp from 'request-promise';
import './SingleMovieView.css';
import { Link } from 'react-router-dom';

class SingleMovieView extends React.Component {
  state= {
    movie: null,
  }
  componentDidMount() {
    const options = {
      uri: `http://www.omdbapi.com/?i=${this.props.match.params.id}`,
      qs: {
          apikey: 'd97400b0',
      },
      headers: {
          'User-Agent': 'Request-Promise',
      },
      json: true,
  };
  rp(options)
      .then(res => {
          this.setState({ movie: res })
      })
      .catch(err => {

      });
  }

  render() {
    const { movie } = this.state;
    return (
      <div className='movie-info-container'>
        <Link to='/' className='home-button'>Home</Link>
        { this.state.movie ?
        <div className='movie-info-page'>
          <div className='css-images-are-pain'><img src={movie.Poster} alt='Movie Poster'/></div>
          <div className='movie-info'>
            <h1 className='title'>{movie.Title}</h1>
            <div className='small-info'>
              <div className='release'>{movie.Released}</div>
              <div className='rated'>{movie.Rated}</div>
              <div className='runtime'>{movie.Runtime}</div>
            </div>
            <div className='director'>{movie.Director}</div>
            <div className='actors'>{movie.Actors}</div>
            <div className='plot'>{movie.Plot}</div>
            <div className='awards'>{movie.Awards}</div>
            <div className='imdb-ratings'><span>{movie.Ratings[0].Source}</span>{': '}<span>{movie.Ratings[0].Value}</span></div>
            <div className='rt-ratings'><span>{movie.Ratings[1].Source}</span>{': '}<span>{movie.Ratings[1].Value}</span></div>
            <div className='mtc-ratings'><span>{movie.Ratings[2].Source}</span>{': '}<span>{movie.Ratings[2].Value}</span></div>
          </div>
        </div>
        :
        <div>
          Loading...
        </div>
        }
      </div>
    );
  }
}

export default SingleMovieView;