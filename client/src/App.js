import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import Posts from './Components/Posts';
import PostForm from './Components/PostForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: ''
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => this.setState({ posts: response.data }))
      .catch(err => console.log(err));
  };

  addPost = post => {
    axios
      .post('http://localhost:5000/api/posts', post)
      .then(response => this.setState({ posts: response.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <nav>
          <div>
            <NavLink exact to='/'>Posts</NavLink>
          </div>
          <div>
            <NavLink to='/post-form'>Add New Post</NavLink>
          </div>
        </nav>
        <Route
          exact
          path='/'
          render={props => <Posts {...props} posts={this.state.posts} />}
        />
        <Route
          path='/post-form'
          render={props => <PostForm {...props} addPost={this.addPost} />}
        />
      </div>
    );
  }
}

export default App;
