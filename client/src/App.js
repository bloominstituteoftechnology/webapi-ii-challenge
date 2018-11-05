import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import PostsList from './Components/PostsList'
import PostDetail from './Components/PostDetail'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={PostsList}></Route>
        <Route exact path='/posts/:id' component={PostDetail}></Route>
      </div>
    );
  }
}

export default App;
