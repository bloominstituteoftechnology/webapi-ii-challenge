import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PostPage  from './components/PostPage';

import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
      <PostPage />
      </div>
    );
  }
}

export default App;
