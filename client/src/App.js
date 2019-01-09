import React, { Component } from 'react';
import {
  Route,
  NavLink
} from 'react-router-dom';
import './App.css';
import axios from 'axios';

import PostForm from './components/PostForm';
import Posts from './components/Posts';

const url = new URL('http://localhost:5000/api/posts/')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }


  componentDidMount() {
    axios
    .get(url)
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => console.log(err))
  }

  addPost = data => {
    axios
    .post(url, data)
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <nav-bar>
          <NavLink to='/api/posts'>Home</NavLink>
          {/* <NavLink to ='/post-form'>Form</NavLink> */}
        </nav-bar>
        <Route
        exact path='/api/posts'
        render={props => <Posts posts={this.state.posts} {...props} />}
        />
        {/* <Route path='/post-form'
        render={props => <PostForm addPost={this.addPost} {...props} />}
        /> */}
      </div>
    );
  }
}

export default App;
