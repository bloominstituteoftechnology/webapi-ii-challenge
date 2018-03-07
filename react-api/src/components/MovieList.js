import React from 'react';
import rp from 'request-promise';
import Movie from './Movie';
import './MovieList.css';
const thing = {
    '1': 'tt0111161',
    '2': 'tt0068646',
    '3': 'tt0071562',
    '4': 'tt0468569',
    '5': 'tt0050083',
    '6': 'tt0108052',
    '7': 'tt0110912',
    '8': 'tt0167260',
    '9': 'tt0060196',
    '10': 'tt0137523',
    '11': 'tt0120737',
    '12': 'tt0109830',
    '13': 'tt0080684',
    '14': 'tt1375666',
    '15': 'tt0167261',
    '16': 'tt0073486',
    '17': 'tt0099685',
    '18': 'tt0133093',
    '19': 'tt0047478',
    '20': 'tt0076759',
};

// {
//     Poster
//         :
//         "https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
//     Ratings
//         :
//         [{}, {value: '98%'}, {}],
//     Title
//         :
//         "The Godfather"
// }
class MovieList extends React.Component {
    state = {
        movies: [],
    };
    componentDidMount() {
        for (let i = 1; i <= 20; i++) {
            const options = {
                uri: `http://www.omdbapi.com/?i=${thing[i]}`,
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
                    let inter = this.state.movies;
                    inter.push(res);
                    this.setState({ movies: inter });
                })
                .catch(err => {});
        }
    }
    render() {
        return (
            <div>
                <h1>Pick a movie:</h1>
                <div className="MoviesList">
                    {this.state.movies.length > 0 ? (
                        this.state.movies.map((movie, i) => {
                            return (
                                <Movie
                                    key={movie.imdbID}
                                    id={movie.imdbID}
                                    title={movie.Title}
                                    rating={movie.Ratings[1].Value}
                                    posterURL={movie.Poster}
                                />
                            );
                        })
                    ) : (
                        <div className="loading">Loading...</div>
                    )}
                </div>
            </div>
        );
    }
}

export default MovieList;
