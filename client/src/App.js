import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import Posts from './Components/Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: ''
    };
  }
  
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
