import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import PostsList from './components/PostsList';
import PostView from './components/PostView';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Route exact path="/" component={PostsList} />
       <Route path="/posts/:id" component={PostView} />
      </div>
    );
  }
}

export default App;
