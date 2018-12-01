import React, { Component } from 'react';
import { Router, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Posts from './components/Post';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
      posts: [],
    };
  }
componentDidMount() {
axios.get(`http://localhost:4000/api/posts`)
  .then(response => {
    const posts = response.data;
    this.setState({posts}); 
  }) 
  .catch(err=> {
    console.log(err)
  });
}
  render() {
    return (
      <Router>
      <div className="App">
      <NavLink to ='/'>Home</NavLink>
      <Route exact path='/' render={() => <Posts posts={this.state.posts}/>}/>
      </div>
      </Router>
    );
  }
}

export default App;
