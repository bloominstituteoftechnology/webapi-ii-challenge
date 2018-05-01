import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import PostsList from './components/PostsList';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Route exact path="/" component={PostsList} />
      </div>
    );
  }
}

export default App;
