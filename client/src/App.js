import React, { Component } from 'react';
import Posts from './components/posts.js';
import {Route} from 'react-router-dom';
import SinglePostPage from './components/singlepostpage.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Posts}/>
        <Route exact path='/:id' component={SinglePostPage}/>
      </div>
    );
  }
}

export default App;
