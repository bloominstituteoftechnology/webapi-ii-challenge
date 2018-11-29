import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Posts from './components/Posts.js';
import axios from 'axios';
// import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/posts')
      .then(response => {
        this.setState({ posts: response.data })
      })
      .catch(error => {
        console.log('Failed to load posts')
      })

  }

  render() {
    return (
      <div className="App">
        <Route exact path='/api/posts' render={props => (
          <Posts
            {...props}
            posts={this.state.posts}
          />
        )} />
      </div>
    );
  }
}

export default App;
