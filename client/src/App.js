import React, { Component } from 'react';
import axios from 'axios';
import { Route } from "react-router-dom";

import Posts from './Components/Posts'
import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home';

import './App.css';

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      console.log(response)
      this.setState({ posts: response.data })
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path='/' component={Home} />
        <Route path='/api/posts' render={props=> <Posts {...props} posts={this.state.posts}/>}/>
      </div>
    );
  }
}

export default App;
