import React, { Component } from 'react';
import MovieList from './components/MovieList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SingleMovieView from './components/SingleMovieView';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' component={MovieList} exact />
          <Route path='/movie/:id' component={SingleMovieView} />
        </div>
      </Router>
    );
  }
}

export default App;
